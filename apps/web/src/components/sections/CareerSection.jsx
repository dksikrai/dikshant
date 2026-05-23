import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, SlideIn, isIOS, ease } from '@/lib/motion.jsx';

const roles = [
  {
    title: "Senior Web Developer",
    company: "iTechPanel LLP",
    date: "Aug 2025 – Present",
    location: "Jaipur, India",
    tag: "Current",
    icon: Briefcase,
    accent: "primary",
    description: "Accelerating project delivery, optimizing team workflows, and leading technical architecture. Spearheading developer mentoring, enterprise-grade deployment pipelines, and a robust code-review culture.",
    bullets: [
      "Led project delivery acceleration and optimized team workflows for enterprise clients.",
      "Provided technical architecture leadership for scalable, production-grade SaaS systems.",
      "Mentored junior and mid-level developers in Laravel best practices and clean code standards.",
      "Significantly improved deployment pipelines to achieve near zero-downtime releases."
    ]
  },
  {
    title: "Senior PHP & Laravel Developer",
    company: "iTechPanel LLP",
    date: "Apr 2025 – Aug 2025",
    location: "Jaipur, India",
    tag: "Promoted",
    icon: Award,
    accent: "secondary",
    description: "Architected enterprise Laravel backends and optimized performance bottlenecks. Designed and delivered robust multi-tenant SaaS architectures for global clients.",
    bullets: [
      "Architected enterprise-level Laravel applications utilizing advanced Eloquent optimizations.",
      "Reduced deployment cycle times by 60% through CI/CD implementation.",
      "Restructured database schemas and caching layers, resulting in a 70% reduction in database load.",
      "Designed and implemented multi-tenant architectures for SaaS platforms."
    ]
  },
  {
    title: "WordPress & Laravel Developer",
    company: "iTechPanel LLP",
    date: "Jan 2024 – Apr 2025",
    location: "Jaipur, India",
    tag: null,
    icon: Briefcase,
    accent: "primary",
    description: "Built high-performance custom WordPress products and complex Laravel APIs. Achieved major performance speedups and optimized backend logic.",
    bullets: [
      "Developed custom WordPress themes and plugins meeting strict performance requirements.",
      "Engineered RESTful Laravel APIs to act as headless backends for dynamic frontends.",
      "Achieved a 40% reduction in average page load times via Redis caching and asset optimization.",
      "Integrated complex third-party APIs including shipping providers and payment gateways."
    ]
  },
  {
    title: "Web Developer",
    company: "Urban Key Point Real Estate",
    date: "Sep 2023 – Dec 2023",
    location: "Jaipur, India",
    tag: null,
    icon: Award,
    accent: "secondary",
    description: "Developed a comprehensive real estate listing and lead management system using Laravel, featuring workflow automation and custom third-party integrations.",
    bullets: [
      "Built a comprehensive real estate listing management system using the Laravel framework.",
      "Automated property matching and email notifications via Laravel Jobs and Queues.",
      "Collaborated with stakeholders to continuously enhance UI/UX and improve user conversion."
    ]
  }
];

const accentMap = {
  primary: { 
    dot: "bg-primary/15 border-primary/30 text-primary hover:bg-primary/20", 
    tag: "bg-primary/10 text-primary border border-primary/20",
    glow: "hover:shadow-[0_0_25px_rgba(0,184,217,0.15)] hover:border-primary/40",
    bulletIcon: "text-primary"
  },
  secondary: { 
    dot: "bg-secondary/15 border-secondary/30 text-secondary hover:bg-secondary/20", 
    tag: "bg-secondary/10 text-secondary border border-secondary/20",
    glow: "hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:border-secondary/40",
    bulletIcon: "text-secondary"
  },
};

const CareerSection = () => {
  const ios = isIOS();

  // framer motion variants for bullets
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const bulletVariants = {
    hidden: ios ? { opacity: 0 } : { opacity: 0, x: -12 },
    visible: ios 
      ? { opacity: 1, transition: { duration: 0.3, ease: ease.out } }
      : { opacity: 1, x: 0, transition: { duration: 0.4, ease: ease.out } }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="career">
      {/* Background Glow */}
      <div className="absolute top-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 md:mb-20">
          <FadeIn className="mb-4">
            <h2 className="text-gradient-primary">Professional Journey</h2>
          </FadeIn>
          <FadeIn delay={0.07}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A trajectory of continuous technical growth, architectural leadership, and delivering high-performance enterprise web solutions.
            </p>
          </FadeIn>
        </div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[18px] top-0 w-0.5 bg-border/40 h-full" aria-hidden="true" />
          {!ios && (
            <motion.div
              className="absolute left-[18px] top-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/10 origin-top h-full"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.5, ease: ease.out }}
              aria-hidden="true"
            />
          )}

          <div className="space-y-12 md:space-y-16">
            {roles.map((role, idx) => {
              const colors = accentMap[role.accent];
              const Icon = role.icon;

              return (
                <div key={idx} className="relative pl-12 md:pl-16 group/item">
                  {/* Timeline icon dot */}
                  <motion.div
                    className={`absolute left-0 top-2 md:top-3 w-9 h-9 rounded-full border-4 border-background flex items-center justify-center z-10 smooth-transition ${colors.dot}`}
                    initial={ios ? { opacity: 0, scale: 0.6 } : { scale: 0 }}
                    animate={ios ? { opacity: 1, scale: 1 } : undefined}
                    whileInView={ios ? undefined : { scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 350, damping: 18, delay: ios ? 0.1 + idx * 0.08 : 0.15 + idx * 0.1 }}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                  </motion.div>

                  <SlideIn direction="left" delay={idx * 0.1}>
                    <motion.div
                      whileHover={ios ? {} : { x: 4 }}
                      transition={{ duration: 0.2, ease: ease.out }}
                    >
                      <Card className={`glass-card border-border/40 premium-shadow smooth-transition ${colors.glow}`}>
                        <CardContent className="p-6 md:p-8">
                          {/* Header row */}
                          <div className="flex flex-col gap-3 mb-5 pb-5 border-b border-border/30">
                            <div className="flex items-start justify-between gap-3 flex-wrap">
                              <div className="flex items-center gap-2.5 flex-wrap">
                                <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-foreground">{role.title}</h3>
                                {role.tag && (
                                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${colors.tag} uppercase tracking-wider shrink-0`}>
                                    {role.tag}
                                  </span>
                                )}
                              </div>
                              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/60 px-3 py-1 rounded-full whitespace-nowrap shrink-0 border border-border/30">
                                <Calendar className="w-3 h-3 text-primary shrink-0" />
                                {role.date}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                              <span className="text-primary">{role.company}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-border" />
                              <span className="flex items-center gap-1.5 text-muted-foreground">
                                <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground/60" />
                                {role.location}
                              </span>
                            </div>
                          </div>

                          {/* Role Tagline/Description */}
                          <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-6 italic">
                            {role.description}
                          </p>

                          {/* Achievements list */}
                          <motion.ul 
                            className="space-y-3.5"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                          >
                            {role.bullets.map((bullet, bIdx) => (
                              <motion.li
                                key={bIdx}
                                className="flex items-start gap-3 text-muted-foreground group/bullet"
                                variants={bulletVariants}
                              >
                                <div className={`mt-1 shrink-0 p-0.5 rounded-full bg-muted/50 border border-border/30 group-hover/bullet:border-primary/20 smooth-transition`}>
                                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${colors.bulletIcon}`} />
                                </div>
                                <span className="text-sm md:text-base leading-relaxed text-muted-foreground group-hover/bullet:text-foreground smooth-transition">
                                  {bullet}
                                </span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </CardContent>
                      </Card>
                    </motion.div>
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
