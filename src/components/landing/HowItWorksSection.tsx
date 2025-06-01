
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionContainer } from "@/components/layout/AdvancedResponsiveContainer";
import { useAdvancedResponsive } from "@/hooks/useAdvancedResponsive";
import { 
  Users, 
  Zap, 
  Eye
} from "lucide-react";

export const HowItWorksSection = () => {
  const { getOptimalGridCols } = useAdvancedResponsive();

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

  const gridCols = getOptimalGridCols(3);

  return (
    <section id="how-it-works" className="py-12 md:py-24">
      <SectionContainer>
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-fluid-3xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
        </AnimatedSection>

        <div className={`intrinsic-layout`} style={{ '--item-min-width': '300px' } as React.CSSProperties}>
          {steps.slice(0, gridCols).map((step, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-up" 
              delay={index * 150}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-vibe-primary to-vibe-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform animate-gradient">
                <span className="text-white font-bold text-fluid-lg">{index + 1}</span>
              </div>
              <div className="mb-4">
                <step.icon className="w-8 h-8 text-vibe-primary mx-auto group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-fluid-lg font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-fluid-sm leading-relaxed">{step.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};
