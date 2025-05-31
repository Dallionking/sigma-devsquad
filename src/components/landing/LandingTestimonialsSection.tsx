
import React from 'react';
import { MessageCircle, Star } from 'lucide-react';
import { TestimonialCarousel } from './testimonials/TestimonialCarousel';

export const LandingTestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
      {/* Background Enhancement */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-vibe-secondary/3 via-transparent to-vibe-primary/3" />
      </div>

      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full">
            <MessageCircle className="w-4 h-4 text-vibe-primary" />
            <span className="text-sm font-medium text-vibe-primary">
              Testimonials
            </span>
          </div>

          <h2 className="section-heading mb-6 text-foreground">
            <span className="vibe-gradient-text">Proven Results</span>
            <br />
            from Industry Leaders
          </h2>
          
          <p className="vibe-body-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how leading development teams are transforming their workflows 
            and achieving unprecedented productivity with Vibe DevSquad.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8 fade-in-up stagger-1">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              Trusted by 500+ development teams
            </span>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="fade-in-up stagger-2">
          <TestimonialCarousel />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 fade-in-up stagger-3">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 border border-vibe-primary/20 rounded-full">
            <span className="text-sm font-medium text-muted-foreground">
              Join the growing community of satisfied developers
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-vibe-secondary/5 rounded-full blur-3xl" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-vibe-primary/5 rounded-full blur-3xl" />
    </section>
  );
};
