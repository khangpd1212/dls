import { AnyObject } from 'common/interfaces';
import {
  find,
  flatMapDeep,
  isArray,
  keyBy,
  merge,
  mergeWith,
  pickBy,
  values,
} from 'lodash';

export const removeValueInArr = <T>(indexItem: number, arr: T[]) => {
  const result = [...arr];
  result.splice(indexItem, 1);
  return result;
};

export const updateToggleValueInArr = <T>(
  indexItem: number,
  selectedItem: T,
  arr: T[],
) => {
  let result = [...arr];
  if (indexItem !== -1) {
    result = removeValueInArr(indexItem, result);
  } else {
    result = [...arr, selectedItem];
  }
  return result;
};

export function removeKeyFromObject(
  originalObject: Record<string, any>,
  keyToRemove: string,
): Record<string, any> {
  const updatedObject = { ...originalObject };

  if (Object.prototype.hasOwnProperty.call(updatedObject, keyToRemove)) {
    delete updatedObject[keyToRemove];
  }

  return updatedObject;
}

export const getFieldObjToArr = (arr: any[], field: string) => {
  if (!isArray(arr)) return arr;
  const newArr = arr.map((item) => item?.[field]);
  return newArr;
};

export const filterField = (params) => {
  const newParams = pickBy(params);
  return newParams;
};

export const mergeField = (...params) => {
  const newObj = merge({}, ...params);
  return newObj;
};

export const generateNumberDigit = (value: number | string) => {
  return value.toString().padStart(5, '0');
};

export const mergeArrayObjectByKey = (
  originalArray: Array<{ [key: string]: any }> = [],
  newArray: Array<{ [key: string]: any }> = [],
  key: string,
) => {
  const mergedObject = merge(keyBy(originalArray, key), keyBy(newArray, key));
  return values(mergedObject);
};

export const mergeArrayObjectByKeyDependOnNewArray = (
  originalArray: Array<{ [key: string]: any }> = [],
  newArray: Array<{ [key: string]: any }> = [],
  key: string,
) => {
  const mergedObject = mergeWith(
    keyBy(newArray, key),
    keyBy(originalArray, key),
    (originalValue, newValue) => {
      if (!!originalValue?.dataIndex && !!newValue?.dataIndex) {
        return { ...newValue, ...originalValue };
      }
      if (!!originalValue?.dataIndex && !newValue?.dataIndex)
        return originalValue;

      return null;
    },
  );
  return values(mergedObject).filter((item) => item != null);
};

export const convertArrToString = (arr: string[], separate = ' - ') => {
  return arr
    .filter((item) => Boolean(typeof item === 'string' && !!item))
    .join(separate);
};

export const findObjectInNestedArray = <
  RecordType extends AnyObject,
  V = string,
>(
  arr: RecordType[],
  value: V,
  keyChildren = 'children',
): RecordType => {
  const foundObject = find(arr, { value });
  if (!foundObject) {
    for (const item of arr) {
      if (item[keyChildren] && item[keyChildren].length > 0) {
        const foundInNested = findObjectInNestedArray(item[keyChildren], value);
        if (foundInNested) {
          return foundInNested;
        }
      }
    }
  }
  return (foundObject || {}) as RecordType;
};

export const getChildrenInNestedArray = <T extends AnyObject>(
  object: T,
  keyChildren = 'children',
) => {
  const cloneObject = { ...object };
  if (!cloneObject[keyChildren] || !cloneObject[keyChildren].length) {
    return cloneObject;
  }
  return [
    cloneObject,
    flatMapDeep(cloneObject[keyChildren], (option) =>
      getChildrenInNestedArray(option),
    ),
  ];
};
0;
export const removeDiacritics = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
