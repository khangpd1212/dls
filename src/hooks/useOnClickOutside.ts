import { isArray } from 'lodash';
import { RefObject } from 'react';
import { useEventListener } from './useEventListener';

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T> | RefObject<T>[],
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
) {
  useEventListener(mouseEvent, (event) => {
    if (!refs) return;
    const target = event.target as Node;
    if (isArray(refs)) {
      const filterToElement = refs.map((element) => element?.current);
      if (
        filterToElement.every(
          (element) => !element?.contains(target) && element !== target,
        )
      ) {
        handler(event);
      }
    } else {
      const el = refs?.current;
      if (el && !el.contains(target)) {
        handler(event);
      }
    }
  });
}
