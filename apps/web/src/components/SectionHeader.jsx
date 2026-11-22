import React from 'react';
import { FadeIn } from '@/lib/motion.jsx';

/**
 * The one section heading used across the site: label, h2, optional description.
 * Left-aligned by default; `align="center"` is reserved for closing call-to-action blocks.
 */
const SectionHeader = ({ label, title, description, id, align = 'left', compact = false, className = '' }) => {
  const center = align === 'center';
  return (
    <div className={`${compact ? '' : 'mb-12 md:mb-16'} max-w-3xl ${center ? 'mx-auto text-center' : ''} ${className}`}>
      <FadeIn delay={0}>
        <span className="section-label block mb-4">{label}</span>
      </FadeIn>
      <FadeIn delay={0.07}>
        <h2 id={id} className="text-foreground">{title}</h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.12}>
          <p className={`text-muted-foreground mt-4 max-w-2xl ${center ? 'mx-auto' : ''}`} style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)' }}>
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
};

export default SectionHeader;
