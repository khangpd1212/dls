import { GetRowKey } from 'rc-table/lib/interface';
import * as React from 'react';

interface MapCache<RecordType> {
  data?: readonly RecordType[];
  childrenColumnName?: string;
  kvMap?: Map<React.Key, RecordType>;
  getRowKey?: GetRowKey<RecordType>;
}

export default function useLazyKVMap<RecordType>(
  data: readonly RecordType[],
  childrenColumnName: string,
  getRowKey: GetRowKey<RecordType>,
) {
  const mapCacheRef = React.useRef<MapCache<RecordType>>({});

  function getRecordByKey(key: React.Key): RecordType {
    if (
      !mapCacheRef.current ||
      mapCacheRef.current.data !== data ||
      mapCacheRef.current.childrenColumnName !== childrenColumnName ||
      mapCacheRef.current.getRowKey !== getRowKey
    ) {
      const kvMap = new Map<React.Key, RecordType>();

      function dig(records: readonly RecordType[]) {
        records.forEach((record, index) => {
          const rowKey = getRowKey(record, index);
          kvMap.set(rowKey, record);

          if (
            record &&
            typeof record === 'object' &&
            childrenColumnName in record
          ) {
            dig((record as any)[childrenColumnName] || []);
          }
        });
      }

      dig(data);

      mapCacheRef.current = {
        data,
        childrenColumnName,
        kvMap,
        getRowKey,
      };
    }

    return mapCacheRef.current.kvMap!.get(key)!;
  }

  return [getRecordByKey];
}
