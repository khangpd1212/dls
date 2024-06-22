import { CheckOutlined, useTera } from 'lib';
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
  status?: 'success';
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
        'absolute h-full border-s-2 border-blue-300',
        isModeLeftAlternate && 'start-[70px]',
        isModeRightAlternate && 'end-[70px]',
        !hasLabel && mode === 'right' && 'end-0',
        tailClassName,
        item.tailClassName,
      )}
    />
  );
  const dotNode = (item: ItemTimeline) => {
    const dotRender = {
      success: <CheckOutlined className="w-3 text-green-500 stroke-[3px]" />,
      default: item.dot,
    };
    return (
      <div
        className={customTwMerge(
          'absolute',
          !item.dot && 'w-2.5 h-2.5 bg-blue-300 rounded-full',
          isModeLeftAlternate && 'start-[70px] -ms-1',
          isModeRightAlternate && 'end-[70px] -me-1',
          !hasLabel && mode === 'right' && '-end-1',
          !hasLabel && mode === 'left' && '-start-1',
          item.status === 'success' &&
            'flex items-center justify-center bg-green-300 w-4 h-4 start-[53px] ms-0',
          dotClassName,
          item.dotClassName,
        )}
      >
        {dotRender[item.status]}
      </div>
    );
  };
  return (
    <ul className="list-none">
      {items &&
        items.map((item, key) => (
          <li
            className={customTwMerge(
              'relative pb-5 flex items-center',
              isModeRightAlternate && 'flex-row-reverse',
            )}
            key={key}
          >
            {(isModeLeftAlternate || isModeRightAlternate) && (
              <div
                className={customTwMerge(
                  'text-xss text-gray-500 w-14 shrink-0',
                  mode === 'left' && 'text-right',
                  mode === 'right' && 'text-left',
                )}
              >
                {item.label}
              </div>
            )}
            {tailNode(item)}
            {dotNode(item)}
            {item.children && (
              <div
                className={customTwMerge(
                  'break-words w-full',
                  mode === 'left' && 'ms-8',
                  mode === 'right' && 'me-8',
                  !hasLabel && mode === 'left' && 'me-0',
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
