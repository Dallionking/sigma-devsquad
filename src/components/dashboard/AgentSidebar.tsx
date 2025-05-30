
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bot, Layers, Code, Server, TestTube, FileText, Settings } from "lucide-react";
import { Agent, AgentType } from "@/pages/Index";
import { cn } from "@/lib/utils";

interface AgentSidebarProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onAgentSelect: (agent: Agent | null) => void;
}

const agentIcons: Record<AgentType, any> = {
  planning: Layers,
  frontend: Code,
  backend: Server,
  qa: TestTube,
  documentation: FileText,
  devops: Settings
};

const statusColors = {
  working: "bg-green-500",
  idle: "bg-slate-400",
  waiting: "bg-yellow-500",
  error: "bg-red-500"
};

const statusLabels = {
  working: "Working",
  idle: "Idle",
  waiting: "Waiting",
  error: "Error"
};

export const AgentSidebar = ({ agents, selectedAgent, onAgentSelect }: AgentSidebarProps) => {
  return (
    <div className="w-72 bg-white border-r border-slate-200 p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Agents</h2>
        
        <div className="space-y-3">
          {agents.map((agent) => {
            const Icon = agentIcons[agent.type];
            const isSelected = selectedAgent?.id === agent.id;
            
            return (
              <Card
                key={agent.id}
                className={cn(
                  "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
                  isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-slate-50"
                )}
                onClick={() => onAgentSelect(isSelected ? null : agent)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Icon className="w-5 h-5 text-slate-600" />
                      <div className={cn(
                        "absolute -top-1 -right-1 w-3 h-3 rounded-full",
                        statusColors[agent.status]
                      )} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 text-sm">{agent.name}</h3>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-xs mt-1",
                          agent.status === "working" && "bg-green-50 text-green-700",
                          agent.status === "idle" && "bg-slate-50 text-slate-600",
                          agent.status === "waiting" && "bg-yellow-50 text-yellow-700",
                          agent.status === "error" && "bg-red-50 text-red-700"
                        )}
                      >
                        {statusLabels[agent.status]}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-slate-600 line-clamp-2">{agent.currentTask}</p>
                  
                  {agent.status === "working" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-slate-700 font-medium">{agent.progress}%</span>
                      </div>
                      <Progress value={agent.progress} className="h-1.5" />
                    </div>
                  )}
                  
                  <p className="text-xs text-slate-400">
                    Last active: {new Date(agent.lastActive).toLocaleTimeString()}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      
      <div className="border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">System Status</span>
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1" />
            Healthy
          </Badge>
        </div>
      </div>
    </div>
  );
};
