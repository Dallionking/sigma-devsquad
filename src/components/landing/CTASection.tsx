
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { ResponsiveSection } from "@/components/layout/ResponsiveSection";
import { ResponsiveContentBlock } from "@/components/layout/ResponsiveContentBlock";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";
import { 
  ArrowRight,
  Shield,
  Globe,
  Building
} from "lucide-react";

export const CTASection = () => {
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

  const trustIndicators = [
    {
      icon: Shield,
      text: "Enterprise Security"
    },
    {
      icon: Globe,
      text: "99.9% Uptime"
    },
    {
      icon: Building,
      text: "SOC 2 Compliant"
    }
  ];

  const isMobile = screenSize === 'mobile';

  return (
    <ResponsiveSection variant="content">
      <AnimatedSection animation="scale" delay={100}>
        <ResponsiveContentBlock maxWidth="xl" spacing="lg">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
              Ready to Transform Your Development Process?
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
              Join thousands of developers already using Vibe DevSquad
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-8 lg:mb-12">
              <EnhancedButton 
                size={isMobile ? "default" : "lg"}
                onClick={handleGetStarted}
                variant="enhanced-primary"
                className="px-6 py-3 sm:px-8 text-base sm:text-lg"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </EnhancedButton>
              <EnhancedButton 
                variant="outline" 
                size={isMobile ? "default" : "lg"}
                className="px-6 py-3 sm:px-8 text-base sm:text-lg"
              >
                Schedule Demo
              </EnhancedButton>
            </div>

            <div className="pt-6 lg:pt-8 border-t">
              <ResponsiveGrid 
                cols={{ mobile: 1, tablet: 3, desktop: 3 }}
                gap="md"
                variant="stats"
              >
                {trustIndicators.map((item, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2 group hover-lift">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm sm:text-base text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </ResponsiveGrid>
            </div>
          </div>
        </ResponsiveContentBlock>
      </AnimatedSection>
    </ResponsiveSection>
  );
};
