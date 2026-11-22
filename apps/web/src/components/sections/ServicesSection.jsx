import React from 'react';
import { ArrowRight, Server, Bot, ShoppingCart, Gauge, ClipboardCheck, Users, CheckCircle2 } from 'lucide-react';
import { FadeIn, StaggerGrid } from '@/lib/motion.jsx';
import { Button } from '@/components/ui/button';
import { services } from '@/config/offer.js';
import { startInquiry } from '@/lib/contactIntent.js';

const icons = { Server, Bot, ShoppingCart, Gauge, ClipboardCheck, Users };

const ServiceCard = ({ service }) => {
  const Icon = icons[service.icon] ?? Server;
  return (
    <article className="glass-card card-hover rounded-2xl p-6 flex flex-col gap-4 h-full">
      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
        <Icon size={20} strokeWidth={2} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-foreground font-semibold leading-snug" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed m-0" style={{ fontSize: '0.875rem' }}>
          {service.summary}
        </p>
      </div>
      <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
        {service.outcomes.map((o) => (
          <li key={o} className="flex items-start gap-2 text-[0.8125rem] text-foreground/80">
            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            {o}
          </li>
        ))}
      </ul>
      <Button
        variant="link"
        className="mt-auto h-auto justify-start p-0 text-primary"
        onClick={() => startInquiry({ inquiry: 'Consulting', subject: service.title })}
        aria-label={`Discuss ${service.title}`}
      >
        Discuss this
        <ArrowRight strokeWidth={2.5} />
      </Button>
    </article>
  );
};

const ServicesSection = () => (
  <section id="services" className="relative py-16 md:py-28 overflow-hidden" aria-labelledby="services-heading">
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 20%, hsl(243,88%,68%,0.07) 0%, transparent 70%)' }}
    />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mb-12">
        <FadeIn delay={0}>
          <span className="section-label block mb-4">SERVICES &amp; CONSULTING</span>
        </FadeIn>
        <FadeIn delay={0.07}>
          <h2 id="services-heading" className="text-foreground">How I Can Help Your Business</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="text-muted-foreground mt-4 max-w-xl">
            Hands-on engineering and independent technical advice for teams that need reliable software, shipped without drama.
          </p>
        </FadeIn>
      </div>

      <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" stagger={0.06} delay={0.1}>
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </StaggerGrid>

      <FadeIn delay={0.1} className="mt-10 flex justify-center">
        <Button
          size="lg"
          className="h-12 rounded-full px-7 font-semibold shadow-lg shadow-primary/30"
          onClick={() => startInquiry({ inquiry: 'Consulting', subject: 'Consultation request' })}
        >
          Book a Consultation
          <ArrowRight strokeWidth={2.5} />
        </Button>
      </FadeIn>
    </div>
  </section>
);

export default ServicesSection;
