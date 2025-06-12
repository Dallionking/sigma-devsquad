import React from "react";
import { StructuredLeftSidebar } from "@/components/navigation/StructuredLeftSidebar";
import { SystemFooter } from "@/components/dashboard/SystemFooter";
import { RealtimeNotifications } from "@/components/collaboration/RealtimeNotifications";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import { SkipToContentLink } from "@/components/dashboard/SkipToContentLink";
import { FloatingActionButton } from "@/components/dashboard/FloatingActionButton";
import { ContextualHelp } from "@/components/help/ContextualHelp";
import { KeyboardShortcutsOverlay } from "@/components/dashboard/KeyboardShortcutsOverlay";
import { useAgents } from "@/contexts/AgentContext";
import { useMessages } from "@/contexts/MessageContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { useState } from "react";
import WebContainerWorkspace from "@/components/ui/WebContainerWorkspace";

const Workspace = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFooter, setShowFooter] = useState(true);

  // Use centralized state management with proper error handling
  const agentContext = useAgents();
  const messageContext = useMessages();
  const { progress } = useOnboarding();

  // Ensure contexts are available before rendering
  if (!agentContext || !messageContext) {
    return <LoadingScreen />;
  }

  const { agents } = agentContext;
  const { messages } = messageContext;

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
      
      {/* Main Content Area */}
      <div className={cn(
        "main-content-area flex-1 flex flex-col",
        sidebarCollapsed && "sidebar-collapsed"
      )}>
        
        {/* Compact Notifications - Only essential notifications */}
        <div className="px-6 py-2 flex-shrink-0">
          <RealtimeNotifications />
        </div>
        
        {/* WebContainer Workspace - Full height */}
        <div className="flex-1 overflow-hidden">
          <WebContainerWorkspace />
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

export default Workspace;
