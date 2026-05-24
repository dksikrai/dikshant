import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Languages, Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, isIOS, ease, TextReveal } from '@/lib/motion.jsx';

const certs = [
  "Senior Web Developer Promotion (Aug 2025)",
  "Advanced Laravel Architecture",
  "Production-Grade System Design",
  "Team Leadership & Mentoring",
  "Performance Optimization Mastery",
  "Enterprise SaaS Development",
  "Cloud Infrastructure & DevOps"
];

const interests = [
  "Scalable Laravel Apps", "Team Workflow Optimization",
  "Developer Mentoring", "Cloud Architecture",
  "PHP/Laravel Technologies", "Open Source", "Automation"
];

const CertificationsSection = () => {
  const ios = isIOS();

  return (
    <section className="py-16 md:py-24 bg-muted/30" id="achievements">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            <TextReveal text="Background & Recognition" className="text-gradient-primary" />
          </h2>
        </div>
        <FadeIn delay={0.07} className="mb-10 md:mb-16">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Education, personal interests, language proficiencies, and notable achievements.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Certifications card */}
          <FadeIn className="lg:col-span-2">
            <Card className="h-full glass-card border-border/50 premium-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Certifications &amp; Achievements</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certs.map((cert, i) => (
                      <motion.div
                      key={i}
                      className="flex items-start gap-3 p-3.5 md:p-4 rounded-xl bg-background border border-border/50 hover:border-emerald-500/30 transition-colors duration-150"
                      initial={ios ? { opacity: 0 } : { opacity: 0, y: 14 }}
                      animate={ios ? { opacity: 1 } : undefined}
                      whileInView={ios ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ios ? 0.05 + i * 0.06 : 0.05 + i * 0.07, duration: 0.42, ease: ease.out }}
                      whileHover={ios ? {} : { scale: 1.02, x: 3 }}
                    >
                      <motion.span
                        className="text-emerald-500 dark:text-emerald-400 mt-0.5"
                        animate={{ rotate: [0, 20, 0] }}
                        transition={{ delay: 1 + i * 0.15, duration: 0.5, ease: 'easeInOut' }}
                      >
                        ✦
                      </motion.span>
                      <span className="text-sm font-semibold">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Education & Languages */}
          <div className="space-y-8">
            <FadeIn delay={0.1}>
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
                    <p className="text-xs text-primary font-bold mt-2 bg-primary/10 inline-block px-2 py-1 rounded">
                      06/2021 - Present | Dausa
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
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
            </FadeIn>
          </div>

          {/* Interests */}
          <FadeIn delay={0.15} className="md:col-span-2 lg:col-span-3">
            <Card className="glass-card border-border/50 premium-shadow">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">Professional Interests</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-foreground cursor-default"
                      initial={ios ? { opacity: 0, scale: 0.85 } : { opacity: 0, scale: 0.8 }}
                      animate={ios ? { opacity: 1, scale: 1 } : undefined}
                      whileInView={ios ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ios ? 0.05 + i * 0.05 : 0.05 + i * 0.06, duration: 0.32, ease: ease.spring }}
                      whileHover={ios ? {} : { scale: 1.07, y: -2 }}
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
