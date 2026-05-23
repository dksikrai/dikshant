import React from 'react';
import { motion } from 'framer-motion';

const SkillBadge = ({ skill, proficiency, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex items-center justify-between p-3 rounded-xl bg-card border border-border premium-shadow hover:border-primary/50 smooth-transition"
    >
      <span className="font-medium text-card-foreground">{skill}</span>
      <span className="text-xs font-semibold px-2 py-1 rounded-md bg-primary/10 text-primary">
        {proficiency}
      </span>
    </motion.div>
  );
};

export default SkillBadge;