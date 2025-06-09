
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { ProblemSolutionCard } from "@/components/ui/problem-solution-card";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { 
  Bot, 
  MessageSquare, 
  BarChart3, 
  Zap,
  Users,
  Target,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";

export const EnhancedFeaturesSection = () => {
  const problemSolutionData = [
    {
      type: 'problem' as const,
      title: 'Development Fragmentation',
      description: 'Teams waste countless hours on coordination, context switching, and miscommunication instead of building.',
      metric: '68%',
      metricLabel: 'Time lost to overhead',
      icon: AlertTriangle
    },
    {
      type: 'solution' as const,
      title: 'Unified AI Coordination',
      description: 'AI agents handle all coordination automatically, keeping your team focused on what matters most.',
      metric: '300%',
      metricLabel: 'Faster delivery',
      icon: CheckCircle
    }
  ];

  const features = [
    {
      icon: Bot,
      title: "Intelligent Agent Teams",
      description: "AI agents that understand your codebase, collaborate on complex tasks, and deliver production-ready solutions.",
      metrics: "5x faster execution",
      color: "text-vibe-primary"
    },
    {
      icon: MessageSquare,
      title: "Seamless Communication",
      description: "Natural language coordination between agents, with real-time transparency into every decision and action.",
      metrics: "Zero miscommunication",
      color: "text-vibe-secondary"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Deep insights into team performance, bottlenecks, and optimization opportunities with actionable recommendations.",
      metrics: "90% issue prevention",
      color: "text-vibe-accent"
    },
    {
      icon: Zap,
      title: "Instant Execution",
      description: "From planning to deployment in minutes, not weeks. AI handles the complex coordination automatically.",
      metrics: "Sub-minute deployment",
      color: "text-vibe-energy"
    },
    {
      icon: Users,
      title: "Human-AI Collaboration",
      description: "Perfect balance of AI efficiency and human creativity. Stay in control while AI handles the heavy lifting.",
      metrics: "100% developer satisfaction",
      color: "text-vibe-flow"
    },
    {
      icon: Target,
      title: "Goal-Oriented Planning",
      description: "AI agents break down complex projects into manageable tasks with clear dependencies and timelines.",
      metrics: "85% on-time delivery",
      color: "text-purple-500"
    }
  ];

  return (
    <section id="features" className="py-12 md:py-24 bg-gradient-to-b from-muted/20 via-background to-muted/20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 rounded-full border border-vibe-primary/20 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-vibe-primary mr-2" />
              <span className="text-sm font-medium text-vibe-primary">Revolutionary Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
              The Future of Development is Here
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the power of AI agents that don't just assist—they collaborate, innovate, and deliver like your best team members.
            </p>
          </div>
        </AnimatedSection>

        {/* Problem/Solution Visualization */}
        <AnimatedSection animation="fade-up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {problemSolutionData.map((item, index) => (
              <ProblemSolutionCard
                key={index}
                type={item.type}
                title={item.title}
                description={item.description}
                metric={item.metric}
                metricLabel={item.metricLabel}
                icon={item.icon}
              />
            ))}
          </div>
        </AnimatedSection>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={300 + index * 100}>
              <EnhancedCard hoverEffect="lift" className="p-6 h-full group">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center border border-border/50">
                      <AnimatedIcon 
                        icon={feature.icon} 
                        size={24}
                        className={feature.color}
                        hoverAnimation="scale"
                        delay={index * 100}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <div className="text-xs text-muted-foreground font-medium">{feature.metrics}</div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-vibe-primary group-hover:text-vibe-secondary transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </EnhancedCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Performance Metrics Banner */}
        <AnimatedSection animation="fade-up" delay={800}>
          <EnhancedCard className="p-8 bg-gradient-to-r from-vibe-primary/10 via-vibe-secondary/10 to-vibe-accent/10 border-vibe-primary/20">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <TrendingUp className="w-6 h-6 text-vibe-primary" />
                <span className="text-lg font-semibold">Real Impact, Measurable Results</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-vibe-primary mb-1">300%</div>
                  <div className="text-sm text-muted-foreground">Faster Development</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-vibe-secondary mb-1">85%</div>
                  <div className="text-sm text-muted-foreground">Fewer Bugs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-vibe-accent mb-1">90%</div>
                  <div className="text-sm text-muted-foreground">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-vibe-energy mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Team Satisfaction</div>
                </div>
              </div>
            </div>
          </EnhancedCard>
        </AnimatedSection>
      </div>
    </section>
  );
};
