
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Clock, 
  User, 
  Flag,
  GitBranch,
  CheckCircle,
  Circle,
  AlertTriangle
} from "lucide-react";

interface TaskNode {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  priority: "low" | "medium" | "high";
  assignedAgent?: string;
  estimatedHours?: number;
  progress?: number;
  children?: TaskNode[];
  dependencies?: string[];
}

interface VisualTaskBreakdownProps {
  onCreateSubtask?: (parentId: string) => void;
  onUpdateTask?: (taskId: string, updates: Partial<TaskNode>) => void;
}

export const VisualTaskBreakdown = ({ 
  onCreateSubtask, 
  onUpdateTask 
}: VisualTaskBreakdownProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["root"]));

  const taskTree: TaskNode[] = [
    {
      id: "auth-system",
      title: "User Authentication System",
      status: "in-progress",
      priority: "high",
      assignedAgent: "Backend Agent",
      estimatedHours: 32,
      progress: 65,
      children: [
        {
          id: "auth-login",
          title: "Login Implementation",
          status: "completed",
          priority: "high",
          assignedAgent: "Backend Agent",
          estimatedHours: 8,
          progress: 100
        },
        {
          id: "auth-register",
          title: "User Registration",
          status: "in-progress",
          priority: "high",
          assignedAgent: "Backend Agent",
          estimatedHours: 6,
          progress: 80
        },
        {
          id: "auth-password-reset",
          title: "Password Reset Flow",
          status: "pending",
          priority: "medium",
          estimatedHours: 4,
          dependencies: ["auth-register"]
        },
        {
          id: "auth-oauth",
          title: "OAuth Integration",
          status: "pending",
          priority: "low",
          estimatedHours: 14,
          dependencies: ["auth-login", "auth-register"]
        }
      ]
    },
    {
      id: "dashboard",
      title: "Agent Dashboard",
      status: "pending",
      priority: "high",
      estimatedHours: 48,
      children: [
        {
          id: "dash-layout",
          title: "Dashboard Layout",
          status: "pending",
          priority: "high",
          assignedAgent: "Frontend Agent",
          estimatedHours: 12
        },
        {
          id: "dash-widgets",
          title: "Dashboard Widgets",
          status: "pending",
          priority: "medium",
          estimatedHours: 20,
          dependencies: ["dash-layout"]
        },
        {
          id: "dash-real-time",
          title: "Real-time Updates",
          status: "pending",
          priority: "high",
          estimatedHours: 16,
          dependencies: ["dash-widgets"]
        }
      ]
    }
  ];

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "blocked":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
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

  const renderTaskNode = (task: TaskNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(task.id);
    const hasChildren = task.children && task.children.length > 0;

    return (
      <div key={task.id} className="space-y-1">
        <div 
          className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors duration-200"
          style={{ marginLeft: `${level * 20}px` }}
        >
          {hasChildren ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => toggleNode(task.id)}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          ) : (
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-2 h-2 bg-muted-foreground rounded-full" />
            </div>
          )}

          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}
            <span className="font-medium text-sm">{task.title}</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {task.dependencies && task.dependencies.length > 0 && (
              <GitBranch className="w-3 h-3 text-muted-foreground" title="Has dependencies" />
            )}
            
            {task.assignedAgent && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{task.assignedAgent}</span>
              </div>
            )}

            {task.estimatedHours && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{task.estimatedHours}h</span>
              </div>
            )}

            <Badge variant="outline" className={getPriorityColor(task.priority)}>
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </Badge>

            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onCreateSubtask?.(task.id)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {task.progress !== undefined && task.status === "in-progress" && (
          <div 
            className="mx-3 mb-2"
            style={{ marginLeft: `${level * 20 + 12}px` }}
          >
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-1" />
          </div>
        )}

        {isExpanded && hasChildren && (
          <div className="space-y-1 fade-in">
            {task.children!.map(child => renderTaskNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="card-enhanced">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="w-5 h-5" />
          Visual Task Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {taskTree.map(task => renderTaskNode(task))}
        
        <div className="mt-4 pt-3 border-t">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-muted/50 rounded-md">
              <div className="text-lg font-bold text-foreground">15</div>
              <div className="text-muted-foreground">Total Tasks</div>
            </div>
            <div className="p-2 bg-muted/50 rounded-md">
              <div className="text-lg font-bold text-blue-600">6</div>
              <div className="text-muted-foreground">In Progress</div>
            </div>
            <div className="p-2 bg-muted/50 rounded-md">
              <div className="text-lg font-bold text-green-600">3</div>
              <div className="text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
