
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { HeroContainer } from "@/components/layout/AdvancedResponsiveContainer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdvancedResponsive } from "@/hooks/useAdvancedResponsive";
import { 
  ArrowRight,
  Sparkles,
  Zap,
  Users
} from "lucide-react";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getResponsiveValue, shouldUseReducedMotion } = useAdvancedResponsive();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth?tab=signup");
    }
  };

  const animationDelay = getResponsiveValue({
    mobile: 100,
    tablet: 150,
    desktop: 200,
    default: 100
  });

  return (
    <section className="full-viewport flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-vibe-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-vibe-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-vibe-secondary/10 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <HeroContainer className="relative z-10">
        {/* Text Content */}
        <div className="flex-stack-responsive">
          <AnimatedSection animation="fade-up" delay={animationDelay}>
            <div className="text-center md:text-left space-fluid-lg">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-vibe-primary/10 text-vibe-primary text-fluid-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Development Teams
              </div>

              {/* Main Headline */}
              <h1 className="text-fluid-4xl font-bold text-gradient-animated mb-6">
                Transform Your Development Workflow with AI Agent Teams
              </h1>

              {/* Subheading */}
              <p className="text-fluid-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                Create specialized AI agents that collaborate seamlessly to build, test, and deploy your applications faster than ever before.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <EnhancedButton 
                  size="lg" 
                  onClick={handleGetStarted}
                  variant="enhanced-primary"
                  className="touch-target-enhanced px-8 py-4 text-fluid-base"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </EnhancedButton>
                <EnhancedButton 
                  variant="outline" 
                  size="lg" 
                  className="touch-target-enhanced px-8 py-4 text-fluid-base"
                >
                  Watch Demo
                </EnhancedButton>
              </div>

              {/* Feature Highlights */}
              <div className="flex flex-wrap gap-6 text-fluid-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-vibe-primary" />
                  <span>10x Faster Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-vibe-primary" />
                  <span>Intelligent Collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-vibe-primary" />
                  <span>Zero Setup Required</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Visual Content */}
          <AnimatedSection 
            animation="scale" 
            delay={animationDelay + 200}
            className="relative"
          >
            <div className="relative">
              {/* Placeholder for hero visual */}
              <div className="img-hero bg-gradient-to-br from-vibe-primary/20 via-vibe-secondary/20 to-vibe-accent/20 flex items-center justify-center border border-border/50">
                <div className="text-center space-fluid-sm">
                  <div className="w-16 h-16 bg-vibe-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-vibe-primary" />
                  </div>
                  <p className="text-fluid-base text-muted-foreground">
                    Interactive Demo Coming Soon
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              {!shouldUseReducedMotion() && (
                <>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-vibe-primary rounded-full animate-bounce-gentle opacity-80"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-vibe-secondary rounded-full animate-bounce-gentle opacity-60" style={{ animationDelay: '1s' }}></div>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </HeroContainer>
    </section>
  );
};
