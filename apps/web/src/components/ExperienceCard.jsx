import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const ExperienceCard = ({ experience, index = 0 }) => {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      <div className="md:hidden absolute left-0 top-2 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10" />
      <div className="md:hidden absolute left-[5px] top-5 bottom-[-2rem] w-0.5 bg-border" />
      
      <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
        {/* Left side (Date & Location) - Desktop */}
        <div className="hidden md:flex flex-col items-end text-right pt-1">
          <span className="text-primary font-semibold">{experience.date}</span>
          <span className="text-sm text-muted-foreground flex items-center gap-1 mt-1 justify-end">
            {experience.location} <MapPin className="w-3 h-3" />
          </span>
        </div>

        {/* Center Timeline - Desktop */}
        <div className="hidden md:flex flex-col items-center relative h-full">
          <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background z-10 mt-1" />
          <div className="absolute top-5 bottom-[-3rem] w-0.5 bg-border" />
        </div>

        {/* Right side (Content) */}
        <div className="bg-card border border-border rounded-2xl p-6 premium-shadow hover:shadow-xl smooth-transition mb-8 md:mb-12">
          <h3 className="text-xl font-bold text-foreground mb-1">{experience.title}</h3>
          <div className="flex items-center gap-2 text-primary font-medium mb-4">
            <Briefcase className="w-4 h-4" />
            {experience.company}
          </div>
          
          {/* Mobile Date & Location */}
          <div className="md:hidden flex flex-col gap-1 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {experience.date}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {experience.location}
            </div>
          </div>

          <ul className="space-y-2">
            {experience.achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                <svg className="text-primary w-3 h-3 shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="6 3 20 12 6 21" />
                </svg>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;