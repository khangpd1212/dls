import {
  Placement,
  autoUpdate,
  flip,
  shift,
  useFloating,
} from '@floating-ui/react-dom';
import Portal from '@rc-component/portal';
import { useHover } from 'hooks';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useTera } from 'lib';
import CSSMotion from 'rc-motion';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { composeRef, supportRef } from 'rc-util/lib/ref';
import {
  Key,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  Ref,
  cloneElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';
export interface DropdownItem {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  disabled?: boolean;
  key: Key;
  onClick?: (item: DropdownItem, key?: Key) => void;
  value?: Key;
}
export interface MenuDropdownProps {
  selectable?: boolean;
  defaultSelectedKey?: string;
  onChangeItem?: (item: DropdownItem, key?: Key) => void;
  itemClassName?: string;
  selectedKeys?: Key;
  items?: Array<DropdownItem>;
}
export interface DropdownProps {
  menu?: MenuDropdownProps;
  containerClassName?: string;
  children?: ReactElement;
  trigger?: 'click' | 'hover' | 'contextMenu';
  placement?: Placement;
  open?: boolean;
  getPopupContainer?: () => Element | DocumentFragment;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  dropdownRender?: (menus: ReactNode) => ReactNode;
}

export type DropdownRef = {
  referenceRef: React.MutableRefObject<HTMLDivElement>;
  dropdownRef: React.MutableRefObject<HTMLElement>;
};
const Dropdown = forwardRef<DropdownRef, DropdownProps>(
  (
    {
      menu = {},
      containerClassName,
      children,
      onOpenChange,
      open,
      trigger = 'hover',
      placement: customPlacement = 'bottom-start',
      disabled,
      getPopupContainer = () => document.body,
      dropdownRender,
    },
    ref,
  ) => {
    const {
      items = [],
      itemClassName,
      defaultSelectedKey = items[0]?.key,
      selectable,
      onChangeItem,
      selectedKeys,
    } = menu;
    const { refs, floatingStyles } = useFloating<HTMLDivElement>({
      placement: customPlacement,
      whileElementsMounted: autoUpdate,
      middleware: [flip(), shift()],
    });
    const referenceRef = refs.reference;
    const dropdownRef = refs.floating;
    const { isHover, setIsHover } = useHover([referenceRef, dropdownRef]);
    const [visible, setVisible] = useMergedState(false, {
      value: open,
      onChange: onOpenChange,
    });
    const [current, setCurrent] = useMergedState(defaultSelectedKey, {
      defaultValue: defaultSelectedKey,
      value: selectedKeys,
    });

    const dropdownClasses = (otherClass?: string) => {
      const defaultClasses =
        'absolute z-[80] m-0 list-none text-gray-900 bg-white rounded-xsm shadow-xsm dark:bg-gray-700 dark:divide-gray-600 min-w-fit w-40 overflow-y-auto max-h-64';

      return customTwMerge(defaultClasses, otherClass, containerClassName);
    };

    const itemClasses = (key: Key) => {
      const defaultClasses =
        'w-full relative z-[80] flex items-center gap-2.5 p-2.5 text-xxs dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed';

      return customTwMerge(
        defaultClasses,
        itemClassName,
        selectable && current == key ? 'bg-blue-100' : 'hover:bg-gray-100',
      );
    };

    const toggleDropdown: MouseEventHandler<HTMLElement> = (e) => {
      if (!disabled) {
        setVisible(!visible);
      }
      e.preventDefault();
    };
    const onChangeItemInternal = (item: DropdownItem, key?: Key) => {
      onChangeItem?.(item, key);
      item?.onClick?.(item, key);
      setCurrent(item.key);
      setIsHover(false);
      setVisible(false);
    };

    useEffect(() => {
      if (trigger === 'hover' && !disabled) {
        isHover ? setVisible(true) : setVisible(false);
      }
    }, [isHover, trigger]);

    useOnClickOutside(
      [dropdownRef, referenceRef],
      () =>
        visible &&
        (trigger === 'click' || trigger === 'contextMenu') &&
        !disabled &&
        setVisible(false),
    );

    useImperativeHandle(
      ref,
      () => {
        return { referenceRef, dropdownRef };
      },
      [ref],
    );

    const { is_verify } = useTera();
    if (!is_verify) return null;

    const nodeListDropdown = () => {
      return (
        !!items?.length &&
        items.map((item, key) => (
          <button
            type="button"
            disabled={item.disabled}
            className={itemClasses(item?.key)}
            key={item.key}
            onClick={(e) => {
              e.stopPropagation();
              onChangeItemInternal(item, key);
            }}
          >
            {item.icon && <i className="w-4 h-4">{item.icon}</i>}
            <span className="link-outer-container">{item.label}</span>
          </button>
        ))
      );
    };

    return (
      <>
        {cloneElement(children, {
          ...children?.props,
          ref: supportRef(children)
            ? composeRef(
                refs.setReference,
                (children as ReactElement & { ref: Ref<HTMLElement> }).ref,
              )
            : undefined,
          onClick: (e) => {
            children?.props?.onClick?.(e);
            trigger === 'click' && toggleDropdown(e);
          },
          onContextMenu: (e) => {
            children?.props?.onContextMenu?.(e);
            trigger === 'contextMenu' && toggleDropdown(e);
          },
        })}
        <Portal
          getContainer={getPopupContainer && (() => getPopupContainer())}
          open={visible}
          autoDestroy
        >
          <CSSMotion visible={visible} motionName="opacity-motion">
            {({ className }) => (
              <div
                className={dropdownClasses(className)}
                ref={refs.setFloating}
                style={floatingStyles}
              >
                {typeof dropdownRender === 'function'
                  ? dropdownRender(nodeListDropdown())
                  : nodeListDropdown()}
              </div>
            )}
          </CSSMotion>
        </Portal>
      </>
    );
  },
);

export default Dropdown;
