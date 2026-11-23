/**
 * HeroSection.jsx: headline and actions on the left, a quiet terminal view on the right.
 * One primary and one secondary action. Motion: a single short fade and rise on load.
 */

import React, { useEffect, useState } from 'react';
import { m as motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { startInquiry } from '@/lib/contactIntent.js';
import { FadeIn, isIOS, ease } from '@/lib/motion.jsx';

// ─── Terminal typewriter lines ────────────────────────────────────────────────

const TERMINAL_LINES = [
  { text: '$ php artisan queue:work --daemon', color: 'hsl(223 25% 95%)', delay: 0 },
  { text: '[2025] Processing: AI.DocumentAnalysis', color: 'hsl(222 14% 68%)', delay: 0.6 },
  { text: '✓ OpenAI embeddings generated', color: '#4cc38a', delay: 1.1 },
  { text: '✓ Vectors stored in Redis cache', color: '#4cc38a', delay: 1.5 },
  { text: '✓ Background job: notifyClient', color: '#4cc38a', delay: 1.9 },
  { text: '✓ Webhook → Stripe confirmed', color: '#4cc38a', delay: 2.3 },
  { text: '', color: 'transparent', delay: 2.6 },
  { text: '$ redis-cli monitor', color: 'hsl(223 25% 95%)', delay: 2.8 },
  { text: 'Queue depth: 0 | Workers: 4 active', color: 'hsl(199 89% 62%)', delay: 3.2 },
  { text: 'Horizon status: running ✓', color: 'hsl(199 89% 62%)', delay: 3.6 },
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
    <p className="font-mono text-sm text-muted-foreground flex items-center gap-2 min-h-[1.5rem]">
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
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ease.out },
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
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-3 text-xs text-muted-foreground select-none font-mono">
          bash
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 min-h-[280px]" style={{ fontFamily: "'Geist Mono','JetBrains Mono',ui-monospace,monospace" }}>
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            className="text-sm leading-7"
            style={{
              color: line.color,
              opacity: visibleLines.includes(i) ? 1 : 0,
              transition: 'opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              minHeight: '1.75rem',
            }}
          >
            {line.text || '\u00A0'}
          </div>
        ))}
        {/* Cursor */}
        <span
          className="inline-block w-2 h-4 ml-0.5 align-middle"
          style={{ background: 'hsl(199 89% 62%)' }}
        />
      </div>
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────

export default function HeroSection() {
  const ios = isIOS();
  const childVariants = ios ? itemVariantsIOS : itemVariants;

  return (
    <section
      id="hero"
      className="relative min-h-screen-safe flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '5rem' }}
    >
      <div className="site-container z-10 py-8 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Left column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 flex flex-col gap-6 min-w-0"
          >
            {/* Availability: the one live signal on the page */}
            <motion.p variants={childVariants} className="m-0 flex items-center gap-2 text-sm text-foreground/80">
              <span className="status-dot flex-shrink-0" aria-hidden="true" />
              Available for consulting and new projects
            </motion.p>

            <motion.h1 variants={childVariants} className="text-foreground">
              I build web apps, APIs and AI workflows that scale, full-stack, end to end
            </motion.h1>

            <motion.div variants={childVariants}>
              <RotatingRole />
            </motion.div>

            <motion.p variants={childVariants} className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Full-stack development and technical consulting for businesses: Next.js, React,
              Node.js, Python and Laravel applications, AI automation, and the AWS and server
              setup to run them. From first scope to launch and support.
            </motion.p>

            <motion.div variants={childVariants} className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg" className="h-12 sm:h-11 w-full sm:w-auto rounded-lg px-6">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    startInquiry({ inquiry: 'Consulting', subject: 'Consultation request' });
                  }}
                >
                  Book a consultation
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="glass" size="lg" className="h-12 sm:h-11 w-full sm:w-auto rounded-lg px-6">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View my work
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column: terminal, hidden on mobile */}
          <FadeIn delay={0.25} y={12} className="hidden md:flex flex-shrink-0 justify-center w-full md:w-auto">
            <TerminalPanel />
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
