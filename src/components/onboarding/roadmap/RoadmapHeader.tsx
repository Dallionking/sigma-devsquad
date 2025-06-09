
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Settings,
  MapPin,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';

interface RoadmapHeaderProps {
  percentage: number;
  completedSteps: number;
  totalSteps: number;
  remainingTime: number;
  isCollapsed: boolean;
  showEstimatedTimes: boolean;
  showCompletionPercentage: boolean;
  onToggleCollapsed: () => void;
  onToggleSettings: () => void;
}

export const RoadmapHeader = ({
  percentage,
  completedSteps,
  totalSteps,
  remainingTime,
  isCollapsed,
  showEstimatedTimes,
  showCompletionPercentage,
  onToggleCollapsed,
  onToggleSettings
}: RoadmapHeaderProps) => {
  if (isCollapsed) {
    return (
      <div className="p-2 flex flex-col items-center space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapsed}
          className="w-10 h-10 p-0"
          title="Expand roadmap"
        >
          <PanelLeft className="w-4 h-4" />
        </Button>
        
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-primary" />
        </div>
        
        <div className="w-2 bg-muted rounded-full h-20 relative">
          <div 
            className="w-2 bg-primary rounded-full transition-all duration-300"
            style={{ height: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-3 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Onboarding Roadmap</h3>
            <p className="text-sm text-muted-foreground">
              {Math.round(percentage)}% complete
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSettings}
            className="w-8 h-8 p-0"
            title="Toggle settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapsed}
            className="w-8 h-8 p-0"
            title="Collapse roadmap"
          >
            <PanelLeftClose className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Overall Progress</span>
          <span>{completedSteps}/{totalSteps} steps</span>
        </div>
        <Progress value={percentage} className="h-2" />
        
        {showEstimatedTimes && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{remainingTime} min remaining</span>
            </span>
            {showCompletionPercentage && (
              <span>{completedSteps} completed</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
