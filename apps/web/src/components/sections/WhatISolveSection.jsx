import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FadeIn, StaggerGrid } from '@/lib/motion.jsx';

const solutions = [
  {
    title: 'Scalable API Backends',
    description: 'Build REST/GraphQL APIs that handle millions of requests',
  },
  {
    title: 'AI-Powered Automation',
    description: 'Integrate OpenAI, build RAG pipelines, automate workflows',
  },
  {
    title: 'Queue-Based Architecture',
    description: 'Redis + Horizon for reliable async job processing',
  },
  {
    title: 'Cloud Infrastructure',
    description: 'AWS EC2, S3, deployment pipelines, monitoring setup',
  },
  {
    title: 'High-Performance Ecommerce',
    description: 'WooCommerce + custom checkout + payment automation',
  },
  {
    title: 'Production Debugging',
    description: 'Identify bottlenecks, optimize queries, fix production issues fast',
  },
  {
    title: 'SaaS Platform Engineering',
    description: 'Multi-tenant systems, subscription billing, API-first design',
  },
  {
    title: 'System Design Consulting',
    description: 'Architecture reviews, database design, scaling strategies',
  },
];

const SolutionCard = ({ title, description }) => (
  <article
    className="glass-card hover-glow rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 cursor-default h-full"
    aria-label={title}
  >
    <div className="flex items-start gap-3">
      <CheckCircle2
        size={18}
        className="shrink-0 mt-0.5"
        style={{ color: 'hsl(243,88%,68%)' }}
        strokeWidth={2}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1.5">
        <h3
          className="text-foreground font-semibold leading-snug"
          style={{ fontSize: '0.95rem', letterSpacing: '-0.01em' }}
        >
          {title}
        </h3>
        <p
          className="text-muted-foreground leading-relaxed m-0"
          style={{ fontSize: '0.825rem' }}
        >
          {description}
        </p>
      </div>
    </div>
  </article>
);

const WhatISolveSection = () => (
  <section id="solutions" className="relative py-12 md:py-32 overflow-hidden">
    {/* Background glow */}
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(ellipse 50% 40% at 50% 80%, hsl(243,88%,68%,0.06) 0%, transparent 70%)',
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section header */}
      <div className="max-w-2xl mb-14">
        <FadeIn delay={0}>
          <span className="section-label block mb-4">WHAT I SOLVE</span>
        </FadeIn>
        <FadeIn delay={0.07}>
          <h2 className="text-foreground">Engineering Solutions That Matter</h2>
        </FadeIn>
      </div>

      {/* Cards — 4 col desktop, 2 tablet, 1 mobile */}
      <StaggerGrid
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        stagger={0.06}
        delay={0.1}
      >
        {solutions.map((sol) => (
          <SolutionCard key={sol.title} {...sol} />
        ))}
      </StaggerGrid>
    </div>
  </section>
);

export default WhatISolveSection;
