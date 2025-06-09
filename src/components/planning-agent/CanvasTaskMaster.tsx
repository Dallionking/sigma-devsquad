
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ListTodo, 
  Plus, 
  Clock, 
  User, 
  Flag,
  CheckCircle,
  Circle,
  AlertTriangle,
  BarChart3
} from "lucide-react";

interface TaskSummary {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  priority: "low" | "medium" | "high";
  assignedAgent?: string;
  progress?: number;
}

export const CanvasTaskMaster = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const taskSummaries: TaskSummary[] = [
    {
      id: "auth-system",
      title: "User Authentication System",
      status: "in-progress",
      priority: "high",
      assignedAgent: "Backend Agent",
      progress: 65
    },
    {
      id: "dashboard",
      title: "Agent Dashboard",
      status: "pending",
      priority: "high"
    },
    {
      id: "api-integration",
      title: "API Integration Layer",
      status: "completed",
      priority: "medium",
      assignedAgent: "Backend Agent",
      progress: 100
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-3 h-3 text-green-600" />;
      case "in-progress":
        return <Clock className="w-3 h-3 text-blue-600" />;
      case "blocked":
        return <AlertTriangle className="w-3 h-3 text-red-600" />;
      default:
        return <Circle className="w-3 h-3 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const stats = {
    total: 15,
    completed: 3,
    inProgress: 6,
    pending: 4,
    blocked: 2
  };

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="space-y-1">
              <div className="text-lg font-bold text-foreground">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total Tasks</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <ListTodo className="w-4 h-4" />
            Active Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {taskSummaries.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedTask === task.id 
                  ? "border-primary bg-primary/5" 
                  : "hover:bg-muted/50"
              }`}
              onClick={() => setSelectedTask(task.id === selectedTask ? null : task.id)}
            >
              <div className="flex items-start gap-2">
                {getStatusIcon(task.status)}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{task.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-xs`}>
                      <Flag className="w-2 h-2 mr-1" />
                      {task.priority}
                    </Badge>
                    {task.assignedAgent && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="w-2 h-2" />
                        {task.assignedAgent}
                      </div>
                    )}
                  </div>
                  {task.progress !== undefined && (
                    <div className="mt-2">
                      <Progress value={task.progress} className="h-1" />
                      <div className="text-xs text-muted-foreground mt-1">{task.progress}%</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="text-xs">
          <Plus className="w-3 h-3 mr-1" />
          New Task
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          <BarChart3 className="w-3 h-3 mr-1" />
          View All
        </Button>
      </div>
    </div>
  );
};
