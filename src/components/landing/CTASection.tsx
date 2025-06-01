
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowRight,
  Shield,
  Globe,
  Building,
  CheckCircle,
  Sparkles,
  Clock,
  MessageSquare,
  Zap
} from "lucide-react";

export const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth?tab=signup");
    }
  };

  const urgencyFeatures = [
    "Join 2,500+ development teams",
    "Setup completes in under 5 minutes",
    "See results in your first session",
    "No technical expertise required"
  ];

  const trustBadges = [
    {
      icon: Shield,
      title: "Enterprise Security",
      subtitle: "SOC 2 Type II Certified"
    },
    {
      icon: Globe,
      title: "99.9% Uptime",
      subtitle: "Guaranteed SLA"
    },
    {
      icon: Building,
      title: "GDPR Compliant",
      subtitle: "Privacy Protected"
    }
  ];

  return (
    <section className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-br from-vibe-primary/10 via-transparent to-vibe-secondary/10">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection animation="scale" delay={100}>
          <div className="max-w-4xl mx-auto text-center">
            {/* Main CTA */}
            <div className="mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 rounded-full border border-vibe-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-vibe-primary mr-2" />
                <span className="text-sm font-medium text-vibe-primary">
                  Ready to Transform Your Development?
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Start Building with AI Today
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Don't let your team fall behind. Join the AI development revolution and 
                experience 10x faster delivery with zero learning curve.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <EnhancedButton 
                  size="lg" 
                  onClick={handleGetStarted}
                  variant="enhanced-primary"
                  className="px-8 py-4 text-lg"
                >
                  Start Free Trial Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </EnhancedButton>
                <EnhancedButton variant="enhanced-secondary" size="lg" className="px-8 py-4 text-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Talk to an Expert
                </EnhancedButton>
              </div>

              {/* Urgency highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
                {urgencyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-vibe-flow flex-shrink-0" />
                    <span className="text-center">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof Card */}
            <AnimatedSection animation="fade-up" delay={200}>
              <EnhancedCard className="p-8 mb-12 bg-gradient-to-br from-white to-gray-50/50 border-2 border-vibe-primary/20">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Zap className="w-5 h-5 text-vibe-energy" />
                    <span className="text-sm font-medium text-vibe-energy">Live Activity</span>
                  </div>
                  <div className="text-2xl font-bold mb-2 text-vibe-primary">
                    Real teams are shipping faster right now
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-vibe-primary">127</div>
                      <div className="text-sm text-muted-foreground">Teams signed up this week</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-vibe-secondary">1,247</div>
                      <div className="text-sm text-muted-foreground">AI agents deployed today</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-vibe-accent">89%</div>
                      <div className="text-sm text-muted-foreground">Teams upgrade after trial</div>
                    </div>
                  </div>
                </div>
              </EnhancedCard>
            </AnimatedSection>

            {/* Trust badges */}
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="border-t pt-8">
                <p className="text-sm text-muted-foreground mb-6">
                  Trusted by teams at leading companies worldwide
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {trustBadges.map((badge, index) => (
                    <div key={index} className="flex items-center justify-center space-x-3 group">
                      <badge.icon className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="text-sm font-medium">{badge.title}</div>
                        <div className="text-xs text-muted-foreground">{badge.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Final urgency element */}
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="mt-8 p-4 bg-vibe-energy/5 border border-vibe-energy/20 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-vibe-energy rounded-full animate-pulse"></div>
                  <span className="text-vibe-energy font-medium">
                    Don't wait – every day without AI agents costs your team 5+ hours of productivity
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
