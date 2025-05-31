
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqData } from './faqData';

export const FAQAccordion = () => {
  return (
    <div className="max-w-4xl mx-auto fade-in-up stagger-1">
      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((faq, index) => (
          <AccordionItem 
            key={faq.id} 
            value={faq.id}
            className={`vibe-card border-0 shadow-sm fade-in-up stagger-${index + 2}`}
          >
            <AccordionTrigger className="text-left hover:no-underline p-6 pb-4">
              <span className="vibe-heading-md text-foreground font-semibold pr-4">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
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
