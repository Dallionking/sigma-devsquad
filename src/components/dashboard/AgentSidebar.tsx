
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Bot, Layers, Code, Server, TestTube, FileText, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Agent, AgentType, ViewMode } from "@/types";
import { NavigationItem } from "./NavigationItem";
import { useCollapsibleSidebar } from "@/hooks/useCollapsibleSidebar";
import { cn } from "@/lib/utils";

interface AgentSidebarProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onAgentSelect: (agent: Agent | null) => void;
  viewMode?: ViewMode;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
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
  idle: "bg-muted-foreground",
  waiting: "bg-yellow-500",
  error: "bg-red-500"
};

const statusLabels = {
  working: "Working",
  idle: "Idle",
  waiting: "Waiting",
  error: "Error"
};

export const AgentSidebar = ({ 
  agents, 
  selectedAgent, 
  onAgentSelect,
  viewMode,
  collapsed,
  onToggleCollapse 
}: AgentSidebarProps) => {
  const sidebarState = useCollapsibleSidebar({
    defaultCollapsed: collapsed || false,
    keyboardShortcut: 'b',
    storageKey: 'agent-sidebar-collapsed'
  });

  // Use external collapse control if provided, otherwise use internal state
  const isCollapsed = collapsed !== undefined ? collapsed : sidebarState.isCollapsed;
  const toggleCollapse = onToggleCollapse || sidebarState.toggleSidebar;

  return (
    <div className={cn(
      "bg-sidebar-background border-r border-sidebar-border overflow-hidden transition-all duration-300 ease-in-out h-full flex flex-col",
      isCollapsed ? "w-16" : "w-72"
    )}>
      {/* Fixed header with collapse toggle */}
      <div className="flex-shrink-0 p-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-sidebar-foreground animate-in fade-in-50 duration-200">
              Agents
            </h2>
          )}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleCollapse}
            className="p-1.5 h-8 w-8 flex-shrink-0 hover:bg-sidebar-accent rounded-md transition-colors"
            title={isCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation items for agent types */}
      {!isCollapsed && (
        <div className="flex-shrink-0 p-3 border-b border-sidebar-border animate-in fade-in-50 duration-200">
          <div className="space-y-1">
            <NavigationItem
              icon={Bot}
              label="All Agents"
              isActive={!selectedAgent}
              isCollapsed={false}
              badge={agents.length}
              onClick={() => onAgentSelect(null)}
            />
            {Object.entries(agentIcons).map(([type, Icon]) => {
              const typeAgents = agents.filter(agent => agent.type === type);
              const workingCount = typeAgents.filter(agent => agent.status === 'working').length;
              
              return (
                <NavigationItem
                  key={type}
                  icon={Icon}
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  isActive={false}
                  isCollapsed={false}
                  badge={workingCount > 0 ? workingCount : undefined}
                  onClick={() => {
                    // Filter logic can be implemented here
                    console.log(`Filter by ${type}`);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {agents.map((agent) => {
          const Icon = agentIcons[agent.type];
          const isSelected = selectedAgent?.id === agent.id;
          
          return (
            <Card
              key={agent.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md bg-card border-border group",
                isSelected ? "ring-2 ring-primary bg-sidebar-accent" : "hover:bg-sidebar-accent",
                isCollapsed ? "p-2 aspect-square" : "p-3"
              )}
              onClick={() => onAgentSelect(isSelected ? null : agent)}
              title={isCollapsed ? `${agent.name} - ${statusLabels[agent.status]}` : undefined}
            >
              {isCollapsed ? (
                // Collapsed view - icon and status only
                <div className="flex flex-col items-center justify-center h-full relative">
                  <div className="relative mb-1">
                    <Icon className="w-6 h-6 text-card-foreground transition-transform group-hover:scale-110" />
                    <div className={cn(
                      "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background transition-all",
                      statusColors[agent.status]
                    )} />
                  </div>
                  
                  {/* Progress indicator for working agents */}
                  {agent.status === "working" && (
                    <div className="w-1 h-6 bg-green-500/30 rounded-full overflow-hidden">
                      <div 
                        className="w-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ height: `${agent.progress}%` }}
                      />
                    </div>
                  )}
                  
                  {/* Agent type indicator */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                  </div>
                </div>
              ) : (
                // Expanded view - full details
                <div className="animate-in fade-in-50 duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className="relative flex-shrink-0">
                        <Icon className="w-5 h-5 text-card-foreground" />
                        <div className={cn(
                          "absolute -top-1 -right-1 w-3 h-3 rounded-full border border-background",
                          statusColors[agent.status]
                        )} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-card-foreground text-sm truncate">
                          {agent.name}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-xs mt-1 transition-colors",
                            agent.status === "working" && "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
                            agent.status === "idle" && "bg-muted text-muted-foreground",
                            agent.status === "waiting" && "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
                            agent.status === "error" && "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                          )}
                        >
                          {statusLabels[agent.status]}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {agent.currentTask}
                    </p>
                    
                    {agent.status === "working" && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-card-foreground font-medium">{agent.progress}%</span>
                        </div>
                        <Progress value={agent.progress} className="h-1.5" />
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Last active: {new Date(agent.lastActive).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      
      {/* Fixed footer - only show when expanded */}
      {!isCollapsed && (
        <div className="flex-shrink-0 border-t border-sidebar-border p-3 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">System Status</span>
            <Badge variant="secondary" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
              Healthy
            </Badge>
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground text-center">
            <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">Ctrl+B</kbd> to toggle
          </div>
        </div>
      )}
    </div>
  );
};
