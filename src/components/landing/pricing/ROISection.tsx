
import React from 'react';
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { Calculator } from "lucide-react";

export const ROISection = () => {
  return (
    <div className="mt-16 text-center">
      <EnhancedCard className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-vibe-primary/5 to-vibe-secondary/5">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Calculator className="w-6 h-6 text-vibe-primary" />
          <h3 className="text-2xl font-bold">Return on Investment</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-vibe-primary mb-2">300%</div>
            <div className="text-sm text-muted-foreground">Faster Development</div>
            <div className="text-xs text-muted-foreground mt-1">vs. traditional methods</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-vibe-secondary mb-2">$4,000+</div>
            <div className="text-sm text-muted-foreground">Monthly Savings</div>
            <div className="text-xs text-muted-foreground mt-1">per developer equivalent</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-vibe-accent mb-2">2 Hours</div>
            <div className="text-sm text-muted-foreground">Break-even Time</div>
            <div className="text-xs text-muted-foreground mt-1">of saved development</div>
          </div>
        </div>
        
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Our customers typically save 20+ hours per week worth $2,000-3,000 in development costs, 
          making Vibe DevSquad pay for itself in just the first day of use.
        </p>
      </EnhancedCard>
    </div>
  );
};
