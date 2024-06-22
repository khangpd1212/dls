import { MagnifyingGlassOutlined } from 'icons';
import React, { ReactNode, forwardRef } from 'react';
import Input, { InputProps } from '.';
import { customTwMerge } from 'tailwind-merge.config';
import { useTera } from 'lib';
export interface SearchProps extends InputProps {
  onSearch?: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  icon?: ReactNode;
  containerClassName?: string;
  iconClassName?: string;
}
const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      placeholder = 'Tìm kiếm theo tên',
      onSearch,
      onChange: customOnChange,
      className,
      containerClassName,
      iconClassName,
      icon = <MagnifyingGlassOutlined />,
      ...restProps
    },
    ref,
  ) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e && e.target && e.type === 'click' && onSearch) {
        onSearch?.(e.target.value, e);
      }
      if (customOnChange) {
        customOnChange?.(e);
      }
    };
    const inputClasses = customTwMerge('pl-9 rounded-xsm', className);
    const containerClasses = customTwMerge('relative', containerClassName);

    const { is_verify } = useTera();
    if (!is_verify) return null;

    return (
      <div className={containerClasses}>
        <div
          className={customTwMerge(
            'absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none',
            iconClassName,
          )}
        >
          <i className="w-5 h-5">{icon}</i>
        </div>
        <Input
          ref={ref}
          className={inputClasses}
          placeholder={placeholder}
          onChange={onChange}
          {...restProps}
        />
      </div>
    );
  },
);
export default Search;
