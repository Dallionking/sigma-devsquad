
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
  CreditCard
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

  const features = [
    "No credit card required",
    "Free 14-day trial",
    "Setup in under 5 minutes",
    "Cancel anytime"
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
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary/5 via-transparent to-vibe-secondary/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection animation="scale" delay={100}>
          <div className="max-w-4xl mx-auto text-center">
            {/* Main CTA */}
            <div className="mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 rounded-full border border-vibe-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-vibe-primary mr-2" />
                <span className="text-sm font-medium text-vibe-primary">
                  Start Your AI Development Journey Today
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your Development Process?
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Join over 2,500 development teams who've already revolutionized their workflow. 
                Experience the future of software development with AI-powered agent teams.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <EnhancedButton 
                  size="lg" 
                  onClick={handleGetStarted}
                  variant="enhanced-primary"
                  className="px-8 py-4 text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </EnhancedButton>
                <EnhancedButton variant="outline" size="lg" className="px-8 py-4 text-lg">
                  <Clock className="w-5 h-5 mr-2" />
                  Schedule Demo
                </EnhancedButton>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-vibe-flow flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing teaser */}
            <AnimatedSection animation="fade-up" delay={200}>
              <EnhancedCard className="p-8 mb-12 bg-gradient-to-br from-white to-gray-50/50">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <CreditCard className="w-5 h-5 text-vibe-primary" />
                    <span className="text-sm font-medium text-vibe-primary">Special Launch Pricing</span>
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    <span className="text-muted-foreground line-through text-2xl mr-2">$299</span>
                    <span className="text-vibe-primary">$99</span>
                    <span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Per team • Unlimited agents • All features included
                  </p>
                  <div className="inline-flex items-center px-3 py-1 bg-vibe-energy/10 rounded-full text-sm text-vibe-energy font-medium">
                    67% OFF - Limited Time
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
                    127 teams signed up in the last 7 days
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
