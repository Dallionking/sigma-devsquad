
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Bot, 
  Layers, 
  Code, 
  Server, 
  TestTube, 
  FileText, 
  Settings,
  ChevronDown,
  ChevronRight,
  Users
} from "lucide-react";
import { Agent, AgentType } from "@/types";
import { cn } from "@/lib/utils";

interface CollapsibleAgentSidebarProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onAgentSelect: (agent: Agent | null) => void;
  collapsed: boolean;
  onToggle: () => void;
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
  working: "bg-emerald-500",
  idle: "bg-slate-400",
  waiting: "bg-amber-500",
  error: "bg-red-500"
};

const statusLabels = {
  working: "Working",
  idle: "Idle",
  waiting: "Waiting",
  error: "Error"
};

// Group agents by type for team structure
const groupAgentsByTeam = (agents: Agent[]) => {
  const teams: Record<string, Agent[]> = {};
  
  agents.forEach(agent => {
    const teamName = agent.type.charAt(0).toUpperCase() + agent.type.slice(1);
    if (!teams[teamName]) {
      teams[teamName] = [];
    }
    teams[teamName].push(agent);
  });
  
  return teams;
};

export const CollapsibleAgentSidebar = ({ 
  agents, 
  selectedAgent, 
  onAgentSelect, 
  collapsed 
}: CollapsibleAgentSidebarProps) => {
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set(['Planning', 'Frontend', 'Backend']));
  const teams = groupAgentsByTeam(agents);

  const toggleTeam = (teamName: string) => {
    const newExpanded = new Set(expandedTeams);
    if (newExpanded.has(teamName)) {
      newExpanded.delete(teamName);
    } else {
      newExpanded.add(teamName);
    }
    setExpandedTeams(newExpanded);
  };

  const renderAgentCard = (agent: Agent) => {
    const Icon = agentIcons[agent.type];
    const isSelected = selectedAgent?.id === agent.id;
    
    return (
      <Card
        key={agent.id}
        className={cn(
          "cursor-pointer transition-all duration-200 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50",
          isSelected ? "ring-2 ring-blue-500 bg-slate-700/70" : "",
          collapsed ? "p-2" : "p-3"
        )}
        onClick={() => onAgentSelect(isSelected ? null : agent)}
      >
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center relative">
                  <Icon className="w-5 h-5 text-slate-300" />
                  <div className={cn(
                    "absolute -top-1 -right-1 w-3 h-3 rounded-full",
                    statusColors[agent.status]
                  )} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-800 text-slate-100 border-slate-700">
                <div className="space-y-1">
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-xs text-slate-400">{agent.currentTask}</p>
                  <Badge variant="secondary" className="text-xs">
                    {statusLabels[agent.status]}
                  </Badge>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Icon className="w-5 h-5 text-slate-300" />
                  <div className={cn(
                    "absolute -top-1 -right-1 w-3 h-3 rounded-full",
                    statusColors[agent.status]
                  )} />
                </div>
                <div>
                  <h3 className="font-medium text-slate-100 text-sm">{agent.name}</h3>
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs mt-1",
                      agent.status === "working" && "bg-emerald-900/30 text-emerald-300",
                      agent.status === "idle" && "bg-slate-700 text-slate-400",
                      agent.status === "waiting" && "bg-amber-900/30 text-amber-300",
                      agent.status === "error" && "bg-red-900/30 text-red-300"
                    )}
                  >
                    {statusLabels[agent.status]}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-slate-400 line-clamp-2">{agent.currentTask}</p>
              
              {agent.status === "working" && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-slate-300 font-medium">{agent.progress}%</span>
                  </div>
                  <Progress value={agent.progress} className="h-1.5 bg-slate-700" />
                </div>
              )}
              
              <p className="text-xs text-slate-500">
                Last active: {new Date(agent.lastActive).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-slate-900 border-r border-slate-700 overflow-y-auto transition-all duration-300 ease-in-out z-40",
      collapsed ? "w-16" : "w-70"
    )}>
      <div className={cn("p-4", collapsed && "p-2")}>
        {!collapsed && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Agent Teams
            </h2>
          </div>
        )}
        
        <div className="space-y-4">
          {Object.entries(teams).map(([teamName, teamAgents]) => (
            <div key={teamName}>
              {collapsed ? (
                <div className="space-y-2">
                  {teamAgents.map(renderAgentCard)}
                </div>
              ) : (
                <Collapsible 
                  open={expandedTeams.has(teamName)}
                  onOpenChange={() => toggleTeam(teamName)}
                >
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between p-2 h-auto text-slate-300 hover:text-slate-100 hover:bg-slate-800"
                    >
                      <span className="font-medium">{teamName} Team</span>
                      {expandedTeams.has(teamName) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {teamAgents.map(renderAgentCard)}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          ))}
        </div>
        
        {!collapsed && (
          <div className="mt-6 pt-4 border-t border-slate-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">System Status</span>
              <Badge variant="secondary" className="bg-emerald-900/30 text-emerald-300">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1" />
                Healthy
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
