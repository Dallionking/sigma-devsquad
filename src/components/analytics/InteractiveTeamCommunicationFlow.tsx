
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
  ChevronDown
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
  const [communicationFlows, setCommunicationFlows] = useState<any[]>([]);

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
            <ChevronUp className="w-4 h-4" />
          </div>
        </CardHeader>
      </Card>
    );
  }

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
          {/* Agent Network Visualization */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {agents.slice(0, 4).map((agent) => {
              const isActive = communicationFlows.some(flow => 
                flow.fromAgent === agent.id || flow.toAgent === agent.id
              );
              
              return (
                <Button
                  key={agent.id}
                  variant="outline"
                  className={cn(
                    "h-auto p-3 flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105",
                    isActive && "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                  )}
                  onClick={() => onAgentClick?.(agent.id)}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    agent.status === "working" ? "bg-green-500" : "bg-gray-400"
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
