
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MessageSquare, CheckSquare, Mail, Users, ExternalLink } from 'lucide-react';
import { Agent, Task, Message, ViewMode } from '@/types';
import { cn } from '@/lib/utils';

interface RelationshipIndicatorsProps {
  item: Agent | Task | Message;
  itemType: 'agent' | 'task' | 'message';
  relatedCounts: {
    tasks: number;
    messages: number;
    communications: number;
  };
  onNavigate: (viewMode: ViewMode, itemId?: string) => void;
  className?: string;
}

export const RelationshipIndicators: React.FC<RelationshipIndicatorsProps> = ({
  item,
  itemType,
  relatedCounts,
  onNavigate,
  className
}) => {
  const getColorForType = (type: string) => {
    switch (type) {
      case 'tasks':
        return 'text-purple-600 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:hover:bg-purple-900';
      case 'messages':
        return 'text-orange-600 bg-orange-50 hover:bg-orange-100 dark:bg-orange-950 dark:hover:bg-orange-900';
      case 'communications':
        return 'text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900';
      default:
        return 'text-gray-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900';
    }
  };

  const indicators = [
    {
      type: 'tasks',
      count: relatedCounts.tasks,
      icon: CheckSquare,
      label: 'Related Tasks',
      viewMode: 'tasks' as ViewMode,
      enabled: relatedCounts.tasks > 0
    },
    {
      type: 'messages',
      count: relatedCounts.messages,
      icon: Mail,
      label: 'Direct Messages',
      viewMode: 'messages' as ViewMode,
      enabled: relatedCounts.messages > 0
    },
    {
      type: 'communications',
      count: relatedCounts.communications,
      icon: MessageSquare,
      label: 'Communications',
      viewMode: 'communication' as ViewMode,
      enabled: relatedCounts.communications > 0
    }
  ].filter(indicator => indicator.enabled);

  if (indicators.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-1 flex-wrap", className)}>
        {indicators.map((indicator) => {
          const Icon = indicator.icon;
          
          return (
            <Tooltip key={indicator.type}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate(indicator.viewMode, item.id)}
                  className={cn(
                    "h-6 px-2 text-xs rounded-full transition-all duration-200",
                    getColorForType(indicator.type),
                    "hover:scale-105"
                  )}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {indicator.count}
                  <ExternalLink className="w-2 h-2 ml-1 opacity-60" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                <p>View {indicator.count} {indicator.label.toLowerCase()}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

// Helper component for showing cross-tab previews on hover
export const CrossTabPreview: React.FC<{
  sourceItem: Agent | Task | Message;
  targetViewMode: ViewMode;
  children: React.ReactNode;
}> = ({ sourceItem, targetViewMode, children }) => {
  const [showPreview, setShowPreview] = React.useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={showPreview} onOpenChange={setShowPreview}>
        <TooltipTrigger asChild>
          <div
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={() => setShowPreview(false)}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          className="w-80 p-4 bg-background border shadow-lg"
          sideOffset={10}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {targetViewMode.charAt(0).toUpperCase() + targetViewMode.slice(1)}
              </Badge>
              <span className="text-sm font-medium">Related Content</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Preview of related {targetViewMode} for {sourceItem.id}
            </div>
            <div className="text-xs text-muted-foreground">
              Click to navigate and view full details
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
