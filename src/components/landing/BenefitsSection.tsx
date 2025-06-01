
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";
import { 
  Check,
  Star,
  TrendingUp,
  Clock,
  Target,
  Users,
  Zap,
  Shield
} from "lucide-react";

export const BenefitsSection = () => {
  const { getGridCols } = useResponsiveDesign();

  const keyBenefits = [
    {
      icon: TrendingUp,
      title: "300% Faster Development",
      description: "Reduce development time dramatically with AI-powered automation and intelligent task distribution",
      color: "text-green-500"
    },
    {
      icon: Clock,
      title: "24/7 Continuous Progress",
      description: "AI agents work around the clock, ensuring your projects never stop moving forward",
      color: "text-blue-500"
    },
    {
      icon: Target,
      title: "99.5% Accuracy in Planning",
      description: "AI-powered project estimation and resource allocation with unprecedented precision",
      color: "text-purple-500"
    },
    {
      icon: Users,
      title: "Seamless Team Integration",
      description: "Perfect harmony between human developers and AI agents for optimal collaboration",
      color: "text-orange-500"
    },
    {
      icon: Zap,
      title: "Instant Problem Resolution",
      description: "Automated debugging, testing, and issue resolution before they impact your timeline",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Built-in security protocols and compliance monitoring for peace of mind",
      color: "text-red-500"
    }
  ];

  const testimonials = [
    {
      content: "Vibe DevSquad completely transformed our development process. We're shipping features 10x faster than before, and our code quality has never been better. The AI agents feel like having senior developers working 24/7.",
      author: "Sarah Chen",
      role: "VP of Engineering, TechCorp",
      avatar: "SC",
      company: "Series B Startup",
      rating: 5
    },
    {
      content: "The AI-powered planning is incredible. What used to take our team weeks to plan and coordinate now happens in hours. Our delivery predictability went from 60% to 95%.",
      author: "Marcus Rodriguez", 
      role: "CTO, InnovateLab",
      avatar: "MR",
      company: "Fortune 500",
      rating: 5
    },
    {
      content: "As a solo developer, Vibe DevSquad gave me the capability of an entire development team. I've launched 3 successful products this year that would have taken me 3 years without it.",
      author: "Alex Kim",
      role: "Founder & Solo Developer",
      avatar: "AK",
      company: "Indie Hacker",
      rating: 5
    }
  ];

  return (
    <section id="benefits" className="py-12 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-vibe-accent/10 rounded-full border border-vibe-accent/20 mb-6">
              <Star className="w-4 h-4 text-vibe-accent mr-2" />
              <span className="text-sm font-medium text-vibe-accent">Proven Results</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Why Teams Choose Vibe DevSquad
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join over 2,500 development teams who've revolutionized their workflow and 
              achieved unprecedented productivity with AI-powered development.
            </p>
          </div>
        </AnimatedSection>

        {/* Key Benefits Grid */}
        <div className={`grid gap-6 mb-16 ${getGridCols(1, 2, 3)}`}>
          {keyBenefits.map((benefit, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-up" 
              delay={200 + index * 50}
            >
              <EnhancedCard hoverEffect="lift" className="p-6 h-full">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-white to-gray-50 shadow-sm`}>
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-lg">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </EnhancedCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Testimonials Section */}
        <AnimatedSection animation="fade-up" delay={400}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="text-lg text-muted-foreground">
              Hear what development teams are saying about their transformation
            </p>
          </div>
        </AnimatedSection>

        <div className={`grid gap-8 ${getGridCols(1, 1, 3)}`}>
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-up" 
              delay={500 + index * 150}
            >
              <EnhancedCard hoverEffect="glow" className="p-8 h-full">
                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-vibe-energy text-vibe-energy" />
                    ))}
                  </div>

                  {/* Testimonial */}
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4 pt-4 border-t">
                    <div className="w-12 h-12 bg-gradient-to-br from-vibe-primary to-vibe-secondary rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-vibe-primary font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </EnhancedCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Social Proof */}
        <AnimatedSection animation="fade-up" delay={800}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-6 p-6 bg-white/50 rounded-2xl border">
              <div className="text-center">
                <div className="text-2xl font-bold text-vibe-primary">98%</div>
                <div className="text-xs text-muted-foreground">Customer Satisfaction</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-vibe-secondary">4.9/5</div>
                <div className="text-xs text-muted-foreground">Average Rating</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-vibe-accent">85%</div>
                <div className="text-xs text-muted-foreground">Recommend to Others</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
