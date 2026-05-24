import React from 'react';
import { motion } from 'framer-motion';
import {
  SiLaravel, SiPhp, SiRedis, SiMysql, SiPostgresql, SiNodedotjs,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiDocker, SiGithub, SiNginx, SiWordpress, SiWoocommerce
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { TbApi, TbBrandOpenai } from 'react-icons/tb';
import { FadeIn, isIOS } from '@/lib/motion.jsx';

const techStack = [
  {
    category: 'Backend',
    accent: 'text-rose-400',
    items: [
      { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
      { name: 'PHP 8+', icon: SiPhp, color: '#777BB4' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'REST APIs', icon: TbApi, color: '#60a5fa' },
    ],
  },
  {
    category: 'AI & ML',
    accent: 'text-violet-400',
    items: [
      { name: 'OpenAI', icon: TbBrandOpenai, color: '#10a37f' },
      { name: 'RAG Systems', icon: null, label: 'RAG', color: '#a78bfa' },
      { name: 'Embeddings', icon: null, label: '⟨V⟩', color: '#c4b5fd' },
      { name: 'LangChain', icon: null, label: '🦜', color: '#34d399' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    accent: 'text-amber-400',
    items: [
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Nginx', icon: SiNginx, color: '#009639' },
      { name: 'GitHub CI/CD', icon: SiGithub, color: '#f0f6fc' },
    ],
  },
  {
    category: 'Frontend',
    accent: 'text-cyan-400',
    items: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#f0f6fc' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    category: 'Infrastructure',
    accent: 'text-emerald-400',
    items: [
      { name: 'Redis', icon: SiRedis, color: '#DC382D' },
      { name: 'Laravel Horizon', icon: null, label: 'HZN', color: '#6366f1' },
      { name: 'AWS SQS', icon: FaAws, color: '#FF9900' },
      { name: 'Cron Jobs', icon: null, label: '⏱', color: '#34d399' },
    ],
  },
  {
    category: 'Databases',
    accent: 'text-sky-400',
    items: [
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'Redis Cache', icon: SiRedis, color: '#DC382D' },
      { name: 'Eloquent ORM', icon: null, label: 'ELQ', color: '#f87171' },
    ],
  },
  {
    category: 'Ecommerce',
    accent: 'text-pink-400',
    items: [
      { name: 'WooCommerce', icon: SiWoocommerce, color: '#96588A' },
      { name: 'WordPress', icon: SiWordpress, color: '#21759B' },
      { name: 'Stripe', icon: null, label: '$', color: '#635bff' },
      { name: 'ShipStation', icon: null, label: '📦', color: '#60a5fa' },
    ],
  },
];

const TechIcon = ({ item }) => {
  if (item.icon) {
    const Icon = item.icon;
    return <Icon style={{ color: item.color }} className="w-5 h-5 shrink-0" />;
  }
  return (
    <span
      className="text-sm font-bold shrink-0"
      style={{ color: item.color, fontFamily: 'monospace', minWidth: '1.25rem', textAlign: 'center' }}
    >
      {item.label}
    </span>
  );
};

const SkillsSection = () => {
  const ios = isIOS();

  return (
    <section className="py-10 md:py-28 relative overflow-hidden bg-white/[0.01]" id="skills">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <div className="section-label mb-4">TECH STACK</div>
          <h2 className="font-extrabold text-foreground mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            Tools of the Trade
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)' }}>
            Technologies I work with daily in production environments.
          </p>
        </FadeIn>

        {/* Tech grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '60px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {techStack.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              variants={ios ? {} : {
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="glass-card rounded-xl p-5"
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                <span className={`section-label ${category.accent}`}>{category.category}</span>
              </div>

              {/* Tech items */}
              <ul className="space-y-3">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                    <TechIcon item={item} />
                    <span className="font-medium">{item.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
