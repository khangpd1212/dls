import { useTera } from 'components/TeraProvider';
import SpinOutlined from 'icons/SpinOutlined';
import React, {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  forwardRef,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export interface ButtonProps {
  className?: string;
  type?: ButtonType;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  prefix?: ReactNode;
  children?: ReactNode;
  outlined?: boolean;
  shape?: 'circle' | 'round';
}

export type ButtonType =
  | 'primary'
  | 'danger'
  | 'warning'
  | 'light'
  | 'success'
  | 'dark'
  | 'alternative';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    type = 'primary',
    htmlType,
    onClick,
    loading,
    disabled,
    icon,
    prefix,
    children,
    outlined,
    shape,
    ...restProps
  } = props;

  const { is_verify } = useTera();
  if (!is_verify) return null;

  const justIconStyles = 'p-2.5';
  const defaultStyles =
    'flex items-center gap-1 focus:ring font-medium text-sm focus:outline-none transition-all duration-100 disabled:bg-gray-300 disabled:text-white disabled:border-none';

  const btnStyles = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300',
    warning:
      'bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-300',
    danger: `bg-red-700 text-white hover:bg-red-900 focus:ring-red-300`,
    success: 'bg-green-700 text-white hover:bg-green-800 focus:ring-green-300',
    light:
      'bg-white text-black hover:bg-gray-200 border border-gray-200 focus:ring-gray-200',
    dark: 'bg-gray-800 hover:bg-gray-900 focus:ring-gray-300',
    alternative:
      'border border-gray-200 text-black hover:bg-gray-200 hover:text-blue-700 focus:ring-gray-200',
  };

  const btnOutlinedStyles = {
    primary:
      'text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-blue-300',
    warning:
      'text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-white focus:ring-yellow-300',
    danger:
      'text-red-800 border border-red-800 hover:bg-red-800 hover:text-white focus:ring-red-300',
    success:
      'text-green-800 border border-green-800 hover:bg-green-800 hover:text-white focus:ring-green-300',
    dark: 'text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-300',
  };

  const customClasses = customTwMerge(
    outlined ? btnOutlinedStyles[type] : btnStyles[type],
    defaultStyles,
    loading && 'transition-opacity opacity-50 pointer-events-none select-none',
    !children ? justIconStyles : 'px-3 py-2 leading-4 justify-center',
    shape === 'circle' ? 'rounded-full' : 'rounded',
    className,
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type={htmlType}
      className={customClasses}
      onClick={handleClick}
      disabled={disabled}
      {...restProps}
    >
      {loading ? (
        <>
          <SpinOutlined className="w-4 h-4 text-gray-300 animate-spin dark:text-gray-600 fill-blue-600" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {prefix && <i className="w-5 h-5">{prefix}</i>}
          {children}
          {icon && <i className="w-5 h-5">{icon}</i>}
        </>
      )}
    </button>
  );
});

export default Button;
