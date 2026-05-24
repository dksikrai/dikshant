/**
 * HeroSection.jsx — Premium hero: Linear/Vercel/Stripe-inspired dark UI.
 *
 * Layout  : Full-viewport, two-column on desktop (text left | terminal right)
 * Animations: Framer Motion stagger, iOS-safe (no scroll transforms)
 * No background images, no parallax orbs, no WhatsApp button.
 */

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import { FadeIn, isIOS, ease } from '@/lib/motion.jsx';
import { siteConfig } from '@/config/site.js';

// ─── Terminal typewriter lines ────────────────────────────────────────────────

const TERMINAL_LINES = [
  { text: '$ php artisan queue:work --daemon', color: '#e2e8f0', delay: 0 },
  { text: '[2025] Processing: AI.DocumentAnalysis', color: '#94a3b8', delay: 0.6 },
  { text: '✓ OpenAI embeddings generated', color: '#34d399', delay: 1.1 },
  { text: '✓ Vectors stored in Redis cache', color: '#34d399', delay: 1.5 },
  { text: '✓ Background job: notifyClient', color: '#34d399', delay: 1.9 },
  { text: '✓ Webhook → Stripe confirmed', color: '#34d399', delay: 2.3 },
  { text: '', color: 'transparent', delay: 2.6 },
  { text: '$ redis-cli monitor', color: '#e2e8f0', delay: 2.8 },
  { text: 'Queue depth: 0 | Workers: 4 active', color: '#67e8f9', delay: 3.2 },
  { text: 'Horizon status: running ✓', color: '#67e8f9', delay: 3.6 },
];

// ─── Stagger container variants ───────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.out },
  },
};

// iOS-safe: mount-triggered variants (no whileInView)
const itemVariantsIOS = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.out },
  },
};

// ─── Terminal Panel ────────────────────────────────────────────────────────────

function TerminalPanel() {
  const [visibleLines, setVisibleLines] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || isIOS()) {
      // Show all lines immediately
      setVisibleLines(TERMINAL_LINES.map((_, i) => i));
      return;
    }

    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay * 1000)
    );

    return () => timers.forEach(clearTimeout);
  }, [prefersReducedMotion]);

  return (
    <div className="terminal rounded-xl overflow-hidden w-full max-w-[520px] flex-shrink-0">
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07]"
           style={{ background: 'rgba(255,255,255,0.03)' }}>
        <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
        <span className="ml-3 text-xs text-white/30 tracking-wide select-none font-mono">
          terminal — bash
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 min-h-[280px]" style={{ fontFamily: "'Geist Mono','JetBrains Mono',ui-monospace,monospace" }}>
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            className="text-sm leading-7 transition-all duration-300"
            style={{
              color: line.color,
              opacity: visibleLines.includes(i) ? 1 : 0,
              transform: visibleLines.includes(i) ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
              minHeight: '1.75rem',
            }}
          >
            {line.text || '\u00A0'}
          </div>
        ))}
        {/* Blinking cursor */}
        <span
          className="inline-block w-2 h-4 ml-0.5 align-middle"
          style={{
            background: '#67e8f9',
            animation: 'blink-cursor 1s step-end infinite',
          }}
        />
      </div>
    </div>
  );
}

// ─── Scroll Hint ──────────────────────────────────────────────────────────────

function ScrollHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
      style={{
        opacity: visible ? 0.45 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <span className="text-xs tracking-widest uppercase font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>
        scroll
      </span>
      <span className="text-base" style={{ color: 'hsl(var(--muted-foreground))' }}>↓</span>
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────

export default function HeroSection() {
  const ios = isIOS();
  const prefersReducedMotion = useReducedMotion();

  const MotionContainer = motion.div;
  const motionContainerProps = ios || prefersReducedMotion
    ? {
        initial: 'hidden',
        animate: 'visible',
        variants: containerVariants,
      }
    : {
        initial: 'hidden',
        animate: 'visible',
        variants: containerVariants,
      };

  const childVariants = ios ? itemVariantsIOS : itemVariants;

  return (
    <>
      {/* Blink cursor keyframe injected once */}
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ paddingTop: '5rem' }}
      >
        {/* Subtle radial glow — no orbs, just a faint ambient wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 40%, hsl(243 88% 68% / 0.06) 0%, transparent 65%), ' +
              'radial-gradient(ellipse 60% 50% at 80% 70%, hsl(192 80% 55% / 0.04) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-8 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-14 lg:gap-20">

            {/* ── LEFT COLUMN ──────────────────────────────────────────── */}
            <MotionContainer
              {...motionContainerProps}
              className="flex-1 flex flex-col gap-6 min-w-0"
            >
              {/* Status badge */}
              <motion.div variants={childVariants}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
                     style={{
                       borderColor: 'rgba(52,211,153,0.25)',
                       background: 'rgba(52,211,153,0.07)',
                       color: '#34d399',
                     }}>
                  <span className="status-dot flex-shrink-0" />
                  Available for Senior Roles
                </div>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                variants={childVariants}
                className="text-foreground"
                style={{
                  fontWeight: 800,
                  letterSpacing: '-0.05em',
                  lineHeight: 1.08,
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                }}
              >
                I Build Scalable Backend Systems, AI Workflows &amp; Production SaaS.
              </motion.h1>

              {/* Sub-role line */}
              <motion.p
                variants={childVariants}
                className="font-mono text-sm tracking-wide"
                style={{ color: 'hsl(var(--muted-foreground))', letterSpacing: '0.02em' }}
              >
                Backend Engineer · Laravel · AWS · OpenAI
              </motion.p>

              {/* Description */}
              <motion.p
                variants={childVariants}
                className="max-w-xl text-base leading-relaxed"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                Specializing in production-grade APIs, queue-driven architectures,
                Redis&nbsp;/&nbsp;Horizon monitoring, and AI-powered automation pipelines.
                Building systems that scale.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={childVariants}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                {/* Primary — View My Work */}
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white
                             transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: 'hsl(243 88% 68%)' }}
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View My Work
                  <ArrowRight size={15} strokeWidth={2.5} />
                </a>

                {/* Secondary — Download Resume */}
                <a
                  href={siteConfig.resume}
                  download={siteConfig.resumeFilename}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm
                             border transition-all duration-200 hover:bg-white/[0.05] active:scale-[0.98]"
                  style={{
                    borderColor: 'rgba(255,255,255,0.14)',
                    color: 'hsl(var(--foreground))',
                  }}
                >
                  <Download size={14} strokeWidth={2} />
                  Download Resume
                </a>

                {/* Tertiary — GitHub */}
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium
                             transition-colors duration-200 hover:text-white"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  GitHub
                  <ExternalLink size={13} strokeWidth={2} />
                </a>
              </motion.div>
            </MotionContainer>

            {/* ── RIGHT COLUMN (terminal) — hidden on mobile ────────── */}
            <FadeIn
              delay={0.35}
              y={24}
              className="hidden md:flex flex-shrink-0 justify-center w-full md:w-auto"
            >
              <TerminalPanel />
            </FadeIn>

          </div>
        </div>

        {/* Scroll hint */}
        <ScrollHint />
      </section>
    </>
  );
}
