import { useTera } from 'lib';
import React, { ReactNode, forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export interface TabContentProps {
  className?: string;
  active?: boolean;
  children?: ReactNode;
}
const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
  ({ children, active, className }, ref) => {
    const customItemClasses = customTwMerge(
      'p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800',
      className,
      active ? 'block' : 'hidden',
    );

    const { is_verify } = useTera();
    if (!is_verify) return null;

    return (
      <>
        {children && (
          <div ref={ref} className={customItemClasses} role="tabpanel">
            {children}
          </div>
        )}
      </>
    );
  },
);

export default TabContent;
