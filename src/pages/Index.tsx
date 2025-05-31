
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { SystemFooter } from "@/components/dashboard/SystemFooter";
import { AgentCreationButton } from "@/components/agent-creation/AgentCreationButton";
import { RealtimeNotifications } from "@/components/collaboration/RealtimeNotifications";
import { SyncStatusPanel } from "@/components/sync/SyncStatusPanel";
import { SyncStatusHeader } from "@/components/dashboard/SyncStatusHeader";
import { ViewToggle } from "@/components/dashboard/ViewToggle";
import { SidebarRenderer } from "@/components/dashboard/SidebarRenderer";
import { MainContentRenderer } from "@/components/dashboard/MainContentRenderer";
import { DetailPanelRenderer } from "@/components/dashboard/DetailPanelRenderer";
import { Button } from "@/components/ui/button";
import { useAgents } from "@/contexts/AgentContext";
import { useTasks } from "@/contexts/TaskContext";
import { useMessages } from "@/contexts/MessageContext";
import { useTeams } from "@/contexts/TeamContext";
import { ViewMode, Agent, Task, Message } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      <ViewToggle 
        showTeamView={showTeamView}
        onToggleView={setShowTeamView}
      />
      
      {/* Main layout with responsive behavior */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Team Hierarchy or Agent List */}
        <SidebarRenderer
          showTeamView={showTeamView}
          sidebarCollapsed={sidebarCollapsed}
          agents={agents || []}
          selectedAgent={selectedAgent}
          selectedTeam={selectedTeam}
          selectedAgentProfile={selectedAgentProfile}
          onAgentSelect={setSelectedAgent}
          onTeamSelect={setSelectedTeam}
          onAgentProfileSelect={setSelectedAgentProfile}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
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
            agents={agents || []}
            tasks={tasks || []}
            messages={messages || []}
            selectedAgent={selectedAgent}
            selectedTask={selectedTask}
            selectedMessage={selectedMessage}
            onTeamSelect={setSelectedTeam}
            onAgentSelect={setSelectedAgent}
            onTaskSelect={setSelectedTask}
            onMessageSelect={setSelectedMessage}
            onAgentProfileSelect={setSelectedAgentProfile}
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
                agents={agents || []}
                onDismiss={handleDismissSelection}
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
                onClick={() => setSyncPanelCollapsed(!syncPanelCollapsed)}
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
