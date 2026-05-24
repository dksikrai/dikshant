import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/sections/HeroSection.jsx';
import StatsSection from '@/components/sections/StatsSection.jsx';
import FloatingTechBackground from '@/components/FloatingTechBackground.jsx';
import { siteConfig } from '@/config/site.js';

// Lazy-loaded sections for performance
const AboutSection = React.lazy(() => import('@/components/sections/AboutSection.jsx'));
const TechnicalExpertiseSection = React.lazy(() => import('@/components/sections/TechnicalExpertiseSection.jsx'));
const ProductionSection = React.lazy(() => import('@/components/sections/ProductionSection.jsx'));
const AISection = React.lazy(() => import('@/components/sections/AISection.jsx'));
const ClientProjectsSection = React.lazy(() => import('@/components/sections/ClientProjectsSection.jsx'));
const CaseStudiesSection = React.lazy(() => import('@/components/sections/CaseStudiesSection.jsx'));
const WhatISolveSection = React.lazy(() => import('@/components/sections/WhatISolveSection.jsx'));
const SkillsSection = React.lazy(() => import('@/components/sections/SkillsSection.jsx'));
const CareerSection = React.lazy(() => import('@/components/sections/CareerSection.jsx'));

// Contact section — inline (always loaded)
const ContactSection = () => (
  <section className="py-20 md:py-28 relative overflow-hidden" id="contact">
    <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />
    {/* Ambient glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_65%)] pointer-events-none" />

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      {/* Available badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-emerald-400 text-sm font-semibold mb-8">
        <span className="status-dot" />
        Currently Available for Senior Roles & Consulting
      </div>

      {/* Headline */}
      <h2
        className="font-extrabold text-foreground mb-6"
        style={{ fontSize: 'clamp(1.875rem, 5vw, 3.5rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}
      >
        Let's Build Something{' '}
        <span className="text-gradient-primary">Exceptional</span>
      </h2>

      <p className="text-muted-foreground max-w-xl mx-auto mb-12" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)' }}>
        Looking to scale your platform, build AI-powered workflows, or architect a production SaaS system?
        I'm one message away.
      </p>

      {/* Contact options */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 smooth-transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send an Email
        </a>
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl border border-white/[0.12] bg-white/[0.04] text-foreground/80 font-semibold text-sm hover:border-white/20 hover:text-foreground hover:bg-white/[0.07] smooth-transition"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Connect on LinkedIn
        </a>
      </div>

      {/* Secondary contact info */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
        <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground smooth-transition">
          {siteConfig.email}
        </a>
        <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
        <span>{siteConfig.location}</span>
        <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground smooth-transition"
        >
          WhatsApp
        </a>
      </div>
    </div>
  </section>
);

const SectionFallback = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Grain texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Floating Tech Icons */}
      <FloatingTechBackground />

      {/* Ambient background gradients — static, no animation */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[70%] h-[50vh] bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.06),transparent_55%)]" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[40vh] bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.04),transparent_60%)]" />
      </div>

      {/* ── SEO Meta Tags ── */}
      <Helmet>
        <title>Dikshant Goyal | AI-Powered Backend & Product Engineer | Laravel · AWS · OpenAI</title>
        <meta name="title" content="Dikshant Goyal | AI-Powered Backend & Product Engineer | Laravel · AWS · OpenAI" />
        <meta
          name="description"
          content="Dikshant Goyal is a backend & product engineer specializing in scalable Laravel APIs, Redis/Horizon queue systems, AWS cloud infrastructure, OpenAI integrations, and production SaaS platforms."
        />
        <meta
          name="keywords"
          content="Dikshant Goyal, Backend Engineer, Laravel Engineer, AI Engineer, Product Engineer, SaaS Engineer, Full Stack Engineer, Cloud Engineer, PHP Developer, OpenAI Integration, Redis Horizon, AWS Developer, Jaipur, India"
        />
        <meta name="author" content="Dikshant Goyal" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://dikshantgoyal.com/" />
        <meta name="theme-color" content="#080810" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Dikshant Goyal — Portfolio" />
        <meta property="og:url" content="https://dikshantgoyal.com/" />
        <meta property="og:title" content="Dikshant Goyal | AI-Powered Backend & Product Engineer" />
        <meta
          property="og:description"
          content="Backend engineer specializing in Laravel, Redis/Horizon, AWS infrastructure, OpenAI integrations, and production SaaS architecture."
        />
        <meta property="og:image" content="https://dikshantgoyal.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@csdikshant" />
        <meta property="twitter:creator" content="@csdikshant" />
        <meta property="twitter:url" content="https://dikshantgoyal.com/" />
        <meta property="twitter:title" content="Dikshant Goyal | AI-Powered Backend & Product Engineer" />
        <meta
          property="twitter:description"
          content="Backend engineer specializing in Laravel, Redis/Horizon, AWS, OpenAI integrations, and production SaaS architecture."
        />
        <meta property="twitter:image" content="https://dikshantgoyal.com/og-image.jpg" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Dikshant Goyal',
            url: 'https://dikshantgoyal.com/',
            jobTitle: 'AI-Powered Backend & Product Engineer',
            worksFor: { '@type': 'Organization', name: 'iTechPanel LLP' },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Jaipur',
              addressRegion: 'Rajasthan',
              addressCountry: 'IN',
            },
            sameAs: [
              'https://in.linkedin.com/in/csdikshant',
              'https://github.com/dikshantgoyal',
            ],
            knowsAbout: [
              'Laravel', 'PHP', 'Redis', 'Laravel Horizon', 'AWS', 'OpenAI API',
              'RAG Systems', 'SaaS Architecture', 'API Development', 'Queue Systems',
              'React', 'Next.js', 'TypeScript', 'Docker', 'CI/CD',
            ],
            description:
              'Backend & product engineer specializing in scalable Laravel APIs, Redis/Horizon queue systems, AWS cloud infrastructure, OpenAI integrations, and production SaaS platforms.',
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow relative z-10">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Stats bar */}
        <StatsSection />

        <React.Suspense fallback={<SectionFallback />}>
          {/* 3. About */}
          <AboutSection />

          {/* 4. Engineering Expertise */}
          <TechnicalExpertiseSection />

          {/* 5. Production Experience */}
          <ProductionSection />

          {/* 6. AI Engineering */}
          <AISection />

          {/* 7. Featured Projects + Client Work */}
          <ClientProjectsSection />

          {/* 8. Case Studies */}
          <CaseStudiesSection />

          {/* 9. What I Solve */}
          <WhatISolveSection />

          {/* 10. Tech Stack */}
          <SkillsSection />

          {/* 11. Career Timeline */}
          <CareerSection />
        </React.Suspense>

        {/* 12. Contact CTA */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
