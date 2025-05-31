
import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PricingCallToAction = () => {
  return (
    <div className="mt-16 fade-in-up stagger-5">
      <div className="text-center p-12 rounded-2xl bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 border border-vibe-primary/20">
        <h3 className="vibe-heading-md text-foreground mb-4">
          Still Have Questions?
        </h3>
        <p className="vibe-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Our team is here to help you find the perfect plan for your organization. 
          Get personalized recommendations and answers to all your questions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="vibe-btn-primary group">
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary/10">
            <MessageCircle className="mr-2 w-5 h-5" />
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};
