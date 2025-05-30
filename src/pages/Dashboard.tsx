
import { useState } from "react";
import { AgentSidebar } from "@/components/dashboard/AgentSidebar";
import { WorkflowVisualization } from "@/components/dashboard/WorkflowVisualization";
import { CommunicationGraph } from "@/components/dashboard/CommunicationGraph";
import { TaskManagement } from "@/components/dashboard/TaskManagement";
import { EnhancedAgentCard } from "@/components/cards/EnhancedAgentCard";
import { EnhancedTaskCard } from "@/components/cards/EnhancedTaskCard";
import { AgentCreationButton } from "@/components/agent-creation/AgentCreationButton";
import { useAgents } from "@/contexts/AgentContext";
import { useTasks } from "@/contexts/TaskContext";
import { useMessages } from "@/contexts/MessageContext";
import { Agent, Task, Message } from "@/types";

const Dashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeView, setActiveView] = useState<"workflow" | "communication" | "tasks">("workflow");

  // Use centralized state management
  const { agents } = useAgents();
  const { tasks } = useTasks();
  const { messages } = useMessages();

  const handleAgentSelect = (agent: Agent | null) => {
    setSelectedAgent(agent);
    setSelectedTask(null);
    setSelectedMessage(null);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case "workflow":
        return (
          <WorkflowVisualization
            agents={agents}
            tasks={tasks}
            selectedAgent={selectedAgent}
            onAgentSelect={handleAgentSelect}
          />
        );
      case "communication":
        return (
          <CommunicationGraph
            agents={agents}
            messages={messages}
            selectedAgent={selectedAgent}
            onAgentSelect={handleAgentSelect}
            onMessageSelect={setSelectedMessage}
          />
        );
      case "tasks":
        return (
          <TaskManagement
            tasks={tasks}
            agents={agents}
            selectedTask={selectedTask}
            onTaskSelect={setSelectedTask}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <AgentSidebar
        agents={agents}
        selectedAgent={selectedAgent}
        onAgentSelect={handleAgentSelect}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {/* View Toggle */}
          <div className="mb-6 flex space-x-2">
            {[
              { key: "workflow", label: "Workflow" },
              { key: "communication", label: "Communication" },
              { key: "tasks", label: "Tasks" }
            ].map((view) => (
              <button
                key={view.key}
                onClick={() => setActiveView(view.key as any)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeView === view.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
          
          {renderMainContent()}
        </div>
      </main>
      
      <AgentCreationButton />
    </div>
  );
};

export default Dashboard;
