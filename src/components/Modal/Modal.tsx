import { forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import BaseModal from './BaseModal';
import { BaseModalProps } from './interface';
const Modal = forwardRef<HTMLDivElement, BaseModalProps>((props, ref) => {
  const {
    children,
    centered = true,
    className,
    wrapClassName,
    ...restProps
  } = props;

  const wrapClasses = customTwMerge(
    'inset-0',
    centered && 'text-center tera-modal-centered',
    wrapClassName,
  );

  return (
    <BaseModal
      ref={ref}
      closable={false}
      wrapClassName={wrapClasses}
      className={customTwMerge('shadow-xl', className)}
      {...restProps}
    >
      {children}
    </BaseModal>
  );
});

export default Modal;
