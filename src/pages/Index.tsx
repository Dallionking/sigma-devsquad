
import { useState } from "react";
import { CollapsibleAgentSidebar } from "@/components/dashboard/CollapsibleAgentSidebar";
import { ContextAwarePanel } from "@/components/dashboard/ContextAwarePanel";
import { IntegratedCommunicationHub } from "@/components/dashboard/IntegratedCommunicationHub";
import { OptimizedHeader } from "@/components/dashboard/OptimizedHeader";
import { useAgents } from "@/contexts/AgentContext";
import { useTasks } from "@/contexts/TaskContext";
import { useMessages } from "@/contexts/MessageContext";
import { ViewMode, Agent, Task, Message } from "@/types";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("workflow");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelVisible, setRightPanelVisible] = useState(false);

  // Use centralized state management
  const { agents } = useAgents();
  const { tasks } = useTasks();
  const { messages } = useMessages();

  const handleAgentSelect = (agent: Agent | null) => {
    setSelectedAgent(agent);
    setSelectedTask(null);
    setSelectedMessage(null);
    setRightPanelVisible(!!agent);
  };

  const handleTaskSelect = (task: Task | null) => {
    setSelectedTask(task);
    setSelectedAgent(null);
    setSelectedMessage(null);
    setRightPanelVisible(!!task);
  };

  const handleMessageSelect = (message: Message | null) => {
    setSelectedMessage(message);
    setSelectedAgent(null);
    setSelectedTask(null);
    setRightPanelVisible(!!message);
  };

  const handlePanelDismiss = () => {
    setRightPanelVisible(false);
    setSelectedAgent(null);
    setSelectedTask(null);
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
      {/* Optimized Header */}
      <OptimizedHeader 
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        agents={agents}
      />
      
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Collapsible Agent Sidebar */}
        <CollapsibleAgentSidebar 
          agents={agents}
          selectedAgent={selectedAgent}
          onAgentSelect={handleAgentSelect}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Main Content Area */}
        <main 
          id="main-content"
          className={`flex-1 flex transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'ml-16' : 'ml-70'
          } ${rightPanelVisible ? 'mr-80' : 'mr-0'}`}
          role="main"
          aria-label="Main dashboard content"
        >
          <IntegratedCommunicationHub 
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            agents={agents}
            tasks={tasks}
            messages={messages}
            selectedAgent={selectedAgent}
            selectedTask={selectedTask}
            selectedMessage={selectedMessage}
            onAgentSelect={handleAgentSelect}
            onTaskSelect={handleTaskSelect}
            onMessageSelect={handleMessageSelect}
          />
        </main>
        
        {/* Context-Aware Right Panel */}
        {rightPanelVisible && (
          <ContextAwarePanel 
            selectedAgent={selectedAgent}
            selectedTask={selectedTask}
            selectedMessage={selectedMessage}
            agents={agents}
            onDismiss={handlePanelDismiss}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
