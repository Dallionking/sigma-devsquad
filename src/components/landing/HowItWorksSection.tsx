
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";
import { 
  Users, 
  Zap, 
  Eye,
  ArrowDown,
  CheckCircle
} from "lucide-react";

export const HowItWorksSection = () => {
  const { getGridCols } = useResponsiveDesign();

  const steps = [
    {
      title: "Define Your Team Structure",
      description: "Create specialized AI agents with defined roles, capabilities, and objectives. Choose from our extensive library of pre-configured agent templates or build custom agents tailored to your specific needs.",
      icon: Users,
      details: [
        "Choose from 50+ pre-built agent templates",
        "Define custom roles and responsibilities",
        "Set capability boundaries and permissions",
        "Configure communication protocols"
      ]
    },
    {
      title: "Configure Smart Workflows", 
      description: "Set up intelligent communication patterns, task dependencies, and automated workflows. Our AI engine learns from your team's patterns to optimize collaboration and resource allocation.",
      icon: Zap,
      details: [
        "Drag-and-drop workflow designer",
        "Automatic dependency mapping",
        "Smart task prioritization",
        "Real-time workflow optimization"
      ]
    },
    {
      title: "Launch & Monitor Progress",
      description: "Deploy your AI team and track progress through comprehensive dashboards. Get real-time insights, performance analytics, and intelligent recommendations for continuous improvement.",
      icon: Eye,
      details: [
        "Real-time performance monitoring",
        "Predictive analytics and insights",
        "Automated progress reporting",
        "Intelligent optimization suggestions"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-vibe-secondary/10 rounded-full border border-vibe-secondary/20 mb-6">
              <Zap className="w-4 h-4 text-vibe-secondary mr-2" />
              <span className="text-sm font-medium text-vibe-secondary">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Get Started in Three Simple Steps
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From setup to deployment, our streamlined process gets your AI development team 
              up and running in minutes, not hours.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <AnimatedSection 
                animation="fade-up" 
                delay={index * 200}
                className="mb-12 last:mb-0"
              >
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  {/* Step indicator */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-vibe-primary to-vibe-secondary rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg">
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-px h-20 bg-gradient-to-b from-vibe-primary/30 to-vibe-secondary/30 hidden lg:block" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <EnhancedCard hoverEffect="lift" className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-vibe-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-6 h-6 text-vibe-primary" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                            {step.description}
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-vibe-flow flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </EnhancedCard>
                  </div>
                </div>
              </AnimatedSection>

              {/* Arrow connector for mobile */}
              {index < steps.length - 1 && (
                <div className="flex justify-center lg:hidden mb-8">
                  <ArrowDown className="w-6 h-6 text-vibe-primary/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection animation="fade-up" delay={600}>
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-4">
              Ready to transform your development process?
            </p>
            <div className="text-sm text-muted-foreground">
              Average setup time: <span className="font-semibold text-vibe-primary">5 minutes</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
