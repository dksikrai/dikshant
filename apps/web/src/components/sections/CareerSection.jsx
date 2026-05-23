import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, SlideIn, isIOS, ease } from '@/lib/motion.jsx';

const roles = [
  {
    title: "Senior Web Developer",
    company: "iTechPanel LLP",
    date: "Aug 2025 – Present",
    tag: "Current",
    icon: Briefcase,
    accent: "primary",
    description: "Project delivery acceleration, team workflow optimization, technical architecture leadership, and developer mentoring. Spearheading enterprise-grade deployment pipelines and code-review culture."
  },
  {
    title: "Senior PHP & Laravel Developer",
    company: "iTechPanel LLP",
    date: "Apr 2025 – Aug 2025",
    tag: "Promoted",
    icon: Award,
    accent: "secondary",
    description: "Architected enterprise Laravel backends, reducing deployment time by 60% and database load by 70%. Designed and delivered multi-tenant SaaS architectures for global clients."
  },
  {
    title: "WordPress & Laravel Developer",
    company: "iTechPanel LLP",
    date: "Jan 2024 – Apr 2025",
    tag: null,
    icon: Briefcase,
    accent: "primary",
    description: "Built custom WordPress themes, plugins, and complex Laravel APIs. Achieved a 40% reduction in load times through advanced caching and optimized asset delivery pipelines."
  },
  {
    title: "Web Developer",
    company: "Urban Key Point Real Estate",
    date: "Sep 2023 – Dec 2023",
    tag: null,
    icon: Award,
    accent: "secondary",
    description: "Built a comprehensive real estate listing and lead management system using Laravel, with automated matching and WhatsApp notification workflows."
  }
];

const accentMap = {
  primary:   { dot: "bg-primary/15 border-primary/30 text-primary",   tag: "bg-primary/10 text-primary border border-primary/20" },
  secondary: { dot: "bg-secondary/15 border-secondary/30 text-secondary", tag: "bg-secondary/10 text-secondary border border-secondary/20" },
};

const CareerSection = () => {
  const ios = isIOS();

  return (
    <section className="py-14 md:py-20 bg-muted/30" id="career">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-3">
          <h2>Career Progression</h2>
        </FadeIn>
        <FadeIn delay={0.07} className="mb-10 md:mb-14">
          <p className="text-lg md:text-xl text-muted-foreground">
            A trajectory of continuous technical growth, leadership, and measurable impact.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[18px] top-0 w-0.5 bg-border/50 h-full" aria-hidden="true" />
          {!ios && (
            <motion.div
              className="absolute left-[18px] top-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20 origin-top h-full"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.4, ease: ease.out }}
              aria-hidden="true"
            />
          )}

          <div className="space-y-8 md:space-y-10">
            {roles.map((role, idx) => {
              const colors = accentMap[role.accent];
              const Icon = role.icon;

              return (
                <SlideIn key={idx} direction="left" delay={idx * 0.1}>
                  <div className="relative pl-12 md:pl-14">
                    <motion.div
                      className={`absolute left-0 top-2 md:top-4 w-9 h-9 rounded-full border-4 border-background flex items-center justify-center z-10 ${colors.dot}`}
                      initial={ios ? { opacity: 0, scale: 0.6 } : { scale: 0 }}
                      animate={ios ? { opacity: 1, scale: 1 } : undefined}
                      whileInView={ios ? undefined : { scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 380, damping: 18, delay: ios ? 0.1 + idx * 0.07 : 0.15 + idx * 0.1 }}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                    </motion.div>

                    <motion.div
                      whileHover={ios ? {} : { x: 5 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Card className="glass-card premium-shadow hover:border-primary/30 transition-colors duration-200">
                        <CardContent className="p-4 sm:p-5 md:p-6">
                          {/* Header row */}
                          <div className="flex flex-col gap-2 mb-3">
                            <div className="flex items-start justify-between gap-3 flex-wrap">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-lg md:text-xl font-bold leading-tight">{role.title}</h3>
                                {role.tag && (
                                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${colors.tag} shrink-0`}>
                                    {role.tag}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                                {role.date}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-primary">{role.company}</p>
                          </div>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{role.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </SlideIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
