/**
 * HeroSection.jsx: headline and actions on the left, a delivery board on the right.
 * One primary and one secondary action. Motion: a single short fade and rise on load.
 */

import React, { useEffect, useState } from 'react';
import { m as motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { startInquiry } from '@/lib/contactIntent.js';
import { FadeIn, isIOS, ease } from '@/lib/motion.jsx';
import { DeliveryBoard } from '@/components/Illustrations.jsx';

// ─── Rotating focus line ──────────────────────────────────────────────────────

const ROLES = [
  'Project planning and delivery',
  'Scope, milestones and risk',
  'Developers, design and QA in sync',
  'Hands-on with Laravel, Node.js and AWS',
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
      <span className="sr-only">Project Manager · Software delivery · Laravel · Node.js · AWS</span>
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
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16 xl:gap-20">

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
              I plan and deliver software projects, from first scope to launch
            </motion.h1>

            <motion.div variants={childVariants}>
              <RotatingRole />
            </motion.div>

            <motion.p variants={childVariants} className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Project Manager at iTechPanel LLP. I turn business requirements into clear plans,
              keep developers, designers and QA moving together, and ship API-driven systems
              with the hands-on technical depth to back every estimate.
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
                  Start a project
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
                  View my projects
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column: terminal, hidden on mobile */}
          <FadeIn delay={0.25} y={12} className="hidden md:flex flex-shrink-0 justify-center w-full pb-6 lg:w-auto lg:pb-0">
            <div className="relative">
              <DeliveryBoard />
              {/* Glass status card floating over the terminal's corner */}
              <div className="glass-surface absolute -bottom-5 -left-8 flex items-center gap-3 rounded-2xl px-4 py-3">
                <span className="status-dot shrink-0" aria-hidden="true" />
                <div className="leading-tight">
                  <p className="m-0 text-sm font-medium text-foreground">Project Manager, iTechPanel</p>
                  <p className="m-0 text-xs text-muted-foreground">Taking on new client projects</p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
