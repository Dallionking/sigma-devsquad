import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Check, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepData {
  id: string;
  title: string;
  description?: string;
  content?: React.ReactNode;
}

interface StepIndicatorProps {
  steps?: StepData[];
  currentStep?: number;
  completedSteps?: number[];
  errorSteps?: number[];
  loadingSteps?: number[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'compact' | 'detailed';
  onStepClick?: (stepIndex: number) => void;
  allowClickNavigation?: boolean;
  showStepContent?: boolean;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps = [
    { id: '1', title: 'Account Setup', description: 'Create your account and verify email' },
    { id: '2', title: 'Profile Information', description: 'Add your personal details' },
    { id: '3', title: 'Preferences', description: 'Customize your experience' },
    { id: '4', title: 'Verification', description: 'Complete identity verification' },
    { id: '5', title: 'Complete', description: 'Welcome to the platform!' }
  ],
  currentStep = 2,
  completedSteps = [0],
  errorSteps = [],
  loadingSteps = [],
  orientation = 'horizontal',
  variant = 'default',
  onStepClick,
  allowClickNavigation = true,
  showStepContent = false,
  className
}) => {
  const [focusedStep, setFocusedStep] = useState<number | null>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, steps.length);
  }, [steps.length]);

  const handleStepClick = (index: number) => {
    if (allowClickNavigation && onStepClick) {
      onStepClick(index);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!allowClickNavigation) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = Math.min(index + 1, steps.length - 1);
        stepRefs.current[nextIndex]?.focus();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = Math.max(index - 1, 0);
        stepRefs.current[prevIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        stepRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        stepRefs.current[steps.length - 1]?.focus();
        break;
    }
  };

  const getStepStatus = (index: number) => {
    if (errorSteps.includes(index)) return 'error';
    if (loadingSteps.includes(index)) return 'loading';
    if (completedSteps.includes(index)) return 'completed';
    if (index === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (status: string, index: number) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4" />;
      case 'loading':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <span className="text-sm font-medium">{index + 1}</span>;
    }
  };

  const getStepStyles = (status: string, isFocused: boolean) => {
    const baseStyles = "relative flex items-center justify-center transition-all duration-200";
    const sizeStyles = variant === 'compact' ? 'w-8 h-8' : 'w-10 h-10';
    
    const statusStyles = {
      completed: 'bg-primary text-primary-foreground',
      current: 'bg-primary text-primary-foreground ring-4 ring-primary/20',
      upcoming: 'bg-muted text-muted-foreground',
      error: 'bg-destructive text-destructive-foreground',
      loading: 'bg-muted text-muted-foreground'
    };

    const focusStyles = isFocused ? 'ring-2 ring-offset-2 ring-primary' : '';
    
    return cn(baseStyles, sizeStyles, statusStyles[status], focusStyles, 'rounded-full');
  };

  const renderConnector = (index: number) => {
    if (index === steps.length - 1) return null;
    
    const isCompleted = completedSteps.includes(index);
    const baseStyles = orientation === 'horizontal' 
      ? 'h-0.5 flex-1 mx-2' 
      : 'w-0.5 h-16 mx-auto mt-2 mb-2';
    
    return (
      <div
        className={cn(
          baseStyles,
          'transition-colors duration-200',
          isCompleted ? 'bg-primary' : 'bg-muted'
        )}
        aria-hidden="true"
      />
    );
  };

  const containerStyles = cn(
    'flex',
    orientation === 'horizontal' ? 'items-center' : 'flex-col',
    className
  );

  const stepContainerStyles = cn(
    'flex items-center',
    orientation === 'horizontal' ? 'flex-1' : 'flex-col'
  );

  return (
    <div className={containerStyles} role="group" aria-label="Progress steps">
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isFocused = focusedStep === index;
        const isClickable = allowClickNavigation && onStepClick;
        
        return (
          <div key={step.id} className={stepContainerStyles}>
            <div className={cn(
              'flex items-center',
              orientation === 'vertical' && 'flex-col'
            )}>
              <button
                ref={el => stepRefs.current[index] = el}
                className={cn(
                  getStepStyles(status, isFocused),
                  isClickable && 'cursor-pointer hover:scale-105',
                  !isClickable && 'cursor-default'
                )}
                onClick={() => handleStepClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setFocusedStep(index)}
                onBlur={() => setFocusedStep(null)}
                disabled={!isClickable}
                role="button"
                aria-label={`Step ${index + 1}: ${step.title}`}
                aria-current={index === currentStep ? 'step' : undefined}
                aria-disabled={!isClickable}
                tabIndex={isClickable ? 0 : -1}
              >
                {getStepIcon(status, index)}
              </button>
              
              {variant !== 'compact' && (
                <div className={cn(
                  'mt-2',
                  orientation === 'horizontal' ? 'absolute top-full whitespace-nowrap' : 'text-center',
                  orientation === 'vertical' && 'ml-0'
                )}>
                  <p className={cn(
                    'text-sm font-medium',
                    status === 'current' ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {step.title}
                  </p>
                  {variant === 'detailed' && step.description && (
                    <p className="text-xs text-muted-foreground mt-1 max-w-[150px]">
                      {step.description}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            {renderConnector(index)}
          </div>
        );
      })}
      
      {showStepContent && steps[currentStep]?.content && (
        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          {steps[currentStep].content}
        </div>
      )}
    </div>
  );
};
