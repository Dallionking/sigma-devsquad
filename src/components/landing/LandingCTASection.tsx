
import React from 'react';
import { CTAHeader } from './cta/CTAHeader';
import { CTAButton } from './cta/CTAButton';

export const LandingCTASection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-vibe-primary/20 via-vibe-secondary/15 to-vibe-primary/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-vibe-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-vibe-secondary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container-responsive relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <CTAHeader />
          <CTAButton />
        </div>
      </div>
    </section>
  );
};
