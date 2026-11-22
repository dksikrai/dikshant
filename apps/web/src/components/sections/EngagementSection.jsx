import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ServiceIcon from '@/components/ServiceIcon.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import { FadeIn, StaggerGrid } from '@/lib/motion.jsx';
import { Button } from '@/components/ui/button';
import { engagementModels, processSteps } from '@/config/offer.js';
import { startInquiry } from '@/lib/contactIntent.js';


const EngagementSection = () => (
  <section id="process" className="site-section" aria-labelledby="engagement-heading">
    <div className="site-container">
      <SectionHeader
        id="engagement-heading"
        label="WORKING TOGETHER"
        title="Flexible Ways to Engage"
        description="Pick the model that fits your stage. Scope and cost are agreed up front."
      />

      <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5" stagger={0.08} delay={0.1}>
        {engagementModels.map((m) => {
          return (
            <article
              key={m.id}
              className={`glass-card card-hover rounded-2xl p-6 flex flex-col gap-4 h-full ${m.featured ? 'ring-1 ring-primary/40' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                  <ServiceIcon name={m.icon} />
                </div>
                {m.featured && (
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/25">
                    Most flexible
                  </span>
                )}
              </div>
              <h3 className="text-foreground font-semibold" style={{ fontSize: '1.1rem' }}>{m.title}</h3>
              <p className="text-muted-foreground m-0 text-sm">
                <span className="text-foreground/80 font-medium">Best for: </span>{m.bestFor}
              </p>
              <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                {m.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[0.8125rem] text-foreground/80">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button
                variant="glass"
                className="mt-auto rounded-full"
                onClick={() => startInquiry({ inquiry: m.id === 'consulting' ? 'Consulting' : 'Project', subject: m.title })}
              >
                Get a quote
                <ArrowRight strokeWidth={2.5} />
              </Button>
            </article>
          );
        })}
      </StaggerGrid>

      <FadeIn delay={0.1} className="mt-16">
        <h3 className="text-foreground font-semibold mb-6" style={{ fontSize: '1.25rem' }}>How a project runs</h3>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-0 p-0 list-none">
          {processSteps.map((s, i) => (
            <li key={s.title} className="glass-card rounded-2xl p-5 flex flex-col gap-2">
              <span className="font-mono text-xs text-primary font-semibold">0{i + 1}</span>
              <h4 className="text-foreground font-semibold m-0">{s.title}</h4>
              <p className="text-muted-foreground m-0 text-[0.8125rem] leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </FadeIn>
    </div>
  </section>
);

export default EngagementSection;
