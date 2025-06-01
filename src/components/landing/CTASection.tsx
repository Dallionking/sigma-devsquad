
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedButton } from "@/components/ui/enhanced-button";
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection animation="scale" delay={100}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Development Process?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers already using Vibe DevSquad
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton 
                size="lg" 
                onClick={handleGetStarted}
                variant="enhanced-primary"
                className="px-8 py-3"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </EnhancedButton>
              <EnhancedButton variant="outline" size="lg" className="px-8 py-3">
                Schedule Demo
              </EnhancedButton>
            </div>

            <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t">
              <div className="flex items-center space-x-2 group hover-lift">
                <Shield className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2 group hover-lift">
                <Globe className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground">99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2 group hover-lift">
                <Building className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground">SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
