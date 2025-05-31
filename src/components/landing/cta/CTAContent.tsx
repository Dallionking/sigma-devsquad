
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTAContent = () => {
  return (
    <div className="fade-in-up stagger-3">
      <Button 
        className="cta-button-lg bg-white text-vibe-primary hover:bg-white/95 hover:text-vibe-primary/90 
                   shadow-2xl hover:shadow-white/20 border-0 group relative overflow-hidden
                   transform-gpu transition-all duration-300 ease-out"
      >
        {/* Button background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/95 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Button content */}
        <div className="relative z-10 flex items-center gap-3">
          <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
          <span className="font-bold text-lg">Request Your Demo Now</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
      </Button>
      
      <p className="mt-6 text-white/70 text-sm font-medium fade-in-up stagger-4">
        Join thousands of developers already transforming their workflow
      </p>
    </div>
  );
};
