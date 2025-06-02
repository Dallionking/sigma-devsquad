
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TourStep } from './ViewSpecificTourConfig';

interface ViewSpecificGuidedTourProps {
  steps: TourStep[];
  currentStep: number;
  isActive: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  onClose: () => void;
}

export const ViewSpecificGuidedTour = ({
  steps,
  currentStep,
  isActive,
  onNext,
  onPrevious,
  onComplete,
  onClose
}: ViewSpecificGuidedTourProps) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const previousTargetElementRef = useRef<HTMLElement | null>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Clear all timeouts on cleanup
  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
  };

  useEffect(() => {
    if (!isActive || !currentStepData) {
      console.log('Tour not active or no step data');
      return;
    }

    console.log(`Finding target for step ${currentStep}:`, currentStepData.targetSelector);

    const findTarget = () => {
      const element = document.querySelector(currentStepData.targetSelector) as HTMLElement;
      console.log(`Target element found:`, element);
      
      if (element) {
        // Clear previous target highlighting
        if (previousTargetElementRef.current && previousTargetElementRef.current !== element) {
          const prevElement = previousTargetElementRef.current;
          prevElement.style.position = '';
          prevElement.style.zIndex = '';
          prevElement.style.outline = '';
          prevElement.style.outlineOffset = '';
          prevElement.style.borderRadius = '';
          prevElement.style.backgroundColor = '';
        }

        setTargetElement(element);
        previousTargetElementRef.current = element;
        
        // Calculate tooltip position with better viewport awareness
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        // Fixed tooltip dimensions
        const tooltipWidth = 320;
        const tooltipHeight = 280;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let top = 0;
        let left = 0;
        
        switch (currentStepData.position) {
          case 'top':
            top = rect.top + scrollTop - tooltipHeight - 20;
            left = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'bottom':
            top = rect.bottom + scrollTop + 20;
            left = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'left':
            top = rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2;
            left = rect.left + scrollLeft - tooltipWidth - 20;
            break;
          case 'right':
            top = rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2;
            left = rect.right + scrollLeft + 20;
            break;
        }
        
        // Ensure tooltip stays within viewport with proper margins
        if (left + tooltipWidth > viewportWidth) {
          left = viewportWidth - tooltipWidth - 20;
        }
        if (left < 20) {
          left = 20;
        }
        if (top + tooltipHeight > viewportHeight + scrollTop) {
          top = viewportHeight + scrollTop - tooltipHeight - 20;
        }
        if (top < scrollTop + 20) {
          top = scrollTop + 20;
        }
        
        setTooltipPosition({ top, left });
        console.log(`Tooltip position set:`, { top, left });
        
        // Highlight the target element
        element.style.position = 'relative';
        element.style.zIndex = '1000';
        element.style.outline = '2px solid #3b82f6';
        element.style.outlineOffset = '2px';
        element.style.borderRadius = '8px';
        element.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        
        // Scroll to target
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return true;
      } else {
        console.warn(`Target element not found for selector: ${currentStepData.targetSelector}`);
        // If target not found, position tooltip in center of screen
        setTooltipPosition({
          top: window.innerHeight / 2 - 140,
          left: window.innerWidth / 2 - 160
        });
        return false;
      }
    };

    // Clear previous timeouts
    clearAllTimeouts();

    // Try to find target immediately
    if (!findTarget()) {
      // Also try after delays to handle dynamic content
      const timer1 = setTimeout(() => findTarget(), 100);
      const timer2 = setTimeout(() => findTarget(), 500);
      const timer3 = setTimeout(() => findTarget(), 1000);
      
      timeoutRefs.current = [timer1, timer2, timer3];
    }
    
    return clearAllTimeouts;
  }, [currentStep, isActive, currentStepData]);

  // Cleanup when component unmounts or tour closes
  useEffect(() => {
    return () => {
      clearAllTimeouts();
      
      if (targetElement) {
        targetElement.style.position = '';
        targetElement.style.zIndex = '';
        targetElement.style.outline = '';
        targetElement.style.outlineOffset = '';
        targetElement.style.borderRadius = '';
        targetElement.style.backgroundColor = '';
      }
      if (previousTargetElementRef.current) {
        const prevElement = previousTargetElementRef.current;
        prevElement.style.position = '';
        prevElement.style.zIndex = '';
        prevElement.style.outline = '';
        prevElement.style.outlineOffset = '';
        prevElement.style.borderRadius = '';
        prevElement.style.backgroundColor = '';
      }
    };
  }, [targetElement]);

  if (!isActive || !currentStepData) {
    return null;
  }

  const Icon = currentStepData.icon;

  const handleNext = () => {
    console.log('Next button clicked, current step:', currentStep);
    if (isLastStep) {
      onComplete();
    } else {
      onNext();
    }
  };

  const handlePrevious = () => {
    console.log('Previous button clicked, current step:', currentStep);
    onPrevious();
  };

  console.log('Rendering tooltip at position:', tooltipPosition);

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[999] pointer-events-none" />
      
      {/* Tooltip */}
      <div
        className="fixed z-[1001] w-80 max-w-[90vw]"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        <Card className="shadow-xl border-0 bg-white dark:bg-gray-900 text-foreground min-h-[280px] flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">{currentStepData.title}</h3>
                  <Badge variant="outline" className="text-xs mt-1">
                    Step {currentStep + 1} of {steps.length}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
              {currentStepData.description}
            </p>
            
            {/* Navigation Buttons - Always visible at bottom */}
            <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={isFirstStep}
                className={cn(
                  "flex items-center gap-2 min-w-[80px] h-9",
                  isFirstStep && "opacity-50 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Previous</span>
              </Button>
              
              <Button
                onClick={handleNext}
                size="sm"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white min-w-[80px] h-9"
              >
                <span className="text-sm">{isLastStep ? 'Finish Tour' : 'Next'}</span>
                {!isLastStep && <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
