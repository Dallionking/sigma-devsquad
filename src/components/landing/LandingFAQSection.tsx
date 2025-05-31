
import React from 'react';
import { FAQHeader } from './faq/FAQHeader';
import { FAQAccordion } from './faq/FAQAccordion';
import { FAQCallToAction } from './faq/FAQCallToAction';

export const LandingFAQSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-background/95 to-background relative" id="faq">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
      
      <div className="container-responsive relative z-10">
        <FAQHeader />
        <FAQAccordion />
        <FAQCallToAction />
      </div>
    </section>
  );
};
