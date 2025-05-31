
import React from 'react';
import { ArrowRight, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TestimonialsCallToAction = () => {
  return (
    <div className="text-center mt-16 fade-in-up stagger-4">
      <div className="flex justify-center items-center gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4 text-vibe-primary" />
          <span>5,000+ teams using Vibe DevSquad</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>97% satisfaction rate</span>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 border border-vibe-primary/20 max-w-2xl mx-auto">
        <h3 className="vibe-heading-md text-foreground mb-4">
          Join the Development Revolution
        </h3>
        <p className="vibe-body text-muted-foreground mb-6">
          Don't let your competition get ahead. Start transforming your development 
          workflow today with the platform trusted by industry leaders.
        </p>
        <Button 
          className="cta-button-lg vibe-btn-primary group"
          onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Claim Your Free Trial
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          Join in the next 24 hours and get priority onboarding support
        </p>
      </div>
    </div>
  );
};
