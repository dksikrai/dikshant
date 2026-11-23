import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import PageShell, { Breadcrumbs } from '@/components/PageShell.jsx';
import ServiceIcon from '@/components/ServiceIcon.jsx';
import NotFoundPage from '@/pages/NotFoundPage.jsx';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { getService, services, processSteps } from '@/config/offer.js';
import { startInquiry } from '@/lib/contactIntent.js';
import { useSeo } from '@/lib/seo.js';

const ContactSection = React.lazy(() => import('@/components/sections/ContactSection.jsx'));

const H2 = ({ children }) => (
  <h2 className="text-foreground font-medium mb-5" style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', letterSpacing: '-0.02em' }}>
    {children}
  </h2>
);

const ServiceDetail = ({ service }) => {
  const related = services.filter((s) => s.id !== service.id).slice(0, 3);
  const cta = () => startInquiry({ inquiry: 'Consulting', subject: service.title });
  return (
    <PageShell>
      <article className="site-container pb-16">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: service.title }]} />

        <header className="flex flex-col gap-5 max-w-3xl">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
            <ServiceIcon name={service.icon} size={22} />
          </div>
          <h1 className="text-foreground" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            {service.title}
          </h1>
          <p className="text-muted-foreground m-0" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
            {service.intro}
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-10 lg:gap-14 items-start">
          {/* Main column */}
          <div className="flex flex-col gap-14 min-w-0">
            <section aria-labelledby="included">
              <H2><span id="included">What&apos;s included</span></H2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 m-0 p-0 list-none">
                {service.includes.map((item) => (
                  <li key={item} className="glass-card rounded-xl p-4 flex items-start gap-3 text-foreground/90 text-[0.9375rem]">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="process">
              <H2><span id="process">How we work</span></H2>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-0 p-0 list-none">
                {processSteps.map((s, i) => (
                  <li key={s.title} className="glass-card rounded-2xl p-5 flex flex-col gap-2">
                    <span className="font-mono text-xs text-primary font-medium">0{i + 1}</span>
                    <h3 className="text-foreground font-medium m-0 text-base">{s.title}</h3>
                    <p className="text-muted-foreground m-0 text-[0.8125rem] leading-relaxed">{s.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="faq">
              <H2><span id="faq">Frequently asked questions</span></H2>
              <Accordion type="single" collapsible className="glass-card rounded-2xl px-5">
                {service.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`f-${i}`} className="border-white/[0.08]">
                    <AccordionTrigger className="text-left text-foreground">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-28" aria-label="Service summary">
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 ring-1 ring-primary/30">
              <h2 className="text-foreground font-medium m-0" style={{ fontSize: '1.125rem', letterSpacing: '-0.01em' }}>Ready to start?</h2>
              <p className="text-muted-foreground m-0 text-sm leading-relaxed">Tell me about your project. I reply within one business day.</p>
              <Button size="lg" className="h-12 rounded-lg font-medium" onClick={cta}>
                Discuss your project
                <ArrowRight strokeWidth={2.5} />
              </Button>
              <Button asChild variant="glass" className="rounded-lg">
                <Link to="/services">All services</Link>
              </Button>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-foreground font-medium m-0 mb-4" style={{ fontSize: '1.125rem', letterSpacing: '-0.01em' }}>Technologies</h2>
              <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
                {service.tech.map((t) => (
                  <li key={t} className="mono-badge text-[0.8125rem] font-medium px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.09] text-foreground/80">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-foreground font-medium m-0 mb-4" style={{ fontSize: '1.125rem', letterSpacing: '-0.01em' }}>Who this is for</h2>
              <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
                {service.idealFor.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <ArrowRight size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="mt-16" aria-labelledby="related">
          <H2><span id="related">Related services</span></H2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 m-0 p-0 list-none">
            {related.map((r) => (
              <li key={r.id}>
                <Link to={`/services/${r.id}`} className="glass-card card-hover rounded-2xl p-5 flex flex-col gap-2 h-full">
                  <span className="text-foreground font-medium">{r.title}</span>
                  <span className="text-muted-foreground text-sm">{r.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <React.Suspense fallback={null}>
        <ContactSection />
      </React.Suspense>
    </PageShell>
  );
};

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = getService(slug);
  useSeo(service ? `/services/${slug}` : '/404');
  return service ? <ServiceDetail service={service} /> : <NotFoundPage />;
};

export default ServiceDetailPage;
