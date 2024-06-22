import { useTera } from 'lib';
import React from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import Portal from '@rc-component/portal';
export interface DrawerProps {
  open?: boolean;
  onClose?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  maskClosable?: boolean;
  children?: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  containerClassName?: string;
  maskClassName?: string;
  getPopupContainer?: () => Element | DocumentFragment;
}
const Drawer: React.FC<DrawerProps> = ({
  open,
  placement = 'right',
  children,
  onClose,
  containerClassName,
  maskClassName,
  maskClosable = true,
  getPopupContainer = () => document.body,
  ...restProps
}) => {
  const placementClasses = {
    left: 'w-80 top-0 left-0 h-screen overflow-y-auto -translate-x-full',
    right: 'w-80 top-0 right-0 h-screen overflow-y-auto translate-x-full',
    top: 'top-0 left-0 right-0 w-full -translate-y-full',
    bottom: 'bottom-0 left-0 right-0 w-full translate-y-full',
  };
  const containerClasses = customTwMerge(
    'fixed z-[51] p-4 bg-white dark:bg-gray-800 transition-transform',
    placementClasses[placement],
    open && 'transform-none',
    containerClassName,
  );
  const maskClasses = customTwMerge(
    'fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
    maskClassName,
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <Portal
      getContainer={getPopupContainer && (() => getPopupContainer())}
      open={open}
      autoDestroy
      {...restProps}
    >
      <div className="tera-drawer">
        <div className={containerClasses} {...restProps}>
          {children}
        </div>
        {open && (
          <div
            className={maskClasses}
            onClick={maskClosable && open ? onClose : undefined}
          />
        )}
      </div>
    </Portal>
  );
};

export default Drawer;
