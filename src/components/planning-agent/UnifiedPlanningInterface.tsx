
import { PlanningDialogManager } from "./PlanningDialogManager";
import { ResponsivePlanningLayout } from "./ResponsivePlanningLayout";

interface UnifiedPlanningInterfaceProps {
  selectedProject: string;
  onCreateTask?: () => void;
  onTrackWorkflow?: () => void;
}

export const UnifiedPlanningInterface = ({ 
  selectedProject, 
  onCreateTask, 
  onTrackWorkflow 
}: UnifiedPlanningInterfaceProps) => {
  return (
    <ResponsivePlanningLayout
      selectedProject={selectedProject}
      onCreateTask={onCreateTask}
      onTrackWorkflow={onTrackWorkflow}
    />
  );
};
