
import React from 'react';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FAQCallToAction = () => {
  return (
    <div className="mt-24">
      <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-vibe-primary/5 to-vibe-secondary/5 border border-vibe-primary/10 backdrop-blur-sm">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full mb-6">
          <CheckCircle className="w-4 h-4 text-vibe-primary" />
          <span className="text-sm font-medium text-vibe-primary">
            All Questions Answered?
          </span>
        </div>
        
        <h3 className="subsection-heading text-foreground mb-6">
          You're Just One Click Away from Better Development
        </h3>
        <p className="vibe-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Stop wasting time on manual coordination and start building faster with 
          AI-powered development orchestration. Your team deserves better tools.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-6">
          <Button className="cta-button-md vibe-btn-primary group">
            <Zap className="mr-2 w-5 h-5" />
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="cta-button-md border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary/10">
            Talk to an Expert
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          🔥 Limited time: Get 2 months free when you upgrade to Pro within your first week
        </p>
      </div>
    </div>
  );
};
