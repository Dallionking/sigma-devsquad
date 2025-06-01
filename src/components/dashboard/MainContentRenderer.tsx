
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { AgentGrid } from "./agent-grid/AgentGrid";
import { TaskManagement } from "./TaskManagement";
import { CommunicationHistory } from "../communication/CommunicationHistory";
import { WorkflowCanvas } from "../workflow/WorkflowCanvas";
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
  showTeamView,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onViewModeChange,
}: MainContentRendererProps) => {

  // For team view, show team-specific content
  if (showTeamView) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Collaboration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Team view is active. Use the sidebar to explore teams and team members.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render content based on individual view mode
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
