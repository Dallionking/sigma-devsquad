
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ViewMode } from '@/types';
import { Workflow, MessageSquare, CheckSquare, Mail } from 'lucide-react';

interface ViewModeTabsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  notificationCounts: {
    workflow: number;
    communication: number;
    tasks: number;
    messages: number;
  };
}

export const ViewModeTabs = ({
  viewMode,
  onViewModeChange,
  notificationCounts
}: ViewModeTabsProps) => {
  const tabs = [
    { id: 'workflow' as ViewMode, label: 'Workflow', icon: Workflow, count: notificationCounts.workflow },
    { id: 'communication' as ViewMode, label: 'Communication', icon: MessageSquare, count: notificationCounts.communication },
    { id: 'tasks' as ViewMode, label: 'Tasks', icon: CheckSquare, count: notificationCounts.tasks },
    { id: 'messages' as ViewMode, label: 'Messages', icon: Mail, count: notificationCounts.messages },
  ];

  return (
    <div className="px-6 py-3 bg-background border-b border-border/30">
      <Tabs value={viewMode} onValueChange={onViewModeChange}>
        <TabsList className="grid w-full grid-cols-4 bg-muted/50 h-12 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 h-10 px-4 rounded-md font-medium text-sm transition-all duration-200 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border/50 relative"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.count > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs bg-primary/10 text-primary border-primary/20">
                    {tab.count}
                  </Badge>
                )}
                {/* Active indicator line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full opacity-0 data-[state=active]:opacity-100 transition-opacity duration-200" />
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};
