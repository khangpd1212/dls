import { Empty, Spin, SpinProps, useTera } from 'lib';
import { isString } from 'lodash';
import { EXPAND_COLUMN, default as RcTable } from 'rc-table';
import 'rc-table/assets/index.css';

import { AnyObject } from 'common/interfaces';
import { ExpandableConfig, GetRowKey } from 'rc-table/lib/interface';
import { useEffect, useMemo, useState } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import renderExpandIcon from './ExpandIcon';
import useHiddenColumns from './hooks/useHiddenColumns';
import useSelection, {
  SELECTION_ALL,
  SELECTION_COLUMN,
  SELECTION_INVERT,
  SELECTION_NONE,
} from './hooks/useSelection';
import useSorter from './hooks/useSorter';
import { ColumnsType, RefInternalTable, TableProps } from './interface';
const Table = <RecordType extends AnyObject = AnyObject>(
  props: TableProps<RecordType>,
) => {
  const {
    columns,
    data = [],
    scroll,
    rowSelection,
    rowKey = 'id',
    hiddenColumns,
    loading = false,
    expandable,
    rowClassName,
    className,
    zebra = true,
    ...restProps
  } = props;

  const customRowClassName = (record, index, indent) => {
    let classes = '';
    if (indent > 0) {
      classes = 'tera-table-cell-row-focused';
    }
    if (zebra) {
      classes += ' tera-table-cell-row-zebra';
    }
    if (typeof rowClassName === 'function') {
      classes += ' ' + rowClassName(record, index, indent);
    } else if (isString(rowClassName)) {
      classes += ' ' + rowClassName;
    } else {
      return classes;
    }

    return classes;
  };
  const getRowKey = useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record: RecordType) => record[rowKey];
  }, [rowKey]);

  const mergeExpandable: ExpandableConfig<RecordType> = {
    childrenColumnName: 'children',
    expandIcon: (props) =>
      renderExpandIcon({
        ...props,
        expandable:
          !!props?.record?.[mergeExpandable?.childrenColumnName]?.length,
      }),
    ...expandable,
  };

  const handleHiddenColumns = useHiddenColumns({ hiddenColumns });
  const injectSorter = useSorter(props);
  const injectRowSelection = useSelection(
    {
      data: [...data],
      getRowKey,
      childrenColumnName: mergeExpandable.childrenColumnName,
    },
    rowSelection,
  );

  // const [
  //   expandableConfig,
  //   expandableType,
  //   expandedKeys,
  //   mergedExpandIcon,
  //   mergedChildrenColumnName,
  //   onTriggerExpand,
  // ] = useExpand(props, [...data], getRowKey);
  // const expandInternal = (columns: ColumnsType) => {
  //   const expandColumn = {
  //     title: expandableConfig.columnTitle || '',
  //     fixed: expandableConfig.fixed,
  //     width: expandableConfig.columnWidth || 50,
  //     render: (_, record, index) => {
  //       const rowKey = getRowKey(record, index);
  //       const expanded = expandedKeys.has(rowKey);
  //       const recordExpandable = expandableConfig.rowExpandable
  //         ? expandableConfig.rowExpandable(record)
  //         : true;

  //       const icon = renderExpandIcon({
  //         expanded: expanded,
  //         expandable: recordExpandable,
  //         record,
  //         onExpand: onTriggerExpand,
  //       });

  //       if (expandableConfig.expandRowByClick) {
  //         return <span onClick={(e) => e.stopPropagation()}>{icon}</span>;
  //       }
  //       return icon;
  //     },
  //   };
  //   return columns.map((col) => (col === EXPAND_COLUMN ? expandColumn : col));
  // };

  // const flattenData: { record: RecordType; indent: number; index: number }[] =
  //   useFlattenRecords<RecordType>(
  //     data,
  //     expandableConfig.childrenColumnName,
  //     expandedKeys,
  //     getRowKey,
  //   );

  const [isHasChildData, setHasChildData] = useState(false);

  useEffect(
    () =>
      setHasChildData(
        data.some((item) => item[mergeExpandable.childrenColumnName]?.length),
      ),
    [data],
  );

  const injectExpanded = (columns: ColumnsType) => {
    if (isHasChildData) {
      columns.splice(0, 0, {
        title: '',
        fixed: columns[0].fixed,
        width: 50,
        align: 'center',
      });
      return columns;
    } else {
      return columns;
    }
  };

  const customColumns: ColumnsType = useMemo(
    () =>
      injectExpanded(
        handleHiddenColumns(injectRowSelection(injectSorter(columns))),
      ),

    [injectExpanded, injectRowSelection, injectSorter, handleHiddenColumns],
  );

  // >>>>>>>>> Spinning
  let spinProps: SpinProps | undefined;
  if (typeof loading === 'boolean') {
    spinProps = {
      spinning: loading,
    };
  } else if (typeof loading === 'object') {
    spinProps = {
      spinning: true,
      ...loading,
    };
  }

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <Spin {...spinProps}>
      <RcTable
        scroll={{
          x: '100%',
          y: '100%',
          ...scroll,
        }}
        prefixCls="tera-table"
        columns={customColumns}
        data={data}
        rowKey={rowKey}
        expandable={mergeExpandable}
        rowClassName={customRowClassName}
        emptyText={<Empty classNameImage="w-14 !m-0 !p-0" />}
        className={customTwMerge('overflow-hidden', className)}
        {...restProps}
      />
    </Spin>
  );
};
const ForwardTable = Table as RefInternalTable & {
  SELECTION_COLUMN: typeof SELECTION_COLUMN;
  EXPAND_COLUMN: typeof EXPAND_COLUMN;
  SELECTION_ALL: typeof SELECTION_ALL;
  SELECTION_INVERT: typeof SELECTION_INVERT;
  SELECTION_NONE: typeof SELECTION_NONE;
};
ForwardTable.SELECTION_COLUMN = SELECTION_COLUMN;
ForwardTable.EXPAND_COLUMN = EXPAND_COLUMN;
ForwardTable.SELECTION_ALL = SELECTION_ALL;
ForwardTable.SELECTION_INVERT = SELECTION_INVERT;
ForwardTable.SELECTION_NONE = SELECTION_NONE;

export default ForwardTable;
