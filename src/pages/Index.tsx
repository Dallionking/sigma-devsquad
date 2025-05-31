
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { SystemFooter } from "@/components/dashboard/SystemFooter";
import { RealtimeNotifications } from "@/components/collaboration/RealtimeNotifications";
import { SyncStatusHeader } from "@/components/dashboard/SyncStatusHeader";
import { ViewToggle } from "@/components/dashboard/ViewToggle";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import { SkipToContentLink } from "@/components/dashboard/SkipToContentLink";
import { MainLayout } from "@/components/dashboard/MainLayout";
import { FloatingActionButton } from "@/components/dashboard/FloatingActionButton";
import { useAgents } from "@/contexts/AgentContext";
import { useTasks } from "@/contexts/TaskContext";
import { useMessages } from "@/contexts/MessageContext";
import { useTeams } from "@/contexts/TeamContext";
import { ViewMode, Agent, Task, Message } from "@/types";
import { Team, AgentProfile } from "@/types/teams";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedAgentProfile, setSelectedAgentProfile] = useState<AgentProfile | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("workflow");
  const [showFooter, setShowFooter] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showTeamView, setShowTeamView] = useState(true);
  const [syncPanelCollapsed, setSyncPanelCollapsed] = useState(false);

  // Use centralized state management with proper error handling
  const agentContext = useAgents();
  const taskContext = useTasks();
  const messageContext = useMessages();
  const teamContext = useTeams();

  // Ensure contexts are available before rendering
  if (!agentContext || !taskContext || !messageContext || !teamContext) {
    return <LoadingScreen />;
  }

  const { agents } = agentContext;
  const { tasks } = taskContext;
  const { messages } = messageContext;

  // Check if there's any selection to show the detail panel - properly convert to boolean
  const hasSelection = Boolean(selectedAgent || selectedTask || selectedMessage || selectedTeam || selectedAgentProfile);

  const handleDismissSelection = () => {
    setSelectedAgent(null);
    setSelectedTask(null);
    setSelectedMessage(null);
    setSelectedTeam(null);
    setSelectedAgentProfile(null);
  };

  const handleToggleView = (newShowTeamView: boolean) => {
    setShowTeamView(newShowTeamView);
    // Clear team-specific selections when switching views
    if (!newShowTeamView) {
      setSelectedTeam(null);
      setSelectedAgentProfile(null);
    } else {
      setSelectedAgent(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col transition-all duration-300 ease-in-out">
      <SkipToContentLink />
      
      {/* Header Navigation with Team Toggle */}
      <Header 
        viewMode={viewMode} 
        onViewModeChange={setViewMode}
        agents={agents || []}
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Sync Status Header */}
      <SyncStatusHeader />
      
      {/* Real-time Notifications */}
      <div className="px-4 py-2">
        <RealtimeNotifications />
      </div>
      
      {/* View Toggle */}
      <ViewToggle 
        showTeamView={showTeamView}
        onToggleView={handleToggleView}
      />
      
      {/* Main layout with responsive behavior */}
      <MainLayout
        showTeamView={showTeamView}
        sidebarCollapsed={sidebarCollapsed}
        syncPanelCollapsed={syncPanelCollapsed}
        agents={agents || []}
        tasks={tasks || []}
        messages={messages || []}
        selectedAgent={selectedAgent}
        selectedTask={selectedTask}
        selectedMessage={selectedMessage}
        selectedTeam={selectedTeam}
        selectedAgentProfile={selectedAgentProfile}
        viewMode={viewMode}
        hasSelection={hasSelection}
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSyncPanelToggle={() => setSyncPanelCollapsed(!syncPanelCollapsed)}
        onAgentSelect={setSelectedAgent}
        onTaskSelect={setSelectedTask}
        onMessageSelect={setSelectedMessage}
        onTeamSelect={setSelectedTeam}
        onAgentProfileSelect={setSelectedAgentProfile}
        onDismissSelection={handleDismissSelection}
      />
      
      {/* Enhanced footer with smooth animations */}
      {showFooter && (
        <div className="animate-in slide-in-from-bottom duration-300 flex-shrink-0">
          <SystemFooter 
            onToggle={() => setShowFooter(!showFooter)}
            messages={messages || []}
          />
        </div>
      )}
      
      {/* Enhanced floating action button */}
      <FloatingActionButton />
    </div>
  );
};

export default Index;
