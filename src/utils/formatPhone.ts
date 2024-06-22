export const formatPhone = (phone: string | number): string => {
  if (!phone) return '';

  const phoneStr: string = `${phone}`.replace(/\s+/g, '').replace(/\./g, '');

  const pre = phoneStr.slice(0, 3);
  const middle = phoneStr.slice(3, 7);
  const last = phoneStr.slice(7, phoneStr.length);

  return `(${pre}) ${middle} ${last}`;
};
