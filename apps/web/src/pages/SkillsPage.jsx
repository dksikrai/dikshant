import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Terminal, Database, Server, Cloud, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const SkillItem = ({ name, proficiency, description }) => {
  const getWidth = (prof) => {
    switch(prof.toLowerCase()) {
      case 'expert': return 'w-full';
      case 'advanced': return 'w-[85%]';
      case 'intermediate': return 'w-[70%]';
      default: return 'w-[50%]';
    }
  };

  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between items-end mb-2">
        <span className="font-semibold text-foreground">{name}</span>
        <span className="text-xs font-bold px-2 py-1 rounded bg-primary/10 text-primary uppercase tracking-wider">
          {proficiency}
        </span>
      </div>
      {description && <p className="text-sm text-muted-foreground mb-3">{description}</p>}
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: getWidth(proficiency).replace('w-', '').replace('[', '').replace(']', '') }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
};

const SkillsPage = () => {
  const skillSections = [
    {
      title: 'React & Next.js Ecosystem',
      icon: Terminal,
      skills: [
        { name: 'React.js', proficiency: 'Expert', description: 'Component lifecycle, hooks, state management, and virtual DOM.' },
        { name: 'Next.js', proficiency: 'Expert', description: 'Server-side rendering (SSR), static site generation (SSG), and API routes.' },
        { name: 'JavaScript & TypeScript', proficiency: 'Expert', description: 'ES6+ specifications, asynchronous JS, static typing, and types/interfaces.' },
        { name: 'Tailwind CSS', proficiency: 'Expert', description: 'Utility-first layout design, responsive workflows, and theme customization.' },
        { name: 'Redux & Zustand', proficiency: 'Advanced', description: 'Global state orchestration, store architecture, and side effects.' },
        { name: 'HTML5 & CSS3', proficiency: 'Expert', description: 'Semantic structuring, modern layouts (Grid/Flexbox), and transitions.' }
      ]
    },
    {
      title: 'Laravel & Node.js Backend',
      icon: Server,
      skills: [
        { name: 'Laravel Framework', proficiency: 'Expert', description: 'Deep understanding of core concepts, service container, and providers.' },
        { name: 'Node.js & Express', proficiency: 'Advanced', description: 'Asynchronous backend services, RESTful routing, and middlewares.' },
        { name: 'PHP', proficiency: 'Expert', description: 'Modern PHP 8+ features, OOP principles, and strict typing.' },
        { name: 'Eloquent ORM & Mongoose', proficiency: 'Expert', description: 'Advanced relations, query optimization, and schema mapping.' },
        { name: 'Queue Systems & Horizon', proficiency: 'Expert', description: 'Async job processing, Redis Horizon monitoring, and batch jobs.' },
        { name: 'RESTful API Design', proficiency: 'Expert', description: 'Resourceful routing, API resources, and API versioning.' }
      ]
    },
    {
      title: 'Databases & Caching',
      icon: Database,
      skills: [
        { name: 'PostgreSQL & MySQL', proficiency: 'Expert', description: 'Advanced queries, JSONB operations, indexing, and schema design.' },
        { name: 'Redis', proficiency: 'Advanced', description: 'Caching strategies, pub/sub event broadcasting, and session storage.' },
        { name: 'Database Optimization', proficiency: 'Expert', description: 'N+1 query resolution, index tuning, and performance profiling.' }
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: Cloud,
      skills: [
        { name: 'AWS Services', proficiency: 'Advanced', description: 'EC2 instance setup, S3 file storage, Lambda image render, SQS, CloudFront.' },
        { name: 'Docker', proficiency: 'Advanced', description: 'Containerization of applications and localized development builds.' },
        { name: 'CI/CD Pipelines', proficiency: 'Advanced', description: 'Automated testing and deployment workflows using GitHub Actions.' },
        { name: 'Linux Server Admin', proficiency: 'Advanced', description: 'Ubuntu/Debian server provisioning, Nginx setups, CloudPanel management.' }
      ]
    },
    {
      title: 'Tools & Practices',
      icon: Settings,
      skills: [
        { name: 'Git & GitHub', proficiency: 'Expert', description: 'Advanced branching, pull requests, merge conflict resolution, and workflows.' },
        { name: 'Design Patterns', proficiency: 'Expert', description: 'Repository, Factory, Strategy, and Observer design patterns.' },
        { name: 'SOLID & Clean Code', proficiency: 'Expert', description: 'Writing dry, maintainable, scalable, and highly testable source files.' }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Technical Skills &amp; Stack | Dikshant Goyal - Web Developer Jaipur</title>
        <meta name="description" content="Deep dive into technical skills of Dikshant Goyal, a premier Laravel developer in Jaipur. Detailed breakdown of PHP, Eloquent ORM, Postgres, Redis, AWS, and Docker." />
        <meta name="keywords" content="laravel specialist jaipur, php developer jaipur, database tuning specialist, aws engineer jaipur" />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="mb-6">Technical Expertise</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A comprehensive overview of my technical stack, with a primary focus on the Laravel ecosystem, backend architecture, and database optimization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={idx === 0 ? "lg:col-span-2" : ""}
                >
                  <Card className="h-full bg-card border-border/50 premium-shadow">
                    <CardHeader className="pb-4 border-b border-border/50 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">{section.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className={idx === 0 ? "grid grid-cols-1 md:grid-cols-2 gap-x-12" : ""}>
                        {section.skills.map((skill, sIdx) => (
                          <SkillItem 
                            key={sIdx}
                            name={skill.name}
                            proficiency={skill.proficiency}
                            description={skill.description}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SkillsPage;