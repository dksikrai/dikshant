import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, CheckCircle2, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { FadeIn, SlideIn, isIOS, ease } from '@/lib/motion.jsx';

const roles = [
  {
    title: 'Senior Web Developer',
    company: 'iTechPanel LLP',
    date: 'Aug 2025 – Present',
    location: 'Jaipur, India',
    tag: 'Current',
    icon: Briefcase,
    accent: 'indigo',
    impact: '60% Faster Releases',
    description: 'Leading architectural decisions, mentoring engineers, and accelerating project delivery for enterprise clients globally.',
    bullets: [
      'Spearheaded technical architecture for production-grade SaaS systems serving global clients.',
      'Reduced deployment cycle times by 60% through CI/CD implementation and automated testing.',
      'Mentored junior and mid-level developers in Laravel best practices and system design.',
      'Achieved near-zero-downtime releases via blue-green deployment strategies.',
    ],
  },
  {
    title: 'Senior PHP & Laravel Developer',
    company: 'iTechPanel LLP',
    date: 'Apr 2025 – Aug 2025',
    location: 'Jaipur, India',
    tag: 'Promoted',
    icon: Award,
    accent: 'violet',
    impact: '70% DB Load Reduction',
    description: 'Architected enterprise Laravel backends, optimized critical performance bottlenecks, and delivered multi-tenant SaaS systems.',
    bullets: [
      'Architected multi-tenant SaaS platforms with isolated database schemas and per-tenant queues.',
      'Reduced database load by 70% via Redis caching layers and optimized Eloquent queries.',
      'Designed Redis/Horizon queue systems handling 10K+ background jobs per day.',
      'Led API redesign initiatives improving response times by 45%.',
    ],
  },
  {
    title: 'WordPress & Laravel Developer',
    company: 'iTechPanel LLP',
    date: 'Jan 2024 – Apr 2025',
    location: 'Jaipur, India',
    tag: null,
    icon: Briefcase,
    accent: 'cyan',
    impact: '40% Load Time Improvement',
    description: 'Built high-performance custom WordPress and Laravel systems for international clients across 5 countries.',
    bullets: [
      'Achieved 40% page load improvement via Redis caching and asset pipeline optimization.',
      'Engineered RESTful Laravel APIs serving as headless backends for React/Vue frontends.',
      'Integrated complex third-party APIs: ShipStation, Stripe, WhatsApp, NAATI certification.',
      'Deployed and maintained Linux servers on AWS for 10+ production environments.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Urban Key Point Real Estate',
    date: 'Sep 2023 – Dec 2023',
    location: 'Jaipur, India',
    tag: null,
    icon: Award,
    accent: 'emerald',
    impact: 'First Production System',
    description: 'Built a comprehensive real estate lead management system with Laravel Jobs, property matching automation, and CRM workflows.',
    bullets: [
      'Built end-to-end property listing and lead management system using Laravel.',
      'Automated property matching and email notifications via Laravel Jobs and Queues.',
      'Integrated third-party real estate APIs for live property data synchronization.',
    ],
  },
];

const accentConfig = {
  indigo:  { dot: 'border-indigo-500 text-indigo-400',  tag: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',  check: 'text-indigo-400',  impact: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25', spine: 'from-indigo-500 to-violet-500' },
  violet:  { dot: 'border-violet-500 text-violet-400',  tag: 'bg-violet-500/10 text-violet-400 border-violet-500/25',  check: 'text-violet-400',  impact: 'bg-violet-500/10 text-violet-400 border-violet-500/25', spine: 'from-violet-500 to-cyan-500' },
  cyan:    { dot: 'border-cyan-500 text-cyan-400',      tag: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',      check: 'text-cyan-400',    impact: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25', spine: 'from-cyan-500 to-emerald-500' },
  emerald: { dot: 'border-emerald-500 text-emerald-400', tag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25', check: 'text-emerald-400', impact: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25', spine: 'from-emerald-500 to-sky-500' },
};

const CareerCard = ({ role, colors, ios }) => {
  const Icon = role.icon;
  return (
    <div className="glass-card rounded-xl p-6 md:p-7 border border-white/[0.07]">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-5 pb-5 border-b border-white/[0.06]">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="font-bold text-foreground" style={{ fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)' }}>
              {role.title}
            </h3>
            {role.tag && (
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${colors.tag}`}>
                {role.tag}
              </span>
            )}
          </div>
          {/* Impact chip */}
          <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${colors.impact}`}>
            <TrendingUp className="w-3 h-3" />
            {role.impact}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className={`font-semibold ${colors.check}`}>{role.company}</span>
          <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Calendar className="w-3 h-3 shrink-0" />
            {role.date}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <MapPin className="w-3 h-3 shrink-0" />
            {role.location}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">
        {role.description}
      </p>

      {/* Bullets */}
      <ul className="space-y-3">
        {role.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground/90">
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${colors.check}`} />
            <span className="leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CareerSection = () => {
  const ios = isIOS();

  return (
    <section className="py-10 md:py-28 relative overflow-hidden" id="career">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <div className="section-label mb-4">EXPERIENCE</div>
          <h2 className="font-extrabold text-foreground mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            Professional Journey
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)' }}>
            A trajectory of continuous growth, architectural ownership, and production impact.
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Static spine */}
          <div className="absolute left-[19px] top-0 w-px bg-white/[0.08] h-full" aria-hidden="true" />
          {/* Animated spine */}
          {!ios && (
            <motion.div
              className="absolute left-[19px] top-0 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent origin-top h-full"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
          )}

          <div className="space-y-10 md:space-y-12">
            {roles.map((role, idx) => {
              const colors = accentConfig[role.accent];
              const Icon = role.icon;

              return (
                <div key={idx} className="relative pl-14">
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-0 top-3 w-10 h-10 rounded-full border-2 bg-background flex items-center justify-center z-10 smooth-transition ${colors.dot}`}
                    initial={ios ? { opacity: 0 } : { scale: 0 }}
                    animate={ios ? { opacity: 1 } : undefined}
                    whileInView={ios ? undefined : { scale: 1 }}
                    viewport={{ once: true }}
                    transition={ios
                      ? { duration: 0.3, delay: 0.1 }
                      : { type: 'spring', stiffness: 400, damping: 20, delay: idx * 0.1 }
                    }
                  >
                    {role.tag === 'Current' && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-indigo-500/20 pointer-events-none" />
                    )}
                    <Icon className="w-4 h-4 shrink-0" />
                  </motion.div>

                  <SlideIn direction="left" delay={idx * 0.08}>
                    <CareerCard role={role} colors={colors} ios={ios} />
                  </SlideIn>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
