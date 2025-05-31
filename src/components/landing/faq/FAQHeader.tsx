
import React from 'react';
import { HelpCircle } from 'lucide-react';

export const FAQHeader = () => {
  return (
    <div className="text-center mb-16 fade-in-up">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full">
        <HelpCircle className="w-4 h-4 text-vibe-primary" />
        <span className="text-sm font-medium text-vibe-primary">
          Got Questions?
        </span>
      </div>

      <h2 className="section-heading mb-6 text-foreground">
        <span className="vibe-gradient-text">Frequently Asked Questions</span>
      </h2>
      
      <p className="vibe-body-lg text-muted-foreground max-w-3xl mx-auto">
        Find answers to common questions about Vibe DevSquad and how it can 
        transform your development workflow.
      </p>
    </div>
  );
};
