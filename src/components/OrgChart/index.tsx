import html2canvas from 'html2canvas';
import JSONDigger from 'json-digger';
import jsPDF from 'jspdf';
import { useTera } from 'lib';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import '../../styles/component/org-chart/chart-container.scss';
import ChartNode, { ChartNodeProps } from './ChartNode';
import { selectNodeService } from './service';

export type OrgChartRef = {
  exportTo: (exportFilename: string, exportFileExtension: string) => void;
  expandAllNodes: () => void;
};
export type DataSourceType = {
  id?: number | string;
  relationship?: string;
  children?: DataSourceType[];
  [key: string]: any;
};

export type NodeTemplateCustomProps = {
  nodeData: DataSourceType;
};
export type ChartContainerProps = ChartNodeProps & {
  pan?: boolean;
  zoom?: boolean;
  zoomOutLimit?: number;
  zoomInLimit?: number;
  containerClass?: string;
  chartClass?: string;
  onClickChart?: () => void;
  style?: React.CSSProperties;
};
declare global {
  interface Window {
    sidebar: boolean;
  }
  interface Navigator {
    msSaveBlob: (canvas: any, filename: string) => void;
  }
}
const OrgChart = forwardRef<OrgChartRef, ChartContainerProps>(
  (
    {
      dataSource,
      pan,
      zoom,
      zoomOutLimit = 0.5,
      zoomInLimit = 7,
      containerClass,
      chartClass,
      NodeTemplateCustom,
      draggable,
      collapsible = true,
      multipleSelect,
      onClickNode,
      onClickChart,
      onClickEdge,
      depth = undefined,
      handleAdd,
      handleEdit,
      handleDelete,
      employeeListRender,
      nodeContent = 'content',
      nodeTitle = 'title',
      nodeHasDelete = 'has_delete',
      nodeHasNew = 'has_new',
      nodeHasUpdate = 'has_update',
      style,
    },
    ref,
  ) => {
    const container = useRef(null);
    const chart = useRef(null);
    const downloadButton = useRef(null);
    const { is_verify } = useTera();

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [transform, setTransform] = useState('');
    const [panning, setPanning] = useState(false);
    const [cursor, setCursor] = useState('default');
    const [exporting, setExporting] = useState(false);
    const [dataURL, setDataURL] = useState('');
    const [download, setDownload] = useState('');

    const attachRel = (data, flags) => {
      if (!data.relationship) {
        data.relationship =
          flags + (data.children && data.children.length > 0 ? 1 : 0);
        if (data.children) {
          data.children.forEach(function (item) {
            attachRel(item, '1' + (data.children.length > 1 ? 1 : 0));
          });
        }
      }

      return data;
    };

    const [ds, setDS] = useState(dataSource);
    useEffect(() => {
      setDS(dataSource);
    }, [dataSource]);

    const dsDigger = new JSONDigger(dataSource, 'id', 'children');

    const clickChartHandler = (event) => {
      if (!event.target.closest('.oc-node')) {
        if (onClickChart) {
          onClickChart();
        }
        selectNodeService.clearSelectedNodeInfo();
      }
    };

    const panEndHandler = () => {
      setPanning(false);
      setCursor('default');
    };

    const panHandler = (e) => {
      let newX = 0;
      let newY = 0;
      if (!e.targetTouches) {
        // pand on desktop
        newX = e.pageX - startX;
        newY = e.pageY - startY;
      } else if (e.targetTouches.length === 1) {
        // pan on mobile device
        newX = e.targetTouches[0].pageX - startX;
        newY = e.targetTouches[0].pageY - startY;
      } else if (e.targetTouches.length > 1) {
        return;
      }
      if (transform === '') {
        if (transform.indexOf('3d') === -1) {
          setTransform('matrix(1,0,0,1,' + newX + ',' + newY + ')');
        } else {
          setTransform(
            'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,' + newX + ', ' + newY + ',0,1)',
          );
        }
      } else {
        const matrix = transform.split(',');
        if (transform.indexOf('3d') === -1) {
          matrix[4] = newX.toString();
          matrix[5] = newY + ')';
        } else {
          matrix[12] = newX.toString();
          matrix[13] = newY.toString();
        }
        setTransform(matrix.join(','));
      }
    };

    const panStartHandler = (e) => {
      if (e.target.closest('.oc-node')) {
        setPanning(false);
        return;
      } else {
        setPanning(true);
        setCursor('move');
      }
      let lastX = 0;
      let lastY = 0;
      if (transform !== '') {
        const matrix = transform.split(',');
        if (transform.indexOf('3d') === -1) {
          lastX = parseInt(matrix[4]);
          lastY = parseInt(matrix[5]);
        } else {
          lastX = parseInt(matrix[12]);
          lastY = parseInt(matrix[13]);
        }
      }
      if (!e.targetTouches) {
        // pand on desktop
        setStartX(e.pageX - lastX);
        setStartY(e.pageY - lastY);
      } else if (e.targetTouches.length === 1) {
        // pan on mobile device
        setStartX(e.targetTouches[0].pageX - lastX);
        setStartY(e.targetTouches[0].pageY - lastY);
      } else if (e.targetTouches.length > 1) {
        return;
      }
    };

    const updateChartScale = (newScale) => {
      let matrix = [];
      let targetScale = 1;
      if (transform === '') {
        setTransform('matrix(' + newScale + ', 0, 0, ' + newScale + ', 0, 0)');
      } else {
        matrix = transform.split(',');
        if (transform.indexOf('3d') === -1) {
          targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale);
          if (targetScale > zoomOutLimit && targetScale < zoomInLimit) {
            matrix[0] = 'matrix(' + targetScale;
            matrix[3] = targetScale;
            setTransform(matrix.join(','));
          }
        } else {
          targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale);
          if (targetScale > zoomOutLimit && targetScale < zoomInLimit) {
            matrix[0] = 'matrix3d(' + targetScale;
            matrix[5] = targetScale;
            setTransform(matrix.join(','));
          }
        }
      }
    };

    const zoomHandler = (e) => {
      const newScale = 1 + (e.deltaY > 0 ? -0.2 : 0.2);
      updateChartScale(newScale);
    };

    const exportPDF = (canvas, exportFilename) => {
      const canvasWidth = Math.floor(canvas.width);
      const canvasHeight = Math.floor(canvas.height);
      const doc =
        canvasWidth > canvasHeight
          ? new jsPDF({
              orientation: 'landscape',
              unit: 'px',
              format: [canvasWidth, canvasHeight],
            })
          : new jsPDF({
              orientation: 'portrait',
              unit: 'px',
              format: [canvasHeight, canvasWidth],
            });
      doc.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        undefined,
        undefined,
      );
      doc.save(exportFilename + '.pdf');
    };

    const exportPNG = (canvas, exportFilename) => {
      const isWebkit = 'WebkitAppearance' in document.documentElement.style;
      const isFf = !!window.sidebar;
      const isEdge =
        navigator.appName === 'Microsoft Internet Explorer' ||
        (navigator.appName === 'Netscape' &&
          navigator.appVersion.indexOf('Edge') > -1);

      if ((!isWebkit && !isFf) || isEdge) {
        window.navigator.msSaveBlob(canvas.msToBlob(), exportFilename + '.png');
      } else {
        setDataURL(canvas.toDataURL());
        setDownload(exportFilename + '.png');
        downloadButton.current.click();
      }
    };

    const changeHierarchy = async (draggedItemData, dropTargetId) => {
      await dsDigger.removeNode(draggedItemData.id);
      await dsDigger.addChildren(dropTargetId, draggedItemData);
      setDS({ ...dsDigger.ds });
    };

    useImperativeHandle(ref, () => ({
      exportTo: (exportFilename: string, exportFileExtension: string) => {
        exportFilename = exportFilename || 'OrgChart';
        exportFileExtension = exportFileExtension || 'png';
        setExporting(true);
        const originalScrollLeft = container.current.scrollLeft;
        container.current.scrollLeft = 0;
        const originalScrollTop = container.current.scrollTop;
        container.current.scrollTop = 0;
        html2canvas(chart.current, {
          width: chart.current.clientWidth,
          height: chart.current.clientHeight,
          onclone: function (clonedDoc) {
            clonedDoc.querySelector<HTMLDivElement>(
              '.orgchart',
            ).style.background = 'none';
            clonedDoc.querySelector<HTMLDivElement>(
              '.orgchart',
            ).style.transform = '';
          },
        }).then(
          (canvas) => {
            if (exportFileExtension.toLowerCase() === 'pdf') {
              exportPDF(canvas, exportFilename);
            } else {
              exportPNG(canvas, exportFilename);
            }
            setExporting(false);
            container.current.scrollLeft = originalScrollLeft;
            container.current.scrollTop = originalScrollTop;
          },
          () => {
            setExporting(false);
            container.current.scrollLeft = originalScrollLeft;
            container.current.scrollTop = originalScrollTop;
          },
        );
      },
      expandAllNodes: () => {
        chart.current
          .querySelectorAll(
            '.oc-node.hidden, .oc-hierarchy.hidden, .isSiblingsCollapsed, .isAncestorsCollapsed',
          )
          .forEach((el) => {
            el.classList.remove(
              'hidden',
              'isSiblingsCollapsed',
              'isAncestorsCollapsed',
            );
          });
      },
    }));

    if (!is_verify) return null;

    return (
      <div
        ref={container}
        className={customTwMerge('orgchart-container', containerClass)}
        onWheel={zoom ? zoomHandler : undefined}
        onMouseUp={pan && panning ? panEndHandler : undefined}
        style={style}
      >
        <div
          ref={chart}
          className={customTwMerge('orgchart ', chartClass)}
          style={{ transform: transform, cursor: cursor }}
          onClick={clickChartHandler}
          onMouseDown={pan ? panStartHandler : undefined}
          onMouseMove={pan && panning ? panHandler : undefined}
        >
          <ul>
            <ChartNode
              dataSource={attachRel(ds, '00')}
              NodeTemplateCustom={NodeTemplateCustom}
              draggable={draggable}
              collapsible={collapsible}
              multipleSelect={multipleSelect}
              changeHierarchy={changeHierarchy}
              onClickNode={onClickNode}
              onClickEdge={onClickEdge}
              depth={depth}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              employeeListRender={employeeListRender}
              nodeContent={nodeContent}
              nodeTitle={nodeTitle}
              nodeHasNew={nodeHasNew}
              nodeHasUpdate={nodeHasUpdate}
              nodeHasDelete={nodeHasDelete}
            />
          </ul>
        </div>
        <a
          className="hidden oc-download-btn"
          ref={downloadButton}
          href={dataURL}
          download={download}
        >
          &nbsp;
        </a>
        <div className={`oc-mask ${exporting ? '' : 'hidden'}`}>
          <i className="oci oci-spinner spinner"></i>
        </div>
      </div>
    );
  },
);

export default OrgChart;
