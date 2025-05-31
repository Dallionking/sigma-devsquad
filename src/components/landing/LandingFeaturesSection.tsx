
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Zap, 
  Monitor, 
  Settings, 
  FileCode, 
  FileText, 
  Shield, 
  Database, 
  Cloud,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Feature {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  details: string[];
  color: string;
  gradient: string;
}

const features: Feature[] = [
  {
    id: 'hierarchical-structure',
    title: 'Hierarchical Agent Team Structure',
    icon: Users,
    description: 'Orchestrated development with specialized agents that mirror professional development organizations.',
    details: [
      'Planning Agent (CEO) orchestrates and aligns development efforts',
      'Specialized Frontend, Backend, DevOps, and QA agents ensure precision',
      'Team-based context sharing eliminates fragmented information',
      'Collaboration patterns that mirror professional development organizations'
    ],
    color: 'text-blue-600',
    gradient: 'from-blue-500/10 to-blue-600/10'
  },
  {
    id: 'communication-hub',
    title: 'Advanced Communication Hub',
    icon: MessageSquare,
    description: 'Visualize and optimize real-time communication flows with comprehensive external integrations.',
    details: [
      'Visualize real-time communication and agent interaction flows',
      'Track communication metrics and instantly analyze message effectiveness',
      'Seamless external integrations with Discord and Telegram for notifications',
      'Interactive Team Communication Flow visualization'
    ],
    color: 'text-purple-600',
    gradient: 'from-purple-500/10 to-purple-600/10'
  },
  {
    id: 'task-management',
    title: 'Intelligent Task Management',
    icon: Zap,
    description: 'Automated task breakdown with real-time progress tracking and dynamic resource allocation.',
    details: [
      'Automated task breakdown from high-level objectives',
      'Real-time progress tracking and dynamic task assignment',
      'Visual bottleneck analysis to proactively address delays',
      'Dynamic resource allocation based on project needs'
    ],
    color: 'text-green-600',
    gradient: 'from-green-500/10 to-green-600/10'
  },
  {
    id: 'comprehensive-dashboard',
    title: 'Comprehensive Dashboard',
    icon: Monitor,
    description: 'Real-time insights with customizable views and project health indicators at a glance.',
    details: [
      'Real-time insights into team performance and resource utilization',
      'Customizable views tailored to your priorities',
      'Project health indicators at a glance',
      'Team performance metrics and agent status monitoring'
    ],
    color: 'text-cyan-600',
    gradient: 'from-cyan-500/10 to-cyan-600/10'
  },
  {
    id: 'llm-integration',
    title: 'Customizable LLM Integration',
    icon: Settings,
    description: 'Model customization and intelligent cost management with role-based parameter optimization.',
    details: [
      'Model customization and assignment based on agent specialization',
      'Optimize performance and manage costs with intelligent model usage',
      'Parameter customization for different agent roles and tasks',
      'Cost management to optimize LLM usage'
    ],
    color: 'text-orange-600',
    gradient: 'from-orange-500/10 to-orange-600/10'
  },
  {
    id: 'tool-integration',
    title: 'Enterprise Tool Integration',
    icon: FileCode,
    description: 'Direct integration with IDEs, Git workflows, and enterprise systems through flexible APIs.',
    details: [
      'Direct integration with IDEs, Git workflows, CI/CD, and project management tools',
      'Flexible APIs for connecting enterprise-specific systems',
      'Seamless connection with existing development tools and environments',
      'Integration with version control systems and development pipelines'
    ],
    color: 'text-indigo-600',
    gradient: 'from-indigo-500/10 to-indigo-600/10'
  },
  {
    id: 'knowledge-management',
    title: 'Knowledge Management System',
    icon: FileText,
    description: 'Centralized documentation with context preservation and continuous learning capabilities.',
    details: [
      'Centralized, automatically generated documentation',
      'Context preservation and seamless knowledge transfer across teams',
      'Unified knowledge base accessible to all agents with perfect recall',
      'Continuous learning from project experiences and outcomes'
    ],
    color: 'text-emerald-600',
    gradient: 'from-emerald-500/10 to-emerald-600/10'
  },
  {
    id: 'state-management',
    title: 'Robust State Management',
    icon: Database,
    description: 'Real-time collaboration with persistent state and optimized cross-component communication.',
    details: [
      'Real-time collaboration and persistent state maintenance',
      'Optimized cross-component communication',
      'Consistent data access across all components and agents',
      'Data persistence across sessions and system restarts'
    ],
    color: 'text-violet-600',
    gradient: 'from-violet-500/10 to-violet-600/10'
  },
  {
    id: 'enterprise-security',
    title: 'Enterprise-Grade Security',
    icon: Shield,
    description: 'Role-based access with encrypted communications and comprehensive audit logging.',
    details: [
      'Role-based access, secure encrypted communications, and comprehensive audit logs',
      'Regulatory compliance built-in',
      'Comprehensive audit logging for compliance and security',
      'Secure handling of sensitive project information'
    ],
    color: 'text-red-600',
    gradient: 'from-red-500/10 to-red-600/10'
  },
  {
    id: 'deployment-flexibility',
    title: 'Deployment Flexibility',
    icon: Cloud,
    description: 'Choose on-premise, cloud-based, or hybrid deployments with Docker containerization.',
    details: [
      'Choose on-premise, cloud-based, or hybrid deployments',
      'Docker-based containerization for consistent deployment and scaling',
      'Local installation for individual developers',
      'Cloud-based SaaS for accessibility and scalability'
    ],
    color: 'text-sky-600',
    gradient: 'from-sky-500/10 to-sky-600/10'
  }
];

export const LandingFeaturesSection = () => {
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());
  const [visibleFeatures, setVisibleFeatures] = useState<Set<string>>(new Set());

  const toggleFeature = (featureId: string) => {
    const newExpanded = new Set(expandedFeatures);
    if (newExpanded.has(featureId)) {
      newExpanded.delete(featureId);
    } else {
      newExpanded.add(featureId);
    }
    setExpandedFeatures(newExpanded);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const featureId = entry.target.getAttribute('data-feature-id');
          if (featureId) {
            setVisibleFeatures(prev => new Set([...prev, featureId]));
          }
        }
      });
    }, observerOptions);

    const featureElements = document.querySelectorAll('[data-feature-id]');
    featureElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Background Enhancement */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary/3 via-transparent to-vibe-secondary/3" />
      </div>

      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full">
            <Zap className="w-4 h-4 text-vibe-primary" />
            <span className="text-sm font-medium text-vibe-primary">
              Key Features
            </span>
          </div>

          <h2 className="section-heading mb-6 text-foreground">
            Powering <span className="vibe-gradient-text">Seamless Collaboration</span>
          </h2>
          
          <p className="vibe-body-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the future of development with our comprehensive suite of AI-powered tools 
            designed to streamline workflows and enhance team productivity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              data-feature-id={feature.id}
              className={`group relative overflow-hidden border-0 bg-gradient-to-br ${feature.gradient} 
                         backdrop-blur-sm hover:shadow-xl transition-all duration-500 cursor-pointer
                         ${visibleFeatures.has(feature.id) 
                           ? 'opacity-100 translate-y-0' 
                           : 'opacity-0 translate-y-8'
                         }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                boxShadow: '0 4px 20px -2px rgba(99, 102, 241, 0.1)'
              }}
              onClick={() => toggleFeature(feature.id)}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary/5 to-vibe-secondary/5 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardContent className="p-6 relative z-10">
                {/* Feature Icon */}
                <div className={`w-12 h-12 rounded-xl bg-background/80 border border-current/20 
                               flex items-center justify-center mb-4 group-hover:scale-110 
                               transition-transform duration-300 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>

                {/* Feature Title */}
                <h3 className="vibe-heading-md text-foreground mb-3 group-hover:text-vibe-primary 
                             transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="vibe-body text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Expand/Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between p-3 h-auto bg-background/50 
                           hover:bg-background/80 border border-border/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFeature(feature.id);
                  }}
                >
                  <span className="text-sm font-medium">
                    {expandedFeatures.has(feature.id) ? 'Show Less' : 'Learn More'}
                  </span>
                  {expandedFeatures.has(feature.id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>

                {/* Expandable Details */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedFeatures.has(feature.id) 
                    ? 'max-h-96 opacity-100 mt-4' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-4 border-t border-border/20">
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${feature.color.replace('text-', 'bg-')}`} />
                          <span className="vibe-body-sm text-muted-foreground leading-relaxed">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>

              {/* Feature Number Badge */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-vibe-primary/10 
                            border border-vibe-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-vibe-primary">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in-up stagger-4">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 
                        border border-vibe-primary/20 max-w-2xl mx-auto">
            <h3 className="vibe-heading-md text-foreground mb-4">
              Ready to Transform Your Development Workflow?
            </h3>
            <p className="vibe-body text-muted-foreground mb-6">
              Join thousands of developers who have already revolutionized their productivity 
              with Vibe DevSquad's intelligent agent-based development platform.
            </p>
            <Button 
              className="cta-button-lg vibe-btn-primary group"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Free Trial
              <Zap className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-vibe-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-vibe-secondary/5 rounded-full blur-3xl" />
    </section>
  );
};
