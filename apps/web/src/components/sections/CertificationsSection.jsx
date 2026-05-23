
import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Languages, Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CertificationsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30" id="achievements">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-4">Background & Recognition</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Education, personal interests, language proficiencies, and notable achievements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Certifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="h-full glass-card border-border/50 premium-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/20">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Certifications & Achievements</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Senior Web Developer Promotion (Aug 2025)",
                    "Advanced Laravel Architecture",
                    "Production-Grade System Design",
                    "Team Leadership & Mentoring",
                    "Performance Optimization Mastery",
                    "Enterprise SaaS Development",
                    "Cloud Infrastructure & DevOps"
                  ].map((cert, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/50 hover:border-emerald-500/30 dark:hover:border-emerald-400/30 smooth-transition">
                      <span className="text-emerald-500 dark:text-emerald-400 mt-0.5">✦</span>
                      <span className="text-sm font-semibold">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education & Languages Stack */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card border-border/50 premium-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold">Education</h3>
                  </div>
                  <div className="pl-2">
                    <p className="font-bold text-foreground">Bachelor of Computer Application (BCA)</p>
                    <p className="text-sm text-muted-foreground mt-1">Swargiya P.N.K.S. Government PG College</p>
                    <p className="text-xs text-primary font-bold mt-2 bg-primary/10 inline-block px-2 py-1 rounded">06/2021 - Present | Dausa</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card border-border/50 premium-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                      <Languages className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold">Languages</h3>
                  </div>
                  <ul className="space-y-3 pl-2">
                    <li className="flex justify-between items-center">
                      <span className="font-semibold text-sm">Hindi</span>
                      <span className="text-xs font-bold px-2 py-1 bg-muted rounded">Native</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-semibold text-sm">English</span>
                      <span className="text-xs font-bold px-2 py-1 bg-muted rounded">Professional</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Interests Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-3"
          >
            <Card className="glass-card border-border/50 premium-shadow">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">Professional Interests</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Scalable Laravel Apps", "Team Workflow Optimization", 
                    "Developer Mentoring", "Cloud Architecture", 
                    "PHP/Laravel Technologies", "Open Source", "Automation"
                  ].map((interest, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-primary/8 border border-primary/20 text-sm font-semibold text-foreground hover:bg-primary/15 smooth-transition cursor-default">
                      {interest}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
