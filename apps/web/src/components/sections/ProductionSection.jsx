import React from 'react';
import {
  Activity, Cloud, Zap, Clock, TrendingUp, Terminal,
} from 'lucide-react';
import SectionHeader from '@/components/SectionHeader.jsx';
import { FadeIn, StaggerGrid } from '@/lib/motion.jsx';

const accentMap = {
  primary: {
    icon: 'hsl(199,89%,66%)',
    bg: 'hsl(199,89%,62%,0.1)',
    chip: 'hsl(199,89%,62%,0.15)',
    chipBorder: 'hsl(199,89%,62%,0.3)',
    chipText: 'hsl(199,89%,66%)',
  },
  secondary: {
    icon: 'hsl(199,89%,66%)',
    bg: 'hsl(199,89%,62%,0.1)',
    chip: 'hsl(199,89%,62%,0.12)',
    chipBorder: 'hsl(199,89%,62%,0.3)',
    chipText: 'hsl(199,89%,66%)',
  },
  amber: {
    icon: 'hsl(199,89%,66%)',
    bg: 'hsl(199,89%,62%,0.1)',
    chip: 'hsl(199,89%,62%,0.12)',
    chipBorder: 'hsl(199,89%,62%,0.3)',
    chipText: 'hsl(199,89%,66%)',
  },
  violet: {
    icon: 'hsl(199,89%,66%)',
    bg: 'hsl(199,89%,62%,0.1)',
    chip: 'hsl(199,89%,62%,0.12)',
    chipBorder: 'hsl(199,89%,62%,0.3)',
    chipText: 'hsl(199,89%,66%)',
  },
  emerald: {
    icon: 'hsl(199,89%,66%)',
    bg: 'hsl(199,89%,62%,0.1)',
    chip: 'hsl(199,89%,62%,0.12)',
    chipBorder: 'hsl(199,89%,62%,0.3)',
    chipText: 'hsl(199,89%,66%)',
  },
  rose: {
    icon: 'hsl(199,89%,66%)',
    bg: 'hsl(199,89%,62%,0.1)',
    chip: 'hsl(199,89%,62%,0.12)',
    chipBorder: 'hsl(199,89%,62%,0.3)',
    chipText: 'hsl(199,89%,66%)',
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
          className="text-foreground font-medium leading-snug"
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
          className="mono-badge inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium"
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
  <section id="production" className="site-section">

    <div className="site-container z-10">

      <SectionHeader
        label="Production experience"
        title="Production systems I've owned"
        description="Real production work — not side projects. Systems handling real traffic, real data, real consequences."
      />

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
