
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FloatingElement, PulsingDot } from "@/components/ui/floating-elements";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { ResponsiveSection } from "@/components/layout/ResponsiveSection";
import { ResponsiveHero } from "@/components/layout/ResponsiveHero";
import { ResponsiveContentBlock } from "@/components/layout/ResponsiveContentBlock";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";
import { 
  Bot, 
  BarChart,
  ArrowRight,
  Play,
  MessageSquare, 
  Zap, 
  Sparkles
} from "lucide-react";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { screenSize } = useResponsiveDesign();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth?tab=signup");
    }
  };

  const stats = [
    { value: "500+", label: "Development Teams" },
    { value: "10,000+", label: "Agents Created" },
    { value: "99.9%", label: "Uptime" }
  ];

  const isMobile = screenSize === 'mobile';

  return (
    <ResponsiveSection variant="hero" background="gradient">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} className="absolute top-20 left-10 opacity-20">
          <Sparkles className="w-8 h-8 text-vibe-primary animate-pulse-glow" />
        </FloatingElement>
        <FloatingElement delay={2000} className="absolute top-40 right-20 opacity-20">
          <Bot className="w-6 h-6 text-vibe-secondary" />
        </FloatingElement>
        <FloatingElement delay={4000} className="absolute bottom-40 left-1/4 opacity-20">
          <Zap className="w-7 h-7 text-vibe-accent" />
        </FloatingElement>
      </div>

      <ResponsiveHero layout="split" className="relative">
        <div className="space-y-6 lg:space-y-8">
          <AnimatedSection animation="fade-up" delay={100}>
            <ResponsiveContentBlock maxWidth="2xl" alignment="left" spacing="lg">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gradient-animated leading-tight">
                Transform Your Development Workflow with AI-Powered Agent Teams
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Build, deploy, and manage intelligent agent teams that revolutionize how you approach 
                software development, project planning, and team collaboration.
              </p>
            </ResponsiveContentBlock>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <EnhancedButton 
                size={isMobile ? "default" : "lg"}
                onClick={handleGetStarted}
                variant="enhanced-primary"
                className="px-6 py-3 sm:px-8 text-base sm:text-lg"
              >
                Start Building Today
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </EnhancedButton>
              <EnhancedButton 
                variant="outline" 
                size={isMobile ? "default" : "lg"}
                className="px-6 py-3 sm:px-8 text-base sm:text-lg"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Watch Demo
              </EnhancedButton>
            </div>
          </AnimatedSection>

          {/* Trust Indicators */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="pt-6 lg:pt-8">
              <ResponsiveGrid 
                cols={{ mobile: 1, tablet: 3, desktop: 3 }}
                gap="md"
                variant="stats"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group hover-lift">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-vibe-primary">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </ResponsiveGrid>
            </div>
          </AnimatedSection>
        </div>

        {/* Hero Visual */}
        <AnimatedSection animation="scale" delay={400}>
          <div className="relative order-first lg:order-last">
            <div className="bg-gradient-to-br from-vibe-primary via-vibe-secondary to-vibe-accent rounded-2xl p-1 animate-gradient">
              <div className="bg-background rounded-xl p-4 sm:p-6 lg:p-8">
                <ResponsiveGrid 
                  cols={{ mobile: 1, tablet: 2, desktop: 2 }}
                  gap="md"
                >
                  {/* Mock dashboard preview */}
                  <EnhancedCard hoverEffect="lift" className="p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-vibe-primary feature-icon transition-transform" />
                      <span className="font-medium text-sm sm:text-base">Agent Team</span>
                      <PulsingDot className="ml-auto" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-vibe-primary/20 rounded animate-shimmer"></div>
                      <div className="h-2 bg-vibe-secondary/20 rounded w-3/4"></div>
                      <div className="h-2 bg-vibe-accent/20 rounded w-1/2"></div>
                    </div>
                  </EnhancedCard>
                  
                  <EnhancedCard hoverEffect="glow" className="p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <BarChart className="w-4 h-4 sm:w-5 sm:h-5 text-vibe-secondary feature-icon transition-transform" />
                      <span className="font-medium text-sm sm:text-base">Progress</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-vibe-flow/20 rounded w-5/6"></div>
                      <div className="h-2 bg-vibe-energy/20 rounded w-2/3"></div>
                      <div className="h-2 bg-vibe-primary/20 rounded w-3/4"></div>
                    </div>
                  </EnhancedCard>
                  
                  <EnhancedCard hoverEffect="tilt" className="p-3 sm:p-4 col-span-1 sm:col-span-2">
                    <div className="flex items-center space-x-2 mb-3">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-vibe-accent feature-icon transition-transform" />
                      <span className="font-medium text-sm sm:text-base">Live Communication</span>
                      <PulsingDot className="ml-auto" color="bg-green-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-vibe-primary rounded-full animate-bounce-gentle"></div>
                        <div className="h-2 bg-muted rounded flex-1 mt-1 sm:mt-2"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-vibe-secondary rounded-full"></div>
                        <div className="h-2 bg-muted rounded flex-1 mt-1 sm:mt-2 w-3/4"></div>
                      </div>
                    </div>
                  </EnhancedCard>
                </ResponsiveGrid>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </ResponsiveHero>
    </ResponsiveSection>
  );
};
