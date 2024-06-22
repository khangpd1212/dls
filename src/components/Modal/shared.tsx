import { BaseModalProps } from './interface';
import Button from '../Button';
import { XMarkOutlined } from 'icons';
import { customTwMerge } from 'tailwind-merge.config';

interface FooterProps {
  onOk?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}
interface HeaderProps {
  title: React.ReactNode;
  closeIcon?: React.ReactNode;
  onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  closable?: boolean;
}
export const Footer: React.FC<
  FooterProps &
    Pick<
      BaseModalProps,
      | 'footer'
      | 'okText'
      | 'okType'
      | 'cancelText'
      | 'confirmLoading'
      | 'okButtonProps'
      | 'cancelButtonProps'
    >
> = (props) => {
  const {
    okText = 'Ok',
    okType = 'primary',
    cancelText = 'Cancel',
    confirmLoading,
    onOk,
    onCancel,
    okButtonProps,
    cancelButtonProps,
  } = props;

  return (
    <>
      <Button
        onClick={onCancel}
        type="primary"
        outlined
        {...cancelButtonProps}
        className={customTwMerge('min-w-[96px]', cancelButtonProps?.className)}
      >
        {cancelText}
      </Button>
      <Button
        loading={confirmLoading}
        onClick={onOk}
        type={okType}
        {...okButtonProps}
        className={customTwMerge('min-w-[96px]', okButtonProps?.className)}
      >
        {okText}
      </Button>
    </>
  );
};

export const Header: React.FC<HeaderProps> = ({
  title,
  closeIcon = <XMarkOutlined className="w-5 h-5" />,
  onCancel,
  closable,
}) => {
  return (
    <>
      {title && (
        <div className="tera-modal-header flex items-start justify-between rounded-t pt-4 pb-2.5 px-4 my-0">
          <h3 className="w-full font-medium text-base text-gray-900 dark:text-white leading-5">
            {title}
          </h3>

          {closable && closeIcon && (
            <button
              onClick={onCancel}
              type="button"
              className="inline-flex items-center p-1 ml-auto text-sm text-black bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {closeIcon}
              <span className="sr-only">Close modal</span>
            </button>
          )}
        </div>
      )}
    </>
  );
};
