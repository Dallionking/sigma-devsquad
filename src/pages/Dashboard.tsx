
import { useState } from "react";
import { StreamlinedHeader } from "@/components/navigation/StreamlinedHeader";
import { VibeBrandHeader } from "@/components/branding/VibeBrandHeader";
import { MainLayout } from "@/components/dashboard/MainLayout";
import { useAgents } from "@/contexts/AgentContext";
import { useTasks } from "@/contexts/TaskContext";
import { useMessages } from "@/contexts/MessageContext";
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";

const Dashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedAgentProfile, setSelectedAgentProfile] = useState<AgentProfile | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("workflow");
  const [showTeamView, setShowTeamView] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [syncPanelCollapsed, setSyncPanelCollapsed] = useState(true);

  // Use centralized state management
  const { agents } = useAgents();
  const { tasks } = useTasks();
  const { messages } = useMessages();

  const handleAgentSelect = (agent: Agent | null) => {
    setSelectedAgent(agent);
    setSelectedTask(null);
    setSelectedMessage(null);
  };

  const handleTaskSelect = (task: Task | null) => {
    setSelectedTask(task);
    setSelectedAgent(null);
    setSelectedMessage(null);
  };

  const handleMessageSelect = (message: Message | null) => {
    setSelectedMessage(message);
    setSelectedAgent(null);
    setSelectedTask(null);
  };

  const handleTeamSelect = (team: Team | null) => {
    setSelectedTeam(team);
    setSelectedAgentProfile(null);
    setShowTeamView(!!team);
    // Auto-expand sidebar when entering team view to show team content
    if (team) {
      setSidebarCollapsed(false);
    }
  };

  const handleAgentProfileSelect = (profile: AgentProfile | null) => {
    setSelectedAgentProfile(profile);
    setSelectedTeam(null);
  };

  const handleDismissSelection = () => {
    setSelectedAgent(null);
    setSelectedTask(null);
    setSelectedMessage(null);
    setSelectedAgentProfile(null);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const hasSelection = !!(selectedAgent || selectedTask || selectedMessage || selectedAgentProfile);
  const activeAgents = agents.filter(agent => agent.status === "working").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Streamlined Header with integrated sync status */}
      <StreamlinedHeader
        activeAgents={activeAgents}
        totalAgents={agents.length}
        onSidebarToggle={handleSidebarToggle}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Vibe Brand Header - only show on main dashboard */}
        {!selectedTeam && (
          <div className="px-6 py-8 border-b bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm">
            <VibeBrandHeader />
          </div>
        )}
        
        {/* Main Layout */}
        <MainLayout
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
          onSyncPanelToggle={() => setSyncPanelCollapsed(!syncPanelCollapsed)}
          onAgentSelect={handleAgentSelect}
          onTaskSelect={handleTaskSelect}
          onMessageSelect={handleMessageSelect}
          onTeamSelect={handleTeamSelect}
          onAgentProfileSelect={handleAgentProfileSelect}
          onDismissSelection={handleDismissSelection}
          onViewModeChange={setViewMode}
        />
      </div>
    </div>
  );
};

export default Dashboard;
