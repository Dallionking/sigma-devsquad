
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
    <div className="min-h-screen bg-background flex flex-col">
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
        
        {/* Enhanced Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Dashboard Overview Section - Only show when in workflow mode */}
          {viewMode === "workflow" && (
            <DashboardOverview 
              agents={mockAgents}
              onAgentSelect={setSelectedAgent}
            />
          )}
          
          {/* Main Workflow Area */}
          <div className="flex-1">
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
        </div>
        
        <DetailPanel 
          selectedAgent={selectedAgent}
          selectedTask={selectedTask}
          selectedMessage={selectedMessage}
          viewMode={viewMode}
          agents={mockAgents}
        />
      </div>
      
      {showFooter && (
        <SystemFooter 
          onToggle={() => setShowFooter(!showFooter)}
          messages={mockMessages}
        />
      )}
      
      {/* Add the Agent Creation Button */}
      <AgentCreationButton />
    </div>
  );
};

export default Index;
