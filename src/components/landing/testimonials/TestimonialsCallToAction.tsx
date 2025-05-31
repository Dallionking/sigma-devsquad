
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TestimonialsCallToAction = () => {
  return (
    <div className="text-center mt-16 fade-in-up stagger-4">
      <div className="flex justify-center items-center gap-2 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          Rated 4.9/5 by 500+ development teams
        </span>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 border border-vibe-primary/20 max-w-2xl mx-auto">
        <h3 className="vibe-heading-md text-foreground mb-4">
          Join Thousands of Happy Developers
        </h3>
        <p className="vibe-body text-muted-foreground mb-6">
          Experience the future of development orchestration and see why teams 
          around the world trust Vibe DevSquad with their most critical projects.
        </p>
        <Button 
          className="cta-button-lg vibe-btn-primary group"
          onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Start Your Free Trial
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
