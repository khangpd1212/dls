import { forwardRef, useEffect } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import BaseModal from './BaseModal';
import { BaseModalProps } from './interface';

const ModalWindow = forwardRef<HTMLDivElement, BaseModalProps>((props, ref) => {
  const { children, wrapClassName, afterOpenChange, ...restProps } = props;

  const wrapClasses = customTwMerge(
    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl',
    wrapClassName,
  );

  useEffect(() => {
    return () => {
      document.body.style.width = null;
      document.body.style.overflowY = null;
    };
  }, []);
  return (
    <BaseModal
      ref={ref}
      wrapClassName={wrapClasses}
      afterOpenChange={(open) => {
        if (open) {
          document.body.style.width = 'auto';
          document.body.style.overflowY = 'auto';
        } else {
          document.body.style.width = null;
          document.body.style.overflowY = null;
        }
        afterOpenChange?.(open);
      }}
      mask={false}
      maskClosable={false}
      {...restProps}
    >
      {children}
    </BaseModal>
  );
});
export default ModalWindow;
