
import { useState } from "react";
import { AgentSidebar } from "@/components/dashboard/AgentSidebar";
import { MainWorkflowArea } from "@/components/dashboard/MainWorkflowArea";
import { DetailPanel } from "@/components/dashboard/DetailPanel";
import { Header } from "@/components/dashboard/Header";
import { SystemFooter } from "@/components/dashboard/SystemFooter";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { AgentCreationButton } from "@/components/agent-creation/AgentCreationButton";
import { useAgents } from "@/contexts/AgentContext";
import { useTasks } from "@/contexts/TaskContext";
import { useMessages } from "@/contexts/MessageContext";
import { ViewMode, Agent, Task, Message } from "@/types";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("workflow");
  const [showFooter, setShowFooter] = useState(true);

  // Use centralized state management with proper error handling
  const agentContext = useAgents();
  const taskContext = useTasks();
  const messageContext = useMessages();

  // Ensure contexts are available before rendering
  if (!agentContext || !taskContext || !messageContext) {
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
      
      {/* Preserved Header Navigation - MUST MAINTAIN ALL EXISTING FUNCTIONALITY */}
      <Header 
        viewMode={viewMode} 
        onViewModeChange={setViewMode}
        agents={agents || []}
      />
      
      {/* Optimized main layout with improved responsive behavior */}
      <div className="flex flex-1 overflow-hidden">
        {/* Collapsible Agent Sidebar */}
        <AgentSidebar 
          agents={agents || []}
          selectedAgent={selectedAgent}
          onAgentSelect={setSelectedAgent}
        />
        
        {/* Enhanced main content area with better responsive design and accessibility */}
        <main 
          id="main-content"
          className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-background via-background to-muted/20"
          role="main"
          aria-label="Main dashboard content"
        >
          {/* Enhanced dashboard overview section - only show in workflow mode */}
          {viewMode === "workflow" && (
            <div className="animate-in fade-in-50 duration-300">
              <DashboardOverview 
                agents={agents || []}
                onAgentSelect={setSelectedAgent}
              />
            </div>
          )}
          
          {/* Enhanced main workflow area with preserved communication functionality */}
          <div className="flex-1 transition-all duration-300 ease-in-out min-h-0">
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
          </div>
        </main>
        
        {/* Context-aware Detail Panel */}
        <DetailPanel 
          selectedAgent={selectedAgent}
          selectedTask={selectedTask}
          selectedMessage={selectedMessage}
          viewMode={viewMode}
          agents={agents || []}
        />
      </div>
      
      {/* Enhanced footer with smooth animations */}
      {showFooter && (
        <div className="animate-in slide-in-from-bottom duration-300">
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
