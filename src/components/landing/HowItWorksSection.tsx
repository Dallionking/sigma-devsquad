
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";
import { 
  Users, 
  Zap, 
  Eye
} from "lucide-react";

export const HowItWorksSection = () => {
  const { getGridCols } = useResponsiveDesign();

  const steps = [
    {
      title: "Create Your Agent Team",
      description: "Define roles, capabilities, and objectives for your AI agents",
      icon: Users
    },
    {
      title: "Configure Workflows", 
      description: "Set up communication patterns and task dependencies",
      icon: Zap
    },
    {
      title: "Launch & Monitor",
      description: "Deploy your team and track progress in real-time",
      icon: Eye
    }
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
        </AnimatedSection>

        <div className={`grid gap-8 ${getGridCols(1, 2, 3)}`}>
          {steps.map((step, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-up" 
              delay={index * 150}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-vibe-primary to-vibe-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform animate-gradient">
                <span className="text-white font-bold text-xl">{index + 1}</span>
              </div>
              <div className="mb-4">
                <step.icon className="w-8 h-8 text-vibe-primary mx-auto group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
