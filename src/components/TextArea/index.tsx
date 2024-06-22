import { itemStyles } from 'common/const/formStyle';
import { FormItemContext } from 'components/Form/FormItem';
import { useTera } from 'lib';
import React, {
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  forwardRef,
  useContext,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export interface TextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { placeholder = 'Please input textarea', className, id, ...restProps },
    ref,
  ) => {
    const formItemContext = useContext(FormItemContext);
    const textAreaClasses = customTwMerge(
      'w-full min-h-[38px] resize px-4 py-2.5 border border-gray-200 rounded-xsm placeholder:text-gray-400 text-xxs transition-all outline-none focus-visible:outline-none',
      itemStyles.disabled,
      formItemContext?.isError ? itemStyles.error : itemStyles.primary,
      className,
    );

    const { is_verify } = useTera();
    if (!is_verify) return null;

    return (
      <textarea
        ref={ref}
        id={id || formItemContext?.name}
        className={textAreaClasses}
        placeholder={placeholder}
        {...restProps}
      />
    );
  },
);

export default TextArea;
