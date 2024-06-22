import { isEmpty, isNil } from 'lodash';
import qs from 'query-string';

export const getQueryParams = (searchValue: string) => {
  let params = {};
  try {
    if (isEmpty(searchValue)) return {};
    const { query } = qs.parse(searchValue);
    if (isEmpty(query)) return {};
    params = JSON.parse(atob(query as string));
    if (isEmpty(params)) return params;
    const result = {};

    Object.keys(params).forEach((key: string) => {
      result[key] = decodeURIComponent(params[key]);
    });

    return result;
  } catch (error) {
    console.error(error);
    return params;
  }
};

export const insertUrlParam = (searchParams: string) => {
  if (window.history.pushState) {
    const newURL =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      window.location.hash +
      searchParams;
    window.history.pushState({ path: newURL }, '', newURL);
  }
};

export const setQueryParams = (
  prevParams: string,
  property: string,
  value: any,
): string => {
  try {
    const params: any = getQueryParams(prevParams);

    if (isEmpty(value)) {
      delete params[property];
    } else {
      if (!params[property]) {
        params[property] = {};
      }
      params[property] = String(value);
    }
    if (isEmpty(params)) return '';

    const result = {};

    Object.keys(params).forEach((key: string) => {
      result[key] = encodeURIComponent(params[key]);
    });

    return `?query=${btoa(JSON.stringify(result))}`;
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const updateQueryParams = (params: any): string => {
  try {
    const searchValue = window.location.search;

    const paramsString: any = getQueryParams(searchValue);

    let queryString = '';

    Object.keys(params).forEach((key: string, index: number) => {
      const value = isNil(params[key]) ? null : `${params[key]}`;
      if (index === 0) {
        queryString = setQueryParams(paramsString, key, value);
      } else {
        queryString = setQueryParams(queryString, key, value);
      }
    });

    return queryString;
  } catch (error) {
    console.error(error);
  }
};

export const parserParamsArray = (param) => {
  if (typeof param === 'object' && param !== null) {
    const convertedObj = {};

    for (const key in param) {
      if (Array.isArray(param[key])) {
        convertedObj[key] = param[key].join(',');
      } else {
        convertedObj[key] = param[key];
      }
    }

    return convertedObj;
  }
  return param;
};
