
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent, Task } from "@/pages/Index";
import { ArrowRight, CheckCircle, Clock, AlertCircle, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowVisualizationProps {
  agents: Agent[];
  tasks: Task[];
  selectedAgent: Agent | null;
  onAgentSelect: (agent: Agent | null) => void;
}

export const WorkflowVisualization = ({ agents, tasks, selectedAgent, onAgentSelect }: WorkflowVisualizationProps) => {
  const workflowSteps = [
    { id: "planning", label: "Planning", status: "completed" },
    { id: "backend", label: "Backend Development", status: "active" },
    { id: "frontend", label: "Frontend Development", status: "waiting" },
    { id: "qa", label: "Quality Assurance", status: "pending" },
    { id: "documentation", label: "Documentation", status: "active" },
    { id: "devops", label: "DevOps & Deployment", status: "error" }
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
      case "completed": return "text-green-600 bg-green-50 border-green-200";
      case "active": return "text-blue-600 bg-blue-50 border-blue-200";
      case "waiting": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "error": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Development Workflow</h2>
        <p className="text-slate-600">Current project: User Authentication Module</p>
      </div>

      {/* Workflow Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Workflow Progress</h3>
        
        <div className="space-y-4">
          {workflowSteps.map((step, index) => {
            const Icon = getStepIcon(step.status);
            const agent = agents.find(a => a.type === step.id);
            const isLast = index === workflowSteps.length - 1;
            
            return (
              <div key={step.id} className="relative">
                <div 
                  className={cn(
                    "flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-all duration-200",
                    getStepColor(step.status),
                    selectedAgent?.id === agent?.id && "ring-2 ring-blue-500"
                  )}
                  onClick={() => agent && onAgentSelect(agent)}
                >
                  <Icon className="w-5 h-5" />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{step.label}</h4>
                      <Badge variant="secondary" className="capitalize">
                        {step.status}
                      </Badge>
                    </div>
                    
                    {agent && (
                      <div className="mt-1 space-y-1">
                        <p className="text-sm opacity-75">{agent.currentTask}</p>
                        {agent.status === "working" && (
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-white bg-opacity-50 rounded-full h-1.5">
                              <div 
                                className="bg-current h-1.5 rounded-full transition-all duration-300" 
                                style={{ width: `${agent.progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{agent.progress}%</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {!isLast && (
                  <div className="flex justify-center py-2">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Active Tasks Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Active Tasks</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.filter(task => task.status === "in-progress").map((task) => {
            const agent = agents.find(a => a.type === task.assignedAgent);
            
            return (
              <Card key={task.id} className="p-4 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-slate-900">{task.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        task.priority === "high" && "bg-red-50 text-red-700",
                        task.priority === "medium" && "bg-yellow-50 text-yellow-700",
                        task.priority === "low" && "bg-green-50 text-green-700"
                      )}
                    >
                      {task.priority} priority
                    </Badge>
                    
                    {agent && (
                      <div className="text-xs text-slate-500">
                        {agent.name}
                      </div>
                    )}
                  </div>
                  
                  {agent?.status === "working" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-slate-700 font-medium">{agent.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                          style={{ width: `${agent.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
