import { PickerProps } from 'rc-picker';

type AllowClear = PickerProps['allowClear'];
type ClearIcon = PickerProps['clearIcon'];

export function mergeAllowClear(
  allowClear: AllowClear,
  clearIcon: ClearIcon,
  defaultClearIcon: NonNullable<ClearIcon>,
) {
  if (allowClear === false) {
    return false;
  }

  const defaults = { clearIcon: clearIcon ?? defaultClearIcon };
  return typeof allowClear === 'object'
    ? { ...defaults, ...allowClear }
    : defaults;
}
