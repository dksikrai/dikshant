import React from 'react';
import { motion } from 'framer-motion';
import { Server, Workflow, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn, isIOS, ease, TextReveal } from '@/lib/motion.jsx';

const competencies = [
  {
    title: "Enterprise SaaS & Backend Architecture",
    icon: Server,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    description: "Building production-grade multi-tenant applications engineered for scale, reliability, and maintainability.",
    items: [
      "Laravel Framework & Eloquent ORM",
      "Queue Systems & Background Processing",
      "REST & GraphQL API Development",
      "Database Design & Optimization",
      "Production Deployment & CI/CD"
    ]
  },
  {
    title: "Automation & Third-Party Integrations",
    icon: Workflow,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20",
    description: "Connecting business systems into seamless, automated workflows that eliminate manual processes.",
    items: [
      "Shipment & Logistics Automation",
      "Payment Gateway Integration",
      "Email & Notification Systems",
      "Canvas & Image Processing",
      "Webhook & Event Architecture"
    ]
  },
  {
    title: "Cloud & DevOps Infrastructure",
    icon: Cloud,
    color: "text-amber-500 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    description: "Designing resilient, cost-efficient cloud environments with automated delivery pipelines.",
    items: [
      "AWS Cloud Services (EC2, S3, Lambda)",
      "Docker & Container Orchestration",
      "Linux Server & Panel Management",
      "CI/CD Pipeline Automation",
      "Monitoring, Logging & Alerting"
    ]
  }
];

const CompetenciesSection = () => {
  const ios = isIOS();
  const thirdComp = competencies[2];
  const ThirdIcon = thirdComp.icon;

  return (
    <section className="py-16 md:py-24" id="expertise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            <TextReveal text="Core Competencies" className="text-gradient-primary" />
          </h2>
        </div>
        <FadeIn delay={0.07} className="mb-10 md:mb-16">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Specialized domains where I architect solutions that drive business value and operational efficiency.
          </p>
        </FadeIn>

        {/* 2-column grid on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-5 md:mb-8">
          {competencies.slice(0, 2).map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <FadeIn key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={ios ? {} : { y: -5 }}
                  transition={{ duration: 0.22, ease: ease.out }}
                  className="h-full"
                >
                  <Card className="h-full glass-card premium-shadow cursor-default">
                    <CardHeader className="pb-3 p-5 md:p-8">
                      <motion.div
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${comp.bgColor} border ${comp.borderColor} flex items-center justify-center mb-4 md:mb-6`}
                        whileHover={ios ? {} : { scale: 1.1, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <Icon className={`w-6 h-6 md:w-7 md:h-7 ${comp.color}`} />
                      </motion.div>
                      <CardTitle className="text-xl md:text-2xl leading-tight">{comp.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 md:px-8 md:pb-8">
                      <p className="text-sm md:text-base text-muted-foreground mb-5">{comp.description}</p>
                      <ul className="space-y-2.5">
                        {comp.items.map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2.5 text-sm font-medium"
                            initial={ios ? { opacity: 0 } : { opacity: 0, x: -10 }}
                            whileInView={ios ? undefined : { opacity: 1, x: 0 }}
                            animate={ios ? { opacity: 1 } : undefined}
                            viewport={{ once: true }}
                            transition={{ delay: ios ? 0.1 + i * 0.06 : 0.1 + i * 0.07, duration: 0.38, ease: ease.out }}
                          >
                            <svg className={`${comp.color} w-3 h-3 shrink-0 mt-0.5`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <polygon points="6 3 20 12 6 21" />
                            </svg>
                            <span className="text-foreground/90 leading-snug">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {/* Wide card — Cloud section */}
        <FadeIn delay={0.18}>
          <motion.div
            whileHover={ios ? {} : { y: -4 }}
            transition={{ duration: 0.22, ease: ease.out }}
          >
            <Card className="glass-card premium-shadow overflow-hidden">
              <div className="md:flex">
                {/* Left info panel */}
                <div className="md:w-2/5 bg-muted/40 dark:bg-slate-800/30 p-5 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border/40">
                  <motion.div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${thirdComp.bgColor} border ${thirdComp.borderColor} flex items-center justify-center mb-4 md:mb-6`}
                    whileHover={ios ? {} : { scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <ThirdIcon className={`w-6 h-6 md:w-7 md:h-7 ${thirdComp.color}`} />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{thirdComp.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{thirdComp.description}</p>
                </div>

                {/* Right items grid */}
                <div className="md:w-3/5 p-5 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {thirdComp.items.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2.5 p-3.5 md:p-4 rounded-xl bg-background border border-border/40 hover:border-primary/30 transition-colors duration-150"
                        initial={ios ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                        whileInView={ios ? undefined : { opacity: 1, scale: 1 }}
                        animate={ios ? { opacity: 1 } : undefined}
                        viewport={{ once: true }}
                        transition={{ delay: ios ? 0.08 + i * 0.07 : 0.05 + i * 0.08, duration: 0.38, ease: ease.out }}
                        whileHover={ios ? {} : { scale: 1.02 }}
                      >
                        <svg className={`${thirdComp.color} w-3 h-3 shrink-0 mt-0.5`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polygon points="6 3 20 12 6 21" />
                        </svg>
                        <span className="text-sm font-medium text-foreground/90 leading-snug">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CompetenciesSection;
