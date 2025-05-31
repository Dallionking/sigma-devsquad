
import React from 'react';
import { MainWorkflowArea } from "./MainWorkflowArea";
import { TeamDashboard } from "@/components/teams/TeamDashboard";
import { TeamsWorkflowVisualization } from "@/components/teams/TeamsWorkflowVisualization";
import { UserPresenceUI } from "@/components/collaboration/UserPresenceUI";
import { UnifiedCommunicationInterface } from "@/components/communication/UnifiedCommunicationInterface";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ViewMode, Agent, Task, Message } from "@/types";
import { Team, AgentProfile } from "@/types/teams";

interface MainContentRendererProps {
  showTeamView: boolean;
  selectedTeam: Team | null;
  selectedAgentProfile: AgentProfile | null;
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
  onViewModeChange: (mode: ViewMode) => void;
}

export const MainContentRenderer = ({
  showTeamView,
  selectedTeam,
  selectedAgentProfile,
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
  onViewModeChange,
}: MainContentRendererProps) => {
  
  const renderMainContent = () => {
    if (showTeamView) {
      if (selectedTeam) {
        return (
          <div className="space-y-6">
            {/* Back navigation button */}
            <div className="flex items-center gap-4 p-6 pb-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTeamSelect(null)}
                className="flex items-center gap-2 hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Teams
              </Button>
              <h1 className="text-2xl font-bold text-foreground">{selectedTeam.name}</h1>
            </div>
            <div className="px-6">
              <TeamDashboard team={selectedTeam} />
            </div>
          </div>
        );
      }
      return (
        <div className="w-full p-6">
          <TeamsWorkflowVisualization
            onTeamSelect={onTeamSelect}
            onAgentSelect={onAgentProfileSelect}
          />
        </div>
      );
    } else {
      // Individual view mode content - unified communication for both communication and messages
      if (viewMode === "communication" || viewMode === "messages") {
        return (
          <div className="h-full">
            <UnifiedCommunicationInterface />
          </div>
        );
      }
      
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
    <div className="flex-1 flex flex-col min-h-0 bg-background">
      {/* Main content area */}
      <div className="flex-1 transition-all duration-300 ease-in-out min-h-0 overflow-auto bg-background">
        {renderMainContent()}
        
        {/* Integrated User Presence - Only show in workflow mode and when meaningful */}
        {viewMode === "workflow" && !showTeamView && (
          <div className="fixed bottom-4 right-4 z-30">
            <UserPresenceUI 
              componentId={showTeamView ? 'team-view' : 'individual-view'}
              projectId="main-dashboard"
            />
          </div>
        )}
      </div>
    </div>
  );
};
