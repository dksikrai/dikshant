import React from 'react';
import {
  Activity, Cloud, Zap, Clock, TrendingUp, Terminal,
} from 'lucide-react';
import { FadeIn, StaggerGrid } from '@/lib/motion.jsx';

const accentMap = {
  primary: {
    icon: 'hsl(243,88%,68%)',
    bg: 'hsl(243,88%,68%,0.1)',
    chip: 'hsl(243,88%,68%,0.15)',
    chipBorder: 'hsl(243,88%,68%,0.3)',
    chipText: 'hsl(243,88%,75%)',
  },
  secondary: {
    icon: 'hsl(192,80%,55%)',
    bg: 'hsl(192,80%,55%,0.1)',
    chip: 'hsl(192,80%,55%,0.12)',
    chipBorder: 'hsl(192,80%,55%,0.3)',
    chipText: 'hsl(192,80%,65%)',
  },
  amber: {
    icon: 'hsl(38,92%,55%)',
    bg: 'hsl(38,92%,55%,0.1)',
    chip: 'hsl(38,92%,55%,0.12)',
    chipBorder: 'hsl(38,92%,55%,0.3)',
    chipText: 'hsl(38,92%,65%)',
  },
  violet: {
    icon: 'hsl(265,80%,65%)',
    bg: 'hsl(265,80%,65%,0.1)',
    chip: 'hsl(265,80%,65%,0.12)',
    chipBorder: 'hsl(265,80%,65%,0.3)',
    chipText: 'hsl(265,80%,75%)',
  },
  emerald: {
    icon: 'hsl(152,76%,48%)',
    bg: 'hsl(152,76%,48%,0.1)',
    chip: 'hsl(152,76%,48%,0.12)',
    chipBorder: 'hsl(152,76%,48%,0.3)',
    chipText: 'hsl(152,76%,60%)',
  },
  rose: {
    icon: 'hsl(346,77%,60%)',
    bg: 'hsl(346,77%,60%,0.1)',
    chip: 'hsl(346,77%,60%,0.12)',
    chipBorder: 'hsl(346,77%,60%,0.3)',
    chipText: 'hsl(346,77%,70%)',
  },
};

const cards = [
  {
    icon: Activity,
    title: 'Redis Queue Monitoring',
    description:
      'Laravel Horizon dashboard monitoring queue health, retry logic, and worker throughput across multiple queues',
    metric: '4 Workers · 0 Failed Jobs',
    accent: 'primary',
  },
  {
    icon: Cloud,
    title: 'AWS Production Deployments',
    description:
      'EC2 instance management, S3 bucket policies, SQS queues, and automated deployment scripts with zero-downtime releases',
    metric: '99.9% Uptime',
    accent: 'secondary',
  },
  {
    icon: Zap,
    title: 'Background Job Architecture',
    description:
      'Complex job chaining with retry logic — document processing, email sending, webhook dispatch, payment reconciliation',
    metric: '10K+ Jobs/Day',
    accent: 'amber',
  },
  {
    icon: Clock,
    title: 'Cron & Automation Workflows',
    description:
      'Scheduled Laravel commands for inventory sync, report generation, subscription billing cycles, and data cleanup',
    metric: '24/7 Automated',
    accent: 'violet',
  },
  {
    icon: TrendingUp,
    title: 'Performance Optimization',
    description:
      'Database query optimization, Redis caching layers, eager loading strategies — achieving 70% reduction in DB load',
    metric: '70% DB Load Reduction',
    accent: 'emerald',
  },
  {
    icon: Terminal,
    title: 'Production Debugging',
    description:
      'Log monitoring with CloudWatch, Sentry integration, real-time error tracking, and hotfix deployment workflows',
    metric: 'MTTR < 15min',
    accent: 'rose',
  },
];

const ProductionCard = ({ icon: Icon, title, description, metric, accent }) => {
  const colors = accentMap[accent];
  return (
    <article
      className="glass-card card-hover rounded-2xl p-6 flex flex-col gap-4 h-full"
      aria-label={title}
    >
      {/* Icon box */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: colors.bg }}
        aria-hidden="true"
      >
        <Icon size={18} style={{ color: colors.icon }} strokeWidth={1.8} />
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-2 flex-1">
        <h3
          className="text-foreground font-semibold leading-snug"
          style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}
        >
          {title}
        </h3>
        <p
          className="text-muted-foreground leading-relaxed"
          style={{ fontSize: '0.875rem' }}
        >
          {description}
        </p>
      </div>

      {/* Metric chip */}
      <div className="mt-auto pt-2">
        <span
          className="mono-badge inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold"
          style={{
            background: colors.chip,
            border: `1px solid ${colors.chipBorder}`,
            color: colors.chipText,
          }}
        >
          {metric}
        </span>
      </div>
    </article>
  );
};

const ProductionSection = () => (
  <section id="production" className="relative py-12 md:py-32 overflow-hidden">
    {/* Background glow */}
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(ellipse 55% 45% at 80% 30%, hsl(192,80%,55%,0.05) 0%, transparent 70%)',
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="max-w-2xl mb-14">
        <FadeIn delay={0}>
          <span className="section-label block mb-4">PRODUCTION EXPERIENCE</span>
        </FadeIn>
        <FadeIn delay={0.07}>
          <h2 className="text-foreground mb-5">Production Systems I've Owned</h2>
        </FadeIn>
        <FadeIn delay={0.13}>
          <p className="text-muted-foreground leading-relaxed">
            Real production work — not side projects. Systems handling real traffic, real
            data, real consequences.
          </p>
        </FadeIn>
      </div>

      {/* Cards grid — 3 col desktop, 2 tablet, 1 mobile */}
      <StaggerGrid
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        stagger={0.08}
        delay={0.1}
      >
        {cards.map((card) => (
          <ProductionCard key={card.title} {...card} />
        ))}
      </StaggerGrid>
    </div>
  </section>
);

export default ProductionSection;
