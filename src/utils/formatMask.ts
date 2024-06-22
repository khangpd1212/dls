export const maskString = (
  input: string | number,
  numberOfStart = 3,
  numberOfEnd = 4,
): string => {
  if (!input) return '';

  const str = `${input}`;

  const symbol = '•';
  const pattern = `(\\d{${numberOfStart}})(\\d+)(\\d{${numberOfEnd}})`;

  return str.replace(
    new RegExp(pattern, 'g'),
    (_match: any, start: any, middle: any, end: any) => {
      return `${start}${symbol.repeat(middle.length)}${end}`;
    },
  );
};
