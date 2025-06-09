
import { Sparkles } from "lucide-react";

interface TaskPreviewProps {
  title: string;
  priority: string;
  estimatedHours: number;
  assignedAgent?: string;
}

export const TaskPreview = ({ title, priority, estimatedHours, assignedAgent }: TaskPreviewProps) => {
  if (!title || !priority) return null;

  return (
    <div className="p-3 bg-muted/50 rounded-lg border space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="font-medium">Task Preview</span>
      </div>
      <div className="text-sm text-muted-foreground">
        <strong>{title}</strong> • {priority} priority • {estimatedHours}h estimated
        {assignedAgent && ` • Assigned to ${assignedAgent}`}
      </div>
    </div>
  );
};
