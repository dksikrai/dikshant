
import React from 'react';
import { motion } from 'framer-motion';
import { Server, Workflow, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CompetenciesSection = () => {
  const competencies = [
    {
      title: "Enterprise SaaS & Backend Architecture",
      icon: Server,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Building production-grade multi-tenant applications from the ground up.",
      items: ["Laravel Mastery & Eloquent ORM", "Complex Queue Systems & Horizon", "API Development & Versioning", "Database Optimization", "Production Deployment"]
    },
    {
      title: "Automation & Integration Systems",
      icon: Workflow,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Connecting disparate systems into seamless, automated operational workflows.",
      items: ["ShipStation & YunExpress APIs", "Stripe, Razorpay & PayPal", "Fabric.js Image Processing", "Webhook Architecture", "SendGrid & AWS SES"]
    },
    {
      title: "Cloud & DevOps Infrastructure",
      icon: Cloud,
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10 dark:bg-amber-400/10",
      description: "Designing resilient, scalable hosting environments and delivery pipelines.",
      items: ["AWS Services (EC2, S3, Lambda)", "Docker Containerization", "Linux & CloudPanel Management", "CI/CD Pipeline Automation", "Logging & Monitoring"]
    }
  ];

  const thirdComp = competencies[2];
  const ThirdIcon = thirdComp.icon;

  return (
    <section className="py-16 md:py-20" id="expertise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="mb-16"
        >
          <h2 className="mb-4">Core Competencies</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Specialized domains where I architect solutions that drive business value and operational efficiency.
          </p>
        </motion.div>

        {/* 2+1 Layout to avoid generic 3-column AI grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {competencies.slice(0, 2).map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <motion.div
                key={idx}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full glass-card border-border/50 premium-shadow hover:-translate-y-1 smooth-transition">
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 rounded-2xl ${comp.bgColor} flex items-center justify-center mb-6`}>
                      <Icon className={`w-7 h-7 ${comp.color}`} />
                    </div>
                    <CardTitle className="text-2xl">{comp.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{comp.description}</p>
                    <ul className="space-y-3">
                      {comp.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-medium">
                          <svg className={`${comp.color} w-3 h-3 shrink-0 mt-1`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="6 3 20 12 6 21" />
                          </svg>
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-border/50 premium-shadow hover:-translate-y-1 smooth-transition overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-muted/50 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border/50">
                <div className={`w-14 h-14 rounded-2xl ${thirdComp.bgColor} flex items-center justify-center mb-6`}>
                  <ThirdIcon className={`w-7 h-7 ${thirdComp.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{thirdComp.title}</h3>
                <p className="text-muted-foreground">{thirdComp.description}</p>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full content-center">
                  {thirdComp.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/50">
                      <svg className={`${thirdComp.color} w-3 h-3 shrink-0 mt-1`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="6 3 20 12 6 21" />
                      </svg>
                      <span className="text-sm font-medium text-foreground/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetenciesSection;
