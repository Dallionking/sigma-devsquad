
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Users, 
  ChevronDown, 
  ChevronUp,
  Activity,
  Bell,
  UserPlus,
  Zap
} from 'lucide-react';
import { PresenceAwareness } from '@/components/collaboration/PresenceAwareness';
import { UserActivityTimeline } from '@/components/collaboration/UserActivityTimeline';
import { NotificationCenter } from '@/components/collaboration/NotificationCenter';
import { CollaborationInviteSystem } from '@/components/collaboration/CollaborationInviteSystem';
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard';
import { ViewMode } from '@/types';
import { cn } from '@/lib/utils';

interface UserPresencePanelProps {
  className?: string;
  viewMode: ViewMode;
  componentId?: string;
  projectId?: string;
  showPerformance?: boolean;
}

export const UserPresencePanel = ({ 
  className, 
  viewMode,
  componentId = 'main-dashboard',
  projectId = 'current-project',
  showPerformance = false
}: UserPresencePanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'presence' | 'activity' | 'performance' | 'invite'>('presence');

  const getViewModeLabel = (mode: ViewMode) => {
    switch (mode) {
      case 'workflow': return 'Workflow View';
      case 'communication': return 'Communication Hub';
      case 'tasks': return 'Task Management';
      case 'messages': return 'Messages';
      default: return 'Dashboard';
    }
  };

  const tabs = [
    { key: 'presence' as const, label: 'Presence', icon: Users },
    { key: 'activity' as const, label: 'Activity', icon: Activity },
    ...(showPerformance ? [{ key: 'performance' as const, label: 'Performance', icon: Zap }] : []),
    { key: 'invite' as const, label: 'Invite', icon: UserPlus }
  ];

  return (
    <div className={cn("border-t border-border/30 bg-card/50 backdrop-blur-sm", className)}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="w-full cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gradient-to-br from-[#10B981] via-[#8B5CF6] to-[#10B981] rounded-md flex items-center justify-center">
                  <Users className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold bg-gradient-to-r from-[#10B981] to-[#8B5CF6] bg-clip-text text-transparent">
                    User Presence & Collaboration
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {getViewModeLabel(viewMode)} • Real-time collaboration
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <PresenceAwareness 
                  componentId={componentId}
                  showLabels={false}
                  maxVisible={3}
                />
                <NotificationCenter />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="animate-accordion-down">
          <div className="border-t border-border/20">
            {/* Tab Navigation */}
            <div className="px-4 py-2 border-b border-border/20">
              <div className="flex items-center gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  
                  return (
                    <Button
                      key={tab.key}
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab(tab.key)}
                      className={cn(
                        "h-8 px-3 text-xs",
                        isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                      )}
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {tab.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4 max-h-64 overflow-y-auto">
              {activeTab === 'presence' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Current View Activity</h4>
                    <PresenceAwareness 
                      componentId={componentId}
                      showLabels={true}
                      className="justify-start"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">All Active Components</h4>
                    <div className="space-y-2">
                      {['main-view', 'agent-grid', 'task-management', 'workflow-canvas'].map((compId) => (
                        <div key={compId} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                          <span className="text-xs font-medium capitalize">
                            {compId.replace('-', ' ')}
                          </span>
                          <PresenceAwareness 
                            componentId={compId}
                            showLabels={false}
                            maxVisible={2}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <UserActivityTimeline />
              )}

              {activeTab === 'performance' && showPerformance && (
                <PerformanceDashboard autoRefresh={true} refreshInterval={5000} />
              )}

              {activeTab === 'invite' && (
                <CollaborationInviteSystem projectId={projectId} />
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
