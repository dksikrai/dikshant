import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn, RevealLine, isIOS, ease } from '@/lib/motion.jsx';

const skillCategories = [
  {
    title: "React & Next.js Ecosystem",
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "React / Next.js",                   width: "95%" },
      { name: "JavaScript / TypeScript",            width: "95%" },
      { name: "Tailwind CSS",                       width: "100%" },
      { name: "State Management (Redux/Zustand)",   width: "85%" },
      { name: "Responsive Frontend Design",         width: "95%" }
    ]
  },
  {
    title: "Laravel & Node.js Backend",
    color: "from-rose-500 to-orange-500",
    skills: [
      { name: "Laravel Framework",              width: "100%" },
      { name: "Node.js (Express / NestJS)",     width: "85%" },
      { name: "PHP 8+",                         width: "100%" },
      { name: "Eloquent ORM / Mongoose",        width: "95%" },
      { name: "API Development & Versioning",   width: "95%" }
    ]
  },
  {
    title: "Database & Queuing",
    color: "from-violet-500 to-purple-500",
    skills: [
      { name: "MySQL / PostgreSQL",             width: "90%" },
      { name: "Redis Caching & Sockets",        width: "85%" },
      { name: "Database Design & Optimization", width: "95%" },
      { name: "Queue Systems & Horizon",        width: "95%" }
    ]
  },
  {
    title: "Cloud & DevOps",
    color: "from-amber-500 to-yellow-500",
    skills: [
      { name: "AWS Services (EC2, S3, SQS)",          width: "80%" },
      { name: "Docker Containerization",              width: "80%" },
      { name: "Linux / CloudPanel",                   width: "85%" },
      { name: "CI/CD Pipelines (GitHub Actions)",     width: "80%" }
    ]
  }
];

const SkillBar = ({ skill, color, delay, ios }) => {
  const pct = parseInt(skill.width);

  return (
    <div className="group">
      <div className="flex justify-between items-end mb-1.5">
        <span className="font-semibold text-foreground text-sm">{skill.name}</span>
        <motion.span
          className="text-xs font-bold tabular-nums text-primary"
          initial={{ opacity: 0 }}
          animate={ios ? { opacity: 1 } : undefined}
          whileInView={ios ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: ios ? Math.min(delay, 0.5) + 0.3 : delay + 0.6, duration: 0.4 }}
        >
          {pct}%
        </motion.span>
      </div>
      <div className="h-2 w-full bg-secondary/15 rounded-full overflow-hidden">
        {ios ? (
          <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: skill.width }} />
        ) : (
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: skill.width }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.95, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden`}
          >
            <div className="absolute inset-0 shimmer-bar" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ios = isIOS();

  return (
    <section className="py-14 md:py-20 bg-muted/30" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-3 text-center">
          <h2>Skills &amp; Proficiency</h2>
        </FadeIn>
        <FadeIn delay={0.07} className="mb-10 md:mb-16 text-center">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Categorized technical breakdown indicating execution capability levels.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
          {skillCategories.map((category, catIdx) => (
            <FadeIn key={catIdx} delay={catIdx * 0.1}>
              <div className="relative pl-4 border-l-2 border-border/30">
                {/* Animated left accent line */}
                {!ios && (
                  <motion.div
                    className={`absolute left-[-2px] top-0 w-0.5 bg-gradient-to-b ${category.color} origin-top`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: catIdx * 0.1, ease: ease.out }}
                    style={{ height: '100%' }}
                  />
                )}

                <h3 className="text-xl font-bold mb-6 text-foreground">{category.title}</h3>

                <div className="space-y-5">
                  {category.skills.map((skill, idx) => (
                    <SkillBar
                      key={idx}
                      skill={skill}
                      color={category.color}
                      delay={0.15 + idx * 0.1}
                      ios={ios}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
