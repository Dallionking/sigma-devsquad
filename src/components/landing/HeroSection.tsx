
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
  Clock,
  Star,
  Users,
  TrendingUp
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

  const handleWatchDemo = () => {
    // Demo functionality can be implemented later
    console.log("Watch demo clicked");
  };

  return (
    <section className="py-12 md:py-24 lg:py-32 relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced gradient background with neural network pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary/5 via-vibe-secondary/3 to-vibe-accent/5 pointer-events-none" />
      
      {/* Enhanced floating background elements with neural pulse - VERIFIED */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} className="absolute top-20 left-10 opacity-30">
          <div className="w-16 h-16 bg-gradient-to-br from-vibe-primary/20 to-vibe-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-neural-pulse">
            <Sparkles className="w-8 h-8 text-vibe-primary animate-pulse-glow" />
          </div>
        </FloatingElement>
        <FloatingElement delay={2000} className="absolute top-40 right-20 opacity-25">
          <div className="w-12 h-12 bg-gradient-to-br from-vibe-accent/20 to-vibe-flow/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-neural-pulse">
            <Bot className="w-6 h-6 text-vibe-secondary animate-bounce-gentle" />
          </div>
        </FloatingElement>
        <FloatingElement delay={4000} className="absolute bottom-40 left-1/4 opacity-25">
          <div className="w-14 h-14 bg-gradient-to-br from-vibe-flow/20 to-vibe-energy/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-neural-pulse">
            <Zap className="w-7 h-7 text-vibe-accent animate-pulse" />
          </div>
        </FloatingElement>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid gap-12 items-center ${getGridCols(1, 1, 2)}`}>
          <div className="space-y-8">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="space-y-6">
                {/* LIMITLESS BADGE - Enhanced visibility */}
                <div className="flex justify-start">
                  <LimitlessBadge />
                </div>
                
                {/* ENHANCED HEADLINE with multiple glow layers - VERIFIED */}
                <div className="relative hero-headline-enhanced">
                  {/* Primary glow layer */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-[#6C5CE7]/30 via-[#00B8D9]/20 to-transparent rounded-full blur-3xl opacity-40 animate-limitless-glow pointer-events-none"></div>
                  {/* Secondary glow layer */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#6C5CE7]/20 via-[#00B8D9]/10 to-transparent rounded-full blur-2xl opacity-60 animate-limitless-glow pointer-events-none" style={{animationDelay: '1s'}}></div>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight relative z-10">
                    <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                      Build Smarter with{' '}
                      <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00B8D9] bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                        AI-Powered
                      </span>{' '}
                      Developer Teams
                    </span>
                  </h1>
                </div>
                
                {/* ENHANCED SUBHEADLINE with solo entrepreneur highlight - VERIFIED */}
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                  Transform your development workflow with intelligent agent teams that collaborate, 
                  plan, and execute complex projects autonomously.{' '}
                  <span className="solo-entrepreneur-highlight inline-block font-medium">
                    Whether you're a <span className="font-bold text-vibe-primary bg-gradient-to-r from-vibe-primary to-vibe-secondary bg-clip-text text-transparent">solo entrepreneur</span> or leading a team,
                  </span>{' '}
                  <span className="text-vibe-primary font-bold bg-gradient-to-r from-vibe-primary to-vibe-secondary bg-clip-text text-transparent">
                    Vibe DevSquad lets you focus on building—not juggling.
                  </span>
                </p>

                {/* LIMITLESS TAGLINE with enhanced animations - VERIFIED */}
                <div className="py-4">
                  <LimitlessTagline />
                </div>

                {/* Problem visualization with enhanced styling */}
                <ProblemStats />
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* ENHANCED PRIMARY CTA - VERIFIED */}
                <EnhancedButton 
                  size="lg" 
                  onClick={handleGetStarted}
                  variant="enhanced-primary"
                  className="px-8 py-4 text-lg limitless-cta-primary relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    Start Building for Free
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </EnhancedButton>
                
                {/* ENHANCED SECONDARY CTA - VERIFIED */}
                <EnhancedButton 
                  variant="enhanced-secondary" 
                  size="lg" 
                  onClick={handleWatchDemo}
                  className="px-8 py-4 text-lg limitless-cta-secondary relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    Watch 3-Min Demo
                  </span>
                </EnhancedButton>
              </div>
            </AnimatedSection>

            {/* Enhanced trust indicators */}
            <AnimatedSection animation="fade-up" delay={300}>
              <TrustIndicators />
            </AnimatedSection>
          </div>

          {/* Enhanced hero visual with improved agent team hierarchy */}
          <AnimatedSection animation="scale" delay={400}>
            <div className="relative">
              {/* Outer glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-vibe-primary/20 via-vibe-secondary/10 to-vibe-accent/20 rounded-3xl blur-2xl opacity-50 animate-limitless-glow"></div>
              
              <div className="bg-gradient-to-br from-vibe-primary via-vibe-secondary to-vibe-accent rounded-2xl p-1 animate-gradient bg-[length:200%_200%] relative z-10">
                <div className="bg-background/95 backdrop-blur-xl rounded-xl p-8 border border-white/10">
                  <div className={`grid gap-4 ${getGridCols(2, 2, 2)}`}>
                    {/* Enhanced DevOps Agent card */}
                    <EnhancedCard hoverEffect="lift" className="p-4 bg-gradient-to-br from-card/90 to-card/70 border-vibe-primary/20">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-vibe-primary to-vibe-secondary rounded-lg flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white feature-icon transition-transform" />
                        </div>
                        <span className="font-medium">DevOps Agent</span>
                        <PulsingDot className="ml-auto" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>Deploying v2.1.3</span>
                        </div>
                        <div className="h-2 bg-gradient-to-r from-vibe-primary/30 to-vibe-primary/10 rounded animate-shimmer"></div>
                        <div className="h-2 bg-gradient-to-r from-vibe-secondary/30 to-vibe-secondary/10 rounded w-3/4"></div>
                        <div className="h-2 bg-gradient-to-r from-vibe-accent/30 to-vibe-accent/10 rounded w-1/2"></div>
                      </div>
                    </EnhancedCard>
                    
                    {/* Enhanced Performance card */}
                    <EnhancedCard hoverEffect="glow" className="p-4 bg-gradient-to-br from-card/90 to-card/70 border-vibe-secondary/20">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-vibe-secondary to-vibe-accent rounded-lg flex items-center justify-center">
                          <BarChart className="w-5 h-5 text-white feature-icon transition-transform" />
                        </div>
                        <span className="font-medium">Performance</span>
                        <div className="flex items-center ml-auto">
                          <TrendingUp className="w-4 h-4 text-green-500 animate-bounce-gentle" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Build Time</span>
                          <span className="text-green-500 font-medium animate-pulse">↓ 68%</span>
                        </div>
                        <div className="h-2 bg-gradient-to-r from-vibe-flow/30 to-vibe-flow/10 rounded w-5/6"></div>
                        <div className="h-2 bg-gradient-to-r from-vibe-energy/30 to-vibe-energy/10 rounded w-2/3"></div>
                        <div className="h-2 bg-gradient-to-r from-vibe-primary/30 to-vibe-primary/10 rounded w-3/4"></div>
                      </div>
                    </EnhancedCard>
                    
                    {/* Enhanced Agent Team Coordination card */}
                    <EnhancedCard hoverEffect="tilt" className="p-4 col-span-2 bg-gradient-to-br from-card/90 to-card/70 border-vibe-accent/20">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-vibe-accent to-vibe-flow rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white feature-icon transition-transform" />
                        </div>
                        <span className="font-medium">Agent Team Coordination</span>
                        <PulsingDot className="ml-auto" color="bg-green-500" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-vibe-primary to-vibe-secondary rounded-full animate-bounce-gentle flex items-center justify-center text-xs text-white font-bold">PM</div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Planning Agent</div>
                            <div className="h-2 bg-gradient-to-r from-vibe-primary/30 to-transparent rounded animate-shimmer"></div>
                          </div>
                          <div className="text-xs text-green-500 font-medium animate-pulse">Active</div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-vibe-secondary to-vibe-accent rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">QA</div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Testing Agent</div>
                            <div className="h-2 bg-gradient-to-r from-vibe-secondary/30 to-transparent rounded w-3/4"></div>
                          </div>
                          <div className="text-xs text-blue-500 font-medium">Testing</div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-vibe-accent to-vibe-flow rounded-full flex items-center justify-center text-xs text-white font-bold animate-bounce-gentle">DV</div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">Dev Agent</div>
                            <div className="h-2 bg-gradient-to-r from-vibe-accent/30 to-transparent rounded w-4/5 animate-shimmer"></div>
                          </div>
                          <div className="text-xs text-purple-500 font-medium animate-pulse">Coding</div>
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
