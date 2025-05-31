
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingHero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleWatchDemo = () => {
    navigate('/app');
  };

  return (
    <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary/5 via-background to-vibe-accent/5" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative container-responsive">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full">
            <Sparkles className="w-4 h-4 text-vibe-primary" />
            <span className="text-sm font-medium text-vibe-primary">
              Introducing AI-Powered Development Teams
            </span>
          </div>

          {/* Main heading */}
          <h1 className="vibe-heading-xl mb-6 leading-tight">
            Build Faster with
            <br />
            <span className="vibe-gradient-text">AI Development Teams</span>
          </h1>

          {/* Subheading */}
          <p className="vibe-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your development workflow with intelligent AI agents that collaborate, 
            code, and scale your projects beyond imagination.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="vibe-btn-primary text-lg px-8 py-6 min-w-[200px]"
              onClick={handleGetStarted}
            >
              Start Building
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary/10 text-lg px-8 py-6 min-w-[200px]"
              onClick={handleWatchDemo}
            >
              Try Demo
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border">
            <div className="text-center">
              <div className="vibe-heading-md text-vibe-primary mb-2">10x</div>
              <div className="text-sm text-muted-foreground">Faster Development</div>
            </div>
            <div className="text-center">
              <div className="vibe-heading-md text-vibe-secondary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">AI Collaboration</div>
            </div>
            <div className="text-center">
              <div className="vibe-heading-md text-vibe-accent mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Scalability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
