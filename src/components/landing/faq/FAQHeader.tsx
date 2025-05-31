
import React from 'react';
import { HelpCircle } from 'lucide-react';

export const FAQHeader = () => {
  return (
    <div className="text-center mb-24 space-y-8">
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full">
        <HelpCircle className="w-5 h-5 text-vibe-primary" />
        <span className="text-sm font-semibold text-vibe-primary">
          Got Questions?
        </span>
      </div>

      <h2 className="section-heading text-foreground">
        <span className="vibe-gradient-text">Frequently Asked Questions</span>
      </h2>
      
      <p className="vibe-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Find answers to common questions about Vibe DevSquad and how it can 
        transform your development workflow.
      </p>
    </div>
  );
};
