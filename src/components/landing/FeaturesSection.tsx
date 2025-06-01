
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { ResponsiveSection } from "@/components/layout/ResponsiveSection";
import { ResponsiveContentBlock } from "@/components/layout/ResponsiveContentBlock";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";
import { 
  Bot, 
  MessageSquare, 
  Brain, 
  BarChart
} from "lucide-react";

export const FeaturesSection = () => {
  const { screenSize } = useResponsiveDesign();

  const features = [
    {
      icon: Bot,
      title: "Intelligent Agent Teams",
      description: "Create specialized AI agents that work together seamlessly",
      color: "text-vibe-primary"
    },
    {
      icon: MessageSquare,
      title: "Live Team Collaboration", 
      description: "Real-time communication and task coordination",
      color: "text-vibe-secondary"
    },
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description: "Intelligent project breakdown and task assignment",
      color: "text-vibe-accent"
    },
    {
      icon: BarChart,
      title: "Visual Workflow Control",
      description: "Intuitive dashboards and progress tracking",
      color: "text-vibe-flow"
    }
  ];

  const isMobile = screenSize === 'mobile';

  return (
    <ResponsiveSection variant="feature" background="muted" id="features">
      <AnimatedSection animation="fade-up" delay={100}>
        <ResponsiveContentBlock maxWidth="xl" spacing="lg">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
              Powerful Features for Modern Development
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Everything you need to build, manage, and scale intelligent agent teams
            </p>
          </div>
        </ResponsiveContentBlock>
      </AnimatedSection>

      <div className="mt-12 lg:mt-16">
        <ResponsiveGrid 
          cols={{ mobile: 1, tablet: 2, desktop: 4 }}
          gap={isMobile ? "md" : "lg"}
          variant="features"
          className="stagger-animation"
        >
          {features.map((feature, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-up" 
              delay={index * 100}
            >
              <EnhancedCard hoverEffect="lift" className="p-4 sm:p-6 h-full">
                <CardContent className="p-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-vibe-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color} feature-icon transition-transform`} />
                  </div>
                  <h3 className="font-semibold mb-2 text-base sm:text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{feature.description}</p>
                </CardContent>
              </EnhancedCard>
            </AnimatedSection>
          ))}
        </ResponsiveGrid>
      </div>
    </ResponsiveSection>
  );
};
