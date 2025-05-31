import { useState } from "react";
import { AgentSidebar } from "@/components/dashboard/AgentSidebar";
import { MainWorkflowArea } from "@/components/dashboard/MainWorkflowArea";
import { DetailPanel } from "@/components/dashboard/DetailPanel";
import { Header } from "@/components/dashboard/Header";
import { SystemFooter } from "@/components/dashboard/SystemFooter";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { AgentCreationButton } from "@/components/agent-creation/AgentCreationButton";
import { TeamHierarchy } from "@/components/teams/TeamHierarchy";
import { TeamDashboard } from "@/components/teams/TeamDashboard";
import { AgentCommunicationInterface } from "@/components/teams/AgentCommunicationInterface";
import { TeamsWorkflowVisualization } from "@/components/teams/TeamsWorkflowVisualization";
import { RealtimeNotifications } from "@/components/collaboration/RealtimeNotifications";
import { useAgents } from "@/contexts/AgentContext";
import { useTasks } from "@/contexts/TaskContext";
import { useMessages } from "@/contexts/MessageContext";
import { useTeams } from "@/contexts/TeamContext";
import { ViewMode, Agent, Task, Message } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { SyncStatusPanel } from "@/components/sync/SyncStatusPanel";
import { SyncStatusHeader } from "@/components/dashboard/SyncStatusHeader";

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

  // Use centralized state management with proper error handling
  const agentContext = useAgents();
  const taskContext = useTasks();
  const messageContext = useMessages();
  const teamContext = useTeams();

  // Ensure contexts are available before rendering
  if (!agentContext || !taskContext || !messageContext || !teamContext) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const { agents } = agentContext;
  const { tasks } = taskContext;
  const { messages } = messageContext;

  // Check if there's any selection to show the detail panel
  const hasSelection = selectedAgent || selectedTask || selectedMessage || selectedTeam || selectedAgentProfile;

  const handleDismissSelection = () => {
    setSelectedAgent(null);
    setSelectedTask(null);
    setSelectedMessage(null);
    setSelectedTeam(null);
    setSelectedAgentProfile(null);
  };

  const renderMainContent = () => {
    if (showTeamView) {
      // Show team-based interface
      if (selectedTeam) {
        return <TeamDashboard team={selectedTeam} />;
      }
      return (
        <TeamsWorkflowVisualization
          onTeamSelect={setSelectedTeam}
          onAgentSelect={setSelectedAgentProfile}
        />
      );
    } else {
      // Show original agent-based interface
      return (
        <MainWorkflowArea 
          viewMode={viewMode}
          agents={agents || []}
          tasks={tasks || []}
          messages={messages || []}
          selectedAgent={selectedAgent}
          selectedTask={selectedTask}
          selectedMessage={selectedMessage}
          onAgentSelect={setSelectedAgent}
          onTaskSelect={setSelectedTask}
          onMessageSelect={setSelectedMessage}
        />
      );
    }
  };

  const renderSidebar = () => {
    if (showTeamView) {
      return (
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-80'}`}>
          <TeamHierarchy
            onTeamSelect={setSelectedTeam}
            onAgentSelect={setSelectedAgentProfile}
            selectedTeamId={selectedTeam?.id}
            selectedAgentId={selectedAgentProfile?.id}
          />
        </div>
      );
    } else {
      return (
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
          <AgentSidebar 
            agents={agents || []}
            selectedAgent={selectedAgent}
            onAgentSelect={setSelectedAgent}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>
      );
    }
  };

  const renderDetailPanel = () => {
    if (selectedAgentProfile) {
      return (
        <AgentCommunicationInterface
          agent={selectedAgentProfile}
          onClose={handleDismissSelection}
        />
      );
    }
    
    if (hasSelection) {
      return (
        <DetailPanel 
          selectedAgent={selectedAgent}
          selectedTask={selectedTask}
          selectedMessage={selectedMessage}
          viewMode={viewMode}
          agents={agents || []}
          onDismiss={handleDismissSelection}
        />
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col transition-all duration-300 ease-in-out">
      {/* Enhanced skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
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
      <div className="bg-background border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTeamView(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              showTeamView 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            🏢 Team View
          </button>
          <button
            onClick={() => setShowTeamView(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !showTeamView 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            👤 Individual Agents
          </button>
        </div>
      </div>
      
      {/* Main layout with responsive behavior */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Team Hierarchy or Agent List */}
        {renderSidebar()}
        
        {/* Main content area */}
        <main 
          id="main-content"
          className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-background via-background to-muted/20"
          role="main"
          aria-label="Main dashboard content"
        >
          {/* Dashboard overview section - only show in workflow mode and individual view */}
          {viewMode === "workflow" && !showTeamView && (
            <div className="animate-in fade-in-50 duration-300 flex-shrink-0">
              <DashboardOverview 
                agents={agents || []}
                onAgentSelect={setSelectedAgent}
              />
            </div>
          )}
          
          {/* Main content area */}
          <div className="flex-1 transition-all duration-300 ease-in-out min-h-0 p-6">
            {renderMainContent()}
          </div>
        </main>
        
        {/* Context-aware Detail Panel */}
        {hasSelection && (
          <div className="w-96 transition-all duration-300 animate-in slide-in-from-right flex-shrink-0 border-l bg-background">
            <div className="h-full overflow-hidden">
              {renderDetailPanel()}
            </div>
          </div>
        )}
        
        {/* Sync Status Panel - Fixed position sidebar */}
        <div className="w-80 border-l bg-background/95 backdrop-blur-sm">
          <div className="h-full overflow-y-auto p-4">
            <SyncStatusPanel />
          </div>
        </div>
      </div>
      
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
      <div className="fixed bottom-6 right-6 z-50">
        <div className="transition-transform hover:scale-105 duration-200">
          <AgentCreationButton />
        </div>
      </div>
    </div>
  );
};

export default Index;
