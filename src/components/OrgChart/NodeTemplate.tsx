import { PencilSquareOutlined, PlusCircleOutlined, TrashOutlined } from 'icons';
import { Tooltip } from 'lib';
import { ReactNode, forwardRef, memo } from 'react';
import { DataSourceType } from '.';

export type NodeTemplateProps = {
  dataSource: DataSourceType;
  nodeHasNew?: string;
  nodeHasUpdate?: string;
  nodeHasDelete?: string;
  nodeTitle?: string;
  nodeContent?: string;
  employeeListRender?: (dataSource: DataSourceType) => ReactNode;
  handleAdd?: (dataSource: DataSourceType, level?: number) => void;
  handleEdit?: (dataSource: DataSourceType, level?: number) => void;
  handleDelete?: (dataSource: DataSourceType, level?: number) => void;
  level?: number;
};
const NodeTemplate = forwardRef<HTMLDivElement, NodeTemplateProps>(
  (
    {
      nodeTitle,
      nodeContent,
      dataSource,
      handleAdd,
      handleEdit,
      handleDelete,
      employeeListRender,
      nodeHasDelete,
      nodeHasNew,
      nodeHasUpdate,
      level,
    },
    ref,
  ) => {
    const hasShowAction =
      dataSource[nodeHasNew] ||
      dataSource[nodeHasDelete] ||
      dataSource[nodeHasUpdate];
    return (
      <div ref={ref} className="flex flex-col shadow-xsm">
        <div className="px-5 text-white bg-blue-500 rounded-md py-3 text-xxs flex flex-col items-center gap-2.5 w-64 h-24">
          {dataSource[nodeTitle] && (
            <Tooltip
              title={dataSource[nodeTitle]}
              placement="top"
              className="max-w-sm break-words"
            >
              <div className="font-semibold truncate w-full">
                {dataSource[nodeTitle]}
              </div>
            </Tooltip>
          )}
          {dataSource[nodeContent] && (
            <div className="font-normal truncate w-full">
              {dataSource[nodeContent]}
            </div>
          )}
          {hasShowAction && (
            <div className="flex items-center gap-5">
              {dataSource[nodeHasNew] && (
                <button
                  className="w-6 h-6"
                  onClick={() => handleAdd(dataSource, level)}
                >
                  <PlusCircleOutlined />
                </button>
              )}
              {dataSource[nodeHasUpdate] && (
                <button
                  className="w-6 h-6"
                  onClick={() => handleEdit(dataSource, level)}
                >
                  <PencilSquareOutlined />
                </button>
              )}
              {dataSource[nodeHasDelete] && (
                <button
                  className="w-6 h-6"
                  onClick={() => handleDelete(dataSource, level)}
                >
                  <TrashOutlined />
                </button>
              )}
            </div>
          )}
        </div>
        {employeeListRender?.(dataSource)}
      </div>
    );
  },
);

export default memo(NodeTemplate);
