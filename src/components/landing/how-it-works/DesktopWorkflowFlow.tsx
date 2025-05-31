
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { WorkflowStep } from './types';

interface DesktopWorkflowFlowProps {
  steps: WorkflowStep[];
  activeStep: number;
  onStepClick: (stepId: number) => void;
}

export const DesktopWorkflowFlow = ({ steps, activeStep, onStepClick }: DesktopWorkflowFlowProps) => {
  return (
    <div className="hidden lg:block mb-16">
      <div className="relative">
        {/* Connection Lines */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-vibe-primary/20 via-vibe-primary/40 to-vibe-primary/20 transform -translate-y-1/2" />
        
        {/* Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-vibe-primary transform -translate-y-1/2 transition-all duration-1000 ease-in-out"
          style={{ 
            width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` 
          }}
        />

        {/* Steps */}
        <div className="flex justify-between items-center relative z-10">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className="flex flex-col items-center max-w-48"
            >
              {/* Step Circle */}
              <div 
                className={`w-16 h-16 rounded-full border-4 flex items-center justify-center mb-4 transition-all duration-500 cursor-pointer ${
                  activeStep >= step.id 
                    ? 'border-vibe-primary bg-vibe-primary text-white scale-110' 
                    : 'border-gray-300 bg-background text-gray-400 hover:border-vibe-primary/50'
                }`}
                onClick={() => onStepClick(step.id)}
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
  );
};
