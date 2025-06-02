
import React from 'react';
import { ViewMode } from '@/types';
import { Agent, Task, Message } from '@/types';
import { Team, AgentProfile } from '@/types/teams';
import { TeamDashboard } from '@/components/teams/TeamDashboard';
import { TeamPerformanceDashboard } from '@/components/teams/performance/TeamPerformanceDashboard';
import { TeamsEmptyState } from '@/components/empty-states';
import { MainLayoutHeader } from '../layout/MainLayoutHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Users, TrendingUp } from 'lucide-react';

interface TeamViewLayoutProps {
  viewMode: ViewMode;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  selectedTeam: Team | null;
  selectedAgentProfile: AgentProfile | null;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
  onTeamSelect: (team: Team | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const TeamViewLayout = ({
  selectedTeam,
  selectedAgentProfile,
  onAgentProfileSelect
}: TeamViewLayoutProps) => {
  
  if (!selectedTeam) {
    return (
      <div className="h-full flex items-center justify-center">
        <TeamsEmptyState />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="overview" className="h-full flex flex-col">
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-screen-2xl mx-auto px-4">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="overview" className="flex-1 overflow-hidden mt-0">
            <TeamDashboard 
              team={selectedTeam}
              onAgentSelect={onAgentProfileSelect}
            />
          </TabsContent>

          <TabsContent value="performance" className="flex-1 overflow-hidden mt-0">
            <TeamPerformanceDashboard team={selectedTeam} />
          </TabsContent>

          <TabsContent value="analytics" className="flex-1 overflow-hidden mt-0">
            <TeamPerformanceDashboard team={selectedTeam} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
