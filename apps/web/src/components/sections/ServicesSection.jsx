import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader.jsx';
import { FadeIn, StaggerGrid } from '@/lib/motion.jsx';
import { Button } from '@/components/ui/button';
import ServiceIcon from '@/components/ServiceIcon.jsx';
import { services } from '@/config/offer.js';
import { startInquiry } from '@/lib/contactIntent.js';

export const ServiceCard = ({ service }) => (
  <article className="glass-card card-hover rounded-2xl p-6 flex flex-col gap-4 h-full">
    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
      <ServiceIcon name={service.icon} />
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="text-foreground font-medium leading-snug" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
        <Link to={`/services/${service.id}`} className="hover:text-primary transition-colors">
          {service.title}
        </Link>
      </h3>
      <p className="text-muted-foreground leading-relaxed m-0" style={{ fontSize: '0.875rem' }}>
        {service.summary}
      </p>
    </div>
    <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
      {service.includes.slice(0, 3).map((o) => (
        <li key={o} className="flex items-start gap-2 text-[0.8125rem] text-foreground/80">
          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
          {o}
        </li>
      ))}
    </ul>
    <div className="mt-auto flex items-center justify-between gap-3 pt-1">
      <Link
        to={`/services/${service.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
        aria-label={`View service: ${service.title}`}
      >
        View service
        <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
      </Link>
      <Button
        variant="link"
        className="h-auto p-0 text-muted-foreground hover:text-foreground"
        onClick={() => startInquiry({ inquiry: 'Consulting', subject: service.title })}
        aria-label={`Discuss ${service.title}`}
      >
        Discuss
      </Button>
    </div>
  </article>
);

const ServicesSection = () => (
  <section id="services" className="site-section" aria-labelledby="services-heading">
    <div className="site-container z-10">
      <SectionHeader
        id="services-heading"
        label="Services & consulting"
        title="How I can help your business"
        description="Hands-on engineering and independent technical advice across the full stack: web, APIs, AI, cloud and delivery."
      />

      <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5" stagger={0.05} delay={0.1}>
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </StaggerGrid>

      <FadeIn delay={0.1} className="mt-10 flex flex-wrap justify-center gap-3">
        <Button
          size="lg"
          className="h-12 rounded-lg px-7 font-medium"
          onClick={() => startInquiry({ inquiry: 'Consulting', subject: 'Consultation request' })}
        >
          Book a consultation
          <ArrowRight strokeWidth={2.5} />
        </Button>
        <Button asChild variant="glass" size="lg" className="h-12 rounded-lg px-7 font-medium">
          <Link to="/services">View all services</Link>
        </Button>
      </FadeIn>
    </div>
  </section>
);

export default ServicesSection;
