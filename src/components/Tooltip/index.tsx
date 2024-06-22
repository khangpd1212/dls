import Popover, { PopoverProps } from '../Popover';
import { useTera } from 'lib';
import { customTwMerge } from 'tailwind-merge.config';

export type TooltipProps = Omit<PopoverProps, 'content' | 'classNameTitle'>;

const Tooltip = ({
  children,
  placement: customPlacement = 'top-start',
  title,
  className,
  ...restProps
}: TooltipProps) => {
  const tooltipClasses = customTwMerge(
    'bg-gray-700 text-white shadow-none',
    className,
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <Popover
      content={title}
      className={tooltipClasses}
      placement={customPlacement}
      {...restProps}
    >
      {children}
    </Popover>
  );
};

export default Tooltip;
