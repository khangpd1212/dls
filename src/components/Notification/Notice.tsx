import {
  CheckCircleOutlined,
  ExclamationTriangleOutlined,
  XCircleOutlined,
  XMarkOutlined,
} from 'icons';
import { ReactNode, createElement } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import { DivProps, IconType } from './interface';
export interface NoticeProps {
  icon?: ReactNode;
  description?: ReactNode;
  message?: ReactNode;
  type?: IconType;
  className?: string;
  props?: DivProps;
}

export const TypeIcon = {
  success: <CheckCircleOutlined />,
  error: <XCircleOutlined />,
  warning: <ExclamationTriangleOutlined />,
};
const Notice = (props: NoticeProps) => {
  const {
    icon,
    type,
    description,
    message,
    className,
    props: divProps,
  } = props;

  const typeToIcon = {
    success: CheckCircleOutlined,
    error: XCircleOutlined,
    warning: ExclamationTriangleOutlined,
  };
  const iconNode = () => {
    if (icon) {
      return icon;
    } else if (type) {
      return createElement(typeToIcon[type] || null, {
        className: customTwMerge(
          'w-7 h-7',
          type === 'success' && 'text-green-500',
          type === 'warning' && 'text-yellow-500',
          type === 'error' && 'text-red-700',
        ),
      });
    } else {
      return;
    }
  };

  const containerClasses = customTwMerge('relative mb-4', className);
  const dividerClasses = customTwMerge(
    'absolute inset-y-0 left-0 w-2 h-full rounded-l-[4px] bg-blue-500',
    type === 'success' && 'bg-green-500',
    type === 'warning' && 'bg-yellow-500',
    type === 'error' && 'bg-red-700',
  );

  return (
    <div className={containerClasses} role="alert" {...divProps}>
      <div className={dividerClasses} />
      <div
        className={customTwMerge(
          'flex min-w-[490px] max-w-md px-6 py-4 text-gray-800 bg-white border border-gray-100 rounded-r-xsm rounded-l-md dark:text-gray-400 dark:bg-gray-800',
          description ? 'items-start' : 'items-center',
        )}
      >
        {/* Content */}
        {iconNode() && (
          <div className="inline-flex items-center justify-center mr-4">
            {iconNode()}
          </div>
        )}
        <div className="text-sm pe-6">
          <h4 className="font-normal break-words">{message}</h4>
          {description && (
            <p className="font-medium text-gray-500 mt-2.5 break-words">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export function CloseDefaultIcon() {
  return (
    <div className="inline-flex items-center justify-center p-1 text-gray-400 bg-white rounded-xsm hover:text-gray-800 focus:ring-2 focus:ring-gray-300 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
      <span className="sr-only">Close</span>
      <i className="w-5 h-5">
        <XMarkOutlined />
      </i>
    </div>
  );
}
export default Notice;
