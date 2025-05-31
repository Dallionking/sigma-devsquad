
import React from 'react';
import { WorkflowStep } from './types';

interface WorkflowControlsProps {
  steps: WorkflowStep[];
  activeStep: number;
  onStepClick: (stepId: number) => void;
}

export const WorkflowControls = ({ steps, activeStep, onStepClick }: WorkflowControlsProps) => {
  return (
    <div className="text-center mb-12 fade-in-up stagger-3">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
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
  );
};
