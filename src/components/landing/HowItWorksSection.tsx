
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { ResponsiveSection } from "@/components/layout/ResponsiveSection";
import { ResponsiveContentBlock } from "@/components/layout/ResponsiveContentBlock";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";
import { 
  Users, 
  Zap, 
  Eye
} from "lucide-react";

export const HowItWorksSection = () => {
  const { screenSize } = useResponsiveDesign();

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

  const isMobile = screenSize === 'mobile';

  return (
    <ResponsiveSection variant="content" id="how-it-works">
      <AnimatedSection animation="fade-up" delay={100}>
        <ResponsiveContentBlock maxWidth="xl" spacing="lg">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Get started in three simple steps
            </p>
          </div>
        </ResponsiveContentBlock>
      </AnimatedSection>

      <div className="mt-12 lg:mt-16">
        <ResponsiveGrid 
          cols={{ mobile: 1, tablet: 2, desktop: 3 }}
          gap={isMobile ? "lg" : "xl"}
          variant="features"
        >
          {steps.map((step, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-up" 
              delay={index * 150}
              className="text-center group"
            >
              <div className="space-y-4 sm:space-y-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-vibe-primary to-vibe-secondary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform animate-gradient">
                  <span className="text-white font-bold text-lg sm:text-xl">{index + 1}</span>
                </div>
                <div className="mb-4">
                  <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-vibe-primary mx-auto group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </ResponsiveGrid>
      </div>
    </ResponsiveSection>
  );
};
