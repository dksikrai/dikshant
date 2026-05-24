import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { FadeIn, isIOS, ease, TextReveal } from '@/lib/motion.jsx';

// ─── Data ─────────────────────────────────────────────────────────────────────

const caseStudies = [
  {
    badge: 'SaaS · Fulfillment Automation',
    title: 'Airventory Fulfillment Platform',
    challenge:
      'Manual order fulfillment was causing a 30% error rate and 4-hour processing delays for a high-volume ecommerce operation.',
    architecture: [
      'Laravel queue system with priority lanes (high/normal/low)',
      'Redis-powered job deduplication preventing double-processing',
      'AWS Lambda integration for ShipStation label generation',
      'Fabric.js canvas for custom product label printing',
    ],
    stack: ['Laravel', 'Redis', 'AWS', 'Vue.js', 'ShipStation API', 'Fabric.js'],
    results: ['60% Error Reduction', '10K+ Orders/Month', '4hr → 12min Processing'],
    accent: 'from-indigo-500 to-sky-500',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  },
  {
    badge: 'AI Engineering · Automation',
    title: 'AI Document Processing System',
    challenge:
      'A client needed to process 500+ documents daily. Manual review was consuming 8 hours of staff time per day.',
    architecture: [
      'OpenAI API integration with chunked document processing',
      'RAG pipeline with Redis vector caching for deduplication',
      'Laravel queue for async processing with retry logic',
      'Webhook delivery system for downstream systems',
    ],
    stack: ['OpenAI', 'Laravel', 'Redis', 'PHP', 'Webhooks'],
    results: ['90% Time Reduction', '500+ Docs/Day', '99.5% Accuracy'],
    accent: 'from-violet-500 to-indigo-500',
    badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  },
  {
    badge: 'SaaS Architecture · Multi-Tenant',
    title: 'Multi-Tenant SaaS Platform',
    challenge:
      'A single-tenant system needed to scale to 50+ enterprise clients with complete data isolation, per-tenant queues, and custom billing.',
    architecture: [
      'Laravel multi-tenant architecture with isolated DB schemas',
      'Per-tenant Redis namespacing for cache isolation',
      'Horizon monitoring with per-tenant queue workers',
      'Stripe subscription integration with usage-based billing',
    ],
    stack: ['Laravel', 'MySQL', 'Redis', 'Horizon', 'Stripe', 'AWS'],
    results: ['50+ Enterprise Clients', '99.9% Uptime', '3x Throughput'],
    accent: 'from-emerald-500 to-teal-500',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const MonoBadge = ({ label }) => (
  <span
    className="mono-badge inline-block px-2.5 py-1 rounded border text-[10px] leading-none"
    style={{
      background: 'rgba(255,255,255,0.04)',
      borderColor: 'rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.55)',
    }}
  >
    {label}
  </span>
);

const ResultChip = ({ label }) => (
  <span
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
    style={{
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.25)',
      color: '#34d399',
    }}
  >
    {label}
  </span>
);

const CaseStudyCard = ({ study, index }) => {
  const ios = isIOS();

  return (
    <motion.div
      initial={ios ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={ios ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '40px' }}
      transition={{
        duration: 0.6,
        delay: ios ? Math.min(index * 0.07, 0.35) : index * 0.1,
        ease: ease.out,
      }}
    >
      {/* Card wrapper with gradient left border */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{ padding: '1px 1px 1px 2px' }}
      >
        {/* Gradient left accent bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-gradient-to-b ${study.accent}`}
          aria-hidden="true"
        />

        <div
          className="rounded-xl glass-card hover-glow overflow-hidden"
          style={{ background: 'hsl(220,16%,6%)', borderLeft: 'none' }}
        >
          <div className="p-6 md:p-8">

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
              <div>
                <span
                  className={`mono-badge inline-block px-2.5 py-1 rounded-full border text-[10px] font-semibold mb-2 ${study.badgeColor}`}
                >
                  {study.badge}
                </span>
                <h3
                  className="font-bold text-foreground leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', letterSpacing: '-0.025em' }}
                >
                  {study.title}
                </h3>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Content grid — 2 cols on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Challenge */}
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest mb-2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  Challenge
                </p>
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  {study.challenge}
                </p>
              </div>

              {/* Architecture */}
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest mb-2.5"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  Architecture
                </p>
                <ul className="space-y-2">
                  {study.architecture.map((point, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-foreground/80 leading-snug"
                      initial={ios ? {} : { opacity: 0, x: -8 }}
                      whileInView={ios ? {} : { opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '20px' }}
                      transition={{ duration: 0.4, delay: 0.05 * i + index * 0.05, ease: ease.out }}
                    >
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: '#34d399' }}
                        strokeWidth={2}
                      />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stack + Results footer */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Stack chips */}
              <div className="flex flex-wrap gap-1.5">
                {study.stack.map((s) => (
                  <MonoBadge key={s} label={s} />
                ))}
              </div>

              {/* Result chips */}
              <div className="flex flex-wrap gap-2 shrink-0">
                {study.results.map((r) => (
                  <ResultChip key={r} label={r} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

const CaseStudiesSection = () => (
  <section className="py-10 md:py-24 bg-muted/20" id="case-studies">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <FadeIn className="mb-10 md:mb-16">
        <p className="section-label mb-3">CASE STUDIES</p>
        <h2
          className="font-extrabold tracking-tight mb-4"
          style={{ fontSize: 'clamp(1.875rem, 5vw, 3rem)', lineHeight: '1.1' }}
        >
          <TextReveal text="Engineering Deep Dives" className="text-gradient-primary" />
        </h2>
        <p
          className="text-muted-foreground max-w-2xl"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
        >
          Real problems, real architectures, real results.
        </p>
      </FadeIn>

      {/* Cards — vertical stack */}
      <div className="flex flex-col gap-6">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.title} study={study} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudiesSection;
