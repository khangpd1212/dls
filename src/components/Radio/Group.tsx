import { forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import { RadioGroupContextProvider } from './context';
import { RadioGroupProps } from './interface';
import { useTera } from 'lib';

const Group = forwardRef<HTMLInputElement, RadioGroupProps>((props, ref) => {
  const { children, className, inline, ...restProps } = props;

  const defaultClasses = 'flex gap-1.5';
  const customClasses = customTwMerge(
    defaultClasses,
    className,
    inline ? 'flex-row' : 'flex-col',
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <div className={customClasses}>
      <RadioGroupContextProvider
        value={{
          ref,
          ...restProps,
        }}
      >
        {children}
      </RadioGroupContextProvider>
    </div>
  );
});

export default Group;
