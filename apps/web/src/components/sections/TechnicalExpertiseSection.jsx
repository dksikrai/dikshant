import React from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Cloud, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FadeIn, isIOS, ease, TextReveal } from '@/lib/motion.jsx';

const expertise = [
  {
    id: "item-1",
    title: "Backend & SaaS Engineering",
    icon: Server,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    description: "Laravel architecture, API-first development, queue-driven design, background processing, multi-tenant SaaS, database optimization, production-grade systems."
  },
  {
    id: "item-2",
    title: "Automation & Integration Systems",
    icon: Zap,
    color: "text-secondary",
    bg: "bg-secondary/10 border-secondary/20",
    description: "Shipping APIs, payment gateways, email/notification systems, image processing via Fabric.js, queue-based workflows, third-party integrations, webhook architecture."
  },
  {
    id: "item-3",
    title: "Cloud & DevOps Infrastructure",
    icon: Cloud,
    color: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    description: "AWS services (EC2, S3, RDS), Docker containerization, Linux management, CloudPanel setup, Hostinger Horizons, CI/CD pipelines, performance optimization."
  },
  {
    id: "item-4",
    title: "E-commerce & Product Systems",
    icon: ShoppingCart,
    color: "text-rose-500 dark:text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    description: "WooCommerce customization, dynamic product builders, inventory management, automated order routing, checkout optimization, secure payment workflows."
  }
];

const TechnicalExpertiseSection = () => {
  const ios = isIOS();

  return (
    <section className="py-16 md:py-20" id="tech-expertise">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            <TextReveal text="Advanced Technical Depth" className="text-gradient-primary" />
          </h2>
        </div>
        <FadeIn delay={0.08} className="text-center mb-16">
          <p className="text-xl text-muted-foreground">
            Granular insights into my technical capabilities across the stack.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="glass-card border-border/50 premium-shadow">
            <CardContent className="p-2 sm:p-6">
              <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
                {expertise.map((exp, idx) => (
                  <motion.div
                    key={exp.id}
                    initial={ios ? false : { opacity: 0, x: -16 }}
                    whileInView={ios ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + idx * 0.09, duration: 0.45, ease: ease.out }}
                  >
                    <AccordionItem
                      value={exp.id}
                      className="border-border/50 px-4 rounded-xl data-[state=open]:bg-secondary/5 transition-colors duration-150"
                    >
                      <AccordionTrigger className="hover:no-underline py-6">
                        <div className="flex items-center gap-4 text-left">
                          <motion.div
                            className={`p-3 rounded-xl border ${exp.bg} shadow-sm shrink-0`}
                            whileHover={ios ? {} : { scale: 1.1, rotate: -6 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 15 }}
                          >
                            <exp.icon className={`w-6 h-6 ${exp.color}`} />
                          </motion.div>
                          <span className="text-xl font-bold">{exp.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 pl-[4.5rem]">
                        <p className="text-muted-foreground text-base leading-relaxed">
                          {exp.description}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};

export default TechnicalExpertiseSection;
