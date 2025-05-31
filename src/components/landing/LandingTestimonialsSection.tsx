
import React from 'react';
import { TestimonialsHeader } from './testimonials/TestimonialsHeader';
import { TestimonialCarousel } from './testimonials/TestimonialCarousel';
import { TestimonialsCallToAction } from './testimonials/TestimonialsCallToAction';
import { testimonials } from './testimonials/testimonialsData';

export const LandingTestimonialsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-background/95 to-background" id="testimonials">
      <div className="container-responsive">
        <TestimonialsHeader />
        
        <div className="fade-in-up stagger-2">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
        
        <TestimonialsCallToAction />
      </div>
    </section>
  );
};
