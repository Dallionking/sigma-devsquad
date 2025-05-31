
import React, { useState, useEffect } from 'react';
import { CheckCircle, Users, Zap, Target, Shield, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HierarchicalTeamVisualization } from './HierarchicalTeamVisualization';

const solutionPoints = [
  {
    icon: Target,
    text: "Delegate tasks intelligently across specialized agents",
    delay: 0
  },
  {
    icon: Users,
    text: "Ensure clear, structured communication",
    delay: 200
  },
  {
    icon: Shield,
    text: "Maintain comprehensive context throughout projects", 
    delay: 400
  },
  {
    icon: Zap,
    text: "Eliminate coordination overhead between specialized domains",
    delay: 600
  },
  {
    icon: CheckCircle,
    text: "Deliver consistent quality across all components",
    delay: 800
  }
];

export const LandingSolutionSection = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [visiblePoints, setVisiblePoints] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visiblePoints < solutionPoints.length) {
        setVisiblePoints(prev => prev + 1);
      }
    }, 1000 + (visiblePoints * 300));

    return () => clearTimeout(timer);
  }, [visiblePoints]);

  return (
    <section id="solutions" className="section-padding bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Enhancement */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-vibe-primary/5 via-transparent to-vibe-secondary/5"
          style={{
            transform: `translateX(${animationPhase * 10}px) translateY(${animationPhase * 5}px)`,
            transition: 'transform 3s ease-in-out'
          }}
        />
      </div>

      <div className="container-responsive relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="order-2 lg:order-1">
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full fade-in-up">
              <CheckCircle className="w-4 h-4 text-vibe-primary" />
              <span className="text-sm font-medium text-vibe-primary">
                The Solution
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="section-heading mb-8 text-foreground fade-in-up stagger-1">
              <span className="vibe-gradient-text">Intelligent, Autonomous,</span>
              <br />
              Agent-Based Development
            </h2>

            {/* Subtitle */}
            <p className="vibe-body-lg text-muted-foreground mb-8 fade-in-up stagger-2">
              Leverage hierarchical AI-driven agent teams to:
            </p>

            {/* Solution Points */}
            <div className="space-y-4 mb-8">
              {solutionPoints.map((point, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-lg bg-background/80 border transition-all duration-500 ${
                    index < visiblePoints 
                      ? 'border-vibe-primary/20 opacity-100 translate-x-0' 
                      : 'border-transparent opacity-0 translate-x-4'
                  } hover:border-vibe-primary/30 hover:bg-vibe-primary/5`}
                  style={{ 
                    transitionDelay: `${point.delay}ms`,
                    transform: index < visiblePoints ? 'translateX(0)' : 'translateX(16px)'
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-vibe-primary/10 flex items-center justify-center mt-1">
                    <point.icon className="w-4 h-4 text-vibe-primary" />
                  </div>
                  <p className="vibe-body text-foreground leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Impact Statement */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 border border-vibe-primary/20 fade-in-up stagger-4">
              <p className="vibe-body-lg text-foreground leading-relaxed mb-4">
                <strong>Which means your teams focus on building—not juggling.</strong>
              </p>
              <Button 
                className="cta-button-md vibe-btn-primary group"
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See How It Works
                <Play className="ml-2 w-4 h-4 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          </div>

          {/* Visualization Section */}
          <div className="order-1 lg:order-2 fade-in-up stagger-2">
            <HierarchicalTeamVisualization animationPhase={animationPhase} />
          </div>
        </div>
      </div>
    </section>
  );
};
