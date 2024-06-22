import * as React from 'react';
import { customTwMerge } from 'tailwind-merge.config';

interface IndentProps {
  level: number;
  className?: string;
  containerClassName?: string;
}

const Indent = ({ level, className, containerClassName }: IndentProps) => {
  const list: React.ReactElement[] = [];
  for (let i = 0; i < level; i += 1) {
    list.push(
      <span
        indent-key={i}
        key={i}
        className={customTwMerge(
          'inline-block relative w-3.5 h-full',
          className,
        )}
      />,
    );
  }

  return (
    <span
      className={customTwMerge(
        'self-stretch select-none whitespace-nowrap',
        containerClassName,
      )}
      aria-hidden
    >
      {list}
    </span>
  );
};

export default React.memo(Indent);
