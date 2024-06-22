import { useTera } from 'lib';
import React from 'react';
import Step, { StepProps } from './Step';
import { customTwMerge } from 'tailwind-merge.config';
export type Status = 'error' | 'finish' | 'wait';
export interface StepsProps {
  items?: StepProps[];
  onChange?: (current: number) => void;
  current?: number;
  initial?: number;
  status?: Status;
  className?: string;
  stepClassName?: string;
}

const Steps: React.FC<StepsProps> = ({
  items,
  onChange,
  current = 0,
  initial = 0,
  status = 'finish',
  className,
  stepClassName,
}) => {
  const onStepChange = (next: number) => {
    if (onChange && current !== next) {
      onChange(next);
    }
  };

  const { is_verify } = useTera();
  if (!is_verify) return null;

  const renderStep = (item: StepProps, index: number) => {
    const mergedItem = { ...item };
    const stepNumber = initial + index;

    if (!mergedItem.status) {
      if (stepNumber === current) {
        mergedItem.status = status;
      } else if (stepNumber <= current) {
        mergedItem.status = 'finish';
      } else {
        mergedItem.status = 'wait';
      }
    }
    return (
      <Step
        {...mergedItem}
        stepIndex={stepNumber}
        stepNumber={stepNumber + 1}
        key={stepNumber}
        className={stepClassName}
        onStepClick={onChange && onStepChange}
      />
    );
  };
  return (
    <ol className={customTwMerge('flex items-center w-full', className)}>
      {items && items.map(renderStep)}
    </ol>
  );
};

export default Steps;
export { Step };
export { type StepProps };
