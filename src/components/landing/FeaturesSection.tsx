
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { SectionContainer } from "@/components/layout/AdvancedResponsiveContainer";
import { useAdvancedResponsive } from "@/hooks/useAdvancedResponsive";
import { 
  Bot, 
  MessageSquare, 
  Brain, 
  BarChart
} from "lucide-react";

export const FeaturesSection = () => {
  const { getOptimalGridCols } = useAdvancedResponsive();

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

  const gridCols = getOptimalGridCols(4);

  return (
    <section id="features" className="py-12 md:py-24 bg-muted/30">
      <SectionContainer>
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-fluid-3xl font-bold mb-4">
              Powerful Features for Modern Development
            </h2>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build, manage, and scale intelligent agent teams
            </p>
          </div>
        </AnimatedSection>

        <div className={`intrinsic-layout stagger-animation`} style={{ '--item-min-width': '280px' } as React.CSSProperties}>
          {features.slice(0, gridCols).map((feature, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-up" 
              delay={index * 100}
            >
              <EnhancedCard hoverEffect="lift" className="card-responsive h-full">
                <CardContent className="p-0">
                  <div className={`w-12 h-12 bg-vibe-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color} feature-icon transition-transform`} />
                  </div>
                  <h3 className="text-fluid-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-fluid-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </EnhancedCard>
            </AnimatedSection>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};
