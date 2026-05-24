import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Zap, Layers } from 'lucide-react';
import { FadeIn, isIOS, ease, TextReveal, StaggerGrid } from '@/lib/motion.jsx';

// ─── Data ─────────────────────────────────────────────────────────────────────

const capabilities = [
  {
    icon: Cpu,
    title: 'LLM API Integration',
    description:
      'Production-grade OpenAI API integration with rate limiting, retry logic, token cost optimization, and response caching.',
    stack: ['OpenAI', 'Laravel', 'Redis'],
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    iconBorder: 'border-primary/20',
  },
  {
    icon: Database,
    title: 'RAG Systems & Vector Search',
    description:
      'Retrieval-Augmented Generation pipelines — document chunking, embedding generation, vector storage, and semantic search.',
    stack: ['OpenAI', 'Embeddings', 'Redis'],
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    iconBorder: 'border-secondary/20',
  },
  {
    icon: Zap,
    title: 'AI Workflow Automation',
    description:
      'End-to-end AI automation: document classification, content extraction, AI-triggered webhooks, async processing via queues.',
    stack: ['Laravel Jobs', 'OpenAI', 'Webhooks'],
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    iconBorder: 'border-amber-500/20',
  },
  {
    icon: Layers,
    title: 'AI SaaS Architecture',
    description:
      'Architecting multi-tenant AI SaaS platforms with per-tenant context, usage metering, billing integration, and scaling.',
    stack: ['Laravel', 'Multi-tenant', 'Stripe'],
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    iconBorder: 'border-violet-500/20',
  },
];

// ─── Syntax-highlighted PHP Code ──────────────────────────────────────────────

const codeLines = [
  { type: 'comment',  text: '// AI Document Analysis Pipeline' },
  { type: 'blank',    text: '' },
  { type: 'code',
    parts: [
      { t: 'var',      v: '$embedding' },
      { t: 'plain',    v: ' = ' },
      { t: 'class',    v: 'OpenAI' },
      { t: 'plain',    v: '::' },
      { t: 'fn',       v: 'embeddings' },
      { t: 'plain',    v: '()->' },
      { t: 'fn',       v: 'create' },
      { t: 'plain',    v: '([' },
    ],
  },
  { type: 'code',
    parts: [
      { t: 'plain',    v: '  ' },
      { t: 'string',   v: "'model'" },
      { t: 'plain',    v: ' => ' },
      { t: 'string',   v: "'text-embedding-3-small'" },
      { t: 'plain',    v: ',' },
    ],
  },
  { type: 'code',
    parts: [
      { t: 'plain',    v: '  ' },
      { t: 'string',   v: "'input'" },
      { t: 'plain',    v: ' => ' },
      { t: 'var',      v: '$document' },
      { t: 'plain',    v: '->' },
      { t: 'fn',       v: 'getContent' },
      { t: 'plain',    v: '(),' },
    ],
  },
  { type: 'code',    parts: [{ t: 'plain', v: ']);' }] },
  { type: 'blank',   text: '' },
  { type: 'comment', text: '// Store in Redis with TTL' },
  { type: 'code',
    parts: [
      { t: 'class',    v: 'Cache' },
      { t: 'plain',    v: '::' },
      { t: 'fn',       v: 'put' },
      { t: 'plain',    v: '(' },
    ],
  },
  { type: 'code',
    parts: [
      { t: 'plain',    v: '  ' },
      { t: 'string',   v: '"doc:embed:{' },
      { t: 'var',      v: '$document->id' },
      { t: 'string',   v: '}"' },
      { t: 'plain',    v: ',' },
    ],
  },
  { type: 'code',
    parts: [
      { t: 'var',      v: '  $embedding' },
      { t: 'plain',    v: '->' },
      { t: 'plain',    v: 'embeddings[0]->' },
      { t: 'plain',    v: 'embedding,' },
    ],
  },
  { type: 'code',
    parts: [
      { t: 'fn',       v: '  now' },
      { t: 'plain',    v: '()->' },
      { t: 'fn',       v: 'addDays' },
      { t: 'plain',    v: '(' },
      { t: 'num',      v: '7' },
      { t: 'plain',    v: ')' },
    ],
  },
  { type: 'code',    parts: [{ t: 'plain', v: ');' }] },
  { type: 'blank',   text: '' },
  { type: 'comment', text: '// Dispatch analysis job' },
  { type: 'code',
    parts: [
      { t: 'class',    v: 'AnalyzeDocumentJob' },
      { t: 'plain',    v: '::' },
      { t: 'fn',       v: 'dispatch' },
      { t: 'plain',    v: '(' },
      { t: 'var',      v: '$document' },
      { t: 'plain',    v: ')' },
    ],
  },
  { type: 'code',
    parts: [
      { t: 'plain',    v: '  ->' },
      { t: 'fn',       v: 'onQueue' },
      { t: 'plain',    v: '(' },
      { t: 'string',   v: "'ai-processing'" },
      { t: 'plain',    v: ');' },
    ],
  },
];

const tokenColor = {
  comment: 'text-neutral-500',
  var:     'text-cyan-300',
  class:   'text-indigo-400',
  fn:      'text-sky-300',
  string:  'text-emerald-400',
  num:     'text-orange-300',
  plain:   'text-neutral-200',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const MonoBadge = ({ label }) => (
  <span
    className="mono-badge inline-block px-2 py-0.5 rounded border text-[10px]"
    style={{
      background: 'rgba(255,255,255,0.04)',
      borderColor: 'rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.6)',
    }}
  >
    {label}
  </span>
);

const CapabilityCard = ({ item, index }) => {
  const Icon = item.icon;
  const ios = isIOS();

  return (
    <motion.div
      initial={ios ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={ios ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '40px' }}
      transition={{ duration: 0.55, delay: ios ? Math.min(index * 0.06, 0.3) : index * 0.08, ease: ease.out }}
      whileHover={ios ? {} : { y: -4 }}
      className="h-full"
    >
      {/* Gradient top border via wrapper */}
      <div
        className="h-full rounded-xl relative overflow-hidden"
        style={{ padding: '1px', background: 'linear-gradient(135deg, hsl(243,88%,62%,0.45), hsl(192,80%,50%,0.3), transparent 60%)' }}
      >
        <div
          className="h-full rounded-[11px] flex flex-col p-5 glass-card hover-glow cursor-default"
          style={{ background: 'hsl(220,16%,6%)' }}
        >
          {/* Icon */}
          <div
            className={`w-11 h-11 rounded-xl ${item.iconBg} border ${item.iconBorder} flex items-center justify-center mb-4 shrink-0`}
          >
            <Icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={1.75} />
          </div>

          {/* Text */}
          <h4 className="text-sm font-semibold text-foreground mb-2 leading-snug tracking-tight">
            {item.title}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed flex-grow">
            {item.description}
          </p>

          {/* Stack chips */}
          <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/[0.06]">
            {item.stack.map((s) => (
              <MonoBadge key={s} label={s} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CodeBlock = () => (
  <FadeIn delay={0.15} x={20} y={0}>
    <div
      className="terminal rounded-xl overflow-hidden h-full"
      style={{ background: '#0d0d10', border: '1px solid rgba(255,255,255,0.08)' }}
      aria-label="AI integration code example"
    >
      {/* Terminal header bar */}
      <div
        className="flex items-center gap-1.5 px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span
          className="ml-3 text-[10px] font-mono tracking-wider"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          DocumentAnalysisPipeline.php
        </span>
      </div>

      {/* Code lines */}
      <div className="p-5 overflow-x-auto">
        <pre className="text-[0.78rem] leading-[1.75] font-mono" style={{ tabSize: 2 }}>
          {codeLines.map((line, i) => {
            if (line.type === 'blank') return <div key={i}>&nbsp;</div>;
            if (line.type === 'comment') return (
              <div key={i} className="text-neutral-500">{line.text}</div>
            );
            return (
              <div key={i}>
                {line.parts.map((part, j) => (
                  <span key={j} className={tokenColor[part.t]}>
                    {part.v}
                  </span>
                ))}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  </FadeIn>
);

// ─── Main Section ─────────────────────────────────────────────────────────────

const AISection = () => (
  <section className="py-10 md:py-24" id="ai-engineering">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <FadeIn className="mb-10 md:mb-16">
        <p className="section-label mb-3">AI ENGINEERING</p>
        <h2
          className="font-extrabold tracking-tight mb-4"
          style={{ fontSize: 'clamp(1.875rem, 5vw, 3rem)', lineHeight: '1.1' }}
        >
          <TextReveal text="Building AI-Powered Systems" className="text-gradient-primary" />
        </h2>
        <p
          className="text-muted-foreground max-w-2xl"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
        >
          Integrating modern AI capabilities into production architectures — not just demos, but
          real systems handling real workloads.
        </p>
      </FadeIn>

      {/* Two-column layout on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

        {/* Part A — 2×2 capability grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((item, i) => (
            <CapabilityCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Part B — Code block */}
        <div className="lg:sticky lg:top-28">
          <CodeBlock />
        </div>
      </div>
    </div>
  </section>
);

export default AISection;
