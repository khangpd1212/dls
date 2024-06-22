import { useMemo } from 'react';
import { ColumnsType, TableProps } from '../interface';
import { AnyObject } from 'common/interfaces';
interface UseHiddenColumns<RecordType extends AnyObject = AnyObject> {
  hiddenColumns?: TableProps<RecordType>['hiddenColumns'];
}
const useHiddenColumns = <RecordType extends AnyObject = AnyObject>({
  hiddenColumns,
}: UseHiddenColumns) => {
  const handleHiddenColumns = useMemo(
    () =>
      (columns: ColumnsType): ColumnsType<RecordType> => {
        const newColumns = columns.map((column) => {
          if (column.hidden) {
            return;
          }
          if ('children' in column) {
            column = {
              ...column,
              children: handleHiddenColumns(column.children),
            };
          }
          return column;
        });
        if (hiddenColumns) {
          return (newColumns || []).filter((column) => {
            return !hiddenColumns.includes(column?.key ?? column?.dataIndex);
          });
        } else {
          return newColumns;
        }
      },
    [hiddenColumns],
  );

  return handleHiddenColumns;
};
export default useHiddenColumns;
