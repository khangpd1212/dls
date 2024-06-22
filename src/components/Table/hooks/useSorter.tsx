import { useCallback, useMemo, useState } from 'react';
import { ColumnType, ColumnsType, SortOrder, TableProps } from '../interface';
import { customTwMerge } from 'tailwind-merge.config';
import { ChevronDownOutlined, ChevronUpOutlined } from 'icons';
import { AnyObject } from 'common/interfaces';
import { Tooltip } from 'lib';
const useSorter = <RecordType extends AnyObject = AnyObject>(
  props: TableProps<RecordType>,
) => {
  const { onChange } = props;
  const [stateOrder, setStateOrder] = useState('');
  const [internalDataIndex, setInternalDataIndex] = useState('');

  const handleSorting = useCallback(
    <RecordType,>(column: ColumnType<RecordType>, sortOrder: SortOrder) => {
      if (sortOrder !== stateOrder || internalDataIndex !== column.dataIndex) {
        setStateOrder(sortOrder);
        setInternalDataIndex(column.dataIndex);
        onChange?.({
          column: {
            title: column.title,
            dataIndex: column.dataIndex,
            sorter: column.sorter,
          },
          order: sortOrder,
          field: column.dataIndex,
        });
      }
    },
    [stateOrder, internalDataIndex],
  );

  const sorterClasses = useMemo(
    () => (dataIndex: string, sortOrder: SortOrder) =>
      customTwMerge(
        'w-2.5 h-2.5 text-gray-400 transition-colors hover:text-gray-900',
        dataIndex === internalDataIndex &&
          sortOrder === stateOrder &&
          'text-blue-700 hover:text-blue-700',
      ),
    [internalDataIndex, stateOrder],
  );

  const renderTitleTooltip = (state: 'ascend' | 'descend' | string) => {
    switch (state) {
      case 'ascend':
        return 'Nhấn để sắp xếp giảm dần';
      case 'descend':
        return 'Nhấn để hủy bỏ sắp xếp';
      default:
        return 'Nhấn để sắp xếp tăng dần';
    }
  };

  const nextSortDirection = (sortDirections, current) => {
    if (!current) {
      return sortDirections[0];
    }
    return sortDirections[sortDirections.indexOf(current) + 1];
  };

  const defaultSorter = ['ascend', 'descend', undefined];

  const injectSorter = (
    columns: ColumnsType<RecordType>,
  ): ColumnsType<RecordType> => {
    return (columns || []).map((column) => {
      let newColumn: ColumnsType<RecordType>[number] = column;
      let sorter: React.ReactNode;
      if (newColumn.sorter) {
        if (column.defaultSortOrder) {
          setStateOrder(column.defaultSortOrder);
          setInternalDataIndex(column.dataIndex);
        }
        const upNode = (
          <span
            className={sorterClasses(column.dataIndex, 'ascend')}
            onClick={() => handleSorting(column, 'ascend')}
          >
            <ChevronUpOutlined className="stroke-2" />
          </span>
        );
        const downNode = (
          <span
            className={sorterClasses(column.dataIndex, 'descend')}
            onClick={() => handleSorting(column, 'descend')}
          >
            <ChevronDownOutlined className="stroke-2" />
          </span>
        );
        sorter = (
          <span className="flex flex-col cursor-pointer" aria-hidden="true">
            {upNode}
            {downNode}
          </span>
        );

        newColumn = {
          ...newColumn,
          title: (
            <Tooltip
              placement="top"
              title={renderTitleTooltip(
                column?.dataIndex === internalDataIndex
                  ? stateOrder
                  : undefined,
              )}
            >
              <div className="flex items-center justify-between">
                <span className="relative flex-1 font-semibold">
                  {column.title}
                </span>
                {sorter}
              </div>
            </Tooltip>
          ),
          onHeaderCell: (col: any) => {
            const cell: React.HTMLAttributes<HTMLElement> =
              (column.onHeaderCell && column.onHeaderCell(col)) || {};
            cell.onClick = (event: React.MouseEvent<HTMLElement>) => {
              handleSorting(
                col,
                nextSortDirection(
                  defaultSorter,
                  col?.dataIndex === internalDataIndex ? stateOrder : undefined,
                ),
              );
            };

            return cell;
          },
        };
      }

      if ('children' in newColumn) {
        newColumn = {
          ...newColumn,
          children: injectSorter(newColumn.children),
        };
      }
      return newColumn;
    });
  };

  return injectSorter;
};
export default useSorter;
