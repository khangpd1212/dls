import {
  Dropdown,
  DropdownItem,
  EllipsisHorizontalOutlined,
  EllipsisVerticalOutlined,
  useTera,
} from 'lib';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import TabNode from './TabNode';
import useTouchMove from './hooks/useTouchMove';

export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export interface TabsProps {
  itemClassName?: string;
  className?: string;
  items?: TabItemType[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  onTabClick?: (
    activeKey: string,
    e: React.MouseEvent | React.KeyboardEvent,
  ) => void;
  tabPosition?: 'left' | 'right' | 'top' | 'bottom';
  activeClassName?: string;
}

export interface TabItemType {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}
const Tabs = ({
  items,
  defaultActiveKey,
  onChange,
  activeKey,
  onTabClick,
  className,
  tabPosition = 'top',
  itemClassName,
  activeClassName,
}: TabsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const containerEl = containerRef?.current;
  const tabListEl = tabListRef?.current;
  const isTabVertical = tabPosition === 'left' || tabPosition === 'right';
  const [dropdownItems, setDropdownItems] = useState<TabItemType[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentTab, setCurrentTab] = useMergedState('', {
    value: activeKey,
    onChange: (v) => onChange?.(v),
    defaultValue: defaultActiveKey || items?.[0]?.key,
  });
  const [dividerStyle, setDividerStyle] = useState({
    top: 0,
    width: 0,
    left: 0,
    height: 0,
  });
  const { is_verify } = useTera();
  const isItemsOver = () => {
    if (!tabListEl || !containerEl) return;
    if (isTabVertical) {
      return tabListEl.offsetHeight > containerEl.offsetHeight;
    } else {
      return tabListEl.offsetWidth > containerEl.offsetWidth;
    }
  };

  const positionScrollRef = useRef({ x: 0, y: 0 });
  const [positionScroll, setPositionScroll] = useState({ x: 0, y: 0 });

  const itemNode = useMemo(
    () => (currentTab: string) => {
      return tabListEl?.querySelector<HTMLButtonElement>(
        `[data-node-key="${currentTab}"]`,
      );
    },
    [tabListEl],
  );

  const setStyleDivider = useCallback(() => {
    if (!itemNode(currentTab) || !tabListEl) return;
    if (isTabVertical) {
      const positionItemVertical =
        itemNode(currentTab).getBoundingClientRect().top -
        tabListEl.getBoundingClientRect().top;

      setDividerStyle({
        top: positionItemVertical,
        height: itemNode(currentTab).clientHeight,
        left: undefined,
        width: undefined,
      });
    } else {
      const positionItemHorizontal =
        itemNode(currentTab).getBoundingClientRect().left -
        tabListEl.getBoundingClientRect().left;

      setDividerStyle({
        top: undefined,
        width: itemNode(currentTab).clientWidth,
        left: positionItemHorizontal || 0,
        height: undefined,
      });
    }
  }, [
    tabListEl,
    itemNode(currentTab),
    is_verify,
    itemNode(currentTab)?.offsetWidth,
    tabListEl?.offsetWidth,
  ]);

  useLayoutEffect(() => {
    setStyleDivider();
  }, [setStyleDivider, is_verify]);

  const onInternalTabClick = (
    key: string,
    e: React.MouseEvent | React.KeyboardEvent,
  ) => {
    setCurrentTab(key);
    onTabClick?.(key, e);
    setIsScrolling(false);
  };

  const changeItemDropdown = (item: DropdownItem) => {
    const keyTab = String(item.key);
    setCurrentTab(keyTab);
    setIsScrolling(false);
  };

  const calculatePositionStartEnd = useMemo(
    () => (keyTab: string, typeTab: 'vertical' | 'horizontal') => {
      if (!containerEl || !itemNode(keyTab)) return;
      const position = {
        vertical: 'top',
        horizontal: 'left',
      };
      const offset = {
        vertical: 'offsetHeight',
        horizontal: 'offsetWidth',
      };

      const positionBlockItem =
        itemNode(keyTab).getBoundingClientRect()[position[typeTab]];
      const positionBlockContainer =
        containerEl.getBoundingClientRect()[position[typeTab]];
      const offsetItem = itemNode(keyTab)[offset[typeTab]];
      const offsetContainer = containerEl?.[offset[typeTab]];

      const positionItem = positionBlockItem - positionBlockContainer;
      const startIntoView = positionItem >= 0;
      const endIntoView = positionItem + offsetItem <= offsetContainer;

      return startIntoView && endIntoView;
    },
    [containerEl, itemNode, is_verify],
  );

  const isTabIntoView = useCallback(
    (keyTab: string) => {
      if (isTabVertical) {
        return calculatePositionStartEnd(keyTab, 'vertical');
      } else {
        return calculatePositionStartEnd(keyTab, 'horizontal');
      }
    },
    [isTabVertical, calculatePositionStartEnd, is_verify],
  );

  const calculateScrollIntoView = useCallback(
    (tabType: 'vertical' | 'horizontal') => {
      if (!itemNode(currentTab) || !tabListEl || !containerEl) return;
      const propertyPosition = {
        vertical: 'top',
        horizontal: 'left',
      };
      const propertyOffset = {
        vertical: 'offsetHeight',
        horizontal: 'offsetWidth',
      };
      const propertyBoxModel = {
        vertical: 'height',
        horizontal: 'width',
      };
      let positionScrollIntoItem = 0;
      const positionItem =
        itemNode(currentTab).getBoundingClientRect()[
          propertyPosition[tabType]
        ] - tabListEl.getBoundingClientRect()[propertyPosition[tabType]];
      const offsetCurrentNode = itemNode(currentTab)[propertyOffset[tabType]];
      const offsetContainer = containerEl[propertyOffset[tabType]];
      const boxModelCurrentNode =
        itemNode(currentTab).getBoundingClientRect()?.[
          propertyBoxModel[tabType]
        ];

      if (positionItem + offsetCurrentNode > offsetContainer) {
        positionScrollIntoItem =
          positionItem - offsetContainer + boxModelCurrentNode;
      } else {
        positionScrollIntoItem = positionItem;
      }

      if (!isScrolling) {
        setPositionScroll(
          isTabVertical
            ? { x: 0, y: positionScrollIntoItem }
            : { x: positionScrollIntoItem, y: 0 },
        );
        isTabVertical
          ? (positionScrollRef.current.y = positionScrollIntoItem)
          : (positionScrollRef.current.x = positionScrollIntoItem);
      }
    },
    [itemNode(currentTab), tabListEl, containerEl],
  );

  const onScrollIntoViewTab = useCallback(() => {
    isTabVertical
      ? calculateScrollIntoView('vertical')
      : calculateScrollIntoView('horizontal');
  }, [calculateScrollIntoView, isTabVertical, is_verify]);

  const doMove = useCallback(
    (offset: number) => {
      if (!tabListEl || !containerEl) return;
      let positionScrollEnd = 0;
      if (isTabVertical) {
        positionScrollEnd = tabListEl.offsetHeight - containerEl.offsetHeight;
        positionScrollRef.current.y -= offset;
        if (positionScrollRef.current.y >= positionScrollEnd) {
          positionScrollRef.current.y = positionScrollEnd;
        }
        if (positionScrollRef.current.y <= 0) {
          positionScrollRef.current.y = 0;
        }
      } else {
        positionScrollEnd = tabListEl.offsetWidth - containerEl.offsetWidth;

        positionScrollRef.current.x += offset;
        if (positionScrollRef.current.x >= positionScrollEnd) {
          positionScrollRef.current.x = positionScrollEnd;
        }
        if (positionScrollRef.current.x <= 0) {
          positionScrollRef.current.x = 0;
        }
      }
      setPositionScroll(
        isTabVertical
          ? {
              x: 0,
              y: positionScrollRef.current.y,
            }
          : { x: positionScrollRef.current.x, y: 0 },
      );
    },
    [tabListEl, isTabVertical, containerEl],
  );

  useLayoutEffect(() => {
    if (!isTabIntoView(currentTab)) {
      onScrollIntoViewTab();
    }
  }, [onScrollIntoViewTab, isTabIntoView, currentTab, is_verify]);

  useLayoutEffect(() => {
    if (!items) return;
    const arr = items.filter((item) => !isTabIntoView(item.key));
    setDropdownItems(arr);
  }, [isTabIntoView, items, positionScroll, is_verify]);

  useTouchMove(containerRef, (offsetX, offsetY) => {
    setIsScrolling(true);

    if (isTabVertical) {
      doMove(offsetY);
    } else {
      doMove(offsetX);
    }
    return true;
  });

  if (!is_verify) return null;

  const listItemHeader = (
    <div
      className={customTwMerge(
        'relative flex flex-auto overflow-auto translate-x-0 translate-y-0 whitespace-nowrap scroll-smooth no-scrollbar',
        isTabVertical && 'self-stretch',
      )}
      ref={containerRef}
    >
      <div
        className={customTwMerge(
          'flex gap-2 text-sm font-medium text-center',
          isTabVertical && 'flex-col h-max',
        )}
        role="tablist"
        ref={tabListRef}
        style={{
          transform: `translate(-${positionScroll.x}px, -${positionScroll.y}px)`,
        }}
      >
        {items &&
          items.map((tab) => {
            return (
              <TabNode
                keyTab={tab.key}
                activeTab={currentTab === tab.key}
                onClick={(e) => onInternalTabClick(tab.key, e)}
                className={itemClassName}
                activeClassName={activeClassName}
                {...tab}
              />
            );
          })}
        {!activeClassName && (
          <div
            className={customTwMerge(
              'absolute bottom-0 bg-blue-600 transition-all pointer-events-none',
              isTabVertical ? 'w-0.5 right-0' : 'h-0.5',
            )}
            style={dividerStyle}
          />
        )}
      </div>
    </div>
  );

  const btnOperationClasses = customTwMerge(
    'relative p-3  bg-white before:absolute before:transition-opacity before:opacity-100 before:pointer-events-none before:bg-white flex items-center justify-center',
    isTabVertical
      ? 'w-full before:h-1 before:inset-x-0 before:top-0 before:shadow-[0px_-3px_4px_-1px_rgba(0,0,0,0.25)]'
      : 'self-stretch before:w-1 before:inset-y-0 before:left-0 before:shadow-[-3px_0px_4px_-1px_rgba(0,0,0,0.25)]',
  );
  return (
    <div
      className={customTwMerge(
        'relative flex border-gray-200 dark:border-gray-700',
        tabPosition === 'top' && 'border-b mb-5 items-center w-full',
        tabPosition === 'left' && 'border-r flex-col items-start w-fit',
        className,
      )}
    >
      {listItemHeader}

      {isItemsOver() && (
        <Dropdown
          menu={{
            items: dropdownItems,
            selectable: true,
            selectedKeys: currentTab,
            onChangeItem: changeItemDropdown,
          }}
        >
          <button type="button" className={btnOperationClasses}>
            <span className="w-5 h-5">
              {isTabVertical ? (
                <EllipsisHorizontalOutlined />
              ) : (
                <EllipsisVerticalOutlined />
              )}
            </span>
          </button>
        </Dropdown>
      )}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs';
}

export default memo(Tabs);
