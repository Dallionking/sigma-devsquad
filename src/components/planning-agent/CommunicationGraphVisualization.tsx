import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent, Message, AgentType } from "@/types";
import { ArrowRight, MessageSquare, Users, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommunicationGraphVisualizationProps {
  agents: Agent[];
  messages: Message[];
  selectedMessage: Message | null;
  onMessageSelect: (message: Message | null) => void;
}

export const CommunicationGraphVisualization = ({
  agents,
  messages,
  selectedMessage,
  onMessageSelect
}: CommunicationGraphVisualizationProps) => {
  
  // Calculate communication strength between agents
  const getConnectionStrength = (from: AgentType, to: AgentType) => {
    return messages.filter(m => 
      (m.from === from && m.to === to) || (m.from === to && m.to === from)
    ).length;
  };

  // Get communication frequency for visual thickness
  const getConnectionThickness = (strength: number) => {
    if (strength === 0) return "border-0";
    if (strength <= 2) return "border border-muted";
    if (strength <= 5) return "border-2 border-blue-400";
    return "border-4 border-blue-600";
  };

  // Calculate agent activity level
  const getAgentActivityLevel = (agentType: AgentType) => {
    const agentMessages = messages.filter(m => m.from === agentType || m.to === agentType);
    return agentMessages.length;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Interactive Communication Graph
        </h3>
        
        {/* Agent Network Visualization */}
        <div className="relative min-h-[400px] bg-muted/20 rounded-lg p-6">
          <div className="grid grid-cols-3 gap-8 h-full">
            {/* Left Column - Planning & Documentation */}
            <div className="space-y-8">
              {agents.filter(a => ["planning", "documentation"].includes(a.type)).map((agent) => {
                const activity = getAgentActivityLevel(agent.type);
                return (
                  <div
                    key={agent.id}
                    className={cn(
                      "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
                      agent.status === "working" && "bg-green-50 border-green-500",
                      agent.status === "idle" && "bg-slate-50 border-slate-300",
                      agent.status === "waiting" && "bg-yellow-50 border-yellow-500",
                      agent.status === "error" && "bg-red-50 border-red-500"
                    )}
                  >
                    <div className="text-center">
                      <div className={cn(
                        "w-4 h-4 rounded-full mx-auto mb-2",
                        agent.status === "working" && "bg-green-500",
                        agent.status === "idle" && "bg-slate-400",
                        agent.status === "waiting" && "bg-yellow-500",
                        agent.status === "error" && "bg-red-500"
                      )} />
                      <div className="font-medium text-sm">{agent.name}</div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {activity} msgs
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Column - Development Agents */}
            <div className="space-y-6">
              {agents.filter(a => ["frontend", "backend"].includes(a.type)).map((agent) => {
                const activity = getAgentActivityLevel(agent.type);
                return (
                  <div
                    key={agent.id}
                    className={cn(
                      "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
                      agent.status === "working" && "bg-green-50 border-green-500",
                      agent.status === "idle" && "bg-slate-50 border-slate-300",
                      agent.status === "waiting" && "bg-yellow-50 border-yellow-500",
                      agent.status === "error" && "bg-red-50 border-red-500"
                    )}
                  >
                    <div className="text-center">
                      <div className={cn(
                        "w-4 h-4 rounded-full mx-auto mb-2",
                        agent.status === "working" && "bg-green-500",
                        agent.status === "idle" && "bg-slate-400",
                        agent.status === "waiting" && "bg-yellow-500",
                        agent.status === "error" && "bg-red-500"
                      )} />
                      <div className="font-medium text-sm">{agent.name}</div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {activity} msgs
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column - QA & DevOps */}
            <div className="space-y-8">
              {agents.filter(a => ["qa", "devops"].includes(a.type)).map((agent) => {
                const activity = getAgentActivityLevel(agent.type);
                return (
                  <div
                    key={agent.id}
                    className={cn(
                      "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
                      agent.status === "working" && "bg-green-50 border-green-500",
                      agent.status === "idle" && "bg-slate-50 border-slate-300",
                      agent.status === "waiting" && "bg-yellow-50 border-yellow-500",
                      agent.status === "error" && "bg-red-50 border-red-500"
                    )}
                  >
                    <div className="text-center">
                      <div className={cn(
                        "w-4 h-4 rounded-full mx-auto mb-2",
                        agent.status === "working" && "bg-green-500",
                        agent.status === "idle" && "bg-slate-400",
                        agent.status === "waiting" && "bg-yellow-500",
                        agent.status === "error" && "bg-red-500"
                      )} />
                      <div className="font-medium text-sm">{agent.name}</div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {activity} msgs
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Communication Flow Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Communication Flow Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Most Active Connections */}
          <div>
            <h4 className="font-medium mb-3">Most Active Connections</h4>
            <div className="space-y-2">
              {agents.slice(0, 3).map((fromAgent) => {
                const topConnection = agents
                  .filter(a => a.id !== fromAgent.id)
                  .map(toAgent => ({
                    agent: toAgent,
                    strength: getConnectionStrength(fromAgent.type, toAgent.type)
                  }))
                  .sort((a, b) => b.strength - a.strength)[0];

                if (!topConnection || topConnection.strength === 0) return null;

                return (
                  <div key={fromAgent.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{fromAgent.name}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{topConnection.agent.name}</span>
                    </div>
                    <Badge variant="secondary">{topConnection.strength} msgs</Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Communication Patterns */}
          <div>
            <h4 className="font-medium mb-3">Communication Patterns</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Request/Response Ratio</span>
                <span className="font-medium">
                  {messages.filter(m => m.type === "request").length}:
                  {messages.filter(m => m.type === "response").length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Peak Activity Time</span>
                <span className="font-medium">10:30 AM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average Message Length</span>
                <span className="font-medium">
                  {Math.round(messages.reduce((acc, m) => acc + m.content.length, 0) / messages.length)} chars
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Message Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Recent Communication Timeline
        </h3>
        
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {messages.slice(-5).reverse().map((message) => {
            const fromAgent = agents.find(a => a.type === message.from);
            const toAgent = agents.find(a => a.type === message.to);
            const isSelected = selectedMessage?.id === message.id;
            
            return (
              <div 
                key={message.id}
                className={cn(
                  "p-3 border rounded-lg cursor-pointer transition-all",
                  isSelected ? "border-blue-500 bg-blue-50" : "border-border hover:border-blue-300"
                )}
                onClick={() => onMessageSelect(isSelected ? null : message)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {fromAgent?.name}
                    </Badge>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    <Badge variant="secondary" className="text-xs">
                      {toAgent?.name}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {message.content}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
