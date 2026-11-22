import React from 'react';
import { FadeIn } from '@/lib/motion.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { faqs } from '@/config/offer.js';
import { startInquiry } from '@/lib/contactIntent.js';

const FAQSection = () => (
  <section id="faq" className="site-section" aria-labelledby="faq-heading">
    <div className="site-container grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] gap-10 lg:gap-16 items-start">
      <div className="lg:sticky lg:top-28">
        <SectionHeader
          compact
          id="faq-heading"
          label="FAQ"
          title="Questions Clients Ask"
          description="Can't find your answer? Send a message and I'll reply within one business day."
        />
        <FadeIn delay={0.16} className="mt-6">
          <Button
            variant="glass"
            className="rounded-full"
            onClick={() => startInquiry({ inquiry: 'Other', subject: 'Question about your services' })}
          >
            Ask a question
          </Button>
        </FadeIn>
      </div>
      <FadeIn delay={0.1}>
        <Accordion type="single" collapsible className="glass-card rounded-2xl px-5">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`} className="border-white/[0.08]">
              <AccordionTrigger className="text-left text-foreground">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </div>
  </section>
);

export default FAQSection;
