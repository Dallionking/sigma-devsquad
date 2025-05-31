
import React from 'react';
import { Users } from 'lucide-react';

export const TestimonialsHeader = () => {
  return (
    <div className="text-center mb-16 fade-in-up">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full">
        <Users className="w-4 h-4 text-vibe-primary" />
        <span className="text-sm font-medium text-vibe-primary">
          Proven Results
        </span>
      </div>

      <h2 className="section-heading mb-6 text-foreground">
        <span className="vibe-gradient-text">Trusted by Industry Leaders</span>
      </h2>
      
      <p className="vibe-body-lg text-muted-foreground max-w-3xl mx-auto">
        See how development teams worldwide are transforming their workflows and 
        achieving unprecedented productivity with Vibe DevSquad.
      </p>
    </div>
  );
};
