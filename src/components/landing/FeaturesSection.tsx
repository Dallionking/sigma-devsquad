
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
      description: "Deploy specialized AI agents for development, testing, DevOps, and project management that work together seamlessly with human-level coordination patterns",
      color: "text-vibe-primary",
      gradient: "from-vibe-primary/10 to-vibe-primary/5",
      bgGradient: "from-vibe-primary/5 to-transparent"
    },
    {
      icon: MessageSquare,
      title: "Real-Time Team Communication", 
      description: "Advanced communication layer enabling agents to collaborate, share context, and coordinate complex workflows with zero communication overhead",
      color: "text-vibe-secondary",
      gradient: "from-vibe-secondary/10 to-vibe-secondary/5",
      bgGradient: "from-vibe-secondary/5 to-transparent"
    },
    {
      icon: Brain,
      title: "AI-Powered Project Planning",
      description: "Intelligent breakdown of complex projects into manageable tasks with automatic dependency mapping, timeline optimization, and risk assessment",
      color: "text-vibe-accent",
      gradient: "from-vibe-accent/10 to-vibe-accent/5",
      bgGradient: "from-vibe-accent/5 to-transparent"
    },
    {
      icon: BarChart,
      title: "Advanced Analytics Dashboard",
      description: "Comprehensive insights into team performance, bottleneck identification, and predictive project analytics with real-time optimization suggestions",
      color: "text-vibe-flow",
      gradient: "from-vibe-flow/10 to-vibe-flow/5",
      bgGradient: "from-vibe-flow/5 to-transparent"
    },
    {
      icon: Workflow,
      title: "Automated Workflow Management",
      description: "Self-organizing workflows that adapt to changing requirements and optimize resource allocation dynamically based on team patterns and project demands",
      color: "text-vibe-energy",
      gradient: "from-vibe-energy/10 to-vibe-energy/5",
      bgGradient: "from-vibe-energy/5 to-transparent"
    },
    {
      icon: Code,
      title: "Code Generation & Review",
      description: "AI agents that generate, test, and review code with human-level quality and enterprise security standards, including automated documentation",
      color: "text-purple-500",
      gradient: "from-purple-500/10 to-purple-500/5",
      bgGradient: "from-purple-500/5 to-transparent"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Deployment",
      description: "Automated CI/CD pipelines with intelligent testing and deployment strategies for maximum reliability and zero-downtime deployments",
      color: "text-yellow-500",
      gradient: "from-yellow-500/10 to-yellow-500/5",
      bgGradient: "from-yellow-500/5 to-transparent"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access control, audit trails, compliance monitoring, and automated security scanning built-in",
      color: "text-green-500",
      gradient: "from-green-500/10 to-green-500/5",
      bgGradient: "from-green-500/5 to-transparent"
    }
  ];

  return (
    <section id="features" className="py-12 md:py-24 bg-gradient-to-b from-muted/30 via-muted/20 to-transparent relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 rounded-full border border-vibe-primary/20 mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-vibe-primary mr-2" />
              <span className="text-sm font-medium text-vibe-primary">Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
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
              delay={200 + index * 100}
            >
              <EnhancedCard 
                hoverEffect="lift" 
                className={`p-6 h-full bg-gradient-to-br ${feature.gradient} border border-border/50 backdrop-blur-sm hover:border-${feature.color.split('-')[1]}-200/50 transition-all duration-300`}
              >
                <CardContent className="p-0">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.bgGradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-sm border border-white/20`}>
                    <feature.icon className={`w-7 h-7 ${feature.color} feature-icon transition-all duration-300 group-hover:rotate-6`} />
                  </div>
                  <h3 className="font-semibold mb-3 text-lg leading-tight">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </EnhancedCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Enhanced feature highlights with visual improvements */}
        <AnimatedSection animation="fade-up" delay={800}>
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-2 group hover-lift">
                <div className="text-4xl font-bold bg-gradient-to-r from-vibe-primary to-vibe-secondary bg-clip-text text-transparent">10x</div>
                <div className="text-sm text-muted-foreground">Faster Development Cycles</div>
                <div className="w-12 h-1 bg-gradient-to-r from-vibe-primary to-vibe-secondary rounded-full mx-auto opacity-50 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="space-y-2 group hover-lift">
                <div className="text-4xl font-bold bg-gradient-to-r from-vibe-secondary to-vibe-accent bg-clip-text text-transparent">95%</div>
                <div className="text-sm text-muted-foreground">Reduction in Manual Tasks</div>
                <div className="w-12 h-1 bg-gradient-to-r from-vibe-secondary to-vibe-accent rounded-full mx-auto opacity-50 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="space-y-2 group hover-lift">
                <div className="text-4xl font-bold bg-gradient-to-r from-vibe-accent to-vibe-flow bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-muted-foreground">Continuous Monitoring</div>
                <div className="w-12 h-1 bg-gradient-to-r from-vibe-accent to-vibe-flow rounded-full mx-auto opacity-50 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
