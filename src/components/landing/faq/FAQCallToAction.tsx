
import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FAQCallToAction = () => {
  return (
    <div className="mt-16 fade-in-up stagger-4">
      <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-vibe-primary/5 to-vibe-secondary/5 border border-vibe-primary/10">
        <h3 className="vibe-heading-md text-foreground mb-4">
          Still Have Questions?
        </h3>
        <p className="vibe-body-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our support team is here to help you get started with Vibe DevSquad. 
          Get personalized answers and expert guidance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="vibe-btn-primary group">
            <MessageCircle className="mr-2 w-5 h-5" />
            Contact Support
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary/10">
            Browse Documentation
          </Button>
        </div>
      </div>
    </div>
  );
};
