
import React from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Cloud, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const TechnicalExpertiseSection = () => {
  const expertise = [
    {
      id: "item-1",
      title: "Backend & SaaS Engineering",
      icon: Server,
      description: "Laravel architecture, API-first development, queue-driven design, background processing, multi-tenant SaaS, database optimization, production-grade systems."
    },
    {
      id: "item-2",
      title: "Automation & Integration Systems",
      icon: Zap,
      description: "Shipping APIs, payment gateways, email/notification systems, image processing via Fabric.js, queue-based workflows, third-party integrations, webhook architecture."
    },
    {
      id: "item-3",
      title: "Cloud & DevOps Infrastructure",
      icon: Cloud,
      description: "AWS services (EC2, S3, RDS), Docker containerization, Linux management, CloudPanel setup, Hostinger Horizons, CI/CD pipelines, performance optimization."
    },
    {
      id: "item-4",
      title: "E-commerce & Product Systems",
      icon: ShoppingCart,
      description: "WooCommerce customization, dynamic product builders, inventory management, automated order routing, checkout optimization, secure payment workflows."
    }
  ];

  return (
    <section className="py-16 md:py-20" id="tech-expertise">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Advanced Technical Depth</h2>
          <p className="text-xl text-muted-foreground">
            Granular insights into my technical capabilities across the stack.
          </p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
        >
          <Card className="glass-card border-border/50 premium-shadow">
            <CardContent className="p-2 sm:p-6">
              <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
                {expertise.map((exp) => (
                  <AccordionItem key={exp.id} value={exp.id} className="border-border/50 px-4 rounded-xl data-[state=open]:bg-secondary/5 smooth-transition">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-4 text-left">
                        <div className="p-3 rounded-xl bg-background border border-border/50 shadow-sm shrink-0">
                          <exp.icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold">{exp.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6 pl-[4.5rem]">
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {exp.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalExpertiseSection;
