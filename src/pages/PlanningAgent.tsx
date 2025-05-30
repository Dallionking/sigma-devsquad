
import { useState } from "react";
import { PlanningDialogManager } from "@/components/planning-agent/PlanningDialogManager";
import { PlanningAgentHeader } from "@/components/planning-agent/PlanningAgentHeader";
import { PlanningAgentSidebar } from "@/components/planning-agent/PlanningAgentSidebar";
import { PlanningAgentTabs } from "@/components/planning-agent/PlanningAgentTabs";
import { Header } from "@/components/dashboard/Header";
import { useAgents } from "@/contexts/AgentContext";
import { useTasks } from "@/contexts/TaskContext";
import { useMessages } from "@/contexts/MessageContext";
import { useProjects } from "@/contexts/ProjectContext";

const PlanningAgent = () => {
  const [showTaskAssignment, setShowTaskAssignment] = useState(false);
  const [showWorkflowTracker, setShowWorkflowTracker] = useState(false);

  // Use centralized state management
  const { agents } = useAgents();
  const { addTask } = useTasks();
  const { addMessage } = useMessages();
  const { currentProject } = useProjects();

  const handleTaskCreate = (taskData: any) => {
    console.log("Creating task:", taskData);
    addTask(taskData);
    setShowTaskAssignment(false);
    
    // Also create a message about the task creation
    addMessage({
      from: "planning",
      to: taskData.assignedAgent,
      content: `New task assigned: ${taskData.title}`,
      type: "notification"
    });
  };

  const handleWorkflowAction = (action: string, ...args: any[]) => {
    console.log("Workflow action:", action, args);
    // Handle workflow state changes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only-focusable"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={agents}
      />

      <main id="main-content" className="container-responsive py-responsive fade-in">
        <PlanningAgentHeader 
          onCreateTask={() => setShowTaskAssignment(true)}
          onTrackWorkflow={() => setShowWorkflowTracker(true)}
        />

        {/* Enhanced grid layout with better responsive design */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-responsive">
          <PlanningAgentSidebar selectedProject={currentProject?.id || "ai-workforce"} />
          <PlanningAgentTabs onWorkflowAction={handleWorkflowAction} />
        </div>

        {/* Enhanced Dialog Manager */}
        <PlanningDialogManager
          showTaskAssignment={showTaskAssignment}
          showWorkflowTracker={showWorkflowTracker}
          onTaskAssignmentChange={setShowTaskAssignment}
          onWorkflowTrackerChange={setShowWorkflowTracker}
          onTaskCreate={handleTaskCreate}
          onWorkflowAction={handleWorkflowAction}
        />
      </main>
    </div>
  );
};

export default PlanningAgent;
