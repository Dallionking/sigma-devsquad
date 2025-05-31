
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { SidebarRenderer } from "./SidebarRenderer";
import { MainContentRenderer } from "./MainContentRenderer";
import { DetailPanelRenderer } from "./DetailPanelRenderer";
import { ViewModeTabs } from "./ViewModeTabs";
import { UserPresencePanel } from "./UserPresencePanel";
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  showTeamView: boolean;
  sidebarCollapsed: boolean;
  syncPanelCollapsed: boolean;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  selectedTeam: Team | null;
  selectedAgentProfile: AgentProfile | null;
  viewMode: ViewMode;
  hasSelection: boolean;
  onSidebarToggle: () => void;
  onSyncPanelToggle: () => void;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
  onTeamSelect: (team: Team | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
  onDismissSelection: () => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const MainLayout = ({
  showTeamView,
  sidebarCollapsed,
  agents,
  tasks,
  messages,
  selectedAgent,
  selectedTask,
  selectedMessage,
  selectedTeam,
  selectedAgentProfile,
  viewMode,
  hasSelection,
  onSidebarToggle,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onTeamSelect,
  onAgentProfileSelect,
  onDismissSelection,
  onViewModeChange,
}: MainLayoutProps) => {
  
  const notificationCounts = {
    workflow: 3,
    communication: 2,
    tasks: 5,
    messages: 1,
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* View Mode Tabs - Moved above content */}
      {!showTeamView && (
        <ViewModeTabs
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          notificationCounts={notificationCounts}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Toggle Button - Always visible */}
          <div className="flex-shrink-0 border-r border-border/60 bg-card/30 dark:bg-card/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSidebarToggle}
              className="m-2 h-8 w-8 p-0 hover:bg-primary/10"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <PanelLeft className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Sidebar - Properly sized and responsive */}
          {!sidebarCollapsed && (
            <div className={cn(
              "bg-background border-r border-border/60 transition-all duration-300 overflow-hidden flex-shrink-0",
              showTeamView ? "w-64" : "w-80"
            )}>
              <SidebarRenderer
                viewMode={viewMode}
                agents={agents}
                tasks={tasks}
                messages={messages}
                selectedAgent={selectedAgent}
                selectedTask={selectedTask}
                selectedMessage={selectedMessage}
                selectedTeam={selectedTeam}
                selectedAgentProfile={selectedAgentProfile}
                showTeamView={showTeamView}
                onAgentSelect={onAgentSelect}
                onTaskSelect={onTaskSelect}
                onMessageSelect={onMessageSelect}
                onTeamSelect={onTeamSelect}
                onAgentProfileSelect={onAgentProfileSelect}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden bg-background">
            <MainContentRenderer
              viewMode={viewMode}
              agents={agents}
              tasks={tasks}
              messages={messages}
              selectedAgent={selectedAgent}
              selectedTask={selectedTask}
              selectedMessage={selectedMessage}
              selectedTeam={selectedTeam}
              selectedAgentProfile={selectedAgentProfile}
              showTeamView={showTeamView}
              onAgentSelect={onAgentSelect}
              onTaskSelect={onTaskSelect}
              onMessageSelect={onMessageSelect}
              onTeamSelect={onTeamSelect}
              onAgentProfileSelect={onAgentProfileSelect}
              onViewModeChange={onViewModeChange}
            />
          </div>

          {/* Detail Panel - Only show when not in team view and has selection */}
          {!showTeamView && hasSelection && (
            <div className="w-96 bg-card/30 dark:bg-card/30 border-l border-border/60 overflow-hidden flex-shrink-0">
              <DetailPanelRenderer
                selectedAgent={selectedAgent}
                selectedTask={selectedTask}
                selectedMessage={selectedMessage}
                selectedAgentProfile={selectedAgentProfile}
                onDismissSelection={onDismissSelection}
              />
            </div>
          )}
        </div>

        {/* Integrated User Presence Panel */}
        {!showTeamView && (
          <UserPresencePanel 
            viewMode={viewMode}
            componentId={`${viewMode}-view`}
            projectId="current-project"
            showPerformance={true}
            className="animate-in slide-in-from-bottom duration-300"
          />
        )}
      </div>
    </div>
  );
};
