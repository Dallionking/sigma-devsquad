
import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HowItWorksCallToAction = () => {
  return (
    <div className="text-center fade-in-up stagger-4">
      <div className="p-8 rounded-2xl bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 border border-vibe-primary/20 max-w-2xl mx-auto">
        <h3 className="vibe-heading-md text-foreground mb-4">
          See It in Action
        </h3>
        <p className="vibe-body text-muted-foreground mb-6">
          Watch how development teams are transforming their workflows with 
          AI-powered orchestration and collaborative intelligence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline"
            className="border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary/10 group"
            onClick={() => document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <BookOpen className="mr-2 w-5 h-5" />
            View Case Studies
          </Button>
          <Button 
            className="vibe-btn-primary group"
            onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Features
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
