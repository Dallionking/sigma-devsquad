
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ViewMode } from '@/types';
import { Workflow, MessageSquare, CheckSquare, Mail, Bot } from 'lucide-react';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';

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
    <div className="px-6 py-3 space-y-3">
      <BreadcrumbNavigation viewMode={viewMode} />
      
      <Tabs value={viewMode} onValueChange={onViewModeChange}>
        <TabsList className="grid w-full grid-cols-4 bg-muted/30">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.count > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
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
