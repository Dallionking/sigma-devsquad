
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { TourStep } from './ViewSpecificTourConfig';
import { TourNavigationControls } from './TourNavigationControls';

interface TourTooltipContentProps {
  currentStepData: TourStep;
  currentStep: number;
  totalSteps: number;
  tooltipPosition: { top: number; left: number };
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
}

export const TourTooltipContent = ({
  currentStepData,
  currentStep,
  totalSteps,
  tooltipPosition,
  onNext,
  onPrevious,
  onClose
}: TourTooltipContentProps) => {
  const Icon = currentStepData.icon;

  console.log('Rendering tooltip at position:', tooltipPosition);

  return (
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
                  Step {currentStep + 1} of {totalSteps}
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
          
          <TourNavigationControls
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        </CardContent>
      </Card>
    </div>
  );
};
