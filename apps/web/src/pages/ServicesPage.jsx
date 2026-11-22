import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageShell, { Breadcrumbs } from '@/components/PageShell.jsx';
import { ServiceCard } from '@/components/sections/ServicesSection.jsx';
import { Button } from '@/components/ui/button';
import { services } from '@/config/offer.js';
import { startInquiry } from '@/lib/contactIntent.js';
import { useSeo } from '@/lib/seo.js';

const EngagementSection = React.lazy(() => import('@/components/sections/EngagementSection.jsx'));
const FAQSection = React.lazy(() => import('@/components/sections/FAQSection.jsx'));
const ContactSection = React.lazy(() => import('@/components/sections/ContactSection.jsx'));

const ServicesPage = () => {
  useSeo('/services');
  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
        <h1 className="text-foreground max-w-3xl" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
          Web, API, AI &amp; DevOps Services
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl" style={{ fontSize: '1.0625rem', lineHeight: 1.65 }}>
          I&apos;m Dikshant Goyal, a full-stack developer and technical consultant. I help businesses design,
          build, speed up and run software, using Next.js, React, Node.js, Python, Laravel and AWS. Choose a
          service below, or tell me about your project and I&apos;ll recommend the right approach.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button size="lg" className="h-12 rounded-full px-7 font-semibold shadow-lg shadow-primary/30" onClick={() => startInquiry({ inquiry: 'Consulting', subject: 'Consultation request' })}>
            Book a Consultation
            <ArrowRight strokeWidth={2.5} />
          </Button>
          <Button asChild variant="glass" size="lg" className="h-12 rounded-full px-7 font-semibold">
            <Link to="/resume">View my resume</Link>
          </Button>
        </div>

        <h2 className="sr-only">All services</h2>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
      <React.Suspense fallback={null}>
        <EngagementSection />
        <FAQSection />
        <ContactSection />
      </React.Suspense>
    </PageShell>
  );
};

export default ServicesPage;
