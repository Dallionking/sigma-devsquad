
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Workflow, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Play, 
  Pause, 
  BarChart3,
  TrendingUp,
  Calendar,
  Target,
  Zap
} from "lucide-react";

interface WorkflowNode {
  id: string;
  name: string;
  type: "task" | "decision" | "milestone" | "critical";
  status: "completed" | "active" | "pending" | "blocked";
  duration: number;
  dependencies: string[];
  assignee?: string;
  progress: number;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  nodes: WorkflowNode[];
}

export const WorkflowVisualization = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("agile-sprint");
  const [activeView, setActiveView] = useState("graph");

  const workflowTemplates: WorkflowTemplate[] = [
    {
      id: "agile-sprint",
      name: "Agile Sprint Workflow",
      description: "Standard 2-week sprint cycle with planning, development, and review phases",
      category: "Development",
      nodes: [
        { id: "1", name: "Sprint Planning", type: "milestone", status: "completed", duration: 4, dependencies: [], progress: 100 },
        { id: "2", name: "Requirements Analysis", type: "task", status: "completed", duration: 8, dependencies: ["1"], assignee: "Planning Agent", progress: 100 },
        { id: "3", name: "Technical Design", type: "decision", status: "active", duration: 12, dependencies: ["2"], assignee: "Architecture Agent", progress: 65 },
        { id: "4", name: "Frontend Development", type: "task", status: "pending", duration: 40, dependencies: ["3"], assignee: "Frontend Agent", progress: 0 },
        { id: "5", name: "Backend Development", type: "task", status: "pending", duration: 32, dependencies: ["3"], assignee: "Backend Agent", progress: 0 },
        { id: "6", name: "Integration Testing", type: "critical", status: "pending", duration: 16, dependencies: ["4", "5"], assignee: "QA Agent", progress: 0 },
        { id: "7", name: "Sprint Review", type: "milestone", status: "pending", duration: 4, dependencies: ["6"], progress: 0 },
      ]
    },
    {
      id: "ci-cd-pipeline",
      name: "CI/CD Pipeline",
      description: "Continuous integration and deployment workflow",
      category: "DevOps",
      nodes: [
        { id: "1", name: "Code Commit", type: "milestone", status: "completed", duration: 1, dependencies: [], progress: 100 },
        { id: "2", name: "Build & Test", type: "task", status: "active", duration: 8, dependencies: ["1"], progress: 75 },
        { id: "3", name: "Security Scan", type: "critical", status: "pending", duration: 4, dependencies: ["2"], progress: 0 },
        { id: "4", name: "Staging Deploy", type: "task", status: "pending", duration: 2, dependencies: ["3"], progress: 0 },
        { id: "5", name: "Production Deploy", type: "decision", status: "pending", duration: 2, dependencies: ["4"], progress: 0 },
      ]
    }
  ];

  const currentWorkflow = workflowTemplates.find(t => t.id === selectedTemplate)!;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "active": return <Play className="w-4 h-4 text-blue-500" />;
      case "pending": return <Clock className="w-4 h-4 text-gray-400" />;
      case "blocked": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getNodeTypeColor = (type: string) => {
    switch (type) {
      case "critical": return "border-red-500 bg-red-50 dark:bg-red-900/20";
      case "decision": return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "milestone": return "border-purple-500 bg-purple-50 dark:bg-purple-900/20";
      default: return "border-blue-500 bg-blue-50 dark:bg-blue-900/20";
    }
  };

  const calculateCriticalPath = () => {
    // Simple critical path calculation based on dependencies and duration
    const criticalNodes = currentWorkflow.nodes.filter(node => 
      node.type === "critical" || node.dependencies.length > 1
    );
    return criticalNodes.map(node => node.id);
  };

  const getWorkflowMetrics = () => {
    const totalNodes = currentWorkflow.nodes.length;
    const completedNodes = currentWorkflow.nodes.filter(n => n.status === "completed").length;
    const activeNodes = currentWorkflow.nodes.filter(n => n.status === "active").length;
    const totalDuration = currentWorkflow.nodes.reduce((sum, node) => sum + node.duration, 0);
    const completedDuration = currentWorkflow.nodes
      .filter(n => n.status === "completed")
      .reduce((sum, node) => sum + node.duration, 0);
    
    return {
      progress: Math.round((completedNodes / totalNodes) * 100),
      timeProgress: Math.round((completedDuration / totalDuration) * 100),
      activeNodes,
      totalNodes,
      estimatedCompletion: "3 days"
    };
  };

  const metrics = getWorkflowMetrics();
  const criticalPath = calculateCriticalPath();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Workflow Visualization</h3>
          <p className="text-sm text-muted-foreground">Interactive workflow management and analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select workflow template" />
            </SelectTrigger>
            <SelectContent>
              {workflowTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Progress</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{metrics.progress}%</div>
              <Progress value={metrics.progress} className="mt-1 h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Time Progress</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{metrics.timeProgress}%</div>
              <Progress value={metrics.timeProgress} className="mt-1 h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Active Tasks</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{metrics.activeNodes}</div>
              <div className="text-xs text-muted-foreground">of {metrics.totalNodes} total</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">ETA</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{metrics.estimatedCompletion}</div>
              <div className="text-xs text-muted-foreground">estimated</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="w-5 h-5" />
            {currentWorkflow.name}
          </CardTitle>
          <CardDescription>{currentWorkflow.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="graph">Workflow Graph</TabsTrigger>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              <TabsTrigger value="analysis">Critical Path</TabsTrigger>
            </TabsList>

            <TabsContent value="graph" className="mt-6">
              <div className="space-y-4">
                {currentWorkflow.nodes.map((node, index) => (
                  <div key={node.id} className="relative">
                    <div className={`p-4 rounded-lg border-2 ${getNodeTypeColor(node.type)} transition-all hover:shadow-md`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(node.status)}
                          <div>
                            <h4 className="font-medium text-foreground">{node.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {node.type}
                              </Badge>
                              {node.assignee && (
                                <span className="text-xs text-muted-foreground">
                                  {node.assignee}
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {node.duration}h
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{node.progress}%</div>
                          <Progress value={node.progress} className="w-20 h-2 mt-1" />
                        </div>
                      </div>
                      {criticalPath.includes(node.id) && (
                        <Badge className="absolute -top-2 -right-2 bg-red-500">
                          Critical
                        </Badge>
                      )}
                    </div>
                    {index < currentWorkflow.nodes.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="w-px h-4 bg-border"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Timeline view with milestones and dependencies</span>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>
                  {currentWorkflow.nodes.map((node, index) => (
                    <div key={node.id} className="relative flex items-center gap-4 pb-8">
                      <div className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-background ${
                        node.status === "completed" ? "border-green-500" :
                        node.status === "active" ? "border-blue-500" :
                        "border-gray-300"
                      }`}>
                        {getStatusIcon(node.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{node.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {node.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Duration: {node.duration}h
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{node.progress}%</div>
                            <Progress value={node.progress} className="w-24 h-2 mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <BarChart3 className="w-4 h-4" />
                  <span>Critical path analysis and workflow optimization</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Critical Path Nodes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentWorkflow.nodes
                          .filter(node => criticalPath.includes(node.id))
                          .map(node => (
                            <div key={node.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                              <div>
                                <div className="font-medium text-foreground">{node.name}</div>
                                <div className="text-sm text-muted-foreground">{node.duration}h duration</div>
                              </div>
                              {getStatusIcon(node.status)}
                            </div>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Workflow Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                          <h4 className="font-medium text-foreground">Parallel Execution</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Frontend and Backend development can run in parallel after Technical Design
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                          <h4 className="font-medium text-foreground">Resource Allocation</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Consider allocating additional resources to critical path tasks
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                          <h4 className="font-medium text-foreground">Time Savings</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Estimated 20% time reduction with optimized parallel execution
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
