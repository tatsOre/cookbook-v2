import { RefObject, useEffect } from 'react';

/**
 * Listens for click events that occur somewhere in the document, outside of the specified element.
 * @param ref - React ref representing the element to monitor for outside clicks.
 * @param callback - Function to be called when an outside click is detected.
 */
function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      event.stopPropagation();

      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (ref.current && (event.key === 'Escape' || event.code === 'Escape')) {
        callback();
      }
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [ref, callback]);
}

export default useClickOutside;
