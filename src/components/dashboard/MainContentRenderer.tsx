import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { AgentGrid } from "./agent-grid/AgentGrid";
import { TaskManagement } from "./TaskManagement";
import { CommunicationHistory } from "../communication/CommunicationHistory";
import { WorkflowCanvas } from "../workflow/WorkflowCanvas";
import { TeamDashboard } from "../teams/TeamDashboard";
import { TeamHierarchy } from "../teams/TeamHierarchy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Users, MessageSquare, Workflow } from "lucide-react";

interface MainContentRendererProps {
  viewMode: ViewMode;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  selectedTeam: Team | null;
  selectedAgentProfile: AgentProfile | null;
  showTeamView: boolean;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
  onTeamSelect: (team: Team | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const MainContentRenderer = ({
  viewMode,
  agents,
  tasks,
  messages,
  selectedAgent,
  selectedTask,
  selectedMessage,
  selectedTeam,
  selectedAgentProfile,
  showTeamView,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onTeamSelect,
  onAgentProfileSelect,
  onViewModeChange,
}: MainContentRendererProps) => {

  // For team view, show team-specific content
  if (showTeamView) {
    // If a specific team is selected, show the team dashboard
    if (selectedTeam) {
      return (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-6">
            <TeamDashboard 
              team={selectedTeam}
              onAgentSelect={onAgentProfileSelect}
            />
          </div>
        </div>
      );
    }

    // If no specific team is selected, show team overview only (no second hierarchy)
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Teams Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">4</div>
                    <div className="text-sm text-muted-foreground">Active Teams</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Team Members</div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Select a team from the sidebar to view detailed information, 
                  team performance metrics, and manage team members.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Individual agents view switch statement
  switch (viewMode) {
    case 'workflow':
      return (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-4">
            <WorkflowCanvas 
              agents={agents}
              onAgentSelect={onAgentSelect}
              selectedAgent={selectedAgent}
            />
          </div>
        </div>
      );

    case 'communication':
      return (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Communication Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CommunicationHistory
                  messages={messages}
                  selectedMessage={selectedMessage}
                  onMessageSelect={onMessageSelect}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case 'tasks':
      return (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-4">
            <TaskManagement
              tasks={tasks}
              agents={agents}
              selectedTask={selectedTask}
              onTaskSelect={onTaskSelect}
            />
          </div>
        </div>
      );

    case 'messages':
      return (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CommunicationHistory
                  messages={messages}
                  selectedMessage={selectedMessage}
                  onMessageSelect={onMessageSelect}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      );

    default:
      // Default to agent grid view
      return (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-4">
            <AgentGrid 
              agents={agents} 
              onAgentSelect={onAgentSelect}
            />
          </div>
        </div>
      );
  }
};
