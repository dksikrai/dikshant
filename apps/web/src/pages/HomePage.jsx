import React from 'react';
import { useSeo } from '@/lib/seo.js';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/sections/HeroSection.jsx';
import StatsSection from '@/components/sections/StatsSection.jsx';
import { Skeleton } from '@/components/ui/skeleton';

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
const ClientProjectsSection = React.lazy(() => import('@/components/sections/ClientProjectsSection.jsx'));
const ServicesSection = React.lazy(() => import('@/components/sections/ServicesSection.jsx'));
const EngagementSection = React.lazy(() => import('@/components/sections/EngagementSection.jsx'));
const FAQSection = React.lazy(() => import('@/components/sections/FAQSection.jsx'));
const CareerSection = React.lazy(() => import('@/components/sections/CareerSection.jsx'));

const WorkWithMeSection = React.lazy(() => import('@/components/sections/WorkWithMeSection.jsx'));
const ContactSection = React.lazy(() => import('@/components/sections/ContactSection.jsx'));

const SectionFallback = () => (
  <div className="site-container py-20 space-y-4" aria-hidden="true">
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
  useSeo('/');
  const showDecor = useDeferredDecor();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" tabIndex={-1} className="flex-grow relative z-10 focus:outline-none">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Stats bar */}
        <StatsSection />

        <React.Suspense fallback={<SectionFallback />}>
          <WorkWithMeSection />
          <ServicesSection />
          <AboutSection />
          <ClientProjectsSection />
          <EngagementSection />
          <CareerSection />
          <FAQSection />
          <ContactSection />
        </React.Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
