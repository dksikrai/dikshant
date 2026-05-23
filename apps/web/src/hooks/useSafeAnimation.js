import { useMemo } from 'react';

/**
 * Detects iOS Safari (iPhone/iPad) reliably.
 * iOS Safari has a known bug where IntersectionObserver (used by Framer Motion's
 * whileInView) doesn't work correctly when overflow properties are set,
 * causing elements to stay invisible forever after the hero section.
 */
const isIOSSafari = () => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const isIOS = /iP(hone|od|ad)/.test(ua);
  const isWebKit = /WebKit/.test(ua);
  const isSafari = !/CriOS|FxiOS|OPiOS|mercury/.test(ua);
  return isIOS && isWebKit && isSafari;
};

/**
 * Returns safe Framer Motion animation props.
 * On iOS Safari: no scroll-triggered animations (content always visible).
 * On Desktop/Android: full whileInView animations.
 *
 * Usage:
 *   const { initial, animate, viewport, transition } = useSafeAnimation(
 *     { opacity: 0, y: 20 },   // initial
 *     { opacity: 1, y: 0 },    // animate
 *     { duration: 0.5 }         // transition
 *   );
 *   <motion.div initial={initial} whileInView={animate} viewport={viewport} transition={transition} />
 */
export const useSafeAnimation = (initialProps, animateProps, transitionProps = {}) => {
  return useMemo(() => {
    if (isIOSSafari()) {
      // On iOS Safari: skip scroll animations entirely — show content immediately
      return {
        initial: animateProps, // start in the final state
        animate: animateProps,
        whileInView: undefined,
        viewport: undefined,
        transition: { duration: 0 },
      };
    }
    return {
      initial: initialProps,
      animate: undefined,
      whileInView: animateProps,
      viewport: { once: true, amount: 0.05 },
      transition: { duration: 0.5, ease: 'easeOut', ...transitionProps },
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

/**
 * Simple helper to get viewport prop safe for iOS.
 * Use this to replace `viewport={{ once: true, amount: 0.05 }}` in existing components.
 */
export const safeViewport = () => {
  if (typeof window !== 'undefined' && isIOSSafari()) {
    return undefined;
  }
  return { once: true, amount: 0.05 };
};

/**
 * Safe initial state — on iOS Safari, start visible.
 */
export const safeInitial = (initial) => {
  if (typeof window !== 'undefined' && isIOSSafari()) {
    return {}; // no initial hidden state on iOS
  }
  return initial;
};
