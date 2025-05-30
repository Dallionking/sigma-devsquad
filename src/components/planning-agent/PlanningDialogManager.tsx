
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EnhancedTaskAssignment } from "./EnhancedTaskAssignment";
import { WorkflowProgressTracker } from "@/components/workflow/WorkflowProgressTracker";

interface PlanningDialogManagerProps {
  showTaskAssignment: boolean;
  showWorkflowTracker: boolean;
  onTaskAssignmentChange: (show: boolean) => void;
  onWorkflowTrackerChange: (show: boolean) => void;
  onTaskCreate: (taskData: any) => void;
  onWorkflowAction: (action: string, ...args: any[]) => void;
}

export const PlanningDialogManager = ({
  showTaskAssignment,
  showWorkflowTracker,
  onTaskAssignmentChange,
  onWorkflowTrackerChange,
  onTaskCreate,
  onWorkflowAction
}: PlanningDialogManagerProps) => {
  // Mock data for enhanced components
  const mockAgentList = [
    {
      id: "frontend-1",
      name: "Frontend Agent Alpha",
      type: "Frontend",
      availability: "available" as const,
      workload: 45,
      expertise: ["React", "TypeScript", "UI/UX", "Responsive Design"]
    },
    {
      id: "backend-1", 
      name: "Backend Agent Beta",
      type: "Backend",
      availability: "busy" as const,
      workload: 85,
      expertise: ["Node.js", "PostgreSQL", "API Design", "Authentication"]
    },
    {
      id: "qa-1",
      name: "QA Agent Gamma",
      type: "QA",
      availability: "available" as const,
      workload: 30,
      expertise: ["Test Automation", "Performance Testing", "Bug Tracking"]
    }
  ];

  const mockExistingTasks = [
    { id: "task-1", title: "Setup authentication system" },
    { id: "task-2", title: "Create dashboard layout" },
    { id: "task-3", title: "Implement user management" }
  ];

  const mockWorkflow = {
    id: "workflow-1",
    name: "User Authentication Implementation",
    steps: [
      {
        id: "step-1",
        title: "Design Authentication Flow",
        description: "Create wireframes and user flow diagrams",
        status: "completed" as const,
        estimatedTime: 120,
        actualTime: 115
      },
      {
        id: "step-2", 
        title: "Setup Backend API",
        description: "Create authentication endpoints and middleware",
        status: "in-progress" as const,
        estimatedTime: 180
      },
      {
        id: "step-3",
        title: "Frontend Integration",
        description: "Connect frontend forms to authentication API",
        status: "pending" as const,
        estimatedTime: 150
      },
      {
        id: "step-4",
        title: "Testing & QA",
        description: "Comprehensive testing of authentication flow",
        status: "pending" as const,
        estimatedTime: 90
      }
    ],
    currentStepIndex: 1,
    startTime: new Date(Date.now() - 7200000), // 2 hours ago
    isActive: true
  };

  return (
    <>
      {/* Enhanced Task Assignment Dialog */}
      <Dialog open={showTaskAssignment} onOpenChange={onTaskAssignmentChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Enhanced Task Assignment</DialogTitle>
          </DialogHeader>
          <EnhancedTaskAssignment
            agents={mockAgentList}
            existingTasks={mockExistingTasks}
            onTaskCreate={onTaskCreate}
            onCancel={() => onTaskAssignmentChange(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Workflow Progress Tracker Dialog */}
      <Dialog open={showWorkflowTracker} onOpenChange={onWorkflowTrackerChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Workflow Progress Tracker</DialogTitle>
          </DialogHeader>
          <WorkflowProgressTracker
            workflow={mockWorkflow}
            onStepComplete={(stepId) => onWorkflowAction("complete-step", stepId)}
            onWorkflowPause={() => onWorkflowAction("pause")}
            onWorkflowResume={() => onWorkflowAction("resume")}
            onWorkflowRestart={() => onWorkflowAction("restart")}
            onWorkflowCancel={() => {
              onWorkflowAction("cancel");
              onWorkflowTrackerChange(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
