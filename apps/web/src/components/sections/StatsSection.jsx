/**
 * StatsSection.jsx — Metrics bar.
 *
 * 4 stats in a horizontal bar (desktop) / 2×2 grid (mobile).
 * Thin top/bottom borders only, no fill background.
 * Gradient number text + useCountUp animation (iOS-safe).
 */

import React from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import { useCountUp, isIOS, ease } from '@/lib/motion.jsx';

// ─── Stat data ────────────────────────────────────────────────────────────────

const STATS = [
  {
    value: 19,
    suffix: '+',
    label: 'Projects delivered',
    description: 'End-to-end production deployments',
  },
  {
    value: 3,
    suffix: '+',
    label: 'Years of production experience',
    description: 'Live systems serving real users',
  },
  {
    value: 99.9,
    suffix: '%',
    label: 'Uptime SLA',
    description: 'Maintained across all critical services',
  },
  {
    value: 50,
    suffix: 'K+',
    label: 'Users served',
    description: 'Across platforms and client products',
  },
];

// ─── Individual stat card ─────────────────────────────────────────────────────

function StatItem({ stat, index }) {
  const [ref, count] = useCountUp(stat.value, 1.8);
  const prefersReducedMotion = useReducedMotion();
  const ios = isIOS();

  // Format displayed value
  const isFloat = String(stat.value).includes('.');
  const displayed = isFloat
    ? Number(count).toFixed(1)
    : Math.floor(Number(count));

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay: ios ? Math.min(index * 0.06, 0.3) : index * 0.1,
        ease: ease.out,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="flex flex-col gap-1.5 px-6 py-8 md:px-8 md:py-10 text-center md:text-left"
    >
      {/* Number */}
      <div
        className="font-medium tracking-tight leading-none"
        style={{
          fontSize: 'clamp(2rem, 4.5vw, 3rem)',
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {displayed}{stat.suffix}
      </div>

      {/* Label */}
      <div
        className="font-medium text-sm leading-tight"
        style={{ color: 'hsl(var(--foreground))' }}
      >
        {stat.label}
      </div>

      {/* Description */}
      <div
        className="text-xs leading-relaxed"
        style={{ color: 'hsl(var(--muted-foreground))' }}
      >
        {stat.description}
      </div>
    </motion.div>
  );
}

// ─── StatsSection ─────────────────────────────────────────────────────────────

export default function StatsSection() {
  const ios = isIOS();
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <>
      <style>{`
        .stats-grid .stat-cell {
          border-right: 1px solid hsl(var(--border));
          border-bottom: 1px solid hsl(var(--border));
        }
        .stats-grid .stat-cell:nth-child(2n) {
          border-right: none;
        }
        .stats-grid .stat-cell:nth-child(3),
        .stats-grid .stat-cell:nth-child(4) {
          border-bottom: none;
        }
        @media (min-width: 768px) {
          .stats-grid .stat-cell {
            border-right: 1px solid hsl(var(--border));
            border-bottom: none;
          }
          .stats-grid .stat-cell:last-child {
            border-right: none;
          }
          /* First stat sits flush with the shared container edge, like every section heading */
          .stats-grid .stat-cell:first-child > * {
            padding-left: 0;
          }
        }
      `}</style>
      <section
        id="stats"
        className="w-full py-0"
        style={{
          borderTop: '1px solid hsl(var(--border))',
          borderBottom: '1px solid hsl(var(--border))',
        }}
        aria-label="Key metrics"
      >
        <div className="site-container">
          <motion.div
            className="stats-grid grid grid-cols-2 md:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView={(!ios && !prefersReducedMotion) ? 'visible' : undefined}
            animate={(ios || prefersReducedMotion) ? 'visible' : undefined}
            viewport={{ once: true, amount: 0.2 }}
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="stat-cell">
                <StatItem stat={stat} index={i} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
