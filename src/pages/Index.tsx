
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { AgentSidebar } from "@/components/dashboard/AgentSidebar";
import { DetailPanel } from "@/components/dashboard/DetailPanel";
import { NotificationCenter } from "@/components/dashboard/NotificationCenter";
import { SystemFooter } from "@/components/dashboard/SystemFooter";
import { TouchGestureProvider } from "@/components/settings/TouchGestureProvider";
import { AccessibilityEnhancedSettings } from "@/components/settings/AccessibilityEnhancedSettings";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { ViewMode, Agent, Task, Message } from "@/types";
import { mockAgents, mockTasks, mockMessages } from "@/data/mockData";
import { cn } from "@/lib/utils";

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("workflow");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  
  const isMobile = useIsMobile();
  const { mobileOptimizations } = usePerformanceOptimization();

  const handleSwipeNavigation = (direction: 'left' | 'right') => {
    const modes: ViewMode[] = ["workflow", "communication", "tasks", "messages"];
    const currentIndex = modes.indexOf(viewMode);
    
    if (direction === 'left' && currentIndex < modes.length - 1) {
      setViewMode(modes[currentIndex + 1]);
    } else if (direction === 'right' && currentIndex > 0) {
      setViewMode(modes[currentIndex - 1]);
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-background via-background to-muted/20",
      mobileOptimizations.enableTouch && "touch-manipulation"
    )}>
      {/* Skip navigation for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only-focusable"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <Header 
        viewMode={viewMode} 
        onViewModeChange={setViewMode}
        agents={mockAgents}
      />
      
      <TouchGestureProvider
        onSwipeLeft={() => handleSwipeNavigation('left')}
        onSwipeRight={() => handleSwipeNavigation('right')}
      >
        <AccessibilityEnhancedSettings
          title="AI Agent Command Center"
          description="Monitor and control your AI agents from this centralized dashboard"
        >
          <ResponsiveContainer maxWidth="full" padding="none">
            <div className={cn(
              "flex min-h-[calc(100vh-4rem)]",
              isMobile ? "flex-col" : "flex-row"
            )}>
              {/* Sidebar - hidden on mobile in collapsed view */}
              {!isMobile && (
                <div className="w-80 border-r border-border bg-card">
                  <AgentSidebar
                    agents={mockAgents}
                    selectedAgent={selectedAgent}
                    onAgentSelect={setSelectedAgent}
                  />
                </div>
              )}

              {/* Main content area */}
              <main 
                id="main-content"
                className={cn(
                  "flex-1 overflow-hidden",
                  isMobile && "mobile-safe-area"
                )}
                role="main"
                aria-label="Dashboard main content"
              >
                <div className={cn(
                  "h-full",
                  isMobile ? "p-4" : "p-6"
                )}>
                  <DashboardOverview
                    agents={mockAgents}
                    tasks={mockTasks}
                    messages={mockMessages}
                    viewMode={viewMode}
                    selectedAgent={selectedAgent}
                    selectedTask={selectedTask}
                    selectedMessage={selectedMessage}
                    onAgentSelect={setSelectedAgent}
                    onTaskSelect={setSelectedTask}
                    onMessageSelect={setSelectedMessage}
                  />
                </div>
              </main>

              {/* Detail panel - mobile modal on mobile */}
              {!isMobile && (selectedAgent || selectedTask || selectedMessage) && (
                <div className="w-96 border-l border-border bg-card">
                  <DetailPanel
                    selectedAgent={selectedAgent}
                    selectedTask={selectedTask}
                    selectedMessage={selectedMessage}
                    onClose={() => {
                      setSelectedAgent(null);
                      setSelectedTask(null);
                      setSelectedMessage(null);
                    }}
                  />
                </div>
              )}
            </div>
          </ResponsiveContainer>
        </AccessibilityEnhancedSettings>
      </TouchGestureProvider>

      {/* Mobile detail panel as modal */}
      {isMobile && (selectedAgent || selectedTask || selectedMessage) && (
        <div className="fixed inset-0 z-50 bg-background mobile-safe-area">
          <DetailPanel
            selectedAgent={selectedAgent}
            selectedTask={selectedTask}
            selectedMessage={selectedMessage}
            onClose={() => {
              setSelectedAgent(null);
              setSelectedTask(null);
              setSelectedMessage(null);
            }}
          />
        </div>
      )}

      {/* Notification Center */}
      <NotificationCenter />
      
      {/* Footer */}
      <SystemFooter />
    </div>
  );
};

export default Index;
