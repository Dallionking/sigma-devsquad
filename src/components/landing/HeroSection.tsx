
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { FloatingElement, PulsingDot } from "@/components/ui/floating-elements";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";
import { LimitlessBadge } from "./hero/LimitlessBadge";
import { LimitlessTagline } from "./hero/LimitlessTagline";
import { ProblemStats } from "./hero/ProblemStats";
import { TrustIndicators } from "./hero/TrustIndicators";
import { 
  Bot, 
  BarChart,
  ArrowRight,
  Play,
  MessageSquare, 
  Zap, 
  Sparkles,
  Clock
} from "lucide-react";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getGridCols } = useResponsiveDesign();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth?tab=signup");
    }
  };

  return (
    <section className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary/5 via-vibe-secondary/3 to-vibe-accent/5 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      {/* Enhanced floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} className="absolute top-20 left-10 opacity-30">
          <div className="w-16 h-16 bg-gradient-to-br from-vibe-primary/20 to-vibe-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-8 h-8 text-vibe-primary animate-pulse-glow" />
          </div>
        </FloatingElement>
        <FloatingElement delay={2000} className="absolute top-40 right-20 opacity-25">
          <div className="w-12 h-12 bg-gradient-to-br from-vibe-accent/20 to-vibe-flow/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Bot className="w-6 h-6 text-vibe-secondary" />
          </div>
        </FloatingElement>
        <FloatingElement delay={4000} className="absolute bottom-40 left-1/4 opacity-25">
          <div className="w-14 h-14 bg-gradient-to-br from-vibe-flow/20 to-vibe-energy/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Zap className="w-7 h-7 text-vibe-accent" />
          </div>
        </FloatingElement>
        <FloatingElement delay={6000} className="absolute top-1/2 right-1/3 opacity-20">
          <div className="w-10 h-10 bg-gradient-to-br from-vibe-secondary/20 to-vibe-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MessageSquare className="w-5 h-5 text-vibe-flow" />
          </div>
        </FloatingElement>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`grid gap-12 items-center ${getGridCols(1, 1, 2)}`}>
          <div className="space-y-8">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="space-y-6">
                {/* Limitless Badge */}
                <LimitlessBadge />
                
                {/* Preserved headline with Limitless glow effect */}
                <div className="relative">
                  <div className="absolute -top-8 -left-4 w-[110%] h-[140%] bg-gradient-to-r from-[#6C5CE7]/20 via-[#00B8D9]/10 to-transparent rounded-full blur-3xl opacity-60 animate-limitless-glow pointer-events-none"></div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight relative z-10 hero-headline-enhanced">
                    <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                      Build Smarter with AI-Powered Developer Teams
                    </span>
                  </h1>
                </div>
                
                {/* Preserved subheadline */}
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                  Transform your development workflow with intelligent agent teams that collaborate, 
                  plan, and execute complex projects autonomously. <span className="text-vibe-primary font-semibold">Which means your teams focus on building—not juggling.</span>
                </p>

                {/* New Limitless tagline */}
                <LimitlessTagline />

                {/* Problem visualization */}
                <ProblemStats />
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="flex flex-col sm:flex-row gap-4">
                <EnhancedButton 
                  size="lg" 
                  onClick={handleGetStarted}
                  variant="enhanced-primary"
                  className="px-8 py-4 text-lg limitless-cta-primary"
                >
                  Start Building for Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </EnhancedButton>
                <EnhancedButton variant="enhanced-secondary" size="lg" className="px-8 py-4 text-lg limitless-cta-secondary">
                  <Play className="w-5 h-5 mr-2" />
                  Watch 3-Min Demo
                </EnhancedButton>
              </div>
            </AnimatedSection>

            {/* Enhanced trust indicators */}
            <AnimatedSection animation="fade-up" delay={300}>
              <TrustIndicators />
            </AnimatedSection>
          </div>

          {/* Enhanced hero visual with agent team hierarchy */}
          <AnimatedSection animation="scale" delay={400}>
            <div className="relative">
              <div className="bg-gradient-to-br from-vibe-primary via-vibe-secondary to-vibe-accent rounded-2xl p-1 animate-gradient">
                <div className="bg-background/95 backdrop-blur rounded-xl p-8">
                  <div className={`grid gap-4 ${getGridCols(2, 2, 2)}`}>
                    {/* Enhanced mock dashboard preview */}
                    <EnhancedCard hoverEffect="lift" className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Bot className="w-5 h-5 text-vibe-primary feature-icon transition-transform" />
                        <span className="font-medium">DevOps Agent</span>
                        <PulsingDot className="ml-auto" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Deploying v2.1.3</span>
                        </div>
                        <div className="h-2 bg-gradient-to-r from-vibe-primary/30 to-vibe-primary/10 rounded animate-shimmer"></div>
                        <div className="h-2 bg-gradient-to-r from-vibe-secondary/30 to-vibe-secondary/10 rounded w-3/4"></div>
                        <div className="h-2 bg-gradient-to-r from-vibe-accent/30 to-vibe-accent/10 rounded w-1/2"></div>
                      </div>
                    </EnhancedCard>
                    
                    <EnhancedCard hoverEffect="glow" className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <BarChart className="w-5 h-5 text-vibe-secondary feature-icon transition-transform" />
                        <span className="font-medium">Performance</span>
                        <Clock className="w-4 h-4 text-green-500 ml-auto" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Build Time</span>
                          <span className="text-green-500 font-medium">↓ 68%</span>
                        </div>
                        <div className="h-2 bg-gradient-to-r from-vibe-flow/30 to-vibe-flow/10 rounded w-5/6"></div>
                        <div className="h-2 bg-gradient-to-r from-vibe-energy/30 to-vibe-energy/10 rounded w-2/3"></div>
                        <div className="h-2 bg-gradient-to-r from-vibe-primary/30 to-vibe-primary/10 rounded w-3/4"></div>
                      </div>
                    </EnhancedCard>
                    
                    <EnhancedCard hoverEffect="tilt" className="p-4 col-span-2">
                      <div className="flex items-center space-x-2 mb-3">
                        <MessageSquare className="w-5 h-5 text-vibe-accent feature-icon transition-transform" />
                        <span className="font-medium">Agent Team Coordination</span>
                        <PulsingDot className="ml-auto" color="bg-green-500" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-vibe-primary to-vibe-secondary rounded-full animate-bounce-gentle flex items-center justify-center text-xs text-white font-bold">PM</div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Planning Agent</div>
                            <div className="h-2 bg-gradient-to-r from-vibe-primary/30 to-transparent rounded"></div>
                          </div>
                          <div className="text-xs text-green-500">Active</div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-vibe-secondary to-vibe-accent rounded-full flex items-center justify-center text-xs text-white font-bold">QA</div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Testing Agent</div>
                            <div className="h-2 bg-gradient-to-r from-vibe-secondary/30 to-transparent rounded w-3/4"></div>
                          </div>
                          <div className="text-xs text-blue-500">Testing</div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-vibe-accent to-vibe-flow rounded-full flex items-center justify-center text-xs text-white font-bold">DV</div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Dev Agent</div>
                            <div className="h-2 bg-gradient-to-r from-vibe-accent/30 to-transparent rounded w-4/5"></div>
                          </div>
                          <div className="text-xs text-purple-500">Coding</div>
                        </div>
                      </div>
                    </EnhancedCard>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
