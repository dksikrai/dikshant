import React from 'react';
import { FadeIn, SlideIn, StaggerGrid } from '@/lib/motion.jsx';

const facts = [
  { value: '2+ Years',      label: 'Building production systems' },
  { value: '22+ Projects',  label: 'Across 5 countries' },
  { value: 'Backend First', label: 'APIs, queues, cloud infra' },
  { value: 'AI-Enabled',    label: 'OpenAI, RAG, embeddings' },
];

const techBadges = [
  'Laravel', 'PHP', 'Redis', 'AWS', 'Next.js', 'OpenAI', 'Docker',
];

const FactCard = ({ value, label }) => (
  <div className="glass-card rounded-xl p-5 flex flex-col gap-1 h-full">
    <span
      className="font-black tracking-tight text-foreground"
      style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', letterSpacing: '-0.03em' }}
    >
      {value}
    </span>
    <span className="text-muted-foreground text-sm leading-snug">{label}</span>
  </div>
);

const AboutSection = () => (
  <section
    id="about"
    className="relative py-12 md:py-32 overflow-hidden"
  >
    {/* Subtle background radial glow */}
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 20% 60%, hsl(243,88%,68%,0.06) 0%, transparent 70%)',
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">

        {/* ── LEFT — Bio ── */}
        <div>
          <FadeIn delay={0}>
            <span className="section-label block mb-4">ABOUT</span>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h2 className="text-foreground mb-8">
              Senior Engineer with a Production Mindset
            </h2>
          </FadeIn>

          <FadeIn delay={0.14}>
            <p className="text-muted-foreground mb-5 leading-relaxed">
              I'm Dikshant Goyal — a backend-first engineer with 2+ years building
              production-grade SaaS systems, AI-powered automation pipelines, and scalable
              cloud architectures. I care about system reliability, clean APIs, and
              engineering solutions that handle real scale. From Redis queue monitoring to
              OpenAI integrations, I build for production — not demos.
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Currently at <strong className="text-foreground font-semibold">iTechPanel LLP</strong> as
              Senior Web Developer — leading architectural decisions, mentoring developers,
              and delivering systems that run at 99.9% uptime.
            </p>
          </FadeIn>

          {/* Pull quote */}
          <FadeIn delay={0.24}>
            <blockquote
              className="relative mb-12 pl-5 py-1"
              style={{
                borderLeft: '2px solid hsl(243,88%,68%)',
              }}
            >
              <p
                className="italic text-foreground/90 leading-relaxed m-0"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
              >
                I don't just write code — I architect systems that scale.
              </p>
            </blockquote>
          </FadeIn>

          {/* Tech badges row */}
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-2">
              {techBadges.map((badge) => (
                <span
                  key={badge}
                  className="mono-badge inline-flex items-center px-3 py-1.5 rounded-lg border"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.09)',
                    color: 'hsl(var(--muted-foreground))',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* ── RIGHT — Fact sidebar ── */}
        <SlideIn direction="right" delay={0.1}>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-4">
            {facts.map((fact, i) => (
              <FadeIn key={fact.value} delay={0.15 + i * 0.07} className="h-full">
                <FactCard {...fact} />
              </FadeIn>
            ))}
          </div>
        </SlideIn>
      </div>
    </div>
  </section>
);

export default AboutSection;
