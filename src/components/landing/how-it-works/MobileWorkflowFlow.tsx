
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WorkflowStep } from './types';

interface MobileWorkflowFlowProps {
  steps: WorkflowStep[];
  activeStep: number;
  visibleSteps: Set<number>;
}

export const MobileWorkflowFlow = ({ steps, activeStep, visibleSteps }: MobileWorkflowFlowProps) => {
  return (
    <div className="lg:hidden space-y-6 mb-16">
      {steps.map((step, index) => (
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
          {index < steps.length - 1 && (
            <div className="flex justify-center py-4">
              <ArrowRight className="w-6 h-6 text-vibe-primary/40" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
