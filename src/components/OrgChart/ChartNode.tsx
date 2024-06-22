import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import '../../styles/component/org-chart/chart-node.scss';
import NodeTemplate, { NodeTemplateProps } from './NodeTemplate';

import { DataSourceType, NodeTemplateCustomProps } from '.';
import { dragNodeService, selectNodeService } from './service';
export type ChartNodeProps = NodeTemplateProps & {
  NodeTemplateCustom?: ({
    nodeData,
  }: NodeTemplateCustomProps) => ReactElement<NodeTemplateCustomProps>;
  draggable?: boolean;
  collapsible?: boolean;
  multipleSelect?: boolean;
  changeHierarchy?: (dataTransfer: any, id: string) => void;
  onClickNode?: (dataSource: DataSourceType) => void;
  onClickEdge?: (type: 'top' | 'bottom', expanded: boolean) => void;
  depth?: number;
};
const ChartNode = ({
  dataSource,
  NodeTemplateCustom,
  draggable,
  collapsible = true,
  multipleSelect,
  changeHierarchy,
  onClickNode,
  onClickEdge,
  depth,
  level = 1,
  handleAdd,
  handleEdit,
  handleDelete,
  employeeListRender,
  nodeContent,
  nodeTitle,
  nodeHasDelete,
  nodeHasNew,
  nodeHasUpdate,
}: ChartNodeProps) => {
  const node = useRef<HTMLDivElement>(null);

  const [isChildrenCollapsed, setIsChildrenCollapsed] = useState(undefined);
  const [topEdgeExpanded, setTopEdgeExpanded] = useState(undefined);
  const [rightEdgeExpanded, setRightEdgeExpanded] = useState(undefined);
  const [bottomEdgeExpanded, setBottomEdgeExpanded] = useState(undefined);
  const [leftEdgeExpanded, setLeftEdgeExpanded] = useState(undefined);
  const [allowedDrop, setAllowedDrop] = useState(false);
  const [selected, setSelected] = useState(false);

  const nodeClasses = customTwMerge(
    'oc-node inline-block relative p-1 border-2 border-dashed border-transparent mb-[2.625rem] rounded-[10px]',
    isChildrenCollapsed ? 'isChildrenCollapsed' : '',
    allowedDrop ? 'allowedDrop' : '',
    selected ? 'selected' : '',
  );

  useEffect(() => {
    if (depth === undefined) {
      return setIsChildrenCollapsed(undefined);
    }
    if (level < depth) {
      setIsChildrenCollapsed(undefined);
    } else {
      setIsChildrenCollapsed(true);
    }
  }, [depth]);

  useEffect(() => {
    const subs1 = dragNodeService.getDragInfo().subscribe((draggedInfo) => {
      if (draggedInfo) {
        setAllowedDrop(
          !document
            .querySelector('#' + draggedInfo.draggedNodeId)
            .closest('li')
            .querySelector('#' + node.current.id)
            ? true
            : false,
        );
      } else {
        setAllowedDrop(false);
      }
    });

    const subs2 = selectNodeService
      .getSelectedNodeInfo()
      .subscribe((selectedNodeInfo) => {
        if (selectedNodeInfo) {
          if (multipleSelect) {
            if (selectedNodeInfo.selectedNodeId === dataSource.id) {
              setSelected(true);
            }
          } else {
            setSelected(selectedNodeInfo.selectedNodeId === dataSource.id);
          }
        } else {
          setSelected(false);
        }
      });

    return () => {
      subs1.unsubscribe();
      subs2.unsubscribe();
    };
  }, [multipleSelect, dataSource]);

  const addArrows: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    const node = target.closest('li');
    if (!node) return;
    const parent = node.parentElement.closest('li');
    const isAncestorsCollapsed =
      node && parent
        ? parent.firstElementChild.classList.contains('hidden')
        : dataSource.relationship.charAt(0) === '1';
    const newArrChildrenNode = Array.from(node.parentNode.children);
    const isSiblingsCollapsed =
      newArrChildrenNode.length > 1
        ? newArrChildrenNode.some((item) => item.classList.contains('hidden'))
        : dataSource.relationship.charAt(1) === '1';

    setTopEdgeExpanded(!isAncestorsCollapsed);
    setRightEdgeExpanded(!isSiblingsCollapsed);
    setLeftEdgeExpanded(!isSiblingsCollapsed);
    !!dataSource?.children?.length
      ? setBottomEdgeExpanded(!isChildrenCollapsed)
      : setBottomEdgeExpanded(false);
  };

  const removeArrows = () => {
    setTopEdgeExpanded(undefined);
    setRightEdgeExpanded(undefined);
    setBottomEdgeExpanded(undefined);
    setLeftEdgeExpanded(undefined);
  };

  const toggleAncestors = (actionNode: HTMLLIElement) => {
    const parentNode = actionNode.parentElement;
    const node = parentNode.closest('li');
    if (!node) return;
    const isAncestorsCollapsed =
      node.firstElementChild.classList.contains('hidden');
    if (isAncestorsCollapsed) {
      // 向上展开，只展开一级
      actionNode.classList.remove('isAncestorsCollapsed');
      node.firstElementChild.classList.remove('hidden');
    } else {
      // 向下折叠，则折叠所有祖先节点以及祖先节点的兄弟节点
      const isSiblingsCollapsed = Array.from(
        actionNode.parentNode.children,
      ).some((item) => item.classList.contains('hidden'));
      if (!isSiblingsCollapsed) {
        toggleSiblings(actionNode);
      }
      actionNode.classList.add(
        ...(
          'isAncestorsCollapsed' +
          (isSiblingsCollapsed ? '' : ' isSiblingsCollapsed')
        ).split(' '),
      );
      node.firstElementChild.classList.add('hidden');
      // 如果还有展开的祖先节点，那继续折叠关闭之
      if (
        parentNode.closest('li') &&
        !parentNode
          .closest('li')
          ?.firstElementChild.classList.contains('hidden')
      ) {
        toggleAncestors(node);
      }
    }
  };

  const topEdgeClickHandler: React.MouseEventHandler<HTMLElement> = (e) => {
    const node = e.target as HTMLElement;
    e.stopPropagation();
    setTopEdgeExpanded(!topEdgeExpanded);
    toggleAncestors(node.closest('li'));
    onClickEdge?.('top', topEdgeExpanded);
  };

  const bottomEdgeClickHandler = (e) => {
    e.stopPropagation();
    !!dataSource?.children?.length
      ? setIsChildrenCollapsed(!isChildrenCollapsed)
      : setIsChildrenCollapsed(false);
    setBottomEdgeExpanded(!bottomEdgeExpanded);
    !dataSource?.children?.length &&
      onClickEdge?.('bottom', !bottomEdgeExpanded);
  };

  const toggleSiblings = (actionNode: HTMLLIElement) => {
    let node = actionNode.previousElementSibling;
    const isSiblingsCollapsed = Array.from(actionNode.parentNode.children).some(
      (item) => item.classList.contains('hidden'),
    );

    actionNode.classList.toggle('isSiblingsCollapsed', !isSiblingsCollapsed);
    // 先处理同级的兄弟节点
    while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove('hidden');
      } else {
        node.classList.add('hidden');
      }
      node = node.previousElementSibling;
    }
    node = actionNode.nextElementSibling;
    while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove('hidden');
      } else {
        node.classList.add('hidden');
      }
      node = node.nextElementSibling;
    }
    // 在展开兄弟节点的同时，还要展开父节点
    const isAncestorsCollapsed = actionNode.parentElement
      .closest('li')
      ?.firstElementChild.classList.contains('hidden');
    if (isAncestorsCollapsed) {
      toggleAncestors(actionNode);
    }
  };

  const siblingsEdgeClickHandler: React.MouseEventHandler<HTMLElement> = (
    e,
  ) => {
    const node = e.target as HTMLElement;
    e.stopPropagation();
    setLeftEdgeExpanded(!leftEdgeExpanded);
    setRightEdgeExpanded(!rightEdgeExpanded);
    toggleSiblings(node.closest('li'));
  };

  const filterAllowedDropNodes = (id: string) => {
    dragNodeService.sendDragInfo(id);
  };

  const clickNodeHandler = () => {
    if (onClickNode) {
      onClickNode(dataSource);
    }

    selectNodeService.sendSelectedNodeInfo(dataSource.id);
  };

  const dragstartHandler: React.DragEventHandler<HTMLDivElement> = (event) => {
    const copyDS = { ...dataSource };
    delete copyDS.relationship;
    event.dataTransfer.setData('text/plain', JSON.stringify(copyDS));
    // highlight all potential drop targets
    filterAllowedDropNodes(node.current.id);
  };

  const dragoverHandler: React.DragEventHandler<HTMLDivElement> = (event) => {
    // prevent default to allow drop
    event.preventDefault();
  };

  const dragendHandler: React.DragEventHandler<HTMLDivElement> = () => {
    // reset background of all potential drop targets
    dragNodeService.clearDragInfo();
  };

  const dropHandler: React.DragEventHandler<HTMLDivElement> = (event) => {
    if (!event.currentTarget.classList.contains('allowedDrop')) {
      return;
    }
    dragNodeService.clearDragInfo();
    changeHierarchy(
      JSON.parse(event.dataTransfer.getData('text/plain')),
      event.currentTarget.id,
    );
  };

  return (
    <li className="relative inline-block oc-hierarchy">
      <div
        ref={node}
        id={dataSource?.id?.toString()}
        className={nodeClasses}
        draggable={draggable ? 'true' : undefined}
        onClick={clickNodeHandler}
        onDragStart={dragstartHandler}
        onDragOver={dragoverHandler}
        onDragEnd={dragendHandler}
        onDrop={dropHandler}
        onMouseEnter={addArrows}
        onMouseLeave={removeArrows}
      >
        {NodeTemplateCustom ? (
          <NodeTemplateCustom nodeData={dataSource} />
        ) : (
          <NodeTemplate
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            employeeListRender={employeeListRender}
            nodeTitle={nodeTitle}
            nodeContent={nodeContent}
            nodeHasNew={nodeHasNew}
            nodeHasUpdate={nodeHasUpdate}
            nodeHasDelete={nodeHasDelete}
            level={level}
            dataSource={dataSource}
          />
        )}
        {collapsible &&
          dataSource.relationship &&
          dataSource.relationship.charAt(0) === '1' && (
            <i
              className={`oc-edge verticalEdge topEdge oci ${
                topEdgeExpanded === undefined
                  ? ''
                  : topEdgeExpanded
                  ? 'oci-chevron-down'
                  : 'oci-chevron-up'
              }`}
              onClick={topEdgeClickHandler}
            />
          )}
        {collapsible &&
          dataSource.relationship &&
          dataSource.relationship.charAt(1) === '1' && (
            <>
              <i
                className={`oc-edge horizontalEdge rightEdge oci ${
                  rightEdgeExpanded === undefined
                    ? ''
                    : rightEdgeExpanded
                    ? 'oci-chevron-left'
                    : 'oci-chevron-right'
                }`}
                onClick={siblingsEdgeClickHandler}
              />
              <i
                className={`oc-edge horizontalEdge leftEdge oci ${
                  leftEdgeExpanded === undefined
                    ? ''
                    : leftEdgeExpanded
                    ? 'oci-chevron-right'
                    : 'oci-chevron-left'
                }`}
                onClick={siblingsEdgeClickHandler}
              />
            </>
          )}
        {collapsible &&
          dataSource.relationship &&
          dataSource.relationship.charAt(2) === '1' && (
            <i
              className={`oc-edge verticalEdge bottomEdge oci ${
                bottomEdgeExpanded === undefined
                  ? ''
                  : bottomEdgeExpanded
                  ? 'oci-chevron-up'
                  : 'oci-chevron-down'
              }`}
              onClick={bottomEdgeClickHandler}
            />
          )}
      </div>
      {dataSource.children && dataSource.children.length > 0 && (
        <ul
          className={
            isChildrenCollapsed
              ? 'hidden'
              : 'pl-0 text-center flex m-0 transition-opacity'
          }
        >
          {dataSource.children.map((node) => (
            <ChartNode
              dataSource={node}
              NodeTemplateCustom={NodeTemplateCustom}
              key={node.id}
              level={level + 1}
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
          ))}
        </ul>
      )}
    </li>
  );
};

export default ChartNode;
