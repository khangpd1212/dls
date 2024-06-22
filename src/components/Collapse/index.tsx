import { ChevronDownOutlined } from 'icons';
import { useTera } from 'lib';
import { findLast } from 'lodash';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { Fragment, Key, ReactNode, forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
export interface CollapseProps {
  containerClassName?: string;
  headingClassName?: string;
  contentClassName?: string;
  accordion?: boolean;
  onChange?: (key: Key[]) => void;
  items?: ItemCollapseType[];
  width?: number;
  activeClassName?: string;
  activeKey?: Key | Key[];
  defaultActiveKey?: Key | Key[];
  expandIcon?: ReactNode;
  expandIconPosition?: 'start' | 'end';
}

export interface ItemCollapseType {
  key?: Key;
  label?: ReactNode;
  children?: ReactNode;
  extra?: ReactNode;
  onClick?: () => void;
}

function getActiveKeysArray(activeKey: Key | Key[]) {
  let currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    const activeKeyType = typeof currentActiveKey;
    currentActiveKey =
      activeKeyType === 'number' || activeKeyType === 'string'
        ? [currentActiveKey]
        : [];
  }
  return currentActiveKey.map((key) => key);
}
const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (
    {
      accordion,
      onChange,
      headingClassName,
      contentClassName,
      width,
      items,
      defaultActiveKey,
      containerClassName,
      activeKey,
      activeClassName,
      expandIcon,
      expandIconPosition = 'end',
      ...restProps
    },
    ref,
  ) => {
    const [current, setCurrent] = useMergedState<Key | Key[], Key[]>([], {
      value: activeKey,
      onChange: (v: Key[]) => onChange?.(v),
      defaultValue: defaultActiveKey,
      postState: getActiveKeysArray,
    });
    const lastItems = findLast(items);

    const defaultHeadingClasses =
      'flex items-center justify-between w-full font-medium text-left p-2.5 text-gray-500 border border-gray-200 rounded-t-xsm focus:ring focus:ring-gray-200 bg-gray-100';
    const customHeadingClasses = (key: Key) => {
      return customTwMerge(
        defaultHeadingClasses,
        lastItems.key !== key && 'border-b-0',
        headingClassName,
        current.includes(key) && activeClassName,
      );
    };

    const defaultBodyClasses = 'p-2.5 border border-gray-200 break-words';

    const customBodyClasses = (key: Key) => {
      return customTwMerge(
        defaultBodyClasses,
        lastItems.key !== key && 'border-b-0',
        isExpanded(key) ? 'block' : 'hidden',
        contentClassName,
      );
    };

    const onClickItem = (key: Key) => {
      setCurrent(() => {
        if (accordion) {
          return current[0] === key ? [] : [key];
        }

        const index = current.indexOf(key);
        const isActive = index > -1;
        if (isActive) {
          return current.filter((item) => item !== key);
        }

        return [...current, key];
      });
    };

    const isExpanded = (key: Key) => {
      return current.includes(key);
    };

    const contentNode = (item: ItemCollapseType) => {
      return <div className={customBodyClasses(item.key)}>{item.children}</div>;
    };

    const mergeExpandedIcon = (item: ItemCollapseType) =>
      expandIcon || (
        <i
          className={customTwMerge(
            'w-5 h-5 shrink-0 transition-transform',
            current.includes(item.key) && 'rotate-180',
          )}
        >
          <ChevronDownOutlined />
        </i>
      );
    const headerNode = (item: ItemCollapseType) => (
      <button
        type="button"
        className={customHeadingClasses(item.key)}
        onClick={() => {
          onClickItem(item.key);
          item?.onClick?.();
        }}
      >
        {item.children &&
          expandIconPosition === 'start' &&
          mergeExpandedIcon(item)}
        <span className="flex-auto truncate me-auto">{item.label}</span>
        {item.extra}
        {item.children &&
          expandIconPosition === 'end' &&
          mergeExpandedIcon(item)}
      </button>
    );
    const { is_verify } = useTera();
    if (!is_verify) return null;
    return (
      <div
        ref={ref}
        className={customTwMerge(containerClassName)}
        style={{ width: width }}
        {...restProps}
      >
        {items?.map((item) => {
          return (
            <Fragment key={item.key}>
              {headerNode(item)}
              {item.children && contentNode(item)}
            </Fragment>
          );
        })}
      </div>
    );
  },
);
if (process.env.NODE_ENV !== 'production') {
  Collapse.displayName = 'Collapse';
}

export default Collapse;
