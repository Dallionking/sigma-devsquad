
import React from 'react';
import { Play } from 'lucide-react';

export const HowItWorksHeader = () => {
  return (
    <div className="text-center mb-16 fade-in-up">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full">
        <Play className="w-4 h-4 text-vibe-primary" />
        <span className="text-sm font-medium text-vibe-primary">
          How It Works
        </span>
      </div>

      <h2 className="section-heading mb-6 text-foreground">
        <span className="vibe-gradient-text">Seamless Orchestration</span>
      </h2>
      
      <p className="vibe-body-lg text-muted-foreground max-w-3xl mx-auto">
        Experience a streamlined development workflow that intelligently coordinates every aspect 
        of your project from planning to delivery.
      </p>
    </div>
  );
};
