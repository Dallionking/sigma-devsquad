
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Agent } from "@/types";

interface TaskCardMetricsProps {
  priority: string;
  status: string;
  deadline: string;
  assignedAgent?: Agent;
}

export const TaskCardMetrics = ({ priority, status, deadline, assignedAgent }: TaskCardMetricsProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-700 border-red-200";
      case "medium": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getDaysUntilDeadline = () => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDeadline = getDaysUntilDeadline();

  return (
    <div className="space-y-3">
      {/* Priority and Status */}
      <div className="flex items-center justify-between">
        <Badge 
          variant="outline"
          className={cn("text-xs", getPriorityColor(priority))}
        >
          {priority} priority
        </Badge>
        
        <Badge variant="secondary" className="text-xs capitalize">
          {status.replace("-", " ")}
        </Badge>
      </div>

      {/* Assignment and Deadline */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <User className="w-3 h-3 text-muted-foreground" />
          <span className="text-muted-foreground">
            {assignedAgent?.name || "Unassigned"}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          <span className={cn(
            "text-muted-foreground",
            daysUntilDeadline < 0 && "text-red-600 font-medium",
            daysUntilDeadline <= 2 && daysUntilDeadline >= 0 && "text-yellow-600 font-medium"
          )}>
            {daysUntilDeadline < 0 
              ? `${Math.abs(daysUntilDeadline)}d overdue`
              : daysUntilDeadline === 0 
              ? "Due today"
              : `${daysUntilDeadline}d left`
            }
          </span>
        </div>
      </div>

      {/* Progress */}
      {status === "in-progress" && assignedAgent?.progress && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{assignedAgent.progress}%</span>
          </div>
          <Progress value={assignedAgent.progress} className="h-2" />
        </div>
      )}
    </div>
  );
};
