import React, { Key, forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export interface TabPaneProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  keyTab?: Key;
  activeTab?: boolean;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  activeClassName?: string;
  onClick?: (event: any) => void;
}
const TabNode = forwardRef<HTMLButtonElement, TabPaneProps>(
  (
    {
      label,
      disabled,
      onClick,
      activeTab,
      className,
      keyTab,
      activeClassName,
      ...restProps
    },
    ref,
  ) => {
    const defaultClasses =
      'relative inline-block px-4 py-2.5 dark:hover:text-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed hover:text-blue-600 outline-0 border-0';

    const customClasses = customTwMerge(
      defaultClasses,
      activeTab ? activeClassName || 'text-blue-600' : 'text-gray-500',
      className,
    );

    return (
      <button
        ref={ref}
        className={customClasses}
        type="button"
        role="tab"
        data-node-key={keyTab}
        onClick={onClick}
        disabled={disabled}
        {...restProps}
      >
        {label}
      </button>
    );
  },
);

export default TabNode;
