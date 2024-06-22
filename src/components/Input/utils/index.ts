export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all';
}
export function triggerFocus(
  element?: HTMLInputElement | HTMLTextAreaElement,
  option?: InputFocusOptions,
) {
  if (!element) return;

  element?.focus(option);

  // Selection content
  const { cursor } = option || {};
  if (cursor) {
    const len = element.value.length;

    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0);
        break;

      case 'end':
        element.setSelectionRange(len, len);
        break;

      default:
        element.setSelectionRange(0, len);
    }
  }
}

export function isE(number: string | number) {
  const str = String(number);

  return !Number.isNaN(Number(str)) && str.includes('e');
}

export function getNumberPrecision(number: string | number) {
  const numStr = String(number);

  if (isE(number)) {
    let precision = Number(numStr.slice(numStr.indexOf('e-') + 2));

    const decimalMatch = numStr.match(/\.(\d+)/);
    if (decimalMatch?.[1]) {
      precision += decimalMatch[1].length;
    }
    return precision;
  }

  return numStr.includes('.') && validateNumber(numStr)
    ? numStr.length - numStr.indexOf('.') - 1
    : 0;
}

export function validateNumber(num: string | number) {
  if (typeof num === 'number') {
    return !Number.isNaN(num);
  }

  // Empty
  if (!num) {
    return false;
  }

  return (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(num) ||
    // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(num) ||
    // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(num)
  );
}
export function isEmpty(value: number) {
  return (
    (!value && value !== 0 && !Number.isNaN(value)) || !String(value).trim()
  );
}
