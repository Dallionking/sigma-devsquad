
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, GitBranch, ArrowRight } from "lucide-react";
import { Task, Agent } from "@/types";
import { cn } from "@/lib/utils";
import { TaskCardHeader } from "./task-card/TaskCardHeader";
import { TaskCardMetrics } from "./task-card/TaskCardMetrics";
import { TaskCardControls } from "./task-card/TaskCardControls";

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

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg",
      task.status === "blocked" && "border-red-200 bg-red-50/50",
      task.status === "completed" && "border-green-200 bg-green-50/50",
      compact ? "p-3" : "p-4"
    )}>
      <CardHeader className={cn("pb-3", compact && "pb-2")}>
        <div className="flex items-start justify-between">
          <TaskCardHeader 
            status={task.status}
            title={task.title}
            description={task.description}
            compact={compact}
          />

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
        <TaskCardMetrics 
          priority={task.priority}
          status={task.status}
          deadline={task.deadline}
          assignedAgent={assignedAgent}
        />

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
          <TaskCardControls
            priority={task.priority}
            status={task.status}
            assignedAgent={task.assignedAgent}
            agents={agents}
            createdAt={task.createdAt}
            onUpdatePriority={onUpdatePriority}
            onUpdateStatus={onUpdateStatus}
            onAssign={onAssign}
          />
        )}
      </CardContent>
    </Card>
  );
};
