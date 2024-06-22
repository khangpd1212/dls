export interface CheckboxProps {
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  defaultChecked?: boolean;
  style?: React.CSSProperties;
  title?: string;
  checked?: boolean;
  value?: any;
  indeterminate?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type CheckboxValueType = string | number | boolean;
export interface CheckboxOptionType {
  label: React.ReactNode;
  value: CheckboxValueType;
  style?: React.CSSProperties;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
  title?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxGroupProps {
  defaultValue?: CheckboxValueType[];
  disabled?: boolean;
  className?: string;
  inline?: boolean;
  children?: React.ReactNode;
  onChange?: (checkedValue: Array<CheckboxValueType>) => void;
  options?: Array<CheckboxOptionType | string | number>;
  styles?: React.CSSProperties;
  value?: CheckboxValueType[];
  containerClassName?: string;
  checkboxClassName?: string;
  labelClassName?: string;
}

export interface CheckboxGroupContext {
  name?: string;
  value?: CheckboxValueType[];
  disabled?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<CheckboxValueType[]>>;
}
