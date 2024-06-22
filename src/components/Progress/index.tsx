import { useTera } from 'lib';
import { customTwMerge } from 'tailwind-merge.config';
export interface ProgressProps {
  percent?: number;
  status?: 'active' | 'exception';
  size?: number | string;
}
const Progress = ({ percent, status, size, ...restProps }: ProgressProps) => {
  const progressBgClasses = customTwMerge(
    'bg-blue-600 h-0.5 rounded-full dark:bg-blue-500',
    status === 'active' && 'bg-green-600',
    status === 'exception' && 'bg-red-600',
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <div
      style={{ height: size }}
      className={customTwMerge(
        'w-full h-0.5 bg-gray-200 rounded-full dark:bg-gray-700',
      )}
      {...restProps}
    >
      <div
        className={progressBgClasses}
        style={{ width: `${percent}%`, height: size }}
      />
    </div>
  );
};

export default Progress;
