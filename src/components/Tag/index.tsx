import { XMarkOutlined } from 'icons';
import React, {
  ForwardRefRenderFunction,
  HTMLProps,
  MouseEvent,
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import { PresetColors, bgVariants, borderVariants } from './style';
import { useTera } from 'lib';

export interface TagProps {
  className?: string;
  closeClassName?: string;
  closable?: boolean;
  closeIcon?: ReactNode;
  visible?: boolean;
  children?: ReactNode;
  border?: boolean;
  onClose?: (e: MouseEvent<HTMLElement>) => void;
  color?: PresetColors;
  spanProps?: HTMLProps<HTMLSpanElement>;
}

const InternalTag: ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (
  props,
  ref,
) => {
  const {
    className,
    children,
    onClose,
    closeIcon,
    closable = false,
    color = 'gray01',
    border,
    spanProps,
    closeClassName,
  } = props;

  const defaultClasses =
    'inline-flex items-center px-2 py-1 gap-2.5 font-normal rounded transition-opacity duration-300 ease-out overflow-hidden';
  const [visible, setVisible] = useState(true);
  const [customClasses, setCustomClasses] = useState(
    customTwMerge(defaultClasses),
  );

  useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible!);
    }
  }, [props.visible]);

  useEffect(() => {
    setCustomClasses(() =>
      customTwMerge(
        defaultClasses,
        className,
        bgVariants[color],
        border && [borderVariants[color], 'border'],
        !visible && 'opacity-0',
      ),
    );
  }, [className, visible, border, color]);

  useEffect(() => {
    if (!visible) {
      const timeout = setTimeout(() => {
        setCustomClasses((prev) => customTwMerge(prev, 'hidden'));
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [visible]);

  const handleCloseClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);

    if (e.defaultPrevented) {
      return;
    }
    setVisible(false);
  };

  const closeIconNode = useMemo<ReactNode>(() => {
    if (closable) {
      return (
        <button
          type="button"
          className={customTwMerge(
            'flex items-center text-gray-500 bg-transparent rounded-sm hover:text-gray-700',
            closeClassName,
          )}
          aria-label="Remove"
          onClick={handleCloseClick}
        >
          {closeIcon || <XMarkOutlined className="w-4 h-4" />}
          <span className="sr-only">Remove badge</span>
        </button>
      );
    }
    return null;
  }, [closable, closeIcon]);

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <span ref={ref} className={customClasses} {...spanProps}>
      <span className="truncate leading-4">{children}</span>
      {closeIconNode}
    </span>
  );
};

const Tag = forwardRef<HTMLSpanElement, TagProps>(InternalTag);

if (process.env.NODE_ENV !== 'production') {
  Tag.displayName = 'Tag';
}
export default Tag;
