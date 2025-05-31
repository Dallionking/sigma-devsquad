
import React from 'react';
import { MainWorkflowArea } from "./MainWorkflowArea";
import { TeamDashboard } from "@/components/teams/TeamDashboard";
import { TeamsWorkflowVisualization } from "@/components/teams/TeamsWorkflowVisualization";
import { UnifiedCommunicationHub } from "@/components/communication/UnifiedCommunicationHub";
import { AdvancedCommunicationPanel } from "@/components/planning-agent/AdvancedCommunicationPanel";
import { InteractiveTeamCommunicationFlow } from "@/components/analytics/InteractiveTeamCommunicationFlow";
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
      // Individual view mode content
      if (viewMode === "communication") {
        return (
          <div className="h-full p-6 space-y-6">
            {/* Enhanced Interactive Team Communication Flow */}
            <InteractiveTeamCommunicationFlow 
              agents={agents}
              onAgentClick={(agentId) => {
                const agent = agents.find(a => a.id === agentId);
                if (agent) onAgentSelect(agent);
              }}
              onTeamClick={(teamId) => {
                console.log("Team clicked:", teamId);
              }}
              collapsed={false}
            />
            
            {/* Unified Communication Hub */}
            <UnifiedCommunicationHub 
              defaultTab="chat"
            />
          </div>
        );
      }
      
      if (viewMode === "messages") {
        return (
          <div className="h-full p-6">
            <AdvancedCommunicationPanel
              agents={agents}
              messages={messages}
              selectedMessage={selectedMessage}
              onMessageSelect={onMessageSelect}
            />
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
      </div>
    </div>
  );
};
