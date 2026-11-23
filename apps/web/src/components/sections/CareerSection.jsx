import React from 'react';
import { m as motion } from 'framer-motion';
import { Briefcase, Award, CheckCircle2, Calendar, MapPin, TrendingUp } from 'lucide-react';
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

const CareerCard = ({ role, colors, ios }) => {
  const Icon = role.icon;
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
    <section className="site-section" id="career">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="site-container">
        <SectionHeader
          label="Experience"
          title="Professional journey"
          description="A trajectory of continuous growth, architectural ownership, and production impact."
        />

        {/* Timeline: readable measure, aligned to the container's left edge like every other section */}
        <div className="relative max-w-4xl">
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
