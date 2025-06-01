
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FloatingElement, PulsingDot } from "@/components/ui/floating-elements";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard } from "@/components/ui/enhanced-card";
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
  Sparkles,
  Users,
  Trophy,
  Rocket
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

  const stats = [
    { value: "2,500+", label: "Active Teams", icon: Users },
    { value: "50,000+", label: "AI Agents Deployed", icon: Bot },
    { value: "99.9%", label: "Uptime SLA", icon: Trophy },
    { value: "300%", label: "Faster Delivery", icon: Rocket }
  ];

  return (
    <section className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Enhanced floating background elements */}
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
        <FloatingElement delay={6000} className="absolute top-1/2 right-1/3 opacity-15">
          <MessageSquare className="w-5 h-5 text-vibe-flow" />
        </FloatingElement>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`grid gap-12 items-center ${getGridCols(1, 1, 2)}`}>
          <div className="space-y-8">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 rounded-full border border-vibe-primary/20 mb-6">
                  <Sparkles className="w-4 h-4 text-vibe-primary mr-2" />
                  <span className="text-sm font-medium text-vibe-primary">
                    Revolutionary AI Development Platform
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gradient-animated leading-tight">
                  Build Smarter with AI-Powered Developer Teams
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                  Transform your development workflow with intelligent agent teams that collaborate, 
                  plan, and execute complex projects autonomously. Experience the future of software development today.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="flex flex-col sm:flex-row gap-4">
                <EnhancedButton 
                  size="lg" 
                  onClick={handleGetStarted}
                  variant="enhanced-primary"
                  className="px-8 py-4 text-lg"
                >
                  Start Building for Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </EnhancedButton>
                <EnhancedButton variant="outline" size="lg" className="px-8 py-4 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Watch 3-Min Demo
                </EnhancedButton>
              </div>
            </AnimatedSection>

            {/* Enhanced trust indicators */}
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="pt-8">
                <p className="text-sm text-muted-foreground mb-6 text-center sm:text-left">
                  Trusted by teams at leading companies worldwide
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group hover-lift">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <stat.icon className="w-5 h-5 text-vibe-primary" />
                        <div className="text-2xl font-bold text-vibe-primary">
                          <AnimatedCounter value={stat.value} />
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Enhanced hero visual */}
          <AnimatedSection animation="scale" delay={400}>
            <div className="relative">
              <div className="bg-gradient-to-br from-vibe-primary via-vibe-secondary to-vibe-accent rounded-2xl p-1 animate-gradient">
                <div className="bg-background rounded-xl p-8">
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
                        <div className="h-2 bg-vibe-primary/20 rounded animate-shimmer"></div>
                        <div className="h-2 bg-vibe-secondary/20 rounded w-3/4"></div>
                        <div className="h-2 bg-vibe-accent/20 rounded w-1/2"></div>
                      </div>
                    </EnhancedCard>
                    
                    <EnhancedCard hoverEffect="glow" className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <BarChart className="w-5 h-5 text-vibe-secondary feature-icon transition-transform" />
                        <span className="font-medium">Performance</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Build Time</span>
                          <span className="text-green-500 font-medium">↓ 68%</span>
                        </div>
                        <div className="h-2 bg-vibe-flow/20 rounded w-5/6"></div>
                        <div className="h-2 bg-vibe-energy/20 rounded w-2/3"></div>
                        <div className="h-2 bg-vibe-primary/20 rounded w-3/4"></div>
                      </div>
                    </EnhancedCard>
                    
                    <EnhancedCard hoverEffect="tilt" className="p-4 col-span-2">
                      <div className="flex items-center space-x-2 mb-3">
                        <MessageSquare className="w-5 h-5 text-vibe-accent feature-icon transition-transform" />
                        <span className="font-medium">Team Collaboration</span>
                        <PulsingDot className="ml-auto" color="bg-green-500" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-vibe-primary rounded-full animate-bounce-gentle flex items-center justify-center text-xs text-white font-bold">AI</div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Planning Agent</div>
                            <div className="h-2 bg-muted rounded"></div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-vibe-secondary rounded-full flex items-center justify-center text-xs text-white font-bold">QA</div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Testing Agent</div>
                            <div className="h-2 bg-muted rounded w-3/4"></div>
                          </div>
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
