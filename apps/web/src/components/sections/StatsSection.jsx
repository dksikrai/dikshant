import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn, useCountUp, isIOS, ease } from '@/lib/motion.jsx';

const stats = [
  { value: "20+",   display: 20,   suffix: "+",  label: "Websites Delivered", icon: "🌐", description: "From MVPs to enterprise SaaS" },
  { value: "5+",    display: 5,    suffix: "+",  label: "Years Experience",    icon: "⚡", description: "Building production systems" },
  { value: "99.9%", display: 99.9, suffix: "%",  label: "Uptime Achieved",    icon: "🛡️", description: "Across all hosted platforms" },
  { value: "50K+",  display: 50,   suffix: "K+", label: "Users Served",       icon: "🚀", description: "Across all client platforms" },
];

const StatCard = ({ stat, index }) => {
  const ios = isIOS();
  const [ref, count] = useCountUp(stat.display, 1.6);

  return (
    <motion.div 
      variants={{
        hidden: ios ? {} : { opacity: 0, y: 15 },
        visible: ios ? {} : { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
      }}
    >
      <div
        ref={ref}
        className={`text-center px-2 sm:px-6 py-6 md:py-4 group ${
          index < 3 ? 'border-b md:border-b-0 md:border-r border-border/40' : ''
        }`}
      >
        <motion.div
          className="text-2xl md:text-3xl mb-2 md:mb-3 inline-block"
          whileHover={ios ? {} : { scale: 1.25, rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.38 }}
        >
          {stat.icon}
        </motion.div>

        <div className="font-extrabold text-gradient-primary mb-1.5 tabular-nums" style={{ fontSize: 'clamp(1.875rem, 5vw, 3rem)', lineHeight: '1' }}>
          {ios ? stat.value : `${count}${stat.suffix}`}
        </div>
        <div className="font-bold text-foreground mb-0.5 leading-tight" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>{stat.label}</div>
        <div className="text-muted-foreground hidden sm:block" style={{ fontSize: 'clamp(0.625rem, 1vw, 0.75rem)' }}>{stat.description}</div>
      </div>
    </motion.div>
  );
};

const StatsSection = () => (
  <section className="py-10 md:py-12 relative overflow-hidden" id="stats">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-border/40" />

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "50px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default StatsSection;
