
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
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

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    if (!isActive || !currentStepData) return;

    const findTarget = () => {
      const element = document.querySelector(currentStepData.targetSelector) as HTMLElement;
      if (element) {
        setTargetElement(element);
        
        // Calculate tooltip position
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        let top = 0;
        let left = 0;
        
        switch (currentStepData.position) {
          case 'top':
            top = rect.top + scrollTop - 10;
            left = rect.left + scrollLeft + rect.width / 2;
            break;
          case 'bottom':
            top = rect.bottom + scrollTop + 10;
            left = rect.left + scrollLeft + rect.width / 2;
            break;
          case 'left':
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.left + scrollLeft - 10;
            break;
          case 'right':
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.right + scrollLeft + 10;
            break;
        }
        
        setTooltipPosition({ top, left });
        
        // Highlight the target element
        element.style.position = 'relative';
        element.style.zIndex = '1000';
        element.style.outline = '2px solid #3b82f6';
        element.style.outlineOffset = '2px';
        element.style.borderRadius = '8px';
        
        // Scroll to target
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    // Try to find target immediately
    findTarget();
    
    // Also try after a short delay in case elements are still rendering
    const timer = setTimeout(findTarget, 100);
    
    return () => {
      clearTimeout(timer);
      if (targetElement) {
        targetElement.style.position = '';
        targetElement.style.zIndex = '';
        targetElement.style.outline = '';
        targetElement.style.outlineOffset = '';
        targetElement.style.borderRadius = '';
      }
    };
  }, [currentStep, isActive, currentStepData, targetElement]);

  if (!isActive || !currentStepData) return null;

  const Icon = currentStepData.icon;

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
          transform: currentStepData.position === 'left' || currentStepData.position === 'right' 
            ? 'translateY(-50%)' 
            : 'translateX(-50%)'
        }}
      >
        <Card className="shadow-xl border-0 bg-gray-900 text-white">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm">{currentStepData.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={onClose}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            
            <p className="text-sm text-gray-200 mb-4">
              {currentStepData.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  {currentStep + 1} of {steps.length}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onPrevious}
                  disabled={isFirstStep}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={isLastStep ? onComplete : onNext}
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  {isLastStep ? 'Finish' : 'Next'}
                  {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
