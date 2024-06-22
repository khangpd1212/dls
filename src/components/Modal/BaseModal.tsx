import { useTera } from 'lib';
import Dialog from 'rc-dialog';
import React, { forwardRef } from 'react';
import { BaseModalProps } from './interface';
import { Footer, Header } from './shared';
const BaseModal = forwardRef<HTMLDivElement, BaseModalProps>((props, ref) => {
  const {
    open,
    closeIcon,
    width,
    footer,
    title,
    children,
    wrapClassName,
    bodyClassName,
    maskClassName,
    footerClassName,
    headerClassName,
    contentClassName,
    headerRender,
    ...restProps
  } = props;

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel } = props;
    onCancel?.(e);
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props;
    onOk?.(e);
  };

  const dialogFooter =
    footer === undefined ? (
      <Footer {...restProps} onOk={handleOk} onCancel={handleCancel} />
    ) : (
      footer
    );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <Dialog
      width={width}
      prefixCls="tera-modal"
      footer={dialogFooter}
      visible={open}
      onClose={handleCancel}
      panelRef={ref}
      destroyOnClose
      classNames={{
        wrapper: wrapClassName,
        body: bodyClassName,
        content: contentClassName,
        footer: footerClassName,
        header: headerClassName,
        mask: maskClassName,
      }}
      title={
        headerRender || (
          <Header title={title} closeIcon={closeIcon} onCancel={handleCancel} />
        )
      }
      {...restProps}
    >
      {children}
    </Dialog>
  );
});

export default BaseModal;
