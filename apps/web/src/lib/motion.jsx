/**
 * motion.jsx — Premium Framer Motion animation system
 *
 * Architecture:
 * - iOS Safari gets NO scroll animations (IntersectionObserver is broken there)
 * - Desktop gets world-class premium animations
 * - All animations are GPU-composited: only opacity + transform
 * - Easing: custom cubic-bezier curves for a premium, intentional feel
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';

// ─── Device Detection ─────────────────────────────────────────────────────────

export const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iP(hone|od|ad)/.test(window.navigator.userAgent);
};

export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// ─── Premium Easing Curves ────────────────────────────────────────────────────

export const ease = {
  /** Smooth, slightly snappy — general purpose */
  out:       [0.22, 1, 0.36, 1],
  /** Fast out, very slight bounce — headings, hero */
  spring:    [0.34, 1.26, 0.64, 1],
  /** Gentle, premium — cards, large blocks */
  soft:      [0.25, 0.46, 0.45, 0.94],
  /** Cinematic — full-screen transitions */
  cinematic: [0.76, 0, 0.24, 1],
};

// ─── Variant Factories ────────────────────────────────────────────────────────

export const fadeUp = (delay = 0, distance = 28) => ({
  hidden:  { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: ease.out } },
});

export const fadeDown = (delay = 0) => ({
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, delay, ease: ease.out } },
});

export const fadeLeft = (delay = 0) => ({
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.6, delay, ease: ease.out } },
});

export const fadeRight = (delay = 0) => ({
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.6, delay, ease: ease.out } },
});

export const scaleIn = (delay = 0) => ({
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, delay, ease: ease.spring } },
});

/** Stagger container — use as parent for lists of animated children */
export const staggerContainer = (staggerDelay = 0.08, childDelay = 0.05) => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay, delayChildren: childDelay } },
});

/** Child for staggerContainer */
export const staggerChild = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
};

/** Word-level stagger child for text reveals */
export const wordChild = {
  hidden:  { opacity: 0, y: 24, rotateX: -15 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.55, ease: ease.spring } },
};

// ─── FadeIn Component ─────────────────────────────────────────────────────────

/**
 * <FadeIn> — iOS-safe scroll fade wrapper.
 * Props: delay, duration, y, x, scale, className, style, as ('div'|'section'|etc.)
 */
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.55,
  y = 20,
  x = 0,
  scale = 1,
  className,
  style,
  as: Tag = 'div',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[Tag] ?? motion.div;

  // On iOS: use initial+animate (mount-triggered) instead of whileInView (scroll-triggered).
  // IntersectionObserver is unreliable on iOS Safari so we avoid it entirely.
  // Mount-triggered animations work perfectly — React renders everything to the DOM on load.
  if (isIOS()) {
    return (
      <MotionTag
        className={className}
        style={style}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: Math.min(delay, 0.6), ease: ease.out }}
      >
        {children}
      </MotionTag>
    );
  }

  // No animation for users who prefer reduced motion
  if (prefersReducedMotion) {
    return <MotionTag className={className} style={style}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration, delay, ease: ease.out }}
    >
      {children}
    </MotionTag>
  );
};


// ─── SlideIn Component ────────────────────────────────────────────────────────

/**
 * <SlideIn> — slides from left or right.
 * direction: 'left' | 'right'
 */
export const SlideIn = ({ children, direction = 'left', delay = 0, className, style }) => {
  const prefersReducedMotion = useReducedMotion();
  const x = direction === 'left' ? -36 : 36;

  if (isIOS()) {
    return (
      <motion.div
        className={className}
        style={style}
        initial={{ opacity: 0, x: x / 2 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: Math.min(delay, 0.5), ease: ease.out }}
      >
        {children}
      </motion.div>
    );
  }

  if (prefersReducedMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
};

// ─── StaggerGrid Component ────────────────────────────────────────────────────

/**
 * <StaggerGrid> — wraps a grid/list of children and staggers their entrance.
 * Wrap the parent container; each direct child will animate in sequence.
 */
export const StaggerGrid = ({ children, className, style, delay = 0, stagger = 0.1 }) => {
  const prefersReducedMotion = useReducedMotion();

  if (isIOS()) {
    // On iOS give a simple stagger via CSS-like sequential animation
    return (
      <div className={className} style={style}>
        {React.Children.map(children, (child_el, i) =>
          child_el ? (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.5) }}
            >
              {child_el}
            </motion.div>
          ) : null
        )}
      </div>
    );
  }

  if (prefersReducedMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const child = {
    hidden:  { opacity: 0, y: 20, scale: 0.97 },
    visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.45, ease: ease.out } },
  };

  return (
    <motion.div
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      {React.Children.map(children, (child_el, i) =>
        child_el ? (
          <motion.div key={i} variants={child} style={{ height: '100%' }}>
            {child_el}
          </motion.div>
        ) : null
      )}
    </motion.div>
  );
};

// ─── TextReveal Component ─────────────────────────────────────────────────────

/**
 * <TextReveal> — splits text into words and staggers them in.
 * Great for section headings and hero text.
 * Falls back to plain span on iOS.
 */
export const TextReveal = ({ text, className, delay = 0, as: Tag = 'span' }) => {
  const prefersReducedMotion = useReducedMotion();

  if (isIOS() || prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
  };

  const word = {
    hidden:  { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.5, ease: ease.spring },
    },
  };

  return (
    <motion.span
      className={`inline ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      aria-label={text}
      style={{ perspective: 800 }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className="inline-block"
          style={{ marginRight: '0.25em', willChange: 'transform, opacity' }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ─── CountUp Hook ─────────────────────────────────────────────────────────────

/**
 * useCountUp — animates a number from 0 to `end` when element enters view.
 * Returns [ref, displayValue].
 * On iOS: returns the final value immediately (no animation).
 */
export const useCountUp = (end, duration = 1.8, suffix = '') => {
  const ref = useRef(null);
  const [value, setValue] = useState(isIOS() ? end : 0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isIOS()) { setValue(end); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Extract numeric part
          const num = parseFloat(String(end).replace(/[^0-9.]/g, ''));
          const isFloat = String(end).includes('.');
          let start = null;

          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = num * eased;
            setValue(isFloat ? current.toFixed(1) : Math.floor(current));
            if (progress < 1) requestAnimationFrame(step);
            else setValue(end);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return [ref, value];
};

// ─── Card Tilt Hook (Desktop only) ───────────────────────────────────────────

/**
 * useCardTilt — 3D tilt effect on mouse move.
 * Returns { ref, style } to spread on a motion.div.
 * No-op on iOS/touch.
 */
export const useCardTilt = (intensity = 8) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });

  if (isTouchDevice()) {
    return { ref, motionProps: {}, isTouch: true };
  }

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    motionProps: {
      style: { rotateX, rotateY, transformStyle: 'preserve-3d' },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
    isTouch: false,
  };
};

// ─── Reveal Line Component ────────────────────────────────────────────────────

/**
 * <RevealLine> — an animated underline/accent line that expands from left.
 */
export const RevealLine = ({ className = '', delay = 0 }) => {
  const prefersReducedMotion = useReducedMotion();

  if (isIOS() || prefersReducedMotion) {
    return <div className={`h-1 w-full ${className}`} />;
  }

  return (
    <motion.div
      className={`h-0.5 origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay, ease: ease.out }}
    />
  );
};
