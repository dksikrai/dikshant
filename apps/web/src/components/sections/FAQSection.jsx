import React from 'react';
import { FadeIn } from '@/lib/motion.jsx';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { faqs } from '@/config/offer.js';

const FAQSection = () => (
  <section id="faq" className="relative py-16 md:py-24" aria-labelledby="faq-heading">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <FadeIn delay={0}>
          <span className="section-label block mb-4">FAQ</span>
        </FadeIn>
        <FadeIn delay={0.07}>
          <h2 id="faq-heading" className="text-foreground">Questions Clients Ask</h2>
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
