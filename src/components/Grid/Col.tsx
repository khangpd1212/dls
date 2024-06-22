import { forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import { ColProps } from '.';
import { useTera } from 'lib';
const Col = forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const { children, className, ...restProps } = props;
  const colClasses = customTwMerge(
    'relative max-w-full min-h-[1px]',
    className,
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <div className={colClasses} ref={ref} {...restProps}>
      {children}
    </div>
  );
});

export default Col;
