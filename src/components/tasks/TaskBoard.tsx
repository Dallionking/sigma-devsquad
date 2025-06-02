
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  User, 
  Flag,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Task } from "@/types";
import { cn } from "@/lib/utils";

interface TaskBoardProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  onCreateTask: (status: string) => void;
}

interface BoardColumn {
  id: string;
  title: string;
  status: Task['status'];
  color: string;
}

export const TaskBoard = ({ tasks, onTaskSelect, onCreateTask }: TaskBoardProps) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const columns: BoardColumn[] = [
    { id: 'pending', title: 'Pending', status: 'pending', color: 'bg-gray-50' },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress', color: 'bg-blue-50' },
    { id: 'completed', title: 'Completed', status: 'completed', color: 'bg-green-50' },
    { id: 'blocked', title: 'Blocked', status: 'blocked', color: 'bg-red-50' }
  ];

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
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

  const isOverdue = (task: Task) => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date();
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      // Here you would update the task status
      console.log(`Moving task ${draggedTask.id} to ${status}`);
    }
    setDraggedTask(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Task Board</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {tasks.length} total tasks
            </Badge>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-4 h-full">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.status);
            
            return (
              <div key={column.id} className="flex flex-col h-full">
                <div className={cn("p-3 rounded-t-lg border-b-2", column.color)}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{column.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {columnTasks.length}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCreateTask(column.status)}
                    className="w-full text-xs h-7"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Task
                  </Button>
                </div>

                <ScrollArea 
                  className="flex-1 p-2"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.status)}
                >
                  <div className="space-y-2">
                    {columnTasks.map((task) => (
                      <Card
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(task)}
                        onClick={() => onTaskSelect(task)}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:shadow-md border-l-4",
                          getPriorityColor(task.priority),
                          isOverdue(task) && "ring-2 ring-red-200"
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
                                  isOverdue(task) ? "text-red-600" : "text-muted-foreground"
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
                    ))}
                  </div>
                </ScrollArea>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
