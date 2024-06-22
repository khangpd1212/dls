import { CheckOutlined } from 'icons';
import { useTera } from 'lib';
import { ReactElement, ReactNode, forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
export interface OptionProps {
  value?: string | number;
  label?: string;
  labelDisplay?: ReactElement;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  onSelect?: () => void;
  active?: boolean;
}
const Option = forwardRef<HTMLDivElement, OptionProps>((props, ref) => {
  const {
    label,
    disabled,
    className,
    children,
    labelDisplay,
    onSelect,
    active,
  } = props;

  const defaultClasses =
    'flex items-center justify-between last:rounded-b-xsm first:rounded-t-xsm px-4 py-2 transition-all text-xxs';
  const disabledClasses = 'opacity-50 cursor-not-allowed hover:bg-inherit';
  const activeClasses = 'bg-blue-200';

  const optionClasses = customTwMerge(
    defaultClasses,
    className,
    active ? activeClasses : 'hover:bg-gray-200',
    disabled && disabledClasses,
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <div className={optionClasses} onClick={onSelect} ref={ref}>
      <span className="py-1">{labelDisplay || label || children}</span>
      {active && (
        <CheckOutlined className="w-4 h-4 text-blue-700 stroke-[3px]" />
      )}
    </div>
  );
});

export default Option;
