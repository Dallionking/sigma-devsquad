
import React from 'react';
import { ArrowRight, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PricingCallToAction = () => {
  return (
    <div className="mt-16 fade-in-up stagger-5">
      <div className="text-center p-12 rounded-2xl bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 border border-vibe-primary/20">
        <h3 className="vibe-heading-md text-foreground mb-4">
          Still Evaluating Your Options?
        </h3>
        <p className="vibe-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          We understand choosing the right development platform is crucial. 
          That's why we offer risk-free trials and dedicated support to ensure your success.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 text-sm">
            <Shield className="w-5 h-5 text-vibe-primary" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-5 h-5 text-vibe-primary" />
            <span>Setup in under 5 minutes</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ArrowRight className="w-5 h-5 text-vibe-primary" />
            <span>Cancel anytime, no questions</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="cta-button-lg vibe-btn-primary group">
            Start Free Trial Now
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary/10">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </div>
  );
};
