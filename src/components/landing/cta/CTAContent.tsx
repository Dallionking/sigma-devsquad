
import React from 'react';
import { ArrowRight, Sparkles, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTAContent = () => {
  return (
    <div className="space-y-8">
      {/* Primary CTA */}
      <Button 
        className="cta-button-lg bg-white text-vibe-primary hover:bg-white/95 hover:text-vibe-primary/90 
                   shadow-2xl hover:shadow-white/20 border-0 group relative overflow-hidden
                   transform-gpu transition-all duration-300 ease-out hover:-translate-y-1
                   focus:ring-4 focus:ring-white/20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/95 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <Sparkles className="w-6 h-6 transition-transform group-hover:rotate-12 group-hover:scale-110" />
          <span className="font-bold text-xl">Start Free Trial</span>
          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
        </div>
        
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
      </Button>
      
      {/* Trust indicators */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70 text-sm">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Setup in 5 minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>No credit card required</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </div>
  );
};
