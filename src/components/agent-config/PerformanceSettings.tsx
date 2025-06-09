
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, TrendingUp, Clock, Cpu, MemoryStick, Zap } from "lucide-react";
import { AgentType } from "@/types";

interface PerformanceSettingsProps {
  agentType: AgentType;
  onConfigChange: () => void;
}

interface OptimizationSuggestion {
  title: string;
  description: string;
  impact: "low" | "medium" | "high";
  effort: "low" | "medium" | "high";
  category: "speed" | "memory" | "accuracy" | "cost";
}

const performanceMetrics = {
  responseTime: 250, // ms
  memoryUsage: 65, // %
  cpuUsage: 45, // %
  accuracy: 94, // %
  throughput: 120, // requests/minute
  errorRate: 2.1 // %
};

const optimizationSuggestions: Record<AgentType, OptimizationSuggestion[]> = {
  planning: [
    {
      title: "Enable Parallel Task Analysis",
      description: "Process multiple requirements simultaneously to reduce analysis time",
      impact: "high",
      effort: "low",
      category: "speed"
    },
    {
      title: "Implement Task Caching",
      description: "Cache frequently accessed task data to improve response times",
      impact: "medium",
      effort: "medium",
      category: "speed"
    },
    {
      title: "Optimize Memory Usage",
      description: "Reduce memory footprint by optimizing data structures",
      impact: "medium",
      effort: "high",
      category: "memory"
    }
  ],
  frontend: [
    {
      title: "Component Preloading",
      description: "Preload frequently used UI components to reduce build times",
      impact: "high",
      effort: "medium",
      category: "speed"
    },
    {
      title: "Asset Optimization",
      description: "Automatically optimize images and static assets",
      impact: "medium",
      effort: "low",
      category: "speed"
    }
  ],
  backend: [
    {
      title: "Database Query Optimization",
      description: "Implement query caching and indexing strategies",
      impact: "high",
      effort: "medium",
      category: "speed"
    },
    {
      title: "API Response Compression",
      description: "Enable compression for API responses to reduce bandwidth",
      impact: "medium",
      effort: "low",
      category: "speed"
    }
  ],
  qa: [
    {
      title: "Parallel Test Execution",
      description: "Run tests in parallel to reduce overall testing time",
      impact: "high",
      effort: "medium",
      category: "speed"
    },
    {
      title: "Smart Test Selection",
      description: "Only run tests affected by code changes",
      impact: "medium",
      effort: "high",
      category: "speed"
    }
  ],
  documentation: [
    {
      title: "Template Reuse",
      description: "Create reusable documentation templates to speed up writing",
      impact: "medium",
      effort: "low",
      category: "speed"
    },
    {
      title: "Auto-generation Rules",
      description: "Define rules for automatic documentation generation",
      impact: "high",
      effort: "medium",
      category: "accuracy"
    }
  ],
  devops: [
    {
      title: "Container Optimization",
      description: "Optimize Docker images for faster deployment",
      impact: "high",
      effort: "medium",
      category: "speed"
    },
    {
      title: "Resource Auto-scaling",
      description: "Implement intelligent resource scaling based on load",
      impact: "high",
      effort: "high",
      category: "cost"
    }
  ]
};

export const PerformanceSettings = ({ agentType, onConfigChange }: PerformanceSettingsProps) => {
  const [maxConcurrentTasks, setMaxConcurrentTasks] = useState(5);
  const [responseTimeLimit, setResponseTimeLimit] = useState(5000); // ms
  const [memoryLimit, setMemoryLimit] = useState(512); // MB
  const [enableOptimizations, setEnableOptimizations] = useState(true);
  const [autoTuning, setAutoTuning] = useState(false);

  const suggestions = optimizationSuggestions[agentType] || [];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'speed': return <Zap className="w-4 h-4" />;
      case 'memory': return <MemoryStick className="w-4 h-4" />;
      case 'accuracy': return <TrendingUp className="w-4 h-4" />;
      case 'cost': return <Cpu className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Current agent performance indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Response Time</span>
                <span className="text-sm text-slate-500">{performanceMetrics.responseTime}ms</span>
              </div>
              <Progress value={(5000 - performanceMetrics.responseTime) / 50} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Memory Usage</span>
                <span className="text-sm text-slate-500">{performanceMetrics.memoryUsage}%</span>
              </div>
              <Progress value={performanceMetrics.memoryUsage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">CPU Usage</span>
                <span className="text-sm text-slate-500">{performanceMetrics.cpuUsage}%</span>
              </div>
              <Progress value={performanceMetrics.cpuUsage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Accuracy</span>
                <span className="text-sm text-slate-500">{performanceMetrics.accuracy}%</span>
              </div>
              <Progress value={performanceMetrics.accuracy} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Throughput</span>
                <span className="text-sm text-slate-500">{performanceMetrics.throughput}/min</span>
              </div>
              <Progress value={Math.min(performanceMetrics.throughput / 2, 100)} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Error Rate</span>
                <span className="text-sm text-slate-500">{performanceMetrics.errorRate}%</span>
              </div>
              <Progress value={100 - (performanceMetrics.errorRate * 10)} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Configuration</CardTitle>
          <CardDescription>Configure resource limits and optimization settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="max-concurrent">Max Concurrent Tasks</Label>
                <Input
                  id="max-concurrent"
                  type="number"
                  value={maxConcurrentTasks}
                  onChange={(e) => {
                    setMaxConcurrentTasks(parseInt(e.target.value));
                    onConfigChange();
                  }}
                  min="1"
                  max="20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="response-time">Response Time Limit (ms)</Label>
                <Input
                  id="response-time"
                  type="number"
                  value={responseTimeLimit}
                  onChange={(e) => {
                    setResponseTimeLimit(parseInt(e.target.value));
                    onConfigChange();
                  }}
                  min="1000"
                  max="30000"
                  step="500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="memory-limit">Memory Limit (MB)</Label>
                <Input
                  id="memory-limit"
                  type="number"
                  value={memoryLimit}
                  onChange={(e) => {
                    setMemoryLimit(parseInt(e.target.value));
                    onConfigChange();
                  }}
                  min="128"
                  max="2048"
                  step="64"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Enable Optimizations</h4>
                  <p className="text-sm text-slate-600">Apply automatic performance optimizations</p>
                </div>
                <Switch
                  checked={enableOptimizations}
                  onCheckedChange={(checked) => {
                    setEnableOptimizations(checked);
                    onConfigChange();
                  }}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-tuning</h4>
                  <p className="text-sm text-slate-600">Automatically adjust settings based on performance</p>
                </div>
                <Switch
                  checked={autoTuning}
                  onCheckedChange={(checked) => {
                    setAutoTuning(checked);
                    onConfigChange();
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <CardTitle>Optimization Suggestions</CardTitle>
          </div>
          <CardDescription>Recommended improvements to enhance agent performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <Card key={index} className="border border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(suggestion.category)}
                    <h4 className="font-medium text-slate-900">{suggestion.title}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={getImpactColor(suggestion.impact)}>
                      {suggestion.impact} impact
                    </Badge>
                    <Badge variant="secondary" className={getEffortColor(suggestion.effort)}>
                      {suggestion.effort} effort
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-3">{suggestion.description}</p>
                <div className="flex justify-end">
                  <Button size="sm" variant="outline">
                    Apply Suggestion
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {suggestions.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p>No optimization suggestions available. Your agent is already well-configured!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
