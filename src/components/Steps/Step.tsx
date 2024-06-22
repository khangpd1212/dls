import { CheckOutlined, XMarkOutlined } from 'icons';
import React, { ReactNode } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import KeyCode from 'rc-util/lib/KeyCode';
import { Status } from '.';
export interface StepProps {
  title?: ReactNode;
  description?: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  stepIndex?: number;
  stepNumber?: number;
  onStepClick?: (index: number) => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  status?: Status;
  className?: string;
}
const Step = ({
  description,
  disabled,
  icon,
  title,
  stepIndex,
  stepNumber,
  onStepClick,
  onClick,
  status,
  className,
}: StepProps) => {
  const clickable = !!onStepClick && !disabled;

  const accessibilityProps: {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  } = {};
  if (clickable) {
    accessibilityProps.onClick = (e) => {
      onClick?.(e);
      onStepClick(stepIndex);
    };
    accessibilityProps.onKeyDown = (e) => {
      const { which } = e;
      if (which === KeyCode.ENTER || which === KeyCode.SPACE) {
        onStepClick(stepIndex);
      }
    };
  }

  const nodeProgressDot = {
    finish: (
      <span className="text-blue-500 dark:bg-blue-800 shrink-0 dark:text-blue-500">
        <CheckOutlined className="w-5 h-5 stroke-2" />
      </span>
    ),
    wait: (
      <span className="text-sm font-normal text-gray-300">{stepNumber}</span>
    ),
    error: (
      <span className="text-red-500 dark:bg-red-800 shrink-0 dark:text-red-500">
        <XMarkOutlined className="w-5 h-5 stroke-2" />
      </span>
    ),
  };

  const tailClasses =
    "first:before:content-none first:flex-none first:w-auto before:content-[''] before:w-full before:border-b before:border-gray-300 before:border-2 dark:before:border-gray-700 w-full before:mx-5";
  const tailActiveClasses = 'before:border-blue-500';
  const containerDotAndTailClasses = customTwMerge(
    'flex items-center',
    tailClasses,
    (status === 'finish' || status === 'error') && tailActiveClasses,
    className,
  );

  return (
    <li className={containerDotAndTailClasses}>
      <div
        className={customTwMerge(
          'flex flex-col items-center flex-shrink-0',
          clickable && 'cursor-pointer',
        )}
        onClick={onClick}
        {...accessibilityProps}
      >
        <div
          className={customTwMerge(
            'flex items-center justify-center w-8 h-8 bg-white border rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 border-gray-300',
            status === 'finish' && 'border-blue-500',
            status === 'error' && 'border-red-500',
          )}
        >
          {icon || nodeProgressDot[status]}
        </div>
        <div className="text-center">
          {title && (
            <h3
              className={customTwMerge(
                'text-xxs font-semibold mt-2.5 dark:text-gray-100 text-gray-300',
                status === 'finish' && 'text-gray-800',
                status === 'error' && 'text-red-500',
              )}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className={customTwMerge(
                'italic font-normal text-gray-300 text-xxs mt-1.5',
                status === 'finish' && 'text-gray-500',
                status === 'error' && 'text-red-500',
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </li>
  );
};
export default Step;
