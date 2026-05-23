
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/sections/HeroSection.jsx';
import StatsSection from '@/components/sections/StatsSection.jsx';
import CareerSection from '@/components/sections/CareerSection.jsx';
import CompetenciesSection from '@/components/sections/CompetenciesSection.jsx';
import ClientProjectsSection from '@/components/sections/ClientProjectsSection.jsx';
import TechnicalExpertiseSection from '@/components/sections/TechnicalExpertiseSection.jsx';
import SkillsSection from '@/components/sections/SkillsSection.jsx';
import WorkExperienceSection from '@/components/sections/WorkExperienceSection.jsx';
import CertificationsSection from '@/components/sections/CertificationsSection.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, MapPin, TerminalSquare } from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/919829641370?text=Hi%20Dikshant%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project%20with%20you!";

const WhatsAppCTASection = () => (
  <section className="py-16 md:py-20 relative overflow-hidden" id="contact">
    {/* Layered background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/8 via-primary/5 to-secondary/8" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,211,102,0.12),transparent_55%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,184,217,0.08),transparent_55%)]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
          </span>
          Available for New Projects
        </div>

        <h2 className="mb-6 text-gradient-primary">
          Let's Build Something<br className="hidden md:block" /> Extraordinary Together
        </h2>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Looking to scale your platform, build a SaaS product, or automate complex workflows? 
          I'm one message away. Let's talk about your project.
        </p>

        {/* Main WhatsApp CTA */}
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-[#25D366] text-white text-xl font-bold shadow-2xl shadow-[#25D366]/40 hover:bg-[#1ebe5d] smooth-transition mb-10"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Message Me on WhatsApp
        </motion.a>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-border/60" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">or reach out via</span>
          <div className="flex-1 h-px bg-border/60" />
        </div>

        {/* Secondary contact options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.a
            href="mailto:webwithdikshant@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border/60 hover:border-primary/50 hover:text-primary smooth-transition text-sm font-medium text-muted-foreground premium-shadow"
          >
            <Mail className="w-4 h-4 text-primary shrink-0" />
            webwithdikshant@gmail.com
          </motion.a>
          <motion.a
            href="https://in.linkedin.com/in/csdikshant"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border/60 hover:border-primary/50 hover:text-primary smooth-transition text-sm font-medium text-muted-foreground premium-shadow"
          >
            <Linkedin className="w-4 h-4 text-primary shrink-0" />
            LinkedIn Profile
          </motion.a>
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border/60 text-sm font-medium text-muted-foreground premium-shadow">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            Jaipur, India (IST)
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Small delay to ensure initial layout triggers smoothly
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 mb-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-8 h-8 animate-pulse shrink-0">
                  <defs>
                    <filter id="preloader-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <path d="M8 6L2 12L8 18M16 6L22 12L16 18M14 3L10 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#preloader-glow)" />
                </svg>
              </motion.div>
              <motion.h1
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="text-2xl font-bold tracking-tight text-foreground"
              >
                Dikshant<span className="text-primary">.</span>
              </motion.h1>
              <div className="w-32 h-1 bg-muted rounded-full mt-4 overflow-hidden relative">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background blobs for real iPhone-grade glassmorphism refraction */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-15%] w-[45vw] h-[45vw] min-w-[350px] min-h-[350px] rounded-full bg-primary/8 dark:bg-primary/4 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[45%] right-[-15%] w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] rounded-full bg-secondary/8 dark:bg-secondary/4 blur-[140px] animate-pulse" style={{ animationDuration: '14s' }} />
        <div className="absolute bottom-[5%] left-[10%] w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] rounded-full bg-primary/6 dark:bg-primary/3 blur-[110px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <Helmet>
        {/* Primary Meta Tags */}
        <title>Dikshant Goyal | Best Full-Stack Web Developer &amp; React/Laravel Architect in Jaipur</title>
        <meta name="title" content="Dikshant Goyal | Best Full-Stack Web Developer &amp; React/Laravel Architect in Jaipur" />
        <meta name="description" content="Looking for the best full-stack developer in Jaipur? Dikshant Goyal is a senior developer specializing in React, Next.js, Node.js, and Laravel. Available for enterprise SaaS and custom web development in Jaipur, India." />
        <meta name="keywords" content="Dikshant Goyal, Best Web Developer in Jaipur, React Developer Jaipur, Next.js Developer Jaipur, Node.js Developer Jaipur, Laravel Architect Jaipur, Senior Full-Stack Developer Jaipur, Freelance Web Developer Jaipur, Web Development Services Jaipur" />
        <meta name="author" content="Dikshant Goyal" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://dikshantgoyal.com/" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#00B8D9" />
        <meta name="msapplication-TileColor" content="#00B8D9" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Dikshant Goyal Portfolio" />
        <meta property="og:url" content="https://dikshantgoyal.com/" />
        <meta property="og:title" content="Dikshant Goyal | Best Full-Stack Web Developer &amp; React/Laravel Architect in Jaipur" />
        <meta property="og:description" content="Looking for the best full-stack web developer in Jaipur? Senior Full-Stack Developer specializing in production-grade React/Next.js frontends, Node.js/Laravel backends, and robust AWS deployments." />
        <meta property="og:image" content="https://dikshantgoyal.com/hero_development_backdrop.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@csdikshant" />
        <meta property="twitter:creator" content="@csdikshant" />
        <meta property="twitter:url" content="https://dikshantgoyal.com/" />
        <meta property="twitter:title" content="Dikshant Goyal | Best Full-Stack Web Developer &amp; React/Laravel Architect in Jaipur" />
        <meta property="twitter:description" content="Looking for the best full-stack web developer in Jaipur? Senior Full-Stack Developer specializing in production-grade React/Next.js frontends, Node.js/Laravel backends, and robust AWS deployments." />
        <meta property="twitter:image" content="https://dikshantgoyal.com/hero_development_backdrop.png" />

        {/* JSON-LD Structured Data for Google Knowledge Graph */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dikshant Goyal",
            "url": "https://dikshantgoyal.com/",
            "image": "https://dikshantgoyal.com/hero_development_backdrop.png",
            "sameAs": [
              "https://in.linkedin.com/in/csdikshant",
              "https://wa.me/919829641370"
            ],
            "jobTitle": "Senior Web Developer & Laravel Architect",
            "worksFor": {
              "@type": "Organization",
              "name": "iTechPanel LLP"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Jaipur",
              "addressRegion": "Rajasthan",
              "addressCountry": "IN"
            },
            "description": "Senior Web Developer and Laravel Architect specializing in production-grade SaaS platforms, queue-driven architectures (Redis Horizon), and robust AWS deployments.",
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Swargiya P.N.K.S. Government PG College"
            },
            "knowsAbout": [
              "Laravel",
              "PHP",
              "Redis",
              "Amazon Web Services (AWS)",
              "API Integration",
              "Database Optimization",
              "SaaS Architecture",
              "Fulfillment Automation"
            ]
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow relative z-10">
        <HeroSection />
        <StatsSection />
        <CareerSection />
        <CompetenciesSection />
        <ClientProjectsSection />
        <TechnicalExpertiseSection />
        <SkillsSection />
        <WorkExperienceSection />
        <CertificationsSection />
        <WhatsAppCTASection />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
