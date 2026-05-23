
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ChevronRight, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CareerSection = () => {
  const roles = [
    {
      title: "Senior Web Developer",
      company: "iTechPanel LLP",
      date: "02/08/2025 - Present",
      promoted: true,
      description: "Project delivery acceleration, team workflow optimization, technical leadership, and developer mentoring. Spearheading enterprise-grade deployment pipelines."
    },
    {
      title: "Senior PHP, WordPress & Laravel Developer",
      company: "iTechPanel LLP",
      date: "04/2025 - 02/08/2025",
      promoted: false,
      description: "Architected enterprise Laravel backends, reducing deployment time by 60% and database load by 70%. Engineered multi-tenant architectures."
    },
    {
      title: "WordPress & Laravel Developer",
      company: "iTechPanel LLP",
      date: "01/2024 - 04/2025",
      promoted: false,
      description: "Developed custom WordPress themes/plugins and complex Laravel APIs. Achieved a 40% reduction in load times through advanced caching strategies."
    },
    {
      title: "Web Developer",
      company: "Urban Key Point Real Estate",
      date: "09/2023 - 12/2023",
      promoted: false,
      description: "Built automated real estate listing management systems utilizing Laravel jobs and queues for background processing."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30" id="career">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="mb-16"
        >
          <h2 className="mb-4">Career Progression</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A trajectory of continuous technical growth, leadership, and measurable performance improvements.
          </p>
        </motion.div>

        <div className="relative border-l-2 border-border/60 ml-4 md:ml-8 space-y-12">
          {roles.map((role, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[17px] top-6 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center backdrop-blur-md smooth-transition ${
                idx % 2 === 0 
                  ? 'bg-primary/20 border-primary/30 text-primary' 
                  : 'bg-secondary/20 border-secondary/30 text-secondary'
              }`}>
                {idx % 2 === 0 ? <Briefcase className="w-4 h-4" /> : <Award className="w-4 h-4" />}
              </div>

              <Card className="glass-card border-border/50 premium-shadow hover:border-primary/30 smooth-transition group">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{role.title}</h3>
                      </div>
                      <p className="text-primary font-medium">{role.company}</p>
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground bg-secondary/10 px-4 py-2 rounded-lg border border-secondary/20 whitespace-nowrap">
                      {role.date}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
