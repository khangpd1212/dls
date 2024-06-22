import { AnyObject } from 'common/interfaces';
import Checkbox from 'components/Checkbox/Checkbox';
import { ChevronDownOutlined, Dropdown, Radio } from 'lib';
import { findIndex, isEqual, uniqWith } from 'lodash';
import { GetRowKey } from 'rc-table/lib/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { Key, useCallback, useEffect, useMemo, useRef } from 'react';
import { updateToggleValueInArr } from 'utils/function';
import { ColumnsType, SelectionItem, TableRowSelection } from '../interface';
import useLazyKVMap from './useLazyKVMap';

interface UseSelectionConfig<RecordType extends AnyObject = AnyObject> {
  data: RecordType[];
  getRowKey?: GetRowKey<RecordType>;
  childrenColumnName?: string;
}

export const SELECTION_COLUMN = {} as const;
export const SELECTION_ALL = 'SELECT_ALL' as const;
export const SELECTION_INVERT = 'SELECT_INVERT' as const;
export const SELECTION_NONE = 'SELECT_NONE' as const;

export type INTERNAL_SELECTION_ITEM = SelectionItem;

const useSelection = <RecordType extends AnyObject = AnyObject>(
  config: UseSelectionConfig,
  rowSelection?: TableRowSelection<RecordType>,
) => {
  const {
    defaultSelectedRowKeys,
    getCheckboxProps,
    onChange,
    selections,
    selectedRowKeys,
    preserveSelectedRowKeys = true,
    type = 'checkbox',
  } = rowSelection || {};

  const { data: dataDisplay, getRowKey, childrenColumnName } = config || {};

  const [getRecordByKey] = useLazyKVMap(
    dataDisplay,
    childrenColumnName,
    getRowKey,
  );

  const preserveRecordsRef = useRef(new Map<Key, RecordType>());

  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState<Key[]>(
    selectedRowKeys || defaultSelectedRowKeys || [],
    {
      value: selectedRowKeys,
    },
  );
  const updatePreserveRecordsCache = useCallback(
    (keys: Key[]) => {
      if (!keys) return;
      if (preserveSelectedRowKeys) {
        const newCache = new Map<Key, RecordType>();
        keys.forEach((key) => {
          let record = getRecordByKey(key);

          if (!record && preserveRecordsRef.current.has(key)) {
            record = preserveRecordsRef.current.get(key)!;
          }

          newCache.set(key, record);
        });
        // Refresh to new cache
        preserveRecordsRef.current = newCache;
      }
    },
    [getRecordByKey, preserveSelectedRowKeys],
  );

  const setSelectedKeys = useCallback(
    (keys: Key[]) => {
      let availableKeys: Key[];
      let records: RecordType[];

      updatePreserveRecordsCache(keys);

      if (preserveSelectedRowKeys) {
        availableKeys = keys;
        records = keys.map((key) => preserveRecordsRef.current.get(key)!);
      } else {
        // Đang lỗi
        // Filter key which not exist in the `dataSource`
        // availableKeys = [];
        // records = [];
        // keys.forEach((key) => {
        //   const record = getRecordByKey(key);
        //   if (record !== undefined) {
        //     availableKeys.push(key);
        //     records.push(record);
        //   }
        // });
      }

      setMergedSelectedKeys(availableKeys);

      onChange?.(availableKeys, records);
    },
    [
      setMergedSelectedKeys,
      onChange,
      preserveSelectedRowKeys,
      updatePreserveRecordsCache,
    ],
  );

  useEffect(() => {
    updatePreserveRecordsCache(mergedSelectedKeys);
  }, [mergedSelectedKeys]);

  const recordKeys = dataDisplay.map(getRowKey);
  const checkedCurrentAll = recordKeys.every((key) =>
    mergedSelectedKeys?.includes(key),
  );

  const checkedCurrentSome = recordKeys.some((key) =>
    mergedSelectedKeys?.includes(key),
  );

  // Reset if rowSelection reset
  useEffect(() => {
    if (!rowSelection) {
      setMergedSelectedKeys([]);
    }
  }, [!!rowSelection]);

  const onCheckAllChange = () => {
    if (checkedCurrentAll) {
      const uncheckAllKeysDisplay = mergedSelectedKeys.filter(
        (key) => !recordKeys.includes(key),
      );
      setSelectedKeys(uncheckAllKeysDisplay);
    } else {
      const checkAllKeysDisplay = uniqWith(
        [...mergedSelectedKeys, ...recordKeys],
        isEqual,
      );
      setSelectedKeys(checkAllKeysDisplay);
    }
  };

  const triggerSingleSelection = useCallback(
    (record: RecordType, e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const indexItem = findIndex(
        mergedSelectedKeys,
        (key) => key === getRowKey(record),
      );
      if (type === 'checkbox') {
        const checkedToggleKeys = updateToggleValueInArr(
          indexItem,
          getRowKey(record),
          mergedSelectedKeys,
        );
        setSelectedKeys(checkedToggleKeys);
      } else {
        setSelectedKeys([getRowKey(record)]);
      }
    },
    [mergedSelectedKeys, getRowKey, setSelectedKeys],
  );

  const dropdownSelection = (
    <Dropdown
      menu={{
        items: selections?.map((item, index) => ({
          key: item.key ?? index,
          label: item.text,
          onClick: () => item.onSelect(recordKeys),
        })),
      }}
    >
      <span className="absolute top-0 z-10 w-4 h-4 text-gray-400 cursor-pointer ms-3">
        <ChevronDownOutlined className="stroke-2" />
      </span>
    </Dropdown>
  );
  const injectRowSelection = useMemo(
    () =>
      (columns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
        if (rowSelection) {
          (columns || []).splice(0, 0, {
            title: type === 'checkbox' && (
              <div className="relative">
                <Checkbox
                  checked={!!dataDisplay.length && checkedCurrentAll}
                  indeterminate={!checkedCurrentAll && checkedCurrentSome}
                  containerClassName="justify-center"
                  onChange={onCheckAllChange}
                />
                {rowSelection.selections && dropdownSelection}
              </div>
            ),
            render: (_, record: RecordType) => {
              return (
                <>
                  {type === 'checkbox' ? (
                    <Checkbox
                      checked={mergedSelectedKeys.includes(getRowKey(record))}
                      containerClassName="justify-center"
                      onChange={(e) => {
                        triggerSingleSelection(record, e);
                      }}
                      {...getCheckboxProps?.(record)}
                    />
                  ) : (
                    <Radio
                      checked={mergedSelectedKeys.includes(getRowKey(record))}
                      onChange={(e) => {
                        triggerSingleSelection(record, e);
                      }}
                    />
                  )}
                </>
              );
            },
            fixed: 'left',
            width: 30,
            align: 'center',
          });
          return columns;
        } else {
          return columns;
        }
      },
    [mergedSelectedKeys, rowSelection, dataDisplay],
  );

  return injectRowSelection;
};
export default useSelection;
