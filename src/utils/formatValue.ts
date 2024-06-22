import numeral from 'numeral';

numeral.localeData().delimiters.thousands = ',';

export function formatNumber(value, format = '0,0.[000]') {
  if (value === null || value === undefined) return '0';
  return numeral(value).format(format);
}

export function formatCurrency(value, symbol = 'đ', format = '0,0') {
  if (value === null || value === undefined) return '0 đ';

  let currencySymbol = 'đ';
  if (symbol) {
    currencySymbol = symbol;
  }

  return `${numeral(value).format(format)} ${currencySymbol}`;
}
