
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { RoadmapStepItem } from './RoadmapStepItem';

interface StepConfig {
  id: OnboardingStep;
  title: string;
  description: string;
  estimatedTime: number;
  icon: React.ComponentType<{ className?: string }>;
  category: 'setup' | 'configuration' | 'exploration';
}

interface RoadmapCategoryProps {
  category: string;
  steps: StepConfig[];
  isExpanded: boolean;
  completedInCategory: number;
  showEstimatedTimes: boolean;
  getStepStatus: (step: OnboardingStep) => 'completed' | 'current' | 'available' | 'locked';
  getStepData: (step: OnboardingStep) => any;
  onToggleCategory: (category: string) => void;
  onStepClick: (stepId: OnboardingStep) => void;
}

const getCategoryTitle = (category: string) => {
  switch (category) {
    case 'setup': return 'Initial Setup';
    case 'configuration': return 'Configuration';
    case 'exploration': return 'Exploration';
    default: return category;
  }
};

export const RoadmapCategory = ({
  category,
  steps,
  isExpanded,
  completedInCategory,
  showEstimatedTimes,
  getStepStatus,
  getStepData,
  onToggleCategory,
  onStepClick
}: RoadmapCategoryProps) => {
  return (
    <Collapsible open={isExpanded} onOpenChange={() => onToggleCategory(category)}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-4 h-auto border-b border-border/50"
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span className="font-medium">{getCategoryTitle(category)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {completedInCategory}/{steps.length}
            </Badge>
          </div>
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="space-y-1 p-2">
          {steps.map((step) => (
            <RoadmapStepItem
              key={step.id}
              step={step}
              status={getStepStatus(step.id)}
              stepData={getStepData(step.id)}
              showEstimatedTimes={showEstimatedTimes}
              onStepClick={onStepClick}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
