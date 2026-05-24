import React from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Cloud, ShoppingCart, Brain, Layout } from 'lucide-react';
import { FadeIn, isIOS, ease } from '@/lib/motion.jsx';

const expertise = [
  {
    icon: Server,
    title: 'Backend Architecture',
    color: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10 border-indigo-500/20',
    description: 'Laravel, PHP 8+, API-first design, multi-tenant SaaS, Eloquent optimization, microservice patterns, and production-grade backend systems.',
    points: ['Laravel & PHP 8+ Expert', 'Multi-Tenant SaaS Design', 'API-First Architecture', 'Database Optimization'],
  },
  {
    icon: Zap,
    title: 'Queue & Async Systems',
    color: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Redis queues, Laravel Horizon, background job processing, webhook delivery, event-driven architecture, and async workflow automation.',
    points: ['Redis + Laravel Horizon', 'Background Job Pipelines', 'Webhook Architecture', 'Event-Driven Systems'],
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    color: 'text-sky-400',
    iconBg: 'bg-sky-500/10 border-sky-500/20',
    description: 'AWS (EC2, S3, SQS, Lambda), Linux server management, CI/CD pipelines, zero-downtime deployment, and production monitoring.',
    points: ['AWS EC2, S3, SQS, Lambda', 'CI/CD Pipeline Setup', 'Linux Server Management', 'Zero-Downtime Deploys'],
  },
  {
    icon: Brain,
    title: 'AI Engineering',
    color: 'text-violet-400',
    iconBg: 'bg-violet-500/10 border-violet-500/20',
    description: 'OpenAI API integrations, RAG pipelines, document embeddings, vector caching with Redis, AI automation workflows for production SaaS.',
    points: ['OpenAI API Integration', 'RAG Pipelines & Embeddings', 'AI Automation Workflows', 'Vector Search Systems'],
  },
  {
    icon: Layout,
    title: 'Frontend Systems',
    color: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    description: 'Next.js, React, TypeScript, Tailwind CSS — building modern SaaS dashboards, responsive UI systems, and performant frontend architectures.',
    points: ['Next.js / React / TypeScript', 'Tailwind CSS Systems', 'SaaS Dashboard UI', 'Performance Optimization'],
  },
  {
    icon: ShoppingCart,
    title: 'Ecommerce & Payments',
    color: 'text-rose-400',
    iconBg: 'bg-rose-500/10 border-rose-500/20',
    description: 'WooCommerce, Stripe, PayPal, ShipStation — building high-volume ecommerce backends with automated order processing and payment systems.',
    points: ['WooCommerce Customization', 'Stripe / PayPal Integration', 'Order Automation Systems', 'Inventory Management'],
  },
];

const ExpertiseCard = ({ exp, index }) => {
  const ios = isIOS();
  const Icon = exp.icon;

  return (
    <motion.div
      variants={{
        hidden: ios ? {} : { opacity: 0, y: 24 },
        visible: ios ? {} : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }
        },
      }}
      className="group"
    >
      <div className="h-full glass-card rounded-xl p-6 card-hover flex flex-col gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${exp.iconBg} shrink-0`}>
          <Icon className={`w-5 h-5 ${exp.color}`} />
        </div>

        {/* Title */}
        <h3 className="font-bold text-foreground" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>
          {exp.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
          {exp.description}
        </p>

        {/* Points */}
        <ul className="space-y-1.5 mt-1">
          {exp.points.map((point, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground/80">
              <span className={`w-1 h-1 rounded-full ${exp.color.replace('text-', 'bg-')} shrink-0`} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const TechnicalExpertiseSection = () => {
  const ios = isIOS();

  return (
    <section className="py-10 md:py-28 relative overflow-hidden" id="expertise">
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <div className="section-label mb-4">ENGINEERING EXPERTISE</div>
          <h2 className="font-extrabold text-foreground mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            What I Build With
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)' }}>
            Core engineering domains where I have deep, production-proven experience.
          </p>
        </FadeIn>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '60px' }}
          variants={{ hidden: {}, visible: {} }}
        >
          {expertise.map((exp, i) => (
            <ExpertiseCard key={i} exp={exp} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalExpertiseSection;
