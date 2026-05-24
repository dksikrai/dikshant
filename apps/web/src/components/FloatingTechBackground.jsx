import React from 'react';
import { motion } from 'framer-motion';
import {
  SiLaravel,
  SiReact,
  SiMysql,
  SiRedis,
  SiWordpress,
  SiTailwindcss,
  SiPhp,
  SiWoocommerce,
  SiNextdotjs,
  SiVite,
  SiDocker,
  SiNodedotjs,
  SiGraphql,
  SiTypescript
} from 'react-icons/si';
import { FaAws, FaMagento } from 'react-icons/fa';

// Positions are percentage-based to spread across the viewport
const icons = [
  { Icon: SiLaravel, size: 70, top: '15%', left: '8%', duration: 25, delay: 0 },
  { Icon: SiReact, size: 90, top: '22%', left: '85%', duration: 32, delay: 2 },
  { Icon: FaAws, size: 100, top: '65%', left: '8%', duration: 28, delay: 5 },
  { Icon: SiRedis, size: 60, top: '75%', left: '82%', duration: 22, delay: 1 },
  { Icon: SiMysql, size: 80, top: '40%', left: '90%', duration: 30, delay: 3 },
  { Icon: SiWordpress, size: 65, top: '85%', left: '20%', duration: 26, delay: 4 },
  { Icon: SiTailwindcss, size: 75, top: '35%', left: '15%', duration: 35, delay: 2 },
  { Icon: SiPhp, size: 85, top: '50%', left: '5%', duration: 29, delay: 6 },
  { Icon: SiWoocommerce, size: 70, top: '10%', left: '70%', duration: 31, delay: 7 },
  { Icon: SiNextdotjs, size: 80, top: '60%', left: '92%', duration: 27, delay: 3 },
  { Icon: SiVite, size: 60, top: '80%', left: '40%', duration: 24, delay: 5 },
  { Icon: FaMagento, size: 75, top: '25%', left: '35%', duration: 33, delay: 8 },
  { Icon: SiDocker, size: 90, top: '90%', left: '60%', duration: 36, delay: 2 },
  { Icon: SiNodedotjs, size: 70, top: '5%', left: '45%', duration: 28, delay: 4 },
  { Icon: SiGraphql, size: 65, top: '55%', left: '25%', duration: 25, delay: 1 },
  { Icon: SiTypescript, size: 75, top: '45%', left: '75%', duration: 30, delay: 6 },
];

const FloatingTechBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {icons.map((item, i) => {
        const { Icon, size, top, left, duration, delay } = item;
        return (
          <motion.div
            key={i}
            className="absolute text-white/[0.04]"
            style={{ top, left }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingTechBackground;
