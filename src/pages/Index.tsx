
import { useState } from "react";
import { AgentSidebar } from "@/components/dashboard/AgentSidebar";
import { MainWorkflowArea } from "@/components/dashboard/MainWorkflowArea";
import { DetailPanel } from "@/components/dashboard/DetailPanel";
import { Header } from "@/components/dashboard/Header";
import { SystemFooter } from "@/components/dashboard/SystemFooter";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { AgentCreationButton } from "@/components/agent-creation/AgentCreationButton";
import { ViewMode, Agent, Task, Message } from "@/types";
import { mockAgents, mockTasks, mockMessages } from "@/data/mockData";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("workflow");
  const [showFooter, setShowFooter] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col transition-all duration-300 ease-in-out">
      {/* Skip to main content for accessibility */}
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
      
      <div className="flex flex-1 overflow-hidden">
        <AgentSidebar 
          agents={mockAgents}
          selectedAgent={selectedAgent}
          onAgentSelect={setSelectedAgent}
        />
        
        {/* Enhanced Main Content Area with better responsive design */}
        <main 
          id="main-content"
          className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-background via-background to-muted/20"
          role="main"
          aria-label="Main dashboard content"
        >
          {/* Dashboard Overview Section - Enhanced with better spacing */}
          {viewMode === "workflow" && (
            <div className="fade-in">
              <DashboardOverview 
                agents={mockAgents}
                onAgentSelect={setSelectedAgent}
              />
            </div>
          )}
          
          {/* Main Workflow Area with enhanced transitions */}
          <div className="flex-1 transition-all duration-300 ease-in-out">
            <MainWorkflowArea 
              viewMode={viewMode}
              agents={mockAgents}
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
        
        <DetailPanel 
          selectedAgent={selectedAgent}
          selectedTask={selectedTask}
          selectedMessage={selectedMessage}
          viewMode={viewMode}
          agents={mockAgents}
        />
      </div>
      
      {/* Enhanced footer with smooth transitions */}
      {showFooter && (
        <div className="slide-in-from-bottom">
          <SystemFooter 
            onToggle={() => setShowFooter(!showFooter)}
            messages={mockMessages}
          />
        </div>
      )}
      
      {/* Enhanced floating action button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AgentCreationButton />
      </div>
    </div>
  );
};

export default Index;
