
import React from 'react';
import { Button } from "@/components/ui/button";
import { SidebarRenderer } from "./SidebarRenderer";
import { MainContentRenderer } from "./MainContentRenderer";
import { DetailPanelRenderer } from "./DetailPanelRenderer";
import { SyncStatusPanel } from "@/components/sync/SyncStatusPanel";
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  syncPanelCollapsed,
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
  onSyncPanelToggle,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onTeamSelect,
  onAgentProfileSelect,
  onDismissSelection,
  onViewModeChange,
}: MainLayoutProps) => {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar - Team Hierarchy or Agent List */}
      <SidebarRenderer
        showTeamView={showTeamView}
        sidebarCollapsed={sidebarCollapsed}
        agents={agents}
        selectedAgent={selectedAgent}
        selectedTeam={selectedTeam}
        selectedAgentProfile={selectedAgentProfile}
        onAgentSelect={onAgentSelect}
        onTeamSelect={onTeamSelect}
        onAgentProfileSelect={onAgentProfileSelect}
        onToggleCollapse={onSidebarToggle}
      />
      
      {/* Main content area */}
      <main 
        id="main-content"
        className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-background via-background to-muted/20"
        role="main"
        aria-label="Main dashboard content"
      >
        <MainContentRenderer
          showTeamView={showTeamView}
          selectedTeam={selectedTeam}
          viewMode={viewMode}
          agents={agents}
          tasks={tasks}
          messages={messages}
          selectedAgent={selectedAgent}
          selectedTask={selectedTask}
          selectedMessage={selectedMessage}
          onTeamSelect={onTeamSelect}
          onAgentSelect={onAgentSelect}
          onTaskSelect={onTaskSelect}
          onMessageSelect={onMessageSelect}
          onAgentProfileSelect={onAgentProfileSelect}
          onViewModeChange={onViewModeChange}
        />
      </main>
      
      {/* Context-aware Detail Panel */}
      {hasSelection && (
        <div className="w-96 transition-all duration-300 animate-in slide-in-from-right flex-shrink-0 border-l bg-background">
          <div className="h-full overflow-hidden">
            <DetailPanelRenderer
              selectedAgent={selectedAgent}
              selectedTask={selectedTask}
              selectedMessage={selectedMessage}
              selectedAgentProfile={selectedAgentProfile}
              viewMode={viewMode}
              agents={agents}
              onDismiss={onDismissSelection}
            />
          </div>
        </div>
      )}
      
      {/* Sync Status Panel - Collapsible sidebar */}
      <div className={`border-l bg-background/95 backdrop-blur-sm transition-all duration-300 ${
        syncPanelCollapsed ? 'w-12' : 'w-80'
      }`}>
        <div className="h-full flex flex-col">
          {/* Collapse toggle button */}
          <div className="flex justify-between items-center p-2 border-b">
            {!syncPanelCollapsed && (
              <span className="text-sm font-medium text-muted-foreground">Sync Status</span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onSyncPanelToggle}
              className="p-1 h-8 w-8"
            >
              {syncPanelCollapsed ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          {/* Panel content */}
          <div className="flex-1 overflow-y-auto">
            {syncPanelCollapsed ? (
              <div className="p-2 flex flex-col items-center space-y-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              </div>
            ) : (
              <div className="p-4">
                <SyncStatusPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
