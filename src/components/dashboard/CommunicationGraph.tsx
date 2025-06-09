
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent, Message, AgentType } from "@/types";
import { ArrowRight, MessageCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommunicationGraphProps {
  agents: Agent[];
  messages: Message[];
  selectedAgent: Agent | null;
  onAgentSelect: (agent: Agent | null) => void;
  onMessageSelect: (message: Message | null) => void;
}

export const CommunicationGraph = ({ 
  agents, 
  messages, 
  selectedAgent, 
  onAgentSelect, 
  onMessageSelect 
}: CommunicationGraphProps) => {
  
  // Calculate communication frequency between agents
  const getConnectionStrength = (from: AgentType, to: AgentType) => {
    const connections = messages.filter(m => 
      (m.from === from && m.to === to) || (m.from === to && m.to === from)
    );
    return connections.length;
  };

  // Get recent messages for timeline
  const recentMessages = messages
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Agent Communication</h2>
        <p className="text-slate-600">Real-time message flow between development agents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Communication Matrix */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Communication Matrix
          </h3>
          
          <div className="space-y-3">
            {agents.map((fromAgent) => (
              <div key={fromAgent.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    fromAgent.status === "working" && "bg-green-500",
                    fromAgent.status === "idle" && "bg-slate-400",
                    fromAgent.status === "waiting" && "bg-yellow-500",
                    fromAgent.status === "error" && "bg-red-500"
                  )} />
                  <span className="font-medium text-sm">{fromAgent.name}</span>
                </div>
                
                <div className="ml-5 space-y-1">
                  {agents
                    .filter(toAgent => toAgent.id !== fromAgent.id)
                    .map((toAgent) => {
                      const strength = getConnectionStrength(fromAgent.type, toAgent.type);
                      
                      return (
                        <div 
                          key={`${fromAgent.id}-${toAgent.id}`}
                          className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer"
                          onClick={() => {
                            const relevantMessages = messages.filter(m => 
                              (m.from === fromAgent.type && m.to === toAgent.type) ||
                              (m.from === toAgent.type && m.to === fromAgent.type)
                            );
                            if (relevantMessages.length > 0) {
                              onMessageSelect(relevantMessages[0]);
                            }
                          }}
                        >
                          <div className="flex items-center space-x-2 text-sm">
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                            <span className="text-slate-700">{toAgent.name}</span>
                          </div>
                          
                          {strength > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {strength} msg{strength !== 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Message Timeline */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Recent Messages
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentMessages.map((message) => {
              const fromAgent = agents.find(a => a.type === message.from);
              const toAgent = agents.find(a => a.type === message.to);
              
              return (
                <div 
                  key={message.id}
                  className="p-3 border border-slate-200 rounded-lg hover:shadow-sm cursor-pointer transition-shadow"
                  onClick={() => onMessageSelect(message)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-medium text-blue-600">
                        {fromAgent?.name}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="font-medium text-teal-600">
                        {toAgent?.name}
                      </span>
                    </div>
                    
                    <Badge 
                      variant="secondary"
                      className={cn(
                        "text-xs",
                        message.type === "request" && "bg-blue-50 text-blue-700",
                        message.type === "response" && "bg-green-50 text-green-700",
                        message.type === "notification" && "bg-yellow-50 text-yellow-700"
                      )}
                    >
                      {message.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-slate-700 line-clamp-2 mb-2">
                    {message.content}
                  </p>
                  
                  <p className="text-xs text-slate-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Communication Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Communication Statistics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{messages.length}</div>
            <div className="text-sm text-blue-800">Total Messages</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {messages.filter(m => m.type === "response").length}
            </div>
            <div className="text-sm text-green-800">Responses</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {messages.filter(m => m.type === "request").length}
            </div>
            <div className="text-sm text-yellow-800">Requests</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {agents.filter(a => a.status === "working").length}
            </div>
            <div className="text-sm text-purple-800">Active Agents</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
