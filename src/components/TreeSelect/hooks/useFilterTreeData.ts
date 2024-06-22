import { useMemo } from 'react';
import { OptionProps } from '../Option';
import { removeDiacritics } from 'utils';
import { filter, isArray } from 'lodash';

export default (
  treeData: OptionProps[],
  searchValue: string | string[],
  fieldNames = 'label',
) => {
  return useMemo(() => {
    if (!searchValue) {
      return treeData;
    }

    function filterArrBySearch(
      list: OptionProps[],
      searchValue: string | string[],
    ): OptionProps[] {
      return filter(list, (item) => {
        const lowerStr = item[fieldNames].toLowerCase();
        const compareString = isArray(searchValue)
          ? searchValue === item[fieldNames]
          : removeDiacritics(lowerStr).includes(
              removeDiacritics(searchValue.toLowerCase()),
            );
        if (compareString) {
          return true;
        }
        if (item.children) {
          const filteredChildren = filterArrBySearch(
            item.children,
            searchValue,
          );
          return filteredChildren.length > 0;
        }
        return false;
      });
    }
    return filterArrBySearch(treeData, searchValue);
  }, [treeData, searchValue]);
};
