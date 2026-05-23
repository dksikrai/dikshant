import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const TechStackBadge = ({ name, icon: Icon, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
    >
      <Badge variant="secondary" className="px-3 py-1.5 text-sm font-medium flex items-center gap-2 bg-secondary hover:bg-secondary/80 smooth-transition cursor-default">
        {Icon && <Icon className="w-4 h-4 text-primary" />}
        {name}
      </Badge>
    </motion.div>
  );
};

export default TechStackBadge;