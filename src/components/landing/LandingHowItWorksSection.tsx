
import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Bot, 
  Monitor, 
  Shield, 
  Rocket,
  ArrowRight,
  CheckCircle,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Set Your Goals",
    description: "Define project objectives clearly",
    icon: Target,
    color: "text-blue-600",
    gradient: "from-blue-500/10 to-blue-600/10"
  },
  {
    id: 2,
    title: "AI Delegates Tasks", 
    description: "Vibe DevSquad intelligently assigns tasks across agents",
    icon: Bot,
    color: "text-purple-600",
    gradient: "from-purple-500/10 to-purple-600/10"
  },
  {
    id: 3,
    title: "Real-Time Execution",
    description: "Monitor progress with intuitive dashboards",
    icon: Monitor,
    color: "text-green-600", 
    gradient: "from-green-500/10 to-green-600/10"
  },
  {
    id: 4,
    title: "Continuous Quality",
    description: "QA agents validate work against requirements throughout",
    icon: Shield,
    color: "text-orange-600",
    gradient: "from-orange-500/10 to-orange-600/10"
  },
  {
    id: 5,
    title: "Delivery & Iteration",
    description: "Completed work integrates through existing pipelines",
    icon: Rocket,
    color: "text-cyan-600",
    gradient: "from-cyan-500/10 to-cyan-600/10"
  }
];

export const LandingHowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev % workflowSteps.length) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = entry.target.getAttribute('data-step-id');
          if (stepId) {
            setVisibleSteps(prev => new Set([...prev, parseInt(stepId)]));
          }
        }
      });
    }, observerOptions);

    const stepElements = document.querySelectorAll('[data-step-id]');
    stepElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Background Enhancement */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary/3 via-transparent to-vibe-secondary/3" />
      </div>

      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full">
            <Play className="w-4 h-4 text-vibe-primary" />
            <span className="text-sm font-medium text-vibe-primary">
              How It Works
            </span>
          </div>

          <h2 className="section-heading mb-6 text-foreground">
            <span className="vibe-gradient-text">Seamless Orchestration</span>
          </h2>
          
          <p className="vibe-body-lg text-muted-foreground max-w-3xl mx-auto">
            Experience a streamlined development workflow that intelligently coordinates every aspect 
            of your project from planning to delivery.
          </p>
        </div>

        {/* Desktop: Horizontal Flow */}
        <div className="hidden lg:block mb-16">
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-vibe-primary/20 via-vibe-primary/40 to-vibe-primary/20 transform -translate-y-1/2" />
            
            {/* Progress Line */}
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-vibe-primary transform -translate-y-1/2 transition-all duration-1000 ease-in-out"
              style={{ 
                width: `${((activeStep - 1) / (workflowSteps.length - 1)) * 100}%` 
              }}
            />

            {/* Steps */}
            <div className="flex justify-between items-center relative z-10">
              {workflowSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className="flex flex-col items-center max-w-48"
                  data-step-id={step.id}
                >
                  {/* Step Circle */}
                  <div 
                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center mb-4 transition-all duration-500 cursor-pointer ${
                      activeStep >= step.id 
                        ? 'border-vibe-primary bg-vibe-primary text-white scale-110' 
                        : 'border-gray-300 bg-background text-gray-400 hover:border-vibe-primary/50'
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    {activeStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    <div className="text-sm font-bold text-vibe-primary mb-2">
                      Step {step.id}
                    </div>
                    <h3 className="vibe-heading-sm text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="vibe-body-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile & Tablet: Vertical Flow */}
        <div className="lg:hidden space-y-6 mb-16">
          {workflowSteps.map((step, index) => (
            <div 
              key={step.id}
              data-step-id={step.id}
              className={`relative transition-all duration-700 ${
                visibleSteps.has(step.id) 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className={`overflow-hidden border-0 bg-gradient-to-br ${step.gradient} backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Step Icon & Number */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl bg-background/80 border border-current/20 flex items-center justify-center mb-2 ${step.color}`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-bold text-vibe-primary">
                          {step.id.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <h3 className="vibe-heading-md text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="vibe-body text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Active Indicator */}
                    {activeStep === step.id && (
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-vibe-primary animate-pulse" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Connection Arrow (not for last item) */}
              {index < workflowSteps.length - 1 && (
                <div className="flex justify-center py-4">
                  <ArrowRight className="w-6 h-6 text-vibe-primary/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Controls */}
        <div className="text-center mb-12 fade-in-up stagger-3">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {workflowSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeStep === step.id
                    ? 'bg-vibe-primary text-white shadow-lg'
                    : 'bg-background border border-border text-muted-foreground hover:border-vibe-primary/50 hover:text-vibe-primary'
                }`}
              >
                {step.id}. {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center fade-in-up stagger-4">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 border border-vibe-primary/20 max-w-2xl mx-auto">
            <h3 className="vibe-heading-md text-foreground mb-4">
              Ready to Experience Seamless Development?
            </h3>
            <p className="vibe-body text-muted-foreground mb-6">
              Join the revolution in AI-powered development orchestration and transform 
              how your team builds software.
            </p>
            <Button 
              className="cta-button-lg vibe-btn-primary group"
              onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-vibe-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-vibe-secondary/5 rounded-full blur-3xl" />
    </section>
  );
};
