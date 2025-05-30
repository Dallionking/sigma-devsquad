
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Target, Activity } from "lucide-react";

interface PlanningAgentHeaderProps {
  onCreateTask: () => void;
  onTrackWorkflow: () => void;
}

export const PlanningAgentHeader = ({ onCreateTask, onTrackWorkflow }: PlanningAgentHeaderProps) => {
  return (
    <header className="mb-responsive">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-primary mb-4">
            Planning Agent
          </h1>
          <p className="text-muted-enhanced max-w-3xl">
            Intelligent project planning and requirement analysis
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Badge variant="secondary" className="status-success flex items-center gap-2 self-start sm:self-center">
            <Activity className="w-3 h-3" />
            Agent Active
          </Badge>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={onCreateTask}
              className="btn-primary-enhanced gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </Button>
            <Button 
              variant="outline"
              onClick={onTrackWorkflow}
              className="btn-secondary-enhanced gap-2"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Track Workflow</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
