
import React from 'react';
import { MainWorkflowArea } from "./MainWorkflowArea";
import { TeamDashboard } from "@/components/teams/TeamDashboard";
import { TeamsWorkflowVisualization } from "@/components/teams/TeamsWorkflowVisualization";
import { DashboardOverview } from "./DashboardOverview";
import { UserPresenceUI } from "@/components/collaboration/UserPresenceUI";
import { ViewMode, Agent, Task, Message } from "@/types";
import { Team, AgentProfile } from "@/types/teams";

interface MainContentRendererProps {
  showTeamView: boolean;
  selectedTeam: Team | null;
  viewMode: ViewMode;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  onTeamSelect: (team: Team | null) => void;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
}

export const MainContentRenderer = ({
  showTeamView,
  selectedTeam,
  viewMode,
  agents,
  tasks,
  messages,
  selectedAgent,
  selectedTask,
  selectedMessage,
  onTeamSelect,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onAgentProfileSelect,
}: MainContentRendererProps) => {
  const renderMainContent = () => {
    if (showTeamView) {
      if (selectedTeam) {
        return <TeamDashboard team={selectedTeam} />;
      }
      return (
        <TeamsWorkflowVisualization
          onTeamSelect={onTeamSelect}
          onAgentSelect={onAgentProfileSelect}
        />
      );
    } else {
      return (
        <MainWorkflowArea 
          viewMode={viewMode}
          agents={agents}
          tasks={tasks}
          messages={messages}
          selectedAgent={selectedAgent}
          selectedTask={selectedTask}
          selectedMessage={selectedMessage}
          onAgentSelect={onAgentSelect}
          onTaskSelect={onTaskSelect}
          onMessageSelect={onMessageSelect}
        />
      );
    }
  };

  return (
    <>
      {/* Dashboard overview section - only show in workflow mode and individual view */}
      {viewMode === "workflow" && !showTeamView && (
        <div className="animate-in fade-in-50 duration-300 flex-shrink-0">
          <DashboardOverview 
            agents={agents}
            onAgentSelect={onAgentSelect}
          />
        </div>
      )}
      
      {/* Main content area */}
      <div className="flex-1 transition-all duration-300 ease-in-out min-h-0 p-6 space-y-6">
        {renderMainContent()}
        
        {/* User Presence UI - Always visible for collaboration */}
        <UserPresenceUI 
          componentId={showTeamView ? 'team-view' : 'individual-view'}
          projectId="main-dashboard"
        />
      </div>
    </>
  );
};
