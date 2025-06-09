
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types";
import { ArrowRight, CheckCircle, Clock, AlertCircle, Play, Bot, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowCanvasProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onAgentSelect: (agent: Agent | null) => void;
}

export const WorkflowCanvas = ({ agents, selectedAgent, onAgentSelect }: WorkflowCanvasProps) => {
  const workflowSteps = [
    { id: "planning", label: "Planning", status: "completed", agent: "planning-agent" },
    { id: "backend", label: "Backend Development", status: "active", agent: "backend-developer" },
    { id: "frontend", label: "Frontend Development", status: "waiting", agent: "frontend-developer" },
    { id: "qa", label: "Quality Assurance", status: "pending", agent: "qa-engineer" },
    { id: "documentation", label: "Documentation", status: "active", agent: "documentation-writer" },
    { id: "devops", label: "DevOps & Deployment", status: "error", agent: "devops-engineer" }
  ];

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "active": return Play;
      case "waiting": return Clock;
      case "error": return AlertCircle;
      default: return Clock;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case "active": return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      case "waiting": return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
      case "error": return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      default: return "text-muted-foreground bg-muted border-border";
    }
  };

  return (
    <div className="space-y-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Workflow className="w-8 h-8 text-primary" />
            Development Workflow
          </h2>
          <p className="text-muted-foreground mt-1">
            Current project: User Authentication Module
          </p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1">
          6 Steps Active
        </Badge>
      </div>

      {/* Workflow Timeline */}
      <Card className="flex-1 bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bot className="w-6 h-6 text-primary" />
            Workflow Progress
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {workflowSteps.map((step, index) => {
            const Icon = getStepIcon(step.status);
            const agent = agents.find(a => a.id === step.agent);
            const isLast = index === workflowSteps.length - 1;
            const isSelected = selectedAgent?.id === agent?.id;
            
            return (
              <div key={step.id} className="relative">
                <div 
                  className={cn(
                    "flex items-center space-x-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md",
                    getStepColor(step.status),
                    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]"
                  )}
                  onClick={() => agent && onAgentSelect(agent)}
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-lg">{step.label}</h4>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "capitalize font-medium",
                          step.status === "completed" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                          step.status === "active" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                          step.status === "waiting" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                          step.status === "error" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        )}
                      >
                        {step.status}
                      </Badge>
                    </div>
                    
                    {agent && (
                      <div className="space-y-2">
                        <p className="text-sm opacity-90 font-medium">
                          {agent.name} • {agent.currentTask || "Ready for assignment"}
                        </p>
                        
                        {agent.status === "working" && (
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-black/10 dark:bg-white/10 rounded-full h-2">
                              <div 
                                className="bg-current h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${agent.progress || 0}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold min-w-[3rem] text-right">
                              {agent.progress || 0}%
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs opacity-75">
                          <span>Agent Type: {agent.type}</span>
                          <span>Status: {agent.status}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {!isLast && (
                  <div className="flex justify-center py-3">
                    <ArrowRight className="w-5 h-5 text-muted-foreground/60" />
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">2</div>
            <div className="text-sm text-green-600 dark:text-green-500">Completed</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">2</div>
            <div className="text-sm text-blue-600 dark:text-blue-500">Active</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-yellow-200 dark:border-yellow-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">1</div>
            <div className="text-sm text-yellow-600 dark:text-yellow-500">Waiting</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">1</div>
            <div className="text-sm text-red-600 dark:text-red-500">Error</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
