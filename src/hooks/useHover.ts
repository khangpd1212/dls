import { isArray } from 'lodash';
import { RefObject, useEffect, useState } from 'react';

export function useHover<T extends HTMLElement = HTMLElement>(
  elementRefs: RefObject<T> | RefObject<T>[],
) {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const handleEventHover = (
    typeEventListener: 'addEventListener' | 'removeEventListener',
  ) => {
    if (isArray(elementRefs)) {
      elementRefs.forEach((ref) => {
        ref.current?.[typeEventListener]?.('mouseenter', handleMouseEnter);
        ref.current?.[typeEventListener]?.('mouseleave', handleMouseLeave);
      });
    } else {
      elementRefs.current?.[typeEventListener]?.(
        'mouseenter',
        handleMouseEnter,
      );
      elementRefs.current?.[typeEventListener]?.(
        'mouseleave',
        handleMouseLeave,
      );
    }
  };
  useEffect(() => {
    if (!elementRefs) return;

    handleEventHover('addEventListener');
    return () => {
      handleEventHover('removeEventListener');
    };
  }, [elementRefs]);

  return { isHover, setIsHover };
}
