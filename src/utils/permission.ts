import { getLocalStorage } from './localStorage';

export const PERMISSION_KEY = 'permissions';

export const checkPermission = (key: string): boolean => {
  try {
    if (!key) return false;
    const permissions: any[] = getLocalStorage(PERMISSION_KEY);

    if (permissions && permissions?.length > 0)
      return permissions?.includes(key);

    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
