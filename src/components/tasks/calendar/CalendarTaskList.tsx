
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Task } from "@/types";
import { memo } from "react";

interface CalendarTaskListProps {
  date: Date;
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  onCreateTask: (date: Date) => void;
}

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "critical": return "bg-red-500";
    case "high": return "bg-orange-500";
    case "medium": return "bg-yellow-500";
    case "low": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

export const CalendarTaskList = memo(({ 
  date, 
  tasks, 
  onTaskSelect, 
  onCreateTask 
}: CalendarTaskListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarIcon className="w-4 h-4" />
          Tasks for {date.toLocaleDateString()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onTaskSelect(task)}
              className="p-2 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                  <span className="font-medium text-sm">{task.title}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {task.status}
                </Badge>
              </div>
              {task.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-2">No tasks for this date</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCreateTask(date)}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Task
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

CalendarTaskList.displayName = 'CalendarTaskList';
