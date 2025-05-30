
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, Calendar, ArrowRight, User, AlertTriangle, 
  CheckCircle, Play, MoreVertical, GitBranch 
} from "lucide-react";
import { Task, Agent } from "@/types";
import { cn } from "@/lib/utils";

interface EnhancedTaskCardProps {
  task: Task;
  agents: Agent[];
  dependencies?: Task[];
  onAssign?: (agentType: string) => void;
  onUpdatePriority?: (priority: string) => void;
  onUpdateStatus?: (status: string) => void;
  compact?: boolean;
}

export const EnhancedTaskCard = ({ 
  task, 
  agents, 
  dependencies = [],
  onAssign, 
  onUpdatePriority,
  onUpdateStatus,
  compact = false 
}: EnhancedTaskCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const assignedAgent = agents.find(a => a.type === task.assignedAgent);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-700 border-red-200";
      case "medium": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in-progress": return <Play className="w-4 h-4 text-blue-600" />;
      case "blocked": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getDaysUntilDeadline = () => {
    const deadline = new Date(task.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDeadline = getDaysUntilDeadline();

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg",
      task.status === "blocked" && "border-red-200 bg-red-50/50",
      task.status === "completed" && "border-green-200 bg-green-50/50",
      compact ? "p-3" : "p-4"
    )}>
      <CardHeader className={cn("pb-3", compact && "pb-2")}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              {getStatusIcon()}
              <h3 className="font-semibold text-sm line-clamp-1">{task.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Priority and Status */}
        <div className="flex items-center justify-between">
          <Badge 
            variant="outline"
            className={cn("text-xs", getPriorityColor(task.priority))}
          >
            {task.priority} priority
          </Badge>
          
          <Badge variant="secondary" className="text-xs capitalize">
            {task.status.replace("-", " ")}
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
        {task.status === "in-progress" && assignedAgent?.progress && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{assignedAgent.progress}%</span>
            </div>
            <Progress value={assignedAgent.progress} className="h-2" />
          </div>
        )}

        {/* Dependencies */}
        {!compact && dependencies.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <GitBranch className="w-3 h-3" />
              <span>Dependencies ({dependencies.length})</span>
            </div>
            <div className="space-y-1">
              {dependencies.slice(0, 2).map((dep) => (
                <div key={dep.id} className="flex items-center space-x-2 text-xs">
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  <span className="line-clamp-1">{dep.title}</span>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs",
                      dep.status === "completed" && "bg-green-50 text-green-700",
                      dep.status === "in-progress" && "bg-blue-50 text-blue-700",
                      dep.status === "blocked" && "bg-red-50 text-red-700"
                    )}
                  >
                    {dep.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Controls */}
        {showDetails && (
          <div className="space-y-3 pt-3 border-t">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Priority</label>
                <Select value={task.priority} onValueChange={onUpdatePriority}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <Select value={task.status} onValueChange={onUpdateStatus}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Assign to Agent</label>
              <Select value={task.assignedAgent} onValueChange={onAssign}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.type}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-xs text-muted-foreground">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
