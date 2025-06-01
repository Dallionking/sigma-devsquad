
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { SectionContainer } from "@/components/layout/AdvancedResponsiveContainer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowRight,
  Shield,
  Globe,
  Building
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

  return (
    <section className="py-12 md:py-24">
      <SectionContainer>
        <AnimatedSection animation="scale" delay={100}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-fluid-3xl font-bold mb-6">
              Ready to Transform Your Development Process?
            </h2>
            <p className="text-fluid-lg text-muted-foreground mb-8">
              Join thousands of developers already using Vibe DevSquad
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <EnhancedButton 
                size="lg" 
                onClick={handleGetStarted}
                variant="enhanced-primary"
                className="touch-target-enhanced px-8 py-3 text-fluid-base"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </EnhancedButton>
              <EnhancedButton 
                variant="outline" 
                size="lg" 
                className="touch-target-enhanced px-8 py-3 text-fluid-base"
              >
                Schedule Demo
              </EnhancedButton>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t">
              <div className="flex items-center space-x-2 group hover-lift">
                <Shield className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                <span className="text-fluid-sm text-muted-foreground">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2 group hover-lift">
                <Globe className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                <span className="text-fluid-sm text-muted-foreground">99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2 group hover-lift">
                <Building className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                <span className="text-fluid-sm text-muted-foreground">SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </SectionContainer>
    </section>
  );
};
