
import React from 'react';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FeaturesCallToAction = () => {
  return (
    <div className="text-center mt-16 fade-in-up stagger-4">
      <div className="p-8 rounded-2xl bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 
                    border border-vibe-primary/20 max-w-2xl mx-auto">
        <h3 className="vibe-heading-md text-foreground mb-4">
          Ready to Transform Your Development Workflow?
        </h3>
        <p className="vibe-body text-muted-foreground mb-6">
          Join thousands of developers who have already revolutionized their productivity 
          with Vibe DevSquad's intelligent agent-based development platform.
        </p>
        <Button 
          className="cta-button-lg vibe-btn-primary group"
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Start Your Free Trial
          <Zap className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" />
        </Button>
      </div>
    </div>
  );
};
