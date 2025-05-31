
import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTAButton = () => {
  return (
    <div className="fade-in-up stagger-1">
      <Button 
        className="cta-button-lg vibe-btn-primary group relative overflow-hidden transform transition-all duration-300 hover:scale-105 active:scale-95"
        onClick={() => console.log('Request demo clicked')}
      >
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-vibe-secondary to-vibe-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Button content */}
        <div className="relative z-10 flex items-center gap-3">
          <Phone className="w-6 h-6 transition-transform group-hover:rotate-12" />
          <span className="font-semibold text-lg">Request Your Demo Now</span>
          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-20 bg-white transition-opacity duration-150"></div>
      </Button>
      
      {/* Supporting text */}
      <p className="mt-4 text-sm text-muted-foreground/80 fade-in-up stagger-2">
        No commitment required • Free consultation • Quick setup
      </p>
    </div>
  );
};
