import { FormItemContext } from 'components/Form/FormItem';
import { useTera } from 'lib';
import React, { useContext } from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export interface LabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  required?: boolean;
  className?: string;
  children?: string;
}
const Label: React.FC<LabelProps> = ({
  children,
  required,
  className,
  htmlFor,
  ...props
}) => {
  const formItemContext = useContext(FormItemContext);
  const labelStyles =
    'block text-gray-900 dark:text-white font-normal text-xxs mb-2.5 whitespace-nowrap';
  const labelRequiredStyles = `after:content-['*'] after:ml-1 after:text-red-600`;

  const customClasses = customTwMerge(
    labelStyles,
    className,
    required && labelRequiredStyles,
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <label
      className={customClasses}
      {...props}
      htmlFor={htmlFor || formItemContext?.name}
    >
      {children}
    </label>
  );
};

export default Label;
