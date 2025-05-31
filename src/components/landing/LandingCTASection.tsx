
import React from 'react';
import { CTAHeader } from './cta/CTAHeader';
import { CTAContent } from './cta/CTAContent';

export const LandingCTASection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-vibe-primary via-vibe-secondary to-vibe-accent relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-subtle"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/10 rounded-full blur-2xl animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-responsive relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <CTAHeader />
          <CTAContent />
        </div>
      </div>
    </section>
  );
};
