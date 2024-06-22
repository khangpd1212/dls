import { useTera } from 'lib';
import React, { forwardRef, useContext } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import Group from './Group';
import RadioGroupContext from './context';
import { RadioProps } from './interface';

const InternalRadio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { className, value, children, ...restProps } = props;
  const groupContext = useContext(RadioGroupContext) || {};

  const normalizedProps = { ...groupContext, ...restProps };
  const defaultStyles =
    'w-4 h-4 bg-white border-gray-300 hover:border-blue-600 focus:ring-blue-300 focus:ring disabled:bg-gray-300 disabled:border-none cursor-pointer';

  const customClasses = customTwMerge(defaultStyles, className);

  // useEffect(() => {
  //   normalizedProps.onChange(value);
  // }, []);

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <div className="flex items-center">
      <input
        id={`${normalizedProps.name}-${value}`}
        ref={ref || groupContext.ref}
        type="radio"
        className={customClasses}
        defaultChecked={groupContext.value === value}
        {...normalizedProps}
        value={value}
      />
      <label
        htmlFor={`${normalizedProps.name}-${value}`}
        className="pl-2 text-sm font-normal text-gray-900 cursor-pointer dark:text-gray-300"
      >
        {children}
      </label>
    </div>
  );
});

type CompoundedComponent = React.ForwardRefExoticComponent<
  RadioProps & React.RefAttributes<HTMLElement>
> & {
  Group: typeof Group;
};
const Radio = InternalRadio as CompoundedComponent;
Radio.Group = Group;
export default Radio;
