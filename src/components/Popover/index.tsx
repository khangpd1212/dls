import {
  Placement,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom';
import Portal from '@rc-component/portal';
import { useHover, useOnClickOutside } from 'hooks';
import { useTera } from 'lib';
import CSSMotion from 'rc-motion';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import {
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export interface PopoverProps {
  content?: ReactNode;
  title?: ReactNode;
  children?: ReactElement;
  placement?: Placement;
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showArrow?: boolean;
  getPopupContainer?: () => Element | DocumentFragment;
  classNameTitle?: string;
  autoLock?: boolean;
  autoDestroy?: boolean;
}
const Popover = ({
  children,
  placement: customPlacement = 'top',
  onOpenChange,
  open,
  title,
  trigger = 'hover',
  className,
  content,
  showArrow = true,
  classNameTitle,
  getPopupContainer = () => document.body,
  autoDestroy,
  autoLock,
}: PopoverProps) => {
  const refArrow = useRef<HTMLDivElement>(null);
  const arrowEl = refArrow.current;
  const { refs, floatingStyles, placement, middlewareData } =
    useFloating<HTMLElement>({
      transform: false,
      placement: customPlacement,
      whileElementsMounted: autoUpdate,
      middleware: [
        flip(),
        shift(),
        showArrow &&
          arrow({
            element: refArrow,
          }),
      ],
    });
  const { isHover } = useHover([refs.reference, refs.floating]);
  const [isOpen, setIsOpen] = useMergedState(false, {
    value: open,
    onChange: onOpenChange,
  });
  const [arrowStyles, setArrowStyles] = useState({});

  useEffect(() => {
    if (trigger === 'hover') {
      return isHover ? setIsOpen(true) : setIsOpen(false);
    }
  }, [trigger, isHover]);

  useEffect(() => {
    if (!arrowEl) {
      return;
    }
    const arrowWidth = arrowEl.offsetWidth;

    const side = placement.split('-');

    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[side[0]];

    if (middlewareData.arrow) {
      const { x, y } = middlewareData.arrow;
      let customX = {};
      if (side[1] === 'start') {
        customX = { left: '12px' };
      } else if (side[1] === 'end') {
        customX = { right: '12px' };
      } else {
        customX = { left: `${x}px` };
      }
      setArrowStyles({
        ...customX,
        top: y != null ? `${y}px` : '',
        [staticSide]: `${-arrowWidth / 2}px`,
        transform: 'rotate(45deg)',
      });
    }
  }, [middlewareData]);

  const popoverClasses = customTwMerge(
    'inline-block p-3 text-gray-800 bg-white shadow-md rounded-md text-xxs dark:bg-gray-700 z-[90]',
    className,
  );
  const handleTogglePopover = (e) => {
    e.preventDefault();
    if (trigger === 'click' || trigger === 'contextMenu') {
      setIsOpen(!isOpen);
    }
    if (trigger === 'focus') {
      setIsOpen(true);
    }
  };

  useOnClickOutside(
    [refs.floating, refs.reference],
    () =>
      isOpen &&
      (trigger === 'click' || trigger === 'contextMenu') &&
      setIsOpen(false),
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;

  const nodePopover = (
    <CSSMotion visible={isOpen} motionName="opacity-motion">
      {({ className }) => (
        <div
          style={floatingStyles}
          role="tooltip"
          ref={refs.setFloating}
          className={customTwMerge(popoverClasses, className)}
        >
          {title && (
            <div
              className={customTwMerge(
                'min-w-[177px] mb-2 font-semibold break-words',
                classNameTitle,
              )}
            >
              {title}
            </div>
          )}
          {content && content}
          {showArrow && (
            <div
              className="absolute w-2 h-2 pointer-events-none bg-inherit"
              ref={refArrow}
              style={arrowStyles}
            />
          )}
        </div>
      )}
    </CSSMotion>
  );

  const renderChildren = cloneElement(children, {
    ...children?.props,
    ref: refs.setReference,
    onClick: (e) => {
      children?.props?.onClick?.(e);
      trigger === 'click' && handleTogglePopover(e);
    },
    onFocus: (e) => {
      children?.props?.onFocus?.(e);
      trigger === 'focus' && handleTogglePopover(e);
    },
    onContextMenu: (e) => {
      children?.props?.onContextMenu?.(e);
      trigger === 'contextMenu' && handleTogglePopover(e);
    },
  });

  return (
    <>
      {renderChildren}
      <Portal
        getContainer={getPopupContainer && (() => getPopupContainer())}
        open={isOpen}
        autoDestroy={autoDestroy}
        autoLock={autoLock}
      >
        {nodePopover}
      </Portal>
    </>
  );
};

export default Popover;
