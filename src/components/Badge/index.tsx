import { useTera } from 'lib';
import { isNumber, isString } from 'lodash';
import React, { forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export type BadgeProps = {
  count?: React.ReactNode;
  showZero?: boolean;
  overflowCount?: number;
  children?: React.ReactNode;
  containerClassName?: string;
  className?: string;
  // dot?: boolean;
};
const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      count,
      showZero = false,
      overflowCount = 999,
      children,
      containerClassName,
      className,
    },
    ref,
  ) => {
    const badgeClasses = customTwMerge(
      'text-xs font-normal uppercase text-blue-500 bg-green-200 rounded-full dark:border-gray-900 text-center w-fit whitespace-nowrap',
      (count as number) < 10 ? 'w-4 h-4' : 'px-2.5 py-0.5',
      className,
    );
    const numberedDisplayCount = (
      (count as number) > overflowCount ? `${overflowCount}+` : count
    ) as string | number | null;

    const isZero = numberedDisplayCount === '0' || numberedDisplayCount === 0;
    const ignoreCount = count === null || (isZero && !showZero);
    const titleNode = isString(count) || isNumber(count) ? count : undefined;

    const { is_verify } = useTera();
    if (!is_verify) return null;

    const badgeNode = !ignoreCount && (
      <div
        title={titleNode as string}
        className={customTwMerge(
          children &&
            'absolute top-0 end-0 translate-x-1/2 -translate-y-1/2 origin-[100%_0%] flex items-center justify-center',
          badgeClasses,
        )}
      >
        {numberedDisplayCount}
      </div>
    );

    return (
      <>
        {children ? (
          <div
            className={customTwMerge(
              'relative inline-block w-fit',
              containerClassName,
            )}
            ref={ref}
          >
            {children}
            {badgeNode}
          </div>
        ) : (
          badgeNode
        )}
      </>
    );
  },
);

export default Badge;
