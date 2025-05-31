
import React from 'react';
import { CTAHeader } from './cta/CTAHeader';
import { CTAContent } from './cta/CTAContent';

export const LandingCTASection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-vibe-primary via-vibe-secondary to-vibe-accent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-2xl"></div>
      
      <div className="container-responsive relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <CTAHeader />
          <CTAContent />
        </div>
      </div>
    </section>
  );
};
