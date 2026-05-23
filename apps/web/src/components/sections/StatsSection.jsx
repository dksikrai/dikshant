
import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "20+", label: "Websites Delivered", icon: "🌐", description: "From MVPs to enterprise SaaS" },
  { value: "5+", label: "Years Experience", icon: "⚡", description: "Building production systems" },
  { value: "99.9%", label: "Uptime Achieved", icon: "🛡️", description: "Across all hosted platforms" },
  { value: "50K+", label: "Users Served", icon: "🚀", description: "Across all client platforms" },
];

const StatsSection = () => (
  <section className="py-16 relative overflow-hidden" id="stats">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-y border-border/50" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,184,217,0.04),transparent_70%)]" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0 divide-border/30">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
            className={`text-center px-6 py-6 md:py-2 group ${
              i < 3 ? 'border-b-2 md:border-b-0 md:border-r-2 border-border/30' : 'border-none'
            }`}
          >
            <div className="text-3xl mb-3 group-hover:scale-110 smooth-transition inline-block">{stat.icon}</div>
            <div className="text-4xl md:text-5xl font-extrabold text-gradient-primary mb-2 tabular-nums">
              {stat.value}
            </div>
            <div className="text-sm font-bold text-foreground mb-1">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.description}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
