import { createContext, forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import { RowProps } from '.';
import { useTera } from 'lib';
export const RowContext = createContext<RowProps | null>(null);
const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ children, className, ...restProps }, ref) => {
    const rowClasses = customTwMerge('grid gap-2.5', className);

    const { is_verify } = useTera();
    if (!is_verify) return null;

    return (
      <div className={rowClasses} ref={ref} {...restProps}>
        {children}
      </div>
    );
  },
);

export default Row;
