
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Message, Agent, AgentType } from "@/types";
import { MessageSquare, ArrowRight, Clock, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInspectorProps {
  messages: Message[];
  agents: Agent[];
  selectedMessage: Message | null;
  onMessageSelect: (message: Message | null) => void;
}

export const MessageInspector = ({ messages, agents, selectedMessage, onMessageSelect }: MessageInspectorProps) => {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [fromFilter, setFromFilter] = useState<string>("all");
  const [toFilter, setToFilter] = useState<string>("all");

  const filteredMessages = messages.filter(message => {
    if (typeFilter !== "all" && message.type !== typeFilter) return false;
    if (fromFilter !== "all" && message.from !== fromFilter) return false;
    if (toFilter !== "all" && message.to !== toFilter) return false;
    return true;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getAgentName = (agentType: AgentType) => {
    const agent = agents.find(a => a.type === agentType);
    return agent?.name || agentType;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "request": return "bg-blue-50 text-blue-700";
      case "response": return "bg-green-50 text-green-700";
      case "notification": return "bg-yellow-50 text-yellow-700";
      default: return "bg-slate-50 text-slate-700";
    }
  };

  const messageStats = {
    total: messages.length,
    requests: messages.filter(m => m.type === "request").length,
    responses: messages.filter(m => m.type === "response").length,
    notifications: messages.filter(m => m.type === "notification").length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Message Inspector</h2>
        <p className="text-slate-600">Detailed view of all inter-agent communications</p>
      </div>

      {/* Message Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{messageStats.total}</div>
            <div className="text-sm text-slate-600">Total Messages</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{messageStats.requests}</div>
            <div className="text-sm text-blue-800">Requests</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{messageStats.responses}</div>
            <div className="text-sm text-green-800">Responses</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{messageStats.notifications}</div>
            <div className="text-sm text-yellow-800">Notifications</div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Filters:</span>
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="request">Request</SelectItem>
              <SelectItem value="response">Response</SelectItem>
              <SelectItem value="notification">Notification</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={fromFilter} onValueChange={setFromFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="From Agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              {agents.map(agent => (
                <SelectItem key={`from-${agent.id}`} value={agent.type}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={toFilter} onValueChange={setToFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="To Agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              {agents.map(agent => (
                <SelectItem key={`to-${agent.id}`} value={agent.type}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Message List */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Messages ({filteredMessages.length})
        </h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMessages.map((message) => {
            const isSelected = selectedMessage?.id === message.id;
            
            return (
              <Card 
                key={message.id}
                className={cn(
                  "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
                  isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-slate-50"
                )}
                onClick={() => onMessageSelect(isSelected ? null : message)}
              >
                <div className="space-y-3">
                  {/* Message Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant="secondary"
                        className="text-xs font-medium text-blue-600 bg-blue-50"
                      >
                        {getAgentName(message.from)}
                      </Badge>
                      
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      
                      <Badge 
                        variant="secondary"
                        className="text-xs font-medium text-teal-600 bg-teal-50"
                      >
                        {getAgentName(message.to)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="secondary"
                        className={cn("text-xs", getTypeColor(message.type))}
                      >
                        {message.type}
                      </Badge>
                      
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Content */}
                  <div className="pl-4 border-l-2 border-slate-200">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  
                  {/* Message Metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Message ID: {message.id}</span>
                    <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        {filteredMessages.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No messages match the current filters</p>
          </div>
        )}
      </Card>
    </div>
  );
};
