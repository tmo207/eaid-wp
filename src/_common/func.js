import { useLayoutEffect } from 'react';

export function useLockBodyScroll() {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.documentElement)
      .overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => (document.documentElement.style.overflow = originalStyle);
  }, []);
}
