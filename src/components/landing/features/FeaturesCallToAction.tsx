
import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FeaturesCallToAction = () => {
  return (
    <div className="text-center mt-16 fade-in-up stagger-4">
      <div className="p-8 rounded-2xl bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 
                    border border-vibe-primary/20 max-w-2xl mx-auto">
        <h3 className="vibe-heading-md text-foreground mb-4">
          Ready to Boost Your Productivity?
        </h3>
        <p className="vibe-body text-muted-foreground mb-6">
          Start your free trial today and experience the power of AI-orchestrated 
          development. No setup fees, no long-term commitments.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="cta-button-lg vibe-btn-primary group"
            onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Rocket className="mr-2 w-5 h-5" />
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            className="border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary/10"
            onClick={() => document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See Success Stories
          </Button>
        </div>
      </div>
    </div>
  );
};
