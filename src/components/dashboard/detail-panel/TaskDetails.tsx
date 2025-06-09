
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Task, Agent } from "@/types";
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskDetailsProps {
  task: Task;
  agents: Agent[];
}

export const TaskDetails = ({ task, agents }: TaskDetailsProps) => {
  const agent = agents.find(a => a.type === task.assignedAgent);
  
  const statusConfig = {
    pending: { icon: Clock, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
    "in-progress": { icon: Play, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
    completed: { icon: CheckCircle, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
    blocked: { icon: AlertCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" }
  };

  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  const priorityConfig = {
    high: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300",
    medium: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
    low: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
  };

  return (
    <div className="space-y-6">
      {/* Task Header */}
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-2">{task.title}</h3>
        <div className="flex items-center space-x-2">
          <Badge 
            variant="secondary" 
            className={cn(config.bg, config.color)}
          >
            <StatusIcon className="w-3 h-3 mr-1" />
            {task.status}
          </Badge>
          <Badge 
            variant="secondary" 
            className={priorityConfig[task.priority]}
          >
            {task.priority} priority
          </Badge>
        </div>
      </div>

      {/* Task Description */}
      <Card className="p-4">
        <h4 className="font-medium text-card-foreground mb-2">Description</h4>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </Card>

      {/* Task Details */}
      <Card className="p-4">
        <h4 className="font-medium text-card-foreground mb-3">Details</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Assigned Agent</span>
            <span className="text-sm text-card-foreground">{agent?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Created</span>
            <span className="text-sm text-card-foreground">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Deadline</span>
            <span className="text-sm text-card-foreground">
              {new Date(task.deadline).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Task ID</span>
            <span className="text-sm text-card-foreground font-mono">{task.id}</span>
          </div>
        </div>
      </Card>

      {/* Progress */}
      {agent?.status === "working" && task.status === "in-progress" && (
        <Card className="p-4">
          <h4 className="font-medium text-card-foreground mb-3">Progress</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completion</span>
              <span className="text-card-foreground font-medium">{agent.progress}%</span>
            </div>
            <Progress value={agent.progress} className="h-2" />
          </div>
        </Card>
      )}
    </div>
  );
};
