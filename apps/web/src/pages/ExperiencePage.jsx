import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Languages, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const ExperiencePage = () => {
  const experiences = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'iTechPanel LLP',
      date: '04/2025 - Present',
      location: 'Vaishali Nagar, Jaipur',
      achievements: [
        'Led a team of 5+ developers in architecting and delivering enterprise Laravel, React, and Node.js applications.',
        'Designed scalable microservices and API gateways for high-traffic platforms using Node.js and Laravel.',
        'Built state-of-the-art interactive frontends in Next.js/React and optimized web vitals to near-100 scores.',
        'Implemented CI/CD pipelines, reducing deployment times by 60%.',
        'Optimized complex SQL queries and Redis layouts, reducing database load by 70%.',
        'Mentored junior developers on software engineering best practices, SOLID principles, and design patterns.'
      ]
    },
    {
      title: 'Full-Stack Developer',
      company: 'iTechPanel LLP',
      date: '01/2024 - 04/2025',
      location: 'Vaishali Nagar, Jaipur',
      achievements: [
        'Developed high-performance custom React components, WordPress themes, and backend APIs.',
        'Built robust Node.js and Laravel integrations for headless and multi-platform web applications.',
        'Optimized websites, reducing load time by 40% through advanced caching and asset minification.',
        'Implemented responsive designs and modern styling across diverse client platforms.'
      ]
    },
    {
      title: 'Web Developer',
      company: 'Urban Key Point Real Estate',
      date: '09/2023 - 12/2023',
      location: 'Jagatpura, Jaipur',
      achievements: [
        'Developed a comprehensive real estate listing management system using Laravel.',
        'Automated complex business logic utilizing Laravel jobs and queues.',
        'Enhanced UI/UX for improved user engagement and conversion rates.'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Professional Experience | Dikshant Goyal - Web Architect in Jaipur</title>
        <meta name="description" content="Check the career history, educational background, and certified expertise of Dikshant Goyal, a Senior Laravel Developer based in Jaipur, Rajasthan." />
        <meta name="keywords" content="senior laravel developer jaipur, web architect jaipur, freelance php developer jaipur, software engineer resume jaipur" />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="mb-6">Professional Journey</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              My career progression focusing on Laravel architecture, team leadership, and delivering high-performance web solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary" /> Work Experience
              </h2>
              
              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {experiences.map((exp, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className="w-2 h-2 bg-background rounded-full" />
                    </div>
                    
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card border border-border/50 premium-shadow hover:border-primary/30 smooth-transition">
                      <div className="flex flex-col mb-4">
                        <span className="text-primary font-bold text-sm tracking-wider uppercase mb-1">{exp.date}</span>
                        <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                        <span className="text-muted-foreground font-medium">{exp.company} • {exp.location}</span>
                      </div>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <svg className="text-primary w-3 h-3 shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="6 3 20 12 6 21" />
                            </svg>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
              >
                <Card className="bg-card border-border/50 premium-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold m-0">Education</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-foreground text-lg">Bachelor of Computer Application (BCA)</p>
                      <p className="text-muted-foreground">Swargiya P.N.K.S. Government PG College</p>
                      <p className="text-sm text-muted-foreground">Dausa, Rajasthan</p>
                      <div className="inline-block mt-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider">
                        06/2021 - Present
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-card border-border/50 premium-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold m-0">Certifications & Achievements</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Laravel Certified Developer',
                        'Advanced DevOps practices',
                        'Open Source Contributions (Laravel packages)',
                        'Technical Leadership and Team Management',
                        'Performance optimization expertise'
                      ].map((cert, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-card border-border/50 premium-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Languages className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold m-0">Languages</h3>
                    </div>
                    <ul className="space-y-4">
                      <li>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-foreground">Hindi</span>
                          <span className="text-xs font-bold text-primary uppercase">Native</span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-full rounded-full" />
                        </div>
                      </li>
                      <li>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-foreground">English</span>
                          <span className="text-xs font-bold text-primary uppercase">Professional</span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[80%] rounded-full" />
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-card border-border/50 premium-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Heart className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold m-0">Interests</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Advanced Laravel Patterns',
                        'Scalable Architecture',
                        'Laravel Ecosystem',
                        'Mentoring',
                        'Cloud Optimization'
                      ].map((interest, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-md border border-border/50">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExperiencePage;