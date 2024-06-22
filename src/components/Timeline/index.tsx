import { useTera } from 'lib';
import { has } from 'lodash';
import { ReactNode } from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export type ItemTimeline = {
  dot?: ReactNode;
  label?: ReactNode;
  children?: ReactNode;
  position?: 'left' | 'right';
  dotClassName?: string;
  tailClassName?: string;
};
export type TimelineProps = {
  mode?: 'left' | 'alternate' | 'right';
  pending?: boolean | ReactNode;
  pendingDot?: ReactNode;
  reverse?: boolean;
  items?: ItemTimeline[];
  tailClassName?: string;
  dotClassName?: string;
};
const Timeline = ({
  mode = 'left',
  tailClassName,
  dotClassName,
  items,
}: TimelineProps) => {
  const hasLabel = items.some((item) => has(item, 'label'));
  const isModeLeftAlternate = mode === 'left' && hasLabel;
  const isModeRightAlternate = mode === 'right' && hasLabel;

  const { is_verify } = useTera();
  if (!is_verify) return null;

  const tailNode = (item: ItemTimeline) => (
    <div
      className={customTwMerge(
        'absolute top-2.5 h-[calc(100%-10px)] border-s-2 border-blue-300',
        isModeLeftAlternate && 'start-1/2',
        isModeRightAlternate && 'end-1/2',
        !hasLabel && mode === 'right' && 'end-0',
        tailClassName,
        item.tailClassName,
      )}
    />
  );
  const dotNode = (item: ItemTimeline) => (
    <div
      className={customTwMerge(
        '-ms-1 absolute',
        !item.dot && 'w-2.5 h-2.5 bg-blue-300 rounded-full',
        isModeLeftAlternate && 'start-1/2',
        isModeRightAlternate && 'end-[49.6%]',
        !hasLabel && mode === 'right' && '-end-1',
        dotClassName,
        item.dotClassName,
      )}
    >
      {item.dot}
    </div>
  );
  return (
    <ul className="list-none">
      {items &&
        items.map((item, key) => (
          <li className="relative m-0 pb-5" key={key}>
            {item.label && (
              <div
                className={customTwMerge(
                  'absolute -top-0.5 text-xss text-gray-500',
                  mode === 'left' && 'text-end w-[calc(50%-15px)]',
                  mode === 'right' && 'text-start start-[calc(50%+15px)]',
                )}
              >
                {item.label}
              </div>
            )}
            {key !== items.length - 1 && tailNode(item)}
            {dotNode(item)}
            {item.children && (
              <div
                className={customTwMerge(
                  'relative -top-0.5 bottom-0 break-words',
                  mode === 'left' && 'ms-6',
                  !hasLabel && mode === 'left' && 'text-start me-0',
                  !hasLabel && mode === 'right' && 'text-end m-0 me-6',
                  hasLabel && 'w-[calc(50%-25px)]',
                  // hasLabel && 'w-full',
                  isModeLeftAlternate && 'start-1/2',
                )}
              >
                {item.children}
              </div>
            )}
          </li>
        ))}
    </ul>
  );
};

export default Timeline;
