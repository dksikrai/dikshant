import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Activity, Server, Shield } from 'lucide-react';

const ProjectCard = ({ project, index = 0, detailed = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden glass-card border-border premium-shadow hover:shadow-xl smooth-transition flex flex-col group">
        {project.image && (
          <div className="relative h-48 md:h-64 overflow-hidden bg-muted">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-105 smooth-transition duration-500"
            />
          </div>
        )}
        
        <CardHeader className="relative z-20 -mt-6 bg-transparent pt-6 rounded-t-2xl">
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-2xl group-hover:text-primary smooth-transition">
              {project.title}
            </CardTitle>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground smooth-transition">
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow flex flex-col gap-6">
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <Badge key={idx} variant="outline" className="bg-background">
                {tech}
              </Badge>
            ))}
          </div>

          {detailed && project.features && (
            <div className="mt-4 space-y-6 border-t border-border pt-6">
              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" /> Key Features
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {project.metrics && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" /> Performance Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-secondary p-3 rounded-lg">
                        <span className="block text-xs text-muted-foreground mb-1">{metric.label}</span>
                        <span className="block font-semibold text-foreground">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;