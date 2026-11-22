import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/sections/HeroSection.jsx';
import StatsSection from '@/components/sections/StatsSection.jsx';
import { Skeleton } from '@/components/ui/skeleton';
const FloatingTechBackground = React.lazy(() => import('@/components/FloatingTechBackground.jsx'));

// Decorative only: mount after first paint, desktop-class devices only (keeps LCP/TBT clean).
const useDeferredDecor = () => {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    if (window.matchMedia('(max-width: 1023px)').matches) return undefined;
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => setReady(true), { timeout: 3000 });
    return () => cancel(id);
  }, []);
  return ready;
};

// Lazy-loaded sections for performance
const AboutSection = React.lazy(() => import('@/components/sections/AboutSection.jsx'));
const TechnicalExpertiseSection = React.lazy(() => import('@/components/sections/TechnicalExpertiseSection.jsx'));
const ProductionSection = React.lazy(() => import('@/components/sections/ProductionSection.jsx'));
const AISection = React.lazy(() => import('@/components/sections/AISection.jsx'));
const ClientProjectsSection = React.lazy(() => import('@/components/sections/ClientProjectsSection.jsx'));
const CaseStudiesSection = React.lazy(() => import('@/components/sections/CaseStudiesSection.jsx'));
const ServicesSection = React.lazy(() => import('@/components/sections/ServicesSection.jsx'));
const EngagementSection = React.lazy(() => import('@/components/sections/EngagementSection.jsx'));
const FAQSection = React.lazy(() => import('@/components/sections/FAQSection.jsx'));
const SkillsSection = React.lazy(() => import('@/components/sections/SkillsSection.jsx'));
const CareerSection = React.lazy(() => import('@/components/sections/CareerSection.jsx'));

const ContactSection = React.lazy(() => import('@/components/sections/ContactSection.jsx'));

const SectionFallback = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-4" aria-hidden="true">
    <Skeleton className="h-4 w-28" />
    <Skeleton className="h-10 w-2/3 max-w-lg" />
    <Skeleton className="h-4 w-full max-w-xl" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
    </div>
  </div>
);

const HomePage = () => {
  const showDecor = useDeferredDecor();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      {/* Grain texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Floating Tech Icons */}
      {showDecor && (
        <React.Suspense fallback={null}>
          <FloatingTechBackground />
        </React.Suspense>
      )}

      {/* Ambient background gradients — static, no animation */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[60vh] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.20),transparent_65%)]" />
        <div className="absolute top-[35%] -right-[15%] w-[60%] h-[55vh] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.13),transparent_65%)]" />
        <div className="absolute -bottom-[10%] left-[15%] w-[65%] h-[50vh] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_65%)]" />
      </div>

      {/* SEO/OG/Twitter/JSON-LD live in index.html so non-JS crawlers (Slack, X, LinkedIn) see them. */}
      <Helmet>
        <title>Dikshant Goyal | Backend &amp; Product Engineer – Laravel, AWS, OpenAI</title>
      </Helmet>

      <Header />

      <main id="main" tabIndex={-1} className="flex-grow relative z-10 focus:outline-none">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Stats bar */}
        <StatsSection />

        <React.Suspense fallback={<SectionFallback />}>
          {/* 3. Services & consulting (primary offer) */}
          <ServicesSection />

          {/* 4. About */}
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

          {/* 9. Engagement models + process */}
          <EngagementSection />

          {/* 10. Tech Stack */}
          <SkillsSection />

          {/* 11. Career Timeline */}
          <CareerSection />

          {/* 12. FAQ */}
          <FAQSection />

          {/* 13. Contact */}
          <ContactSection />
        </React.Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
