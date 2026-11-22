/**
 * HeroSection.jsx — Premium hero: Linear/Vercel/Stripe-inspired dark UI.
 *
 * Layout  : Full-viewport, two-column on desktop (text left | terminal right)
 * Animations: Framer Motion stagger, iOS-safe (no scroll transforms)
 * No background images, no parallax orbs, no WhatsApp button.
 */

import React, { useEffect, useState } from 'react';
import { m as motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { startInquiry } from '@/lib/contactIntent.js';
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

// ─── Rotating focus line ──────────────────────────────────────────────────────

const ROLES = [
  'Next.js & React web apps',
  'Node.js, Python & Laravel APIs',
  'OpenAI-powered workflows',
  'AWS & server setup that stays up',
];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <p className="font-mono text-sm tracking-wide text-muted-foreground flex items-center gap-2 min-h-[1.5rem]">
      <span className="text-primary">&gt;</span>
      <span className="sr-only">Full-Stack Developer · Next.js · Node.js · Python · Laravel · AWS</span>
      <span aria-hidden="true" className="relative inline-flex overflow-hidden h-6 items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.out }}
            className="whitespace-nowrap"
          >
            {ROLES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}

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
      className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 pointer-events-none"
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

  const { scrollY } = useScroll();
  // Ambient glow drifts slower than the page for subtle depth (transform-only).
  const glowY = useTransform(scrollY, [0, 600], [0, prefersReducedMotion || ios ? 0 : 90]);

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
        className="relative min-h-screen-safe flex flex-col justify-center overflow-hidden"
        style={{ paddingTop: '5rem' }}
      >
        {/* Subtle radial glow — no orbs, just a faint ambient wash */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            y: glowY,
            background:
              'radial-gradient(ellipse 80% 60% at 20% 40%, hsl(243 88% 68% / 0.06) 0%, transparent 65%), ' +
              'radial-gradient(ellipse 60% 50% at 80% 70%, hsl(192 80% 55% / 0.04) 0%, transparent 60%)',
          }}
        />

        <div className="site-container z-10 py-8 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-14 lg:gap-20">

            {/* ── LEFT COLUMN ──────────────────────────────────────────── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex-1 flex flex-col gap-6 min-w-0"
            >
              {/* Status badge */}
              <motion.div variants={childVariants}>
                <Badge
                  variant="outline"
                  className="glass-pill gap-2 rounded-full border-emerald-400/25 px-3.5 py-1.5 text-xs font-medium text-emerald-300"
                >
                  <span className="status-dot flex-shrink-0" />
                  Available for consulting & new projects
                </Badge>
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
                I Build Web Apps, APIs &amp; AI Workflows That Scale: Full-Stack, End to End.
              </motion.h1>

              {/* Rotating focus line */}
              <motion.div variants={childVariants}>
                <RotatingRole />
              </motion.div>

              {/* Description */}
              <motion.p
                variants={childVariants}
                className="max-w-xl text-base leading-relaxed"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                Full-stack development and technical consulting for businesses: Next.js, React,
                Node.js, Python and Laravel applications, AI automation, and the AWS and server
                setup to run them. From first scope to launch and support.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={childVariants}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                <motion.div className="w-full sm:w-auto" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild size="lg" className="h-12 sm:h-11 w-full sm:w-auto rounded-full px-6 font-semibold shadow-lg shadow-primary/30">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        startInquiry({ inquiry: 'Consulting', subject: 'Consultation request' });
                      }}
                    >
                      Book a Consultation
                      <ArrowRight strokeWidth={2.5} />
                    </a>
                  </Button>
                </motion.div>

                <motion.div className="w-full sm:w-auto" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild variant="glass" size="lg" className="h-12 sm:h-11 w-full sm:w-auto rounded-full px-6 font-semibold">
                    <a
                      href="#projects"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      View My Work
                    </a>
                  </Button>
                </motion.div>

                <Button asChild variant="link" className="h-11 text-muted-foreground hover:text-foreground">
                  <a href={siteConfig.resume} download={siteConfig.resumeFilename}>
                    <Download strokeWidth={2} />
                    Resume
                  </a>
                </Button>
                <Button asChild variant="link" className="h-11 text-muted-foreground hover:text-foreground">
                  <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                    <ExternalLink strokeWidth={2} />
                  </a>
                </Button>
              </motion.div>
            </motion.div>

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
