
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Task } from "@/types";
import { KanbanColumn } from "./board/KanbanColumn";
import { TaskErrorBoundary } from "./shared/ErrorBoundary";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

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

const columns: BoardColumn[] = [
  { id: 'pending', title: 'Pending', status: 'pending', color: 'bg-gray-50' },
  { id: 'in-progress', title: 'In Progress', status: 'in-progress', color: 'bg-blue-50' },
  { id: 'completed', title: 'Completed', status: 'completed', color: 'bg-green-50' },
  { id: 'blocked', title: 'Blocked', status: 'blocked', color: 'bg-red-50' }
];

export const TaskBoard = ({ tasks, onTaskSelect, onCreateTask }: TaskBoardProps) => {
  const { handleDragOver, handleDrop } = useDragAndDrop();

  const getTasksByStatus = (status: Task['status']): Task[] => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <TaskErrorBoundary>
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
                <KanbanColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  status={column.status}
                  color={column.color}
                  tasks={columnTasks}
                  onTaskSelect={onTaskSelect}
                  onCreateTask={onCreateTask}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              );
            })}
          </div>
        </div>
      </div>
    </TaskErrorBoundary>
  );
};
