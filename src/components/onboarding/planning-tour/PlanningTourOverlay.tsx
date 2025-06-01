
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, MapPin, MessageSquare, Target, BarChart3, CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: React.ComponentType<{ className?: string }>;
  actionText?: string;
}

const tourSteps: TourStep[] = [
  {
    id: 'planning-overview',
    title: 'Welcome to Planning Agent',
    description: 'The Planning Agent helps you break down complex projects into manageable tasks and coordinate your AI team effectively.',
    target: '.planning-overview',
    position: 'bottom',
    icon: MapPin,
    actionText: 'Explore Planning Features'
  },
  {
    id: 'chat-interface',
    title: 'AI Planning Assistant',
    description: 'Chat with your planning agent to discuss project requirements, get task breakdowns, and receive intelligent suggestions.',
    target: '.chat-interface',
    position: 'left',
    icon: MessageSquare,
    actionText: 'Try Planning Chat'
  },
  {
    id: 'task-breakdown',
    title: 'Visual Task Management',
    description: 'See your projects broken down into tasks with dependencies, timelines, and agent assignments visualized clearly.',
    target: '.task-breakdown',
    position: 'top',
    icon: Target,
    actionText: 'View Task Breakdown'
  },
  {
    id: 'progress-tracking',
    title: 'Real-time Progress',
    description: 'Monitor project progress with live updates, bottleneck detection, and performance analytics from your AI agents.',
    target: '.progress-tracking',
    position: 'right',
    icon: BarChart3,
    actionText: 'Check Progress'
  },
  {
    id: 'completion',
    title: 'Ready to Plan!',
    description: 'You\'re now ready to leverage AI-powered planning for your projects. Start by describing your project goals to the planning agent.',
    target: '.completion-area',
    position: 'bottom',
    icon: CheckCircle,
    actionText: 'Start Planning'
  }
];

interface PlanningTourOverlayProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const PlanningTourOverlay = ({ onComplete, onSkip }: PlanningTourOverlayProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<Element | null>(null);

  const currentTourStep = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;
  const Icon = currentTourStep.icon;

  useEffect(() => {
    // Highlight the target element
    const targetElement = document.querySelector(currentTourStep.target);
    if (targetElement) {
      setHighlightedElement(targetElement);
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Add highlight class
    if (highlightedElement) {
      highlightedElement.classList.remove('tour-highlight');
    }
    if (targetElement) {
      targetElement.classList.add('tour-highlight');
    }

    return () => {
      if (targetElement) {
        targetElement.classList.remove('tour-highlight');
      }
    };
  }, [currentStep, currentTourStep.target]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const isLastStep = currentStep === tourSteps.length - 1;

  return (
    <>
      {/* Overlay backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 pointer-events-none" />
      
      {/* Tour card */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <Card className="shadow-2xl border-2 border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{currentTourStep.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Step {currentStep + 1} of {tourSteps.length}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(progress)}% complete
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <Progress value={progress} className="h-2 mt-3" />
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {currentTourStep.description}
            </p>

            {/* Step indicators */}
            <div className="flex justify-center space-x-2">
              {tourSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index <= currentStep ? "bg-primary" : "bg-muted",
                    index === currentStep && "ring-2 ring-primary ring-offset-2"
                  )}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              
              <Button
                onClick={handleNext}
                className={cn(
                  "flex items-center space-x-2",
                  isLastStep && "bg-green-600 hover:bg-green-700"
                )}
              >
                <span>
                  {isLastStep ? 'Finish & Go to Dashboard' : 'Next'}
                </span>
                {isLastStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Skip tour option */}
            {!isLastStep && (
              <div className="text-center pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSkip}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Skip Tour
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Hotspot indicators */}
      {highlightedElement && (
        <div className="fixed inset-0 z-45 pointer-events-none">
          <div className="absolute inset-0">
            <style jsx>{`
              .tour-highlight {
                position: relative;
                z-index: 60;
                box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
                border-radius: 8px;
                background: rgba(59, 130, 246, 0.1);
                animation: pulse 2s infinite;
              }
              
              @keyframes pulse {
                0%, 100% { 
                  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
                }
                50% { 
                  box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.5);
                }
              }
            `}</style>
          </div>
        </div>
      )}
    </>
  );
};
