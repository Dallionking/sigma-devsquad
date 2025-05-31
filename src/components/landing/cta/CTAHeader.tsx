
import React from 'react';
import { Zap } from 'lucide-react';

export const CTAHeader = () => {
  return (
    <div className="mb-12 space-y-8">
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
        <Zap className="w-5 h-5 text-white animate-pulse" />
        <span className="text-sm font-semibold text-white">
          Join 5,000+ Development Teams
        </span>
      </div>

      <h2 className="hero-heading text-white mb-8">
        Start Your <span className="relative">
          Transformation
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 rounded-full"></div>
        </span> Today
      </h2>
      
      <p className="vibe-body-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
        Experience true orchestration and streamlined execution with Vibe DevSquad. 
        Transform your development workflow in minutes, not months.
      </p>
    </div>
  );
};
