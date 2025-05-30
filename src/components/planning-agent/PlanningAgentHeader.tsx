
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

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
      </div>
    </header>
  );
};
