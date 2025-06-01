
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
  Rocket,
  TrendingUp,
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

  const stats = [
    { value: "2,500+", label: "Active Teams", icon: Users },
    { value: "50,000+", label: "AI Agents Deployed", icon: Bot },
    { value: "99.9%", label: "Uptime SLA", icon: Trophy },
    { value: "300%", label: "Faster Delivery", icon: Rocket }
  ];

  const problemStats = [
    { metric: "47%", label: "Time Lost to Coordination", color: "text-red-500" },
    { metric: "68%", label: "Context Switching Overhead", color: "text-orange-500" },
    { metric: "85%", label: "Communication Inefficiency", color: "text-yellow-500" }
  ];

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
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 rounded-full border border-vibe-primary/20 mb-6 backdrop-blur-sm">
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
                  plan, and execute complex projects autonomously. <span className="text-vibe-primary font-semibold">Which means your teams focus on building—not juggling.</span>
                </p>

                {/* Problem visualization */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-xl p-6 border border-red-200/50 dark:border-red-800/50">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-semibold text-red-700 dark:text-red-300">Development Fragmentation Crisis</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {problemStats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className={`text-2xl font-bold ${stat.color}`}>
                          <AnimatedCounter value={stat.metric} />
                        </div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
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
                <EnhancedButton variant="enhanced-secondary" size="lg" className="px-8 py-4 text-lg">
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
                        <div className="w-8 h-8 bg-gradient-to-br from-vibe-primary/20 to-vibe-secondary/20 rounded-lg flex items-center justify-center">
                          <stat.icon className="w-4 h-4 text-vibe-primary" />
                        </div>
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
