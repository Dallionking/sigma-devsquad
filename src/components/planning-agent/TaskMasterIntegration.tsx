
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ListTodo, 
  GitBranch, 
  Plus, 
  BarChart3, 
  Target,
  Workflow,
  Eye
} from "lucide-react";
import { VisualTaskBreakdown } from "./VisualTaskBreakdown";
import { TaskDependencyVisualizer } from "./TaskDependencyVisualizer";
import { EnhancedTaskCreator } from "./EnhancedTaskCreator";

export const TaskMasterIntegration = () => {
  const [activeView, setActiveView] = useState("breakdown");

  const handleCreateTask = (taskData: any) => {
    console.log("Creating enhanced task:", taskData);
    // Integration with task context would happen here
  };

  const handleCreateSubtask = (parentId: string) => {
    console.log("Creating subtask for:", parentId);
    // Handle subtask creation
  };

  const taskStats = {
    total: 15,
    completed: 3,
    inProgress: 6,
    pending: 4,
    blocked: 2
  };

  return (
    <div className="h-full overflow-y-auto space-y-4">
      {/* Header with Stats */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTodo className="w-5 h-5" />
            TaskMaster Integration
          </CardTitle>
          <CardDescription>
            Visual task management with intelligent breakdown and dependency tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="p-2 bg-muted/50 rounded-md">
              <div className="text-lg font-bold text-foreground">{taskStats.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <div className="p-2 bg-green-50 rounded-md">
              <div className="text-lg font-bold text-green-600">{taskStats.completed}</div>
              <div className="text-xs text-muted-foreground">Done</div>
            </div>
            <div className="p-2 bg-blue-50 rounded-md">
              <div className="text-lg font-bold text-blue-600">{taskStats.inProgress}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div className="p-2 bg-gray-50 rounded-md">
              <div className="text-lg font-bold text-gray-600">{taskStats.pending}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div className="p-2 bg-red-50 rounded-md">
              <div className="text-lg font-bold text-red-600">{taskStats.blocked}</div>
              <div className="text-xs text-muted-foreground">Blocked</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Task Management Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 rounded-lg">
          <TabsTrigger 
            value="breakdown" 
            className="flex items-center gap-2 text-xs data-[state=active]:bg-background"
          >
            <GitBranch className="w-4 h-4" />
            Breakdown
          </TabsTrigger>
          <TabsTrigger 
            value="dependencies" 
            className="flex items-center gap-2 text-xs data-[state=active]:bg-background"
          >
            <Workflow className="w-4 h-4" />
            Dependencies
          </TabsTrigger>
          <TabsTrigger 
            value="create" 
            className="flex items-center gap-2 text-xs data-[state=active]:bg-background"
          >
            <Plus className="w-4 h-4" />
            Create
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="flex items-center gap-2 text-xs data-[state=active]:bg-background"
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-4">
          <VisualTaskBreakdown 
            onCreateSubtask={handleCreateSubtask}
            onUpdateTask={(taskId, updates) => console.log("Update task:", taskId, updates)}
          />
        </TabsContent>

        <TabsContent value="dependencies" className="space-y-4">
          <TaskDependencyVisualizer />
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <EnhancedTaskCreator onCreateTask={handleCreateTask} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Task Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Completion Rate</h4>
                  <div className="text-2xl font-bold text-green-600">76%</div>
                  <div className="text-xs text-muted-foreground">Last 30 days</div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Avg. Task Duration</h4>
                  <div className="text-2xl font-bold text-blue-600">3.2d</div>
                  <div className="text-xs text-muted-foreground">Across all agents</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Agent Performance</h4>
                <div className="space-y-2">
                  {["Frontend Agent", "Backend Agent", "QA Agent"].map((agent) => (
                    <div key={agent} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-sm">{agent}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {Math.floor(Math.random() * 20 + 80)}% efficiency
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View Detailed Reports
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
