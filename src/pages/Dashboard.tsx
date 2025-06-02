
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MainLayoutContainer } from '@/components/dashboard/layout/MainLayoutContainer';
import { useAgents } from '@/contexts/AgentContext';
import { useTasks } from '@/contexts/TaskContext';
import { useMessages } from '@/contexts/MessageContext';
import { useTeams } from '@/contexts/TeamContext';
import { ViewMode } from '@/types';
import { Agent, Task, Message } from '@/types';
import { Team, AgentProfile } from '@/types/teams';

const Dashboard = () => {
  // State management
  const [viewMode, setViewMode] = useState<ViewMode>('workflow');
  const [showTeamView, setShowTeamView] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [syncPanelCollapsed, setSyncPanelCollapsed] = useState(true);
  
  // Selection state
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedAgentProfile, setSelectedAgentProfile] = useState<AgentProfile | null>(null);

  // Context data
  const { agents } = useAgents();
  const { tasks } = useTasks();
  const { messages } = useMessages();
  const { teams } = useTeams();

  // Check if any selection is active
  const hasSelection = !!(selectedAgent || selectedTask || selectedMessage || selectedTeam || selectedAgentProfile);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSyncPanelToggle = () => {
    setSyncPanelCollapsed(!syncPanelCollapsed);
  };

  const handleDismissSelection = () => {
    setSelectedAgent(null);
    setSelectedTask(null);
    setSelectedMessage(null);
    setSelectedTeam(null);
    setSelectedAgentProfile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
      </div>

      {/* Main Layout Container with Left Sidebar */}
      <MainLayoutContainer
        showTeamView={showTeamView}
        sidebarCollapsed={sidebarCollapsed}
        syncPanelCollapsed={syncPanelCollapsed}
        agents={agents}
        tasks={tasks}
        messages={messages}
        selectedAgent={selectedAgent}
        selectedTask={selectedTask}
        selectedMessage={selectedMessage}
        selectedTeam={selectedTeam}
        selectedAgentProfile={selectedAgentProfile}
        viewMode={viewMode}
        hasSelection={hasSelection}
        onSidebarToggle={handleSidebarToggle}
        onSyncPanelToggle={handleSyncPanelToggle}
        onAgentSelect={setSelectedAgent}
        onTaskSelect={setSelectedTask}
        onMessageSelect={setSelectedMessage}
        onTeamSelect={setSelectedTeam}
        onAgentProfileSelect={setSelectedAgentProfile}
        onDismissSelection={handleDismissSelection}
        onViewModeChange={setViewMode}
      />
    </div>
  );
};

export default Dashboard;
