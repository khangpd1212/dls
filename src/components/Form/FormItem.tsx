import { Label, useTera } from 'lib';
import { isString } from 'lodash';
import React, {
  CSSProperties,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import { FormContext } from '.';
export interface FormFieldProps {
  isRequired?: boolean;
  name?: string;
  label?: string;
  isError?: boolean;
  messages?: string[] | string;
  layout?: 'inline' | 'vertical';
  labelClassName?: string;
  help?: ReactNode;
  helpClassName?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  childrenClassName?: string;
}

export const FormItemContext = createContext<FormFieldProps | null>(null);

const FormItem: React.FC<FormFieldProps> = ({
  children,
  className,
  label,
  isError,
  isRequired = true,
  messages,
  name,
  layout = 'vertical',
  labelClassName,
  help,
  helpClassName,
  childrenClassName,
  ...restProps
}) => {
  const formContext = useContext(FormContext);
  const nameItem =
    formContext?.name && name ? `${formContext.name}-${name}` : undefined;
  const customClasses = customTwMerge(
    'mb-2.5',
    layout === 'inline' && 'flex items-baseline gap-2',
    className,
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  const validationMessage = () => {
    return isString(messages) ? (
      <p className="mt-1 text-xs text-red-600 break-words dark:text-red-500">
        <span className="font-medium">{messages}</span>
      </p>
    ) : (
      messages?.map((message) => (
        <p className="mt-1 text-xs text-red-600 break-words dark:text-red-500">
          <span className="font-medium">{message}</span>
        </p>
      ))
    );
  };
  return (
    <FormItemContext.Provider value={{ isError, name: nameItem }}>
      <div className={customClasses} {...restProps}>
        {label && (
          <Label
            required={isRequired}
            className={customTwMerge(
              layout === 'inline' && 'mb-0',
              labelClassName,
            )}
          >
            {label}
          </Label>
        )}
        <div className={customTwMerge('w-full', childrenClassName)}>
          {children}
          {help && (
            <p
              className={customTwMerge(
                'mt-1 text-xs italic text-gray-400',
                helpClassName,
              )}
            >
              {help}
            </p>
          )}
          {isError && validationMessage()}
        </div>
      </div>
    </FormItemContext.Provider>
  );
};
export default FormItem;
