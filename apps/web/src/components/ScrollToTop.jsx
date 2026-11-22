import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

/**
 * Scroll to top on route change, or to the `#section` in the URL.
 * Home sections are lazy-loaded, so a hash target may not exist yet: retry briefly.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }
    let tries = 0;
    let timer;
    const seek = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (tries++ < 30) {
        timer = setTimeout(seek, 100);
      }
    };
    seek();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
