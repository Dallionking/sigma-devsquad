
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";
import { 
  Check,
  Star
} from "lucide-react";

export const BenefitsSection = () => {
  const { getGridCols } = useResponsiveDesign();

  const benefits = [
    "Reduce development time by 60%",
    "Automate repetitive tasks", 
    "Focus on high-value work",
    "Seamless collaboration",
    "Clear task visibility",
    "Intelligent resource allocation"
  ];

  const testimonials = [
    {
      content: "Vibe DevSquad completely transformed our development process. We're shipping features 3x faster than before.",
      author: "Sarah Chen",
      role: "Lead Developer, TechCorp",
      avatar: "SC"
    },
    {
      content: "The AI-powered planning is incredible. Our team coordination has never been better.",
      author: "Marcus Rodriguez", 
      role: "Project Manager, StartupXYZ",
      avatar: "MR"
    }
  ];

  return (
    <section id="benefits" className="py-12 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-12 items-center ${getGridCols(1, 1, 2)}`}>
          <AnimatedSection animation="slide-left" delay={100}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Vibe DevSquad?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers already transforming their workflow
              </p>
              
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <AnimatedSection 
                    key={index} 
                    animation="fade-up" 
                    delay={200 + index * 50}
                  >
                    <div className="flex items-center space-x-3 group hover-lift">
                      <div className="w-6 h-6 bg-vibe-flow rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-right" delay={200}>
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <EnhancedCard key={index} hoverEffect="glow" className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-vibe-energy text-vibe-energy" />
                      ))}
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-vibe-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </EnhancedCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
