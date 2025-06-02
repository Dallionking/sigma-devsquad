
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Flag, AlertTriangle } from "lucide-react";
import { Task } from "@/types";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onTaskSelect: (task: Task) => void;
}

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "critical": return "border-red-500 bg-red-50";
    case "high": return "border-orange-500 bg-orange-50";
    case "medium": return "border-yellow-500 bg-yellow-50";
    case "low": return "border-green-500 bg-green-50";
    default: return "border-gray-300 bg-gray-50";
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "critical": return <AlertTriangle className="w-3 h-3 text-red-500" />;
    case "high": return <Flag className="w-3 h-3 text-orange-500" />;
    case "medium": return <Flag className="w-3 h-3 text-yellow-500" />;
    case "low": return <Flag className="w-3 h-3 text-green-500" />;
    default: return null;
  }
};

export const TaskCard = memo(({ task, onTaskSelect }: TaskCardProps) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onClick={() => onTaskSelect(task)}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border-l-4",
        getPriorityColor(task.priority),
        isOverdue && "ring-2 ring-red-200"
      )}
    >
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm line-clamp-2">
              {task.title}
            </h4>
            {getPriorityIcon(task.priority)}
          </div>
          
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {task.assignedAgent && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span className="truncate max-w-16">
                    {task.assignedAgent}
                  </span>
                </div>
              )}
            </div>
            
            {task.dueDate && (
              <div className={cn(
                "flex items-center gap-1",
                isOverdue ? "text-red-600" : "text-muted-foreground"
              )}>
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {task.category && (
            <Badge variant="outline" className="text-xs w-fit">
              {task.category}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

TaskCard.displayName = 'TaskCard';
