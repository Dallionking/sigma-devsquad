
import { useState } from "react";
import { PlanningDialogManager } from "@/components/planning-agent/PlanningDialogManager";
import { PlanningAgentHeader } from "@/components/planning-agent/PlanningAgentHeader";
import { PlanningAgentSidebar } from "@/components/planning-agent/PlanningAgentSidebar";
import { PlanningAgentTabs } from "@/components/planning-agent/PlanningAgentTabs";
import { Header } from "@/components/dashboard/Header";
import { Agent } from "@/types";

const PlanningAgent = () => {
  const [selectedProject, setSelectedProject] = useState("ai-workforce");
  const [showTaskAssignment, setShowTaskAssignment] = useState(false);
  const [showWorkflowTracker, setShowWorkflowTracker] = useState(false);

  // Mock agents data for header
  const mockAgents: Agent[] = [
    { 
      id: "1", 
      type: "planning", 
      name: "Planning Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 75, 
      lastActive: "2024-05-30T10:30:00Z",
      capabilities: ["requirement-analysis", "project-planning"],
      specialization: "Project Planning",
      background: "Expert in project planning and requirements analysis",
      description: "Analyzes requirements and creates project roadmaps"
    },
    { 
      id: "2", 
      type: "frontend", 
      name: "Frontend Agent", 
      status: "idle", 
      currentTask: "Idle", 
      progress: 0, 
      lastActive: "2024-05-30T10:25:00Z",
      capabilities: ["react-development", "ui-design"],
      specialization: "Frontend Development",
      background: "Expert in React and modern frontend technologies",
      description: "Builds user interfaces and client-side functionality"
    },
    { 
      id: "3", 
      type: "backend", 
      name: "Backend Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 45, 
      lastActive: "2024-05-30T10:32:00Z",
      capabilities: ["api-development", "database-design"],
      specialization: "Backend Development",
      background: "Expert in server-side development and APIs",
      description: "Develops server-side logic and API endpoints"
    }
  ];

  const handleTaskCreate = (taskData: any) => {
    console.log("Creating task:", taskData);
    setShowTaskAssignment(false);
    // Here you would typically send the task data to your backend
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
        agents={mockAgents}
      />

      <main id="main-content" className="container-responsive py-responsive fade-in">
        <PlanningAgentHeader 
          onCreateTask={() => setShowTaskAssignment(true)}
          onTrackWorkflow={() => setShowWorkflowTracker(true)}
        />

        {/* Enhanced grid layout with better responsive design */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-responsive">
          <PlanningAgentSidebar selectedProject={selectedProject} />
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
