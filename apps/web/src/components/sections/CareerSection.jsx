import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, SlideIn, isIOS, ease, useCardTilt, TextReveal } from '@/lib/motion.jsx';

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
    dot: "bg-background border-primary text-primary hover:border-primary/80", 
    tag: "bg-primary/10 text-primary border border-primary/20",
    glow: "hover:shadow-[0_0_35px_rgba(0,184,217,0.18)] hover:border-primary/50",
    bulletIcon: "text-primary",
    bgGradient: "from-primary/[0.01] to-transparent"
  },
  secondary: { 
    dot: "bg-background border-secondary text-secondary hover:border-secondary/80", 
    tag: "bg-secondary/10 text-secondary border border-secondary/20",
    glow: "hover:shadow-[0_0_35px_rgba(139,92,246,0.18)] hover:border-secondary/50",
    bulletIcon: "text-secondary",
    bgGradient: "from-secondary/[0.01] to-transparent"
  },
};

// Child Component to safely use useCardTilt hook per card without violating rules of hooks
const CareerCard = ({ role, colors, ios }) => {
  const { ref, motionProps } = useCardTilt(5); // Balanced tilt angle

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
    <motion.div
      ref={ref}
      {...motionProps}
      style={{ ...motionProps.style, perspective: 1000 }}
      whileHover={ios ? {} : { y: -3 }}
      transition={{ duration: 0.2, ease: ease.out }}
      className="w-full"
    >
      <Card className={`glass-card border-border/40 premium-shadow smooth-transition bg-gradient-to-br ${colors.bgGradient} ${colors.glow}`}>
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
                <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
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
                className="flex items-start gap-3 text-muted-foreground group/bullet cursor-default"
                variants={bulletVariants}
                whileHover={ios ? {} : { x: 3 }}
                transition={{ duration: 0.15 }}
              >
                <motion.div 
                  className="mt-1 shrink-0 p-0.5 rounded-full bg-muted/50 border border-border/30 group-hover/bullet:border-primary/20 smooth-transition"
                  whileHover={ios ? {} : { scale: 1.12 }}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${colors.bulletIcon}`} />
                </motion.div>
                <span className="text-sm md:text-base leading-relaxed text-muted-foreground group-hover/bullet:text-foreground smooth-transition">
                  {bullet}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CareerSection = () => {
  const ios = isIOS();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="career">
      {/* Ambient background aura */}
      <div className="absolute top-[15%] left-[-15%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.04),transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-15%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.04),transparent_65%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 md:mb-20">
          <div className="mb-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              <TextReveal text="Professional Journey" className="text-gradient-primary" />
            </h2>
          </div>
          <FadeIn delay={0.15}>
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
                    className={`absolute left-[1px] top-2 md:top-3 w-9 h-9 rounded-full border-2 flex items-center justify-center z-10 smooth-transition ${colors.dot}`}
                    initial={ios ? { opacity: 0, scale: 0.6 } : { scale: 0 }}
                    animate={ios ? { opacity: 1, scale: 1 } : undefined}
                    whileInView={ios ? undefined : { scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 350, damping: 18, delay: ios ? 0.1 + idx * 0.08 : 0.15 + idx * 0.1 }}
                  >
                    {/* Ring pulse animation for current active job */}
                    {role.tag === 'Current' && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 opacity-75 pointer-events-none" />
                    )}
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                  </motion.div>

                  <SlideIn direction="left" delay={idx * 0.1}>
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
