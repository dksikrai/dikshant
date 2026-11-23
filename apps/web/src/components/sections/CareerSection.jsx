import React, { useState } from 'react';
import { m as motion } from 'framer-motion';
import { Briefcase, Award, CheckCircle2, Calendar, MapPin, TrendingUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.js';
import SectionHeader from '@/components/SectionHeader.jsx';
import { FadeIn, SlideIn, isIOS, ease } from '@/lib/motion.jsx';
import { experience } from '@/config/resume.js';

const visual = [
  { icon: Award, accent: 'indigo', tag: 'Current' },
  { icon: Briefcase, accent: 'violet', tag: 'Promoted' },
  { icon: Award, accent: 'cyan', tag: 'Promoted' },
  { icon: Briefcase, accent: 'emerald', tag: null },
  { icon: Award, accent: 'amber', tag: null },
];
const roles = experience.map((r, i) => ({ ...r, ...visual[i] }));

const one = { dot: 'border-primary text-primary', tag: 'bg-primary/10 text-primary border-primary/25', check: 'text-primary', impact: 'bg-primary/10 text-primary border-primary/25', spine: 'bg-primary' };
const accentConfig = { indigo: one, violet: one, cyan: one, emerald: one, amber: one };

const CareerCard = ({ role, colors, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  const listId = `role-${role.date.replace(/\W+/g, '-')}`;
  return (
    <div className="glass-card card-hover rounded-2xl p-6 md:p-7">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-5 pb-5 border-b border-white/[0.06]">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="font-medium text-foreground" style={{ fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)' }}>
              {role.title}
            </h3>
            {role.tag && (
              <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${colors.tag}`}>
                {role.tag}
              </span>
            )}
          </div>
          {/* Impact chip */}
          <span className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${colors.impact}`}>
            <TrendingUp className="w-3 h-3" />
            {role.impact}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className={`font-medium ${colors.check}`}>{role.company}</span>
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
      <p className="text-muted-foreground text-sm leading-relaxed mb-5 ">
        {role.description}
      </p>

      {/* Bullets: always shown on desktop, behind a toggle on smaller screens */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={listId}
        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary lg:hidden"
      >
        {open ? 'Hide achievements' : `Show ${role.bullets.length} achievements`}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <ul id={listId} className={`space-y-3 ${open ? 'mt-3 block' : 'hidden'} lg:mt-0 lg:block`}>
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


// ─── Left rail: growth illustration + selected work ──────────────────────────

const STEP_LABELS = ['Business Dev', 'WordPress Dev', 'Senior PHP / Laravel', 'Senior Web Dev', 'Project Manager'];
const STEP_YEARS = ['2023', '2024', '2025', '2025', '2026'];
const SHOTS = [
  { src: '/screenshots/airventory.webp', name: 'Airventory' },
  { src: '/screenshots/mapview.webp', name: 'MapView' },
  { src: '/screenshots/profiletag.webp', name: 'ProfileTag' },
];

/** Five rising steps, one per role: the career in a single glance. */
const GrowthSteps = () => (
  <div>
    <div className="flex h-36 items-end gap-2" role="img" aria-label="Career growth from Business Development in 2023 to Project Manager in 2026">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex h-full flex-1 flex-col justify-end">
          <div
            className={`rounded-t-lg border border-b-0 ${i === STEP_LABELS.length - 1 ? 'border-primary/50 bg-primary/25' : 'border-white/10 bg-white/[0.05]'}`}
            style={{ height: `${28 + i * 18}%` }}
          />
        </div>
      ))}
    </div>
    <div className="flex gap-2 border-t border-white/10 pt-2">
      {STEP_YEARS.map((y, i) => (
        <span key={i} className="flex-1 text-center font-mono text-[11px] text-muted-foreground">{y}</span>
      ))}
    </div>
    <p className="mt-3 text-sm text-foreground">
      From <span className="text-muted-foreground">{STEP_LABELS[0]}</span> to{' '}
      <span className="font-medium text-primary">{STEP_LABELS[4]}</span> in under three years
    </p>
  </div>
);

/** Real client work, framed like browser windows. */
const WorkStack = () => (
  <div className="grid grid-cols-3 gap-2">
    {SHOTS.map((shot) => (
      <a key={shot.name} href="#projects" className="group block overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]" aria-label={`${shot.name} project`}>
        <div className="flex gap-1 border-b border-white/10 px-1.5 py-1">
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="h-1 w-1 rounded-full bg-white/25" />
        </div>
        <img src={shot.src} alt={`${shot.name} screenshot`} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover object-top" />
      </a>
    ))}
  </div>
);

const CareerRail = () => (
  <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
    <div className="glass-card rounded-3xl p-6">
      <span className="section-label mb-4 block">Growth</span>
      <GrowthSteps />
    </div>
  </aside>
);

const CareerSection = () => {
  const ios = isIOS();

  return (
    <section className="site-section" id="career">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="site-container">
        <SectionHeader
          label="Experience"
          title="Experience that kept moving up"
          description="Five roles in under three years, from building websites to leading delivery for API-driven systems."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-14">
        <CareerRail />

        {/* Timeline */}
        <div className="relative">
          {/* Static spine */}
          <div className="absolute left-[19px] top-0 w-px bg-white/[0.08] h-full" aria-hidden="true" />
          {/* Animated spine */}
          {!ios && (
            <motion.div
              className="absolute left-[19px] top-0 w-px bg-primary/50 origin-top h-full"
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
                    <Icon className="w-4 h-4 shrink-0" />
                  </motion.div>

                  <SlideIn direction="left" delay={idx * 0.08}>
                    <CareerCard role={role} colors={colors} defaultOpen={idx === 0} />
                  </SlideIn>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
