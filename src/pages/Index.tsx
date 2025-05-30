
import { useState } from "react";
import { AgentSidebar } from "@/components/dashboard/AgentSidebar";
import { MainWorkflowArea } from "@/components/dashboard/MainWorkflowArea";
import { DetailPanel } from "@/components/dashboard/DetailPanel";
import { Header } from "@/components/dashboard/Header";
import { SystemFooter } from "@/components/dashboard/SystemFooter";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { AgentCreationButton } from "@/components/agent-creation/AgentCreationButton";
import { useAgents } from "@/contexts/AgentContext";
import { ViewMode, Agent, Task, Message } from "@/types";
import { mockTasks, mockMessages } from "@/data/mockData";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("workflow");
  const [showFooter, setShowFooter] = useState(true);

  const { agents } = useAgents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col transition-all duration-300 ease-in-out">
      {/* Enhanced skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only-focusable"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
      {/* Enhanced header with better responsive design */}
      <Header 
        viewMode={viewMode} 
        onViewModeChange={setViewMode}
        agents={agents}
      />
      
      {/* Enhanced main layout with improved responsive behavior */}
      <div className="flex flex-1 overflow-hidden">
        <AgentSidebar 
          agents={agents}
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
          {/* Enhanced dashboard overview section with improved spacing and transitions */}
          {viewMode === "workflow" && (
            <div className="fade-in">
              <DashboardOverview 
                agents={agents}
                onAgentSelect={setSelectedAgent}
              />
            </div>
          )}
          
          {/* Enhanced main workflow area with better transitions and responsive design */}
          <div className="flex-1 transition-all duration-300 ease-in-out">
            <MainWorkflowArea 
              viewMode={viewMode}
              agents={agents}
              tasks={mockTasks}
              messages={mockMessages}
              selectedAgent={selectedAgent}
              selectedTask={selectedTask}
              selectedMessage={selectedMessage}
              onAgentSelect={setSelectedAgent}
              onTaskSelect={setSelectedTask}
              onMessageSelect={setSelectedMessage}
            />
          </div>
        </main>
        
        {/* Enhanced detail panel with improved responsive behavior */}
        <DetailPanel 
          selectedAgent={selectedAgent}
          selectedTask={selectedTask}
          selectedMessage={selectedMessage}
          viewMode={viewMode}
          agents={agents}
        />
      </div>
      
      {/* Enhanced footer with smooth animations and better responsive design */}
      {showFooter && (
        <div className="slide-in-from-bottom">
          <SystemFooter 
            onToggle={() => setShowFooter(!showFooter)}
            messages={mockMessages}
          />
        </div>
      )}
      
      {/* Enhanced floating action button with better positioning and animations */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="hover-scale">
          <AgentCreationButton />
        </div>
      </div>
    </div>
  );
};

export default Index;
