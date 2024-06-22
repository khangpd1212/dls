import { useTera } from 'lib';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { ForwardRefRenderFunction, createContext, forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import Checkbox from './Checkbox';
import {
  CheckboxGroupContext,
  CheckboxGroupProps,
  CheckboxValueType,
} from './interface';

export const GroupContext = createContext<CheckboxGroupContext | null>(null);

const InternalCheckboxGroup: ForwardRefRenderFunction<
  HTMLDivElement,
  CheckboxGroupProps
> = (
  {
    defaultValue,
    children,
    options = [],
    className,
    inline,
    disabled,
    styles,
    onChange,
    checkboxClassName,
    containerClassName,
    labelClassName,
    ...restProps
  },
  ref,
) => {
  const [value, setValue] = useMergedState<CheckboxValueType[]>([], {
    defaultValue: defaultValue,
    onChange: onChange,
    value: restProps.value,
  });

  const defaultClasses = 'flex gap-1.5';
  const customClasses = customTwMerge(
    defaultClasses,
    className,
    inline ? 'flex-row' : 'flex-col',
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  const getOptions = () =>
    options.map((option) => {
      if (typeof option === 'string' || typeof option === 'number') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueCheckbox = e.target.value;
    if (e.target.checked) {
      setValue([...value, valueCheckbox]);
    } else {
      setValue(value.filter((item) => item != valueCheckbox));
    }
  };
  if (options && options.length > 0) {
    children = getOptions().map((option) => (
      <Checkbox
        key={option.value.toString()}
        disabled={'disabled' in option ? option.disabled : disabled}
        defaultChecked={value.includes(option.value)}
        onChange={handleChangeCheckbox}
        containerClassName={containerClassName}
        className={checkboxClassName}
        labelClassName={labelClassName}
        {...option}
      >
        {option.label}
      </Checkbox>
    ));
  }
  const context = {
    defaultValue,
    value,
    disabled,
    setValue,
    // onChange,
  };

  return (
    <div className={customClasses} ref={ref} style={styles}>
      <GroupContext.Provider value={context}>{children}</GroupContext.Provider>
    </div>
  );
};
const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  InternalCheckboxGroup,
);
export default CheckboxGroup;
