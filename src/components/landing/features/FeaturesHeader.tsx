
import React from 'react';
import { Zap } from 'lucide-react';

export const FeaturesHeader = () => {
  return (
    <div className="text-center mb-16 fade-in-up">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full">
        <Zap className="w-4 h-4 text-vibe-primary" />
        <span className="text-sm font-medium text-vibe-primary">
          Key Features
        </span>
      </div>

      <h2 className="section-heading mb-6 text-foreground">
        Powering <span className="vibe-gradient-text">Seamless Collaboration</span>
      </h2>
      
      <p className="vibe-body-lg text-muted-foreground max-w-3xl mx-auto">
        Experience the future of development with our comprehensive suite of AI-powered tools 
        designed to streamline workflows and enhance team productivity.
      </p>
    </div>
  );
};
