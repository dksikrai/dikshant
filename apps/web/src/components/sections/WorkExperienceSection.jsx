import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, isIOS, ease } from '@/lib/motion.jsx';

const experiences = [
  {
    title: "Senior Web Developer",
    company: "iTechPanel LLP",
    date: "02/08/2025 - Present",
    location: "Jaipur, India",
    tag: "Current",
    bullets: [
      "Led project delivery acceleration and optimized team workflows for enterprise clients.",
      "Provided technical architecture leadership for scalable, production-grade SaaS systems.",
      "Mentored junior and mid-level developers in Laravel best practices and clean code standards.",
      "Significantly improved deployment pipelines to achieve near zero-downtime releases."
    ]
  },
  {
    title: "Senior PHP, WordPress & Laravel Developer",
    company: "iTechPanel LLP",
    date: "04/2025 - 02/08/2025",
    location: "Jaipur, India",
    tag: "Promoted",
    bullets: [
      "Architected enterprise-level Laravel applications utilizing advanced Eloquent optimizations.",
      "Reduced deployment cycle times by 60% through CI/CD implementation.",
      "Restructured database schemas and caching layers resulting in a 70% reduction in database load.",
      "Designed and implemented multi-tenant architectures for SaaS platforms."
    ]
  },
  {
    title: "WordPress & Laravel Developer",
    company: "iTechPanel LLP",
    date: "01/2024 - 04/2025",
    location: "Jaipur, India",
    tag: null,
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
    date: "09/2023 - 12/2023",
    location: "Jaipur, India",
    tag: null,
    bullets: [
      "Built a comprehensive real estate listing management system using the Laravel framework.",
      "Automated property matching and email notifications via Laravel Jobs and Queues.",
      "Collaborated with stakeholders to continuously enhance UI/UX and improve user conversion."
    ]
  }
];

const WorkExperienceSection = () => {
  const ios = isIOS();

  return (
    <section className="py-14 md:py-20" id="experience">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-3 text-center">
          <h2>Detailed Work Experience</h2>
        </FadeIn>
        <FadeIn delay={0.07} className="mb-10 md:mb-16 text-center">
          <p className="text-lg md:text-xl text-muted-foreground">
            A comprehensive breakdown of roles, responsibilities, and key achievements.
          </p>
        </FadeIn>

        <div className="space-y-8">
          {experiences.map((job, idx) => (
            <FadeIn key={idx} delay={idx * 0.08}>
              <motion.div
                whileHover={ios ? {} : { x: 4 }}
                transition={{ duration: 0.2, ease: ease.out }}
              >
                <Card className="glass-card border-border/50 premium-shadow">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-border/50">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-foreground">{job.title}</h3>
                          {job.tag && (
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              job.tag === 'Current'
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'bg-secondary/10 text-secondary border border-secondary/20'
                            }`}>
                              {job.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-lg font-semibold text-primary mb-2">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {job.date}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2.5 md:space-y-3">
                      {job.bullets.map((bullet, bIdx) => (
                        <motion.li
                          key={bIdx}
                          className="flex items-start gap-2.5 md:gap-3 text-muted-foreground"
                          initial={ios ? { opacity: 0 } : { opacity: 0, x: -10 }}
                          animate={ios ? { opacity: 1 } : undefined}
                          whileInView={ios ? undefined : { opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: ios ? 0.1 + bIdx * 0.06 : 0.05 + bIdx * 0.08, duration: 0.38, ease: ease.out }}
                        >
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-secondary shrink-0 mt-0.5" />
                          <span className="text-sm md:text-base leading-relaxed">{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;
