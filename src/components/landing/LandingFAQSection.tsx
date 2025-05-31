
import React from 'react';
import { FAQHeader } from './faq/FAQHeader';
import { FAQAccordion } from './faq/FAQAccordion';
import { FAQCallToAction } from './faq/FAQCallToAction';

export const LandingFAQSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background/95 to-background" id="faq">
      <div className="container-responsive">
        <FAQHeader />
        <FAQAccordion />
        <FAQCallToAction />
      </div>
    </section>
  );
};
