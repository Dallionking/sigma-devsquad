
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqData } from './faqData';

export const FAQAccordion = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Accordion type="single" collapsible className="space-y-6">
        {faqData.map((faq, index) => (
          <AccordionItem 
            key={faq.id} 
            value={faq.id}
            className="feature-card border-0 shadow-vibe/50"
          >
            <AccordionTrigger className="text-left hover:no-underline p-8 pb-6">
              <span className="vibe-heading-md text-foreground font-semibold pr-6 text-left">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-8 pb-8 pt-0">
              <div className="vibe-body-lg text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
