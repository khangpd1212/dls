import { itemStyles } from 'common/const/formStyle';
import { DivProps } from 'common/interfaces';
import { FormItemContext } from 'components/Form/FormItem';
import { useTera } from 'components/TeraProvider';
import React, {
  ReactElement,
  cloneElement,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';
export interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'ref' | 'prefix'
  > {
  prefix?: ReactElement;
  suffix?: ReactElement;
  focused?: boolean;
  prefixProps?: {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
  };
  suffixProps?: {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
  };
  containerProps?: DivProps;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formItemContext = useContext(FormItemContext);
  const {
    className,
    id,
    prefix,
    suffix,
    prefixProps,
    suffixProps,
    containerProps,
    focused,
    ...restProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const { is_verify } = useTera();

  useEffect(() => {
    setIsFocused(focused);
  }, [focused]);

  if (!is_verify) return null;

  const inputStyles =
    'border border-gray-200 rounded-xsm px-3 py-2 text-xxs placeholder:text-gray-400 focus-visible:outline-none w-full transition-all outline-none leading-[18px]';

  const focusClasses = isFocused && 'ring border-blue-700 ring-blue-300';
  const customClasses = customTwMerge(
    inputStyles,
    itemStyles.disabled,
    formItemContext?.isError
      ? itemStyles.error
      : focusClasses || itemStyles.primary,
    suffix && 'pr-9',
    prefix && 'pl-9',
    className,
  );

  const baseInput = (
    <input
      // style={{ lineHeight: '18px' }}
      ref={ref}
      autoComplete="confirm-password"
      id={id || formItemContext?.name}
      className={customClasses}
      {...restProps}
    />
  );

  const customInput = (
    <div className="relative" ref={containerRef} {...containerProps}>
      {prefix && (
        <div
          className={customTwMerge(
            'absolute inset-y-0 left-0 flex items-center pl-4',
            prefixProps?.className,
          )}
          onClick={prefixProps?.onClick}
        >
          {cloneElement(prefix, {
            className: customTwMerge('w-4 h-4'),
            ...prefix.props,
          })}
        </div>
      )}
      {baseInput}
      {suffix && (
        <div
          className={customTwMerge(
            'absolute inset-y-0 right-0 flex items-center pr-4',
            suffixProps?.className,
          )}
          onClick={suffixProps?.onClick}
        >
          {cloneElement(suffix, {
            className: customTwMerge('w-4 h-4'),
            ...suffix.props,
          })}
        </div>
      )}
    </div>
  );

  return <>{prefix || suffix ? customInput : baseInput}</>;
});

export { default as InputNumber } from './InputNumber';
export type { InputNumberProps } from './InputNumber';
export { default as InputPassword } from './InputPassword';
export type { InputPasswordProps, VisibilityToggle } from './InputPassword';
export { default as Search } from './Search';
export type { SearchProps } from './Search';
export default Input;
