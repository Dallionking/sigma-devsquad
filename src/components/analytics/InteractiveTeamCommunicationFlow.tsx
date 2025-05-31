
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types";
import { 
  MessageSquare, 
  Users, 
  ArrowRight, 
  Play, 
  Pause,
  TrendingUp,
  Clock,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Minimize2,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveTeamCommunicationFlowProps {
  agents: Agent[];
  onAgentClick?: (agentId: string) => void;
  onTeamClick?: (teamId: string) => void;
  className?: string;
  collapsed?: boolean;
}

export const InteractiveTeamCommunicationFlow = ({ 
  agents, 
  onAgentClick,
  onTeamClick,
  className,
  collapsed: initialCollapsed = false
}: InteractiveTeamCommunicationFlowProps) => {
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [isMaximized, setIsMaximized] = useState(false);
  const [communicationFlows, setCommunicationFlows] = useState<any[]>([]);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  // Simulate real-time communication flows
  useEffect(() => {
    if (!isRealTimeActive) return;

    const interval = setInterval(() => {
      const flows = agents.slice(0, 4).map((agent, index) => ({
        id: `flow-${agent.id}-${Date.now()}`,
        fromAgent: agent.id,
        fromName: agent.name,
        toAgent: agents[(index + 1) % agents.length]?.id,
        toName: agents[(index + 1) % agents.length]?.name,
        type: ['message', 'task-assignment', 'status-update'][Math.floor(Math.random() * 3)],
        timestamp: new Date(),
        isActive: Math.random() > 0.3
      }));
      
      setCommunicationFlows(flows);
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealTimeActive, agents]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'message': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'task-assignment': return 'bg-green-50 text-green-700 border-green-200';
      case 'status-update': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Maximized Modal View
  if (isMaximized) {
    return (
      <>
        <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <div className="fixed top-4 left-4 right-4 bottom-4 z-50 bg-background/95 backdrop-blur-sm border border-border/30 rounded-2xl shadow-2xl">
          <div className="h-full flex flex-col">
            <div className="border-b border-border/20 p-4 bg-gradient-to-r from-[#0A0E1A]/80 to-background/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#10B981]" />
                  <h3 className="text-lg font-semibold">Team Communication Flow - Maximized View</h3>
                  {isRealTimeActive && (
                    <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                      Live
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isRealTimeActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsRealTimeActive(!isRealTimeActive)}
                    className="h-7"
                  >
                    {isRealTimeActive ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                    {isRealTimeActive ? "Pause" : "Resume"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMaximized(false)}
                    className="border-red-500/30 hover:bg-red-500/10 hover:text-red-500"
                  >
                    <Minimize2 className="w-4 h-4 mr-2" />
                    Minimize
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-0 p-6">
              {/* Enhanced maximized content */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
                {agents.slice(0, 6).map((agent) => {
                  const isActive = communicationFlows.some(flow => 
                    flow.fromAgent === agent.id || flow.toAgent === agent.id
                  );
                  const isHovered = hoveredAgent === agent.id;
                  
                  return (
                    <Button
                      key={agent.id}
                      variant="outline"
                      className={cn(
                        "h-auto p-4 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer",
                        isActive && "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
                        isHovered && "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                      )}
                      onClick={() => onAgentClick?.(agent.id)}
                      onMouseEnter={() => setHoveredAgent(agent.id)}
                      onMouseLeave={() => setHoveredAgent(null)}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                        agent.status === "working" ? "bg-green-500" : "bg-gray-400",
                        isHovered && "scale-110"
                      )}>
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">{agent.status}</div>
                      </div>
                      {isActive && (
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </Button>
                  );
                })}
              </div>

              {/* Enhanced communication flows */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Real-time Communication Analysis
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-medium">Active Communications</h5>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {communicationFlows.length > 0 ? (
                        communicationFlows.map((flow) => (
                          <div
                            key={flow.id}
                            className={cn(
                              "flex items-center justify-between p-3 rounded-lg border transition-all duration-300",
                              flow.isActive ? "bg-muted/50 border-muted" : "bg-background border-border/30"
                            )}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <Badge variant="secondary" className="text-xs shrink-0">
                                {flow.fromName}
                              </Badge>
                              <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                              <Badge variant="outline" className="text-xs shrink-0">
                                {flow.toName}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="secondary"
                                className={cn("text-xs", getTypeColor(flow.type))}
                              >
                                {flow.type.replace('-', ' ')}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {flow.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-muted-foreground text-sm py-8">
                          No active communications
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h5 className="font-medium">Communication Patterns</h5>
                    <div className="space-y-3 p-4 bg-muted/20 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Total Messages Today</span>
                        <span className="font-medium text-green-600">{communicationFlows.length * 3}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average Response Time</span>
                        <span className="font-medium text-blue-600">2.3 min</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Most Active Agent</span>
                        <span className="font-medium text-purple-600">{agents[0]?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Peak Activity</span>
                        <span className="font-medium text-orange-600">10:30 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Collapsed View
  if (collapsed) {
    return (
      <Card className={cn("bg-card/95 backdrop-blur-sm border border-border/30", className)}>
        <CardHeader 
          className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setCollapsed(false)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-medium">Team Communication Flow</span>
              <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                Live
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMaximized(true);
                }}
                className="h-6 w-6 p-0 hover:bg-primary/10"
                title="Maximize"
              >
                <Maximize2 className="w-3 h-3" />
              </Button>
              <ChevronUp className="w-4 h-4" />
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  // Default Expanded View
  return (
    <Card className={cn("bg-card/95 backdrop-blur-sm border border-border/30", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#10B981]" />
            <CardTitle className="text-base">Interactive Team Communication Flow</CardTitle>
            {isRealTimeActive && (
              <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                Live
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isRealTimeActive ? "default" : "outline"}
              size="sm"
              onClick={() => setIsRealTimeActive(!isRealTimeActive)}
              className="h-7"
            >
              {isRealTimeActive ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
              {isRealTimeActive ? "Pause" : "Resume"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMaximized(true)}
              className="h-7 w-7 p-0 hover:bg-primary/10"
              title="Maximize"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(true)}
              className="h-7 w-7 p-0"
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Interactive Agent Network */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {agents.slice(0, 4).map((agent) => {
              const isActive = communicationFlows.some(flow => 
                flow.fromAgent === agent.id || flow.toAgent === agent.id
              );
              const isHovered = hoveredAgent === agent.id;
              
              return (
                <Button
                  key={agent.id}
                  variant="outline"
                  className={cn(
                    "h-auto p-3 flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer",
                    isActive && "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
                    isHovered && "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                  )}
                  onClick={() => onAgentClick?.(agent.id)}
                  onMouseEnter={() => setHoveredAgent(agent.id)}
                  onMouseLeave={() => setHoveredAgent(null)}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    agent.status === "working" ? "bg-green-500" : "bg-gray-400",
                    isHovered && "scale-110"
                  )}>
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium">{agent.name}</div>
                    <div className="text-xs text-muted-foreground">{agent.status}</div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </Button>
              );
            })}
          </div>

          {/* Real-time Communication Flows */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Active Communications
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {communicationFlows.length > 0 ? (
                communicationFlows.map((flow) => (
                  <div
                    key={flow.id}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-lg border transition-all duration-300",
                      flow.isActive ? "bg-muted/50 border-muted" : "bg-background border-border/30"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {flow.fromName}
                      </Badge>
                      <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                      <Badge variant="outline" className="text-xs shrink-0">
                        {flow.toName}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary"
                        className={cn("text-xs", getTypeColor(flow.type))}
                      >
                        {flow.type.replace('-', ' ')}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {flow.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground text-sm py-4">
                  No active communications
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
