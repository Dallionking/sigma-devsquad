
import React from 'react';
import { Zap } from 'lucide-react';

export const PricingHeader = () => {
  return (
    <div className="text-center mb-16 fade-in-up">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full">
        <Zap className="w-4 h-4 text-vibe-primary" />
        <span className="text-sm font-medium text-vibe-primary">
          Flexible Solutions
        </span>
      </div>

      <h2 className="section-heading mb-6 text-foreground">
        <span className="vibe-gradient-text">Pricing Plans for Every Organization</span>
      </h2>
      
      <p className="vibe-body-lg text-muted-foreground max-w-3xl mx-auto">
        From solo developers to enterprise teams, find the perfect plan that scales 
        with your development needs and budget.
      </p>
    </div>
  );
};
