
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
    <div className="px-4 py-2 bg-background h-full flex items-center">
      <Tabs value={viewMode} onValueChange={onViewModeChange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4 bg-muted/30 h-8 p-0.5 rounded-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-1.5 h-7 px-2 rounded-sm font-medium text-xs transition-all duration-200 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm relative"
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline truncate">{tab.label}</span>
                {tab.count > 0 && (
                  <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs bg-primary/10 text-primary border-primary/20 hidden md:inline-flex">
                    {tab.count}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};
