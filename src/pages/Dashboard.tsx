
import { useState } from "react";
import { StructuredLeftSidebar } from "@/components/navigation/StructuredLeftSidebar";
import { SystemFooter } from "@/components/dashboard/SystemFooter";
import { RealtimeNotifications } from "@/components/collaboration/RealtimeNotifications";
import { ViewToggle } from "@/components/dashboard/ViewToggle";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import { SkipToContentLink } from "@/components/dashboard/SkipToContentLink";
import { MainLayout } from "@/components/dashboard/MainLayout";
import { FloatingActionButton } from "@/components/dashboard/FloatingActionButton";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { SampleProjectsModal } from "@/components/sample-projects/SampleProjectsModal";
import { ContextualHelp } from "@/components/help/ContextualHelp";
import { KeyboardShortcutsOverlay } from "@/components/dashboard/KeyboardShortcutsOverlay";
import { useAgents } from "@/contexts/AgentContext";
import { useTasks } from "@/contexts/TaskContext";
import { useMessages } from "@/contexts/MessageContext";
import { useTeams } from "@/contexts/TeamContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useViewSwitchingShortcuts } from "@/hooks/useViewSwitchingShortcuts";
import { ViewMode, Agent, Task, Message } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const Dashboard = () => {
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
  const [showSampleProjects, setShowSampleProjects] = useState(false);

  // Use centralized state management with proper error handling
  const agentContext = useAgents();
  const taskContext = useTasks();
  const messageContext = useMessages();
  const teamContext = useTeams();
  const { progress } = useOnboarding();

  // Ensure contexts are available before rendering
  if (!agentContext || !taskContext || !messageContext || !teamContext) {
    return <LoadingScreen />;
  }

  const { agents } = agentContext;
  const { tasks } = taskContext;
  const { messages } = messageContext;

  // Check if there's any selection to show the detail panel
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

  // Initialize keyboard shortcuts for view switching
  useViewSwitchingShortcuts({
    showTeamView,
    onToggleView: handleToggleView,
    enabled: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-vibe-primary/5 flex transition-all duration-300 ease-in-out">
      <SkipToContentLink />
      
      {/* Structured Left Sidebar */}
      <StructuredLeftSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeAgents={agents?.filter(a => a.status === 'working').length || 0}
        totalAgents={agents?.length || 0}
      />
      
      {/* Main Content Area - Clean layout without redundant navigation */}
      <div className={cn(
        "main-content-area",
        sidebarCollapsed && "sidebar-collapsed"
      )}>
        
        {/* Compact Notifications - Only essential notifications */}
        <div className="px-6 py-2">
          <RealtimeNotifications />
        </div>
        
        {/* View Toggle */}
        <ViewToggle 
          showTeamView={showTeamView}
          onToggleView={handleToggleView}
        />

        {/* Onboarding Progress */}
        {!progress.isOnboardingComplete && (
          <div className="px-6 py-2">
            <OnboardingProgress />
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex-1 px-6 pb-6">
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
            onViewModeChange={setViewMode}
          />
        </div>
        
        {/* Enhanced footer */}
        {showFooter && (
          <div className="animate-in slide-in-from-bottom duration-300 flex-shrink-0">
            <SystemFooter 
              onToggle={() => setShowFooter(!showFooter)}
              messages={messages || []}
            />
          </div>
        )}
      </div>
      
      {/* Enhanced floating action button */}
      <FloatingActionButton />

      {/* Sample Projects Modal */}
      <SampleProjectsModal 
        open={showSampleProjects}
        onOpenChange={setShowSampleProjects}
      />

      {/* Onboarding Modal */}
      <OnboardingModal />
      
      {/* Keyboard Shortcuts Overlay */}
      <KeyboardShortcutsOverlay />
      
      {/* Toast Notifications */}
      <Toaster />
      
      {/* Vibe DevSquad subtle background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-vibe-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-vibe-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/3 w-48 h-48 bg-vibe-accent/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Dashboard;
