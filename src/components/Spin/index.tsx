import SpinOutlined from 'icons/SpinOutlined';
import { useTera } from 'lib';
import { ReactNode, SVGAttributes, forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
export interface SpinProps {
  indicator?: ReactNode;
  size?: string;
  svgProps?: SVGAttributes<SVGElement>;
  spinning?: boolean;
  tip?: ReactNode;
  wrapperClassName?: string;
  children?: ReactNode;
}
const Spin = forwardRef<HTMLDivElement, SpinProps>(
  (
    { spinning = true, tip, indicator, children, wrapperClassName, svgProps },
    ref,
  ) => {
    const spinIconClasses = customTwMerge(
      'w-8 h-8 text-gray-300 animate-spin dark:text-gray-600 fill-blue-600',
      svgProps?.className,
    );

    const containerClasses = customTwMerge(
      'relative top-0 z-10 block w-full h-full',
      wrapperClassName,
    );

    const { is_verify } = useTera();
    if (!is_verify) return null;

    const spinIcon = indicator || <SpinOutlined className={spinIconClasses} />;

    const spinHasChildren = (
      <>
        {spinning ? (
          <>
            <div className="transition-opacity opacity-50 pointer-events-none select-none">
              {children}
            </div>
            <div
              role="status"
              className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
              {spinIcon}
              {tip && <div>{tip}</div>}
            </div>
          </>
        ) : (
          children
        )}
      </>
    );

    return (
      <>
        {spinning ? (
          <div ref={ref} className={containerClasses}>
            {children ? spinHasChildren : spinning && spinIcon}
          </div>
        ) : (
          children
        )}
      </>
    );
  },
);

export default Spin;
