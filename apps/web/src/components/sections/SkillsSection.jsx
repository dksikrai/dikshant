
import React from 'react';
import { motion } from 'framer-motion';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "React & Next.js Ecosystem",
      skills: [
        { name: "React / Next.js", level: "Expert", width: "95%" },
        { name: "JavaScript / TypeScript", level: "Expert", width: "95%" },
        { name: "Tailwind CSS", level: "Expert", width: "100%" },
        { name: "State Management (Redux/Zustand)", level: "Advanced", width: "85%" },
        { name: "Responsive Frontend Design", level: "Expert", width: "95%" }
      ]
    },
    {
      title: "Laravel & Node.js Backend",
      skills: [
        { name: "Laravel Framework", level: "Expert", width: "100%" },
        { name: "Node.js (Express / NestJS)", level: "Advanced", width: "85%" },
        { name: "PHP 8+", level: "Expert", width: "100%" },
        { name: "Eloquent ORM / Mongoose", level: "Expert", width: "95%" },
        { name: "API Development & Versioning", level: "Expert", width: "95%" }
      ]
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "MySQL / PostgreSQL", level: "Expert", width: "90%" },
        { name: "Redis Caching & Sockets", level: "Advanced", width: "85%" },
        { name: "Database Design & Optimization", level: "Expert", width: "95%" },
        { name: "Queue Systems & Horizon", level: "Expert", width: "95%" }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS Services (EC2, S3, SQS)", level: "Advanced", width: "80%" },
        { name: "Docker Containerization", level: "Advanced", width: "80%" },
        { name: "Linux / CloudPanel", level: "Advanced", width: "85%" },
        { name: "CI/CD Pipelines (GitHub Actions)", level: "Advanced", width: "80%" }
      ]
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4">Skills & Proficiency</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Categorized technical breakdown indicating execution capability levels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {skillCategories.map((category, catIdx) => (
            <motion.div 
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: catIdx * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50 text-foreground">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-semibold text-foreground">{skill.name}</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {skill.level}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.width }}
                        viewport={{ once: true, amount: 0.05 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-primary rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 2s infinite linear' }} />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}} />
    </section>
  );
};

export default SkillsSection;
