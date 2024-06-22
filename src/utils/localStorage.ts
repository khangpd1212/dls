import { isEmpty } from 'lodash';

export const setLocalStorage = (key: string, data: any): void => {
  try {
    if (isEmpty(data)) return;

    const encryptData = btoa(JSON.stringify(data));

    window.localStorage.setItem(key, encryptData);
  } catch (error) {
    console.error(error);
  }
};

export const getLocalStorage = (key: string): any => {
  try {
    const stringValue = window.localStorage.getItem(key);
    if (stringValue) return JSON.parse(atob(stringValue));
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const clearLocalStorage = (): void => {
  try {
    window.localStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export const setSessionStorage = (key: string, data: any): void => {
  if (isEmpty(data)) return;
  const encryptData = btoa(JSON.stringify(data));

  sessionStorage.setItem(key, encryptData);
};

export const getSessionStorage = (key: string): any => {
  try {
    const stringValue = sessionStorage.getItem(key);
    if (stringValue) return JSON.parse(atob(stringValue));
    return null;
  } catch (error) {
    console.error(error);
  }
};
