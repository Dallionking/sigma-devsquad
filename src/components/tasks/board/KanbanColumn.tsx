
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { Task } from "@/types";
import { memo } from "react";
import { cn } from "@/lib/utils";
import { TaskCard } from "./TaskCard";

interface KanbanColumnProps {
  id: string;
  title: string;
  status: Task['status'];
  color: string;
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  onCreateTask: (status: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: Task['status']) => void;
}

export const KanbanColumn = memo(({
  id,
  title,
  status,
  color,
  tasks,
  onTaskSelect,
  onCreateTask,
  onDragOver,
  onDrop
}: KanbanColumnProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className={cn("p-3 rounded-t-lg border-b-2", color)}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-sm">{title}</h3>
          <Badge variant="secondary" className="text-xs">
            {tasks.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCreateTask(status)}
          className="w-full text-xs h-7"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Task
        </Button>
      </div>

      <ScrollArea 
        className="flex-1 p-2"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
      >
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onTaskSelect={onTaskSelect}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
});

KanbanColumn.displayName = 'KanbanColumn';
