import React from 'react';
import { m as motion } from 'framer-motion';
import { Server, Zap, Cloud, ShoppingCart, Brain, Layout } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader.jsx';
import { FadeIn, isIOS, ease } from '@/lib/motion.jsx';

const expertise = [
  {
    icon: Server,
    title: 'Backend & API Architecture',
    color: 'text-primary',
    iconBg: 'bg-primary/10 border-primary/20',
    description: 'Node.js, Python and PHP/Laravel backends: API-first design, multi-tenant SaaS, database optimization, and production-grade services in the language that fits the job.',
    points: ['Node.js, Python & Laravel', 'Multi-Tenant SaaS Design', 'API-First Architecture', 'Database Optimization'],
  },
  {
    icon: Zap,
    title: 'Queue & Async Systems',
    color: 'text-primary',
    iconBg: 'bg-primary/10 border-primary/20',
    description: 'Redis queues, background job processing, webhook delivery, event-driven architecture, and async workflow automation in Node.js, Python and Laravel (Horizon).',
    points: ['Redis & Queue Workers', 'Background Job Pipelines', 'Webhook Architecture', 'Event-Driven Systems'],
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    color: 'text-primary',
    iconBg: 'bg-primary/10 border-primary/20',
    description: 'AWS (EC2, S3, SQS, Lambda), Linux server management, CI/CD pipelines, zero-downtime deployment, and production monitoring.',
    points: ['AWS EC2, S3, SQS, Lambda', 'CI/CD Pipeline Setup', 'Linux Server Management', 'Zero-Downtime Deploys'],
  },
  {
    icon: Brain,
    title: 'AI Engineering',
    color: 'text-primary',
    iconBg: 'bg-primary/10 border-primary/20',
    description: 'OpenAI API integrations, RAG pipelines, document embeddings, vector caching with Redis, AI automation workflows for production SaaS.',
    points: ['OpenAI API Integration', 'RAG Pipelines & Embeddings', 'AI Automation Workflows', 'Vector Search Systems'],
  },
  {
    icon: Layout,
    title: 'Frontend Systems',
    color: 'text-primary',
    iconBg: 'bg-primary/10 border-primary/20',
    description: 'Next.js, React, TypeScript, Tailwind CSS — building modern SaaS dashboards, responsive UI systems, and performant frontend architectures.',
    points: ['Next.js / React / TypeScript', 'Tailwind CSS Systems', 'SaaS Dashboard UI', 'Performance Optimization'],
  },
  {
    icon: ShoppingCart,
    title: 'Ecommerce & Payments',
    color: 'text-primary',
    iconBg: 'bg-primary/10 border-primary/20',
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
      <div className="h-full glass-card card-hover rounded-2xl p-6 flex flex-col gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${exp.iconBg} shrink-0`}>
          <Icon className={`w-5 h-5 ${exp.color}`} />
        </div>

        {/* Title */}
        <h3 className="font-medium text-foreground" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>
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
    <section className="site-section" id="expertise">
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-border" />

      <div className="site-container">
        <SectionHeader
          label="Engineering expertise"
          title="What I build with"
          description="Core engineering domains where I have deep, production-proven experience."
        />

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
