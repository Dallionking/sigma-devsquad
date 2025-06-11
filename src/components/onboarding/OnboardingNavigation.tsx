import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, SkipForward, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useOnboardingContext } from './OnboardingContainer';

interface OnboardingNavigationProps {
  onComplete?: () => void;
  className?: string;
  showSkip?: boolean;
  nextButtonText?: string;
  previousButtonText?: string;
  completeButtonText?: string;
  skipButtonText?: string;
}

export function OnboardingNavigation({
  onComplete,
  className,
  showSkip = true,
  nextButtonText = 'Next',
  previousButtonText = 'Previous',
  completeButtonText = 'Complete',
  skipButtonText = 'Skip',
}: OnboardingNavigationProps) {
  const {
    steps,
    currentStepIndex,
    nextStep,
    previousStep,
    skipStep,
    isFirstStep,
    isLastStep,
    canGoNext,
    canGoPrevious,
  } = useOnboardingContext();

  const currentStep = steps[currentStepIndex];
  const canSkip = showSkip && currentStep?.canSkip && !isLastStep;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent navigation when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
          if (canGoNext || isLastStep) {
            e.preventDefault();
            if (isLastStep) {
              onComplete?.();
            } else {
              nextStep();
            }
          }
          break;
        case 'ArrowLeft':
          if (canGoPrevious) {
            e.preventDefault();
            previousStep();
          }
          break;
        case 'Escape':
          if (canSkip) {
            e.preventDefault();
            skipStep();
          }
          break;
        case 'Enter':
          // Only trigger on Enter if no button is focused
          if (document.activeElement?.tagName !== 'BUTTON') {
            e.preventDefault();
            if (isLastStep) {
              onComplete?.();
            } else {
              nextStep();
            }
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    canGoNext,
    canGoPrevious,
    canSkip,
    isLastStep,
    nextStep,
    previousStep,
    skipStep,
    onComplete,
  ]);

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
    } else {
      nextStep();
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4',
        className
      )}
      role="navigation"
      aria-label="Onboarding navigation"
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        onClick={previousStep}
        disabled={!canGoPrevious}
        className="gap-2"
        aria-label={`Go to previous step`}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">{previousButtonText}</span>
      </Button>

      {/* Middle Section - Skip Button */}
      <div className="flex-1 flex justify-center">
        {canSkip && (
          <Button
            variant="ghost"
            onClick={skipStep}
            className="gap-2 text-muted-foreground hover:text-foreground"
            aria-label="Skip this step"
          >
            <span className="hidden sm:inline">{skipButtonText}</span>
            <SkipForward className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Next/Complete Button */}
      <Button
        onClick={handleNext}
        className="gap-2"
        aria-label={isLastStep ? 'Complete onboarding' : 'Go to next step'}
      >
        <span className="hidden sm:inline">
          {isLastStep ? completeButtonText : nextButtonText}
        </span>
        {isLastStep ? (
          <Check className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

// Keyboard shortcuts hint component
export function OnboardingKeyboardHints({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'text-xs text-muted-foreground flex flex-wrap gap-4 justify-center',
        className
      )}
    >
      <span className="flex items-center gap-1">
        <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded">←</kbd>
        <span>Previous</span>
      </span>
      <span className="flex items-center gap-1">
        <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded">→</kbd>
        <span>Next</span>
      </span>
      <span className="flex items-center gap-1">
        <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded">Esc</kbd>
        <span>Skip</span>
      </span>
      <span className="flex items-center gap-1">
        <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded">Enter</kbd>
        <span>Continue</span>
      </span>
    </div>
  );
}
