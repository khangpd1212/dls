import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useContext,
  useId,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import { GroupContext } from './Group';
import { CheckboxProps } from './interface';
import { useTera } from 'lib';

const InternalCheckbox: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = (
  {
    className,
    children,
    disabled,
    containerClassName,
    labelClassName,
    indeterminate,
    value,
    ...restProps
  },
  ref,
) => {
  const id = useId();
  const checkboxGroup = useContext(GroupContext);
  const mergedDisabled = checkboxGroup?.disabled || disabled;
  const defaultStyles =
    'w-4 h-4 bg-white border-gray-300 rounded hover:ring-blue-600 focus:ring-blue-300 focus:ring disabled:cursor-not-allowed disabled:bg-gray-300 disabled:border-none relative cursor-pointer';
  const customCheckboxClasses = customTwMerge(
    defaultStyles,
    indeterminate && 'z-[1] opacity-0 m-0',
    className,
  );

  const containerClasses = customTwMerge(
    'flex items-center gap-2',
    containerClassName,
  );

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueCheckbox = e.target.value;
    if (e.target.checked) {
      checkboxGroup?.setValue([...checkboxGroup?.value, valueCheckbox]);
    } else {
      checkboxGroup?.setValue(
        checkboxGroup?.value.filter((item) => item != valueCheckbox),
      );
    }
  };

  const { is_verify } = useTera();
  if (!is_verify) return null;
  return (
    <span className={containerClasses}>
      <input
        ref={ref}
        id={`checkbox-${id}`}
        type="checkbox"
        disabled={mergedDisabled}
        className={customCheckboxClasses}
        value={value}
        onChange={handleChangeCheckbox}
        defaultChecked={checkboxGroup?.value.includes(value)}
        {...restProps}
      />
      {indeterminate && (
        <span
          className={customTwMerge(
            indeterminate &&
              'h-4 w-4 border border-gray-300 rounded cursor-pointer absolute bg-blue-600 after:absolute after:top-1/2 after:w-2 after:h-0.5 after:bg-white after:border-0 after:-translate-y-1/2 after:-translate-x-1/2 after:scale-100 after:opacity-100 after:left-1/2',
          )}
        />
      )}
      {children && (
        <label
          htmlFor={`checkbox-${id}`}
          className={customTwMerge(
            'text-sm font-medium text-gray-900 cursor-pointer dark:text-gray-300',
            labelClassName,
          )}
        >
          {children}
        </label>
      )}
    </span>
  );
};

const Checkbox = forwardRef(InternalCheckbox);
if (process.env.NODE_ENV !== 'production') {
  Checkbox.displayName = 'Checkbox';
}

export default Checkbox;
