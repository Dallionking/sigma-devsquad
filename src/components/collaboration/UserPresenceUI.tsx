
import React from 'react';
import { CollaborativeCursors } from './CollaborativeCursors';
import { UserActivityTimeline } from './UserActivityTimeline';
import { PresenceAwareness } from './PresenceAwareness';
import { NotificationCenter } from './NotificationCenter';
import { CollaborationInviteSystem } from './CollaborationInviteSystem';
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Activity, Bell, UserPlus, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserPresenceUIProps {
  className?: string;
  componentId?: string;
  projectId?: string;
}

export const UserPresenceUI = ({ 
  className, 
  componentId = 'main-view',
  projectId = 'current-project'
}: UserPresenceUIProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Collaborative Cursors - Always active */}
      <CollaborativeCursors />
      
      {/* Main Presence Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Presence & Collaboration
            </div>
            <div className="flex items-center gap-2">
              <PresenceAwareness 
                componentId={componentId} 
                showLabels={false}
                maxVisible={3}
              />
              <NotificationCenter />
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="presence" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Presence
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="invite" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Invite
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="mt-4">
              <UserActivityTimeline />
            </TabsContent>
            
            <TabsContent value="presence" className="mt-4">
              <div className="space-y-4">
                <h4 className="font-medium">Current View Activity</h4>
                <PresenceAwareness 
                  componentId={componentId}
                  showLabels={true}
                  className="justify-start"
                />
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">All Active Components</h4>
                  <div className="space-y-2">
                    {['main-view', 'agent-grid', 'task-management', 'workflow-canvas'].map((compId) => (
                      <div key={compId} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm font-medium">{compId.replace('-', ' ')}</span>
                        <PresenceAwareness 
                          componentId={compId}
                          showLabels={false}
                          maxVisible={3}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-4">
              <PerformanceDashboard autoRefresh={true} refreshInterval={3000} />
            </TabsContent>
            
            <TabsContent value="invite" className="mt-4">
              <CollaborationInviteSystem projectId={projectId} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
