
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckSquare, Plus, Clock, User, Flag, ArrowRight } from "lucide-react";

export const TaskMasterIntegration = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const tasks = [
    {
      id: 1,
      title: "Implement user authentication system",
      agent: "Backend Agent",
      priority: "high",
      status: "in-progress",
      dueDate: "2024-06-05",
      progress: 75
    },
    {
      id: 2,
      title: "Design dashboard wireframes",
      agent: "Frontend Agent",
      priority: "medium",
      status: "pending",
      dueDate: "2024-06-03",
      progress: 0
    },
    {
      id: 3,
      title: "Write API documentation",
      agent: "Documentation Agent",
      priority: "low",
      status: "completed",
      dueDate: "2024-05-30",
      progress: 100
    }
  ];

  const agents = [
    "Planning Agent",
    "Frontend Agent",
    "Backend Agent",
    "QA Agent",
    "Documentation Agent",
    "DevOps Agent"
  ];

  const handleCreateTask = () => {
    if (!newTaskTitle.trim() || !selectedAgent || !selectedPriority) return;
    
    console.log("Creating task:", {
      title: newTaskTitle,
      agent: selectedAgent,
      priority: selectedPriority
    });
    
    // Reset form
    setNewTaskTitle("");
    setSelectedAgent("");
    setSelectedPriority("");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300";
      case "low":
        return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300";
      case "in-progress":
        return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300";
      case "pending":
        return "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Task Creation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New Task
          </CardTitle>
          <CardDescription>Generate tasks from planning discussions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title..."
          />

          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger>
              <SelectValue placeholder="Assign to agent" />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent} value={agent}>
                  {agent}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Set priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleCreateTask}
            disabled={!newTaskTitle.trim() || !selectedAgent || !selectedPriority}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </CardContent>
      </Card>

      {/* Active Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            Active Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="border border-border rounded-lg p-3 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                  <Badge variant="outline" className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="w-3 h-3" />
                  <span>{task.agent}</span>
                  <Flag className="w-3 h-3 ml-2" />
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{task.progress}%</span>
                </div>

                {task.status === "in-progress" && (
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Task Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <ArrowRight className="w-3 h-3 mr-2" />
              Convert chat to tasks
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <CheckSquare className="w-3 h-3 mr-2" />
              View all tasks
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Clock className="w-3 h-3 mr-2" />
              Set task reminders
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Task Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Task Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-muted/50 rounded-md">
              <div className="text-lg font-bold text-foreground">8</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <div className="p-2 bg-muted/50 rounded-md">
              <div className="text-lg font-bold text-blue-600">3</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div className="p-2 bg-muted/50 rounded-md">
              <div className="text-lg font-bold text-green-600">5</div>
              <div className="text-xs text-muted-foreground">Done</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
