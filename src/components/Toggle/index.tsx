import { useTera } from 'lib';
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export interface ToggleProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'size'
  > {
  containerClassName?: string;
  size?: 'small' | 'default' | 'large';
}
const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
  const {
    size = 'default',
    className,
    containerClassName,
    ...restProps
  } = props;

  const toggleClasses = customTwMerge(
    "bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600",
    size === 'default' && 'w-11 h-6',
    size === 'small' && 'w-9 h-5',
    size === 'large' && 'w-14 h-7',
    className,
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <label
      className={customTwMerge(
        'relative flex items-center cursor-pointer w-fit',
        containerClassName,
      )}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        ref={ref}
        {...restProps}
      />
      <div className={toggleClasses} />
    </label>
  );
});

export default Toggle;
