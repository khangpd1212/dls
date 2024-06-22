import { useTera } from 'lib';
import { ReactNode } from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export interface EmptyProps {
  description?: ReactNode;
  image?: ReactNode;
  className?: string;
  classNameImage?: string;
}
const Empty = ({
  className,
  classNameImage,
  description,
  image,
}: EmptyProps) => {
  const containerClasses = customTwMerge(
    'p-4 text-sm text-center flex items-center justify-center flex-col gap-2',
    className,
  );
  const imageClasses = customTwMerge('w-full', classNameImage);

  const { is_verify } = useTera();
  if (!is_verify) return null;

  const emptyImage = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97 100" fill="none">
      <path
        d="M26.25 78.75H63.75C67.8921 78.75 71.25 75.3921 71.25 71.25V35.3033C71.25 34.3087 70.8549 33.3549 70.1517 32.6517L49.8484 12.3483C49.1451 11.6451 48.1913 11.25 47.1967 11.25H26.25C22.1079 11.25 18.75 14.6079 18.75 18.75V71.25C18.75 75.3921 22.1079 78.75 26.25 78.75Z"
        fill="white"
      />
      <path
        d="M33.75 45H56.25M33.75 60H56.25M63.75 78.75H26.25C22.1079 78.75 18.75 75.3921 18.75 71.25V18.75C18.75 14.6079 22.1079 11.25 26.25 11.25H47.1967C48.1913 11.25 49.1451 11.6451 49.8483 12.3483L70.1517 32.6517C70.8549 33.3549 71.25 34.3087 71.25 35.3033V71.25C71.25 75.3921 67.8921 78.75 63.75 78.75Z"
        stroke="#1F2937"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M91.5 78C91.5 87.1127 84.1127 94.5 75 94.5C65.8873 94.5 58.5 87.1127 58.5 78C58.5 68.8873 65.8873 61.5 75 61.5C84.1127 61.5 91.5 68.8873 91.5 78Z"
        fill="white"
      />
      <path
        d="M71.3333 81.6667L75 78M75 78L78.6667 74.3333M75 78L71.3333 74.3333M75 78L78.6667 81.6667M91.5 78C91.5 87.1127 84.1127 94.5 75 94.5C65.8873 94.5 58.5 87.1127 58.5 78C58.5 68.8873 65.8873 61.5 75 61.5C84.1127 61.5 91.5 68.8873 91.5 78Z"
        stroke="#C81E1E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M75 95C84.3888 95 92 87.3888 92 78C92 68.6112 84.3888 61 75 61C65.6112 61 58 68.6112 58 78C58 87.3888 65.6112 95 75 95Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return (
    <div className={containerClasses}>
      <div className={imageClasses}>{image || emptyImage}</div>
      <div className="text-gray-900">{description || 'No data'}</div>
    </div>
  );
};

export default Empty;
