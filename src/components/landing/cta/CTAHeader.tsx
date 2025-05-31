
import React from 'react';
import { Phone } from 'lucide-react';

export const CTAHeader = () => {
  return (
    <div className="mb-8 fade-in-up">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
        <Phone className="w-4 h-4 text-white" />
        <span className="text-sm font-medium text-white">
          Final CTA
        </span>
      </div>

      <h2 className="hero-heading text-white mb-6 fade-in-up stagger-1">
        Ready for <span className="relative">
          Clarity
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 rounded-full"></div>
        </span>?
      </h2>
      
      <p className="vibe-body-lg text-white/90 max-w-2xl mx-auto fade-in-up stagger-2">
        Experience true orchestration and streamlined execution with Vibe DevSquad.
      </p>
    </div>
  );
};
