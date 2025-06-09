
import { ContextPanel } from "@/components/planning-agent/ContextPanel";
import { TaskMasterIntegration } from "@/components/planning-agent/TaskMasterIntegration";
import { ResearchPanel } from "@/components/planning-agent/ResearchPanel";

interface PlanningAgentSidebarProps {
  selectedProject: string;
}

export const PlanningAgentSidebar = ({ selectedProject }: PlanningAgentSidebarProps) => {
  return (
    <div className="lg:col-span-1 order-2 lg:order-2 space-y-responsive">
      <div className="card-enhanced">
        <ContextPanel selectedProject={selectedProject} />
      </div>
      <div className="card-enhanced">
        <TaskMasterIntegration />
      </div>
      <div className="card-enhanced">
        <ResearchPanel />
      </div>
    </div>
  );
};
