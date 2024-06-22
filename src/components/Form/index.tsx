import { useTera } from 'lib';
import React, { createContext, forwardRef } from 'react';

export interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children?: React.ReactNode;
  className?: string;
}

export const FormContext = createContext<FormProps | null>(null);
const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const { children, className, name, ...restProps } = props;

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <FormContext.Provider value={{ name }}>
      <form ref={ref} className={className} {...restProps}>
        {children}
      </form>
    </FormContext.Provider>
  );
});

export default Form;
