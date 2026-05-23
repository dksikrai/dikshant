
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WorkExperienceSection = () => {
  const experiences = [
    {
      title: "Senior Web Developer",
      company: "iTechPanel LLP",
      date: "02/08/2025 - Present",
      location: "Jaipur, India",
      promoted: true,
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
      bullets: [
        "Built a comprehensive real estate listing management system using the Laravel framework.",
        "Automated property matching and email notifications via Laravel Jobs and Queues.",
        "Collaborated with stakeholders to continuously enhance UI/UX and improve user conversion."
      ]
    }
  ];

  return (
    <section className="py-16 md:py-20" id="experience">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4">Detailed Work Experience</h2>
          <p className="text-xl text-muted-foreground">
            A comprehensive breakdown of roles, responsibilities, and key achievements.
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((job, idx) => (
            <motion.div
              key={idx}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="glass-card border-border/50 premium-shadow">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-border/50">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-foreground">{job.title}</h3>
                      </div>
                      <p className="text-lg font-semibold text-primary mb-2">{job.company}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {job.date}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {job.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;
