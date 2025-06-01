
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";
import { 
  Bot, 
  MessageSquare, 
  Brain, 
  BarChart,
  Zap,
  Shield,
  Workflow,
  Code
} from "lucide-react";

export const FeaturesSection = () => {
  const { getGridCols } = useResponsiveDesign();

  const features = [
    {
      icon: Bot,
      title: "Intelligent Agent Orchestration",
      description: "Deploy specialized AI agents for development, testing, DevOps, and project management that work together seamlessly",
      color: "text-vibe-primary",
      gradient: "from-vibe-primary/10 to-vibe-primary/5"
    },
    {
      icon: MessageSquare,
      title: "Real-Time Team Communication", 
      description: "Advanced communication layer enabling agents to collaborate, share context, and coordinate complex workflows",
      color: "text-vibe-secondary",
      gradient: "from-vibe-secondary/10 to-vibe-secondary/5"
    },
    {
      icon: Brain,
      title: "AI-Powered Project Planning",
      description: "Intelligent breakdown of complex projects into manageable tasks with automatic dependency mapping and timeline optimization",
      color: "text-vibe-accent",
      gradient: "from-vibe-accent/10 to-vibe-accent/5"
    },
    {
      icon: BarChart,
      title: "Advanced Analytics Dashboard",
      description: "Comprehensive insights into team performance, bottleneck identification, and predictive project analytics",
      color: "text-vibe-flow",
      gradient: "from-vibe-flow/10 to-vibe-flow/5"
    },
    {
      icon: Workflow,
      title: "Automated Workflow Management",
      description: "Self-organizing workflows that adapt to changing requirements and optimize resource allocation dynamically",
      color: "text-vibe-energy",
      gradient: "from-vibe-energy/10 to-vibe-energy/5"
    },
    {
      icon: Code,
      title: "Code Generation & Review",
      description: "AI agents that generate, test, and review code with human-level quality and enterprise security standards",
      color: "text-purple-500",
      gradient: "from-purple-500/10 to-purple-500/5"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Deployment",
      description: "Automated CI/CD pipelines with intelligent testing and deployment strategies for maximum reliability",
      color: "text-yellow-500",
      gradient: "from-yellow-500/10 to-yellow-500/5"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access control, audit trails, and compliance monitoring built-in",
      color: "text-green-500",
      gradient: "from-green-500/10 to-green-500/5"
    }
  ];

  return (
    <section id="features" className="py-12 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-vibe-primary/10 rounded-full border border-vibe-primary/20 mb-6">
              <Zap className="w-4 h-4 text-vibe-primary mr-2" />
              <span className="text-sm font-medium text-vibe-primary">Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need for Modern Development
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From intelligent planning to automated deployment, Vibe DevSquad provides a complete toolkit 
              for building, managing, and scaling development teams with AI-powered efficiency.
            </p>
          </div>
        </AnimatedSection>

        <div className={`grid gap-6 ${getGridCols(1, 2, 4)} stagger-animation`}>
          {features.map((feature, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-up" 
              delay={index * 100}
            >
              <EnhancedCard hoverEffect="lift" className={`p-6 h-full bg-gradient-to-br ${feature.gradient} border-0`}>
                <CardContent className="p-0">
                  <div className={`w-12 h-12 bg-gradient-to-br from-white to-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                    <feature.icon className={`w-6 h-6 ${feature.color} feature-icon transition-transform`} />
                  </div>
                  <h3 className="font-semibold mb-3 text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </EnhancedCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Feature highlights */}
        <AnimatedSection animation="fade-up" delay={800}>
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-vibe-primary">10x</div>
                <div className="text-sm text-muted-foreground">Faster Development Cycles</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-vibe-secondary">95%</div>
                <div className="text-sm text-muted-foreground">Reduction in Manual Tasks</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-vibe-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Continuous Monitoring</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
