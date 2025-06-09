import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageSquare, 
  File, 
  Calendar,
  Filter,
  Download,
  Eye
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { Message } from "@/types";

interface CommunicationHistoryProps {
  messages: Message[];
  selectedMessage: Message | null;
  onMessageSelect: (message: Message | null) => void;
  searchQuery?: string;
}

export const CommunicationHistory = ({ 
  messages, 
  selectedMessage, 
  onMessageSelect, 
  searchQuery = "" 
}: CommunicationHistoryProps) => {
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");
  
  const { agents } = useAgents();

  const filteredMessages = useMemo(() => {
    return messages.filter(msg => {
      // Search query filter
      if (searchQuery && !msg.content.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Date filter
      if (dateFilter !== "all") {
        const msgDate = new Date(msg.timestamp);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case "today":
            if (daysDiff > 0) return false;
            break;
          case "week":
            if (daysDiff > 7) return false;
            break;
          case "month":
            if (daysDiff > 30) return false;
            break;
        }
      }

      // Type filter
      if (typeFilter !== "all" && msg.type !== typeFilter) {
        return false;
      }

      // Agent filter
      if (agentFilter !== "all" && msg.from !== agentFilter && msg.to !== agentFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [messages, searchQuery, dateFilter, typeFilter, agentFilter]);

  const getAgentName = (agentId: string) => {
    if (agentId === "current-user") return "You";
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || agentId;
  };

  const getAgentAvatar = (agentId: string) => {
    if (agentId === "current-user") return undefined;
    const agent = agents.find(a => a.id === agentId);
    return agent?.avatar;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case "file_share":
        return <File className="w-4 h-4" />;
      case "task_assignment":
        return <Calendar className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getMessageTypeBadge = (type: string) => {
    switch (type) {
      case "file_share":
        return <Badge variant="secondary">File</Badge>;
      case "task_assignment":
        return <Badge variant="secondary">Task</Badge>;
      case "notification":
        return <Badge variant="outline">Notification</Badge>;
      default:
        return <Badge variant="outline">Message</Badge>;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Filters */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Date Range</label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Message Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="direct">Direct Message</SelectItem>
                <SelectItem value="file_share">File Share</SelectItem>
                <SelectItem value="task_assignment">Task Assignment</SelectItem>
                <SelectItem value="notification">Notification</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Agent</label>
            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                {agents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Message History */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No messages found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <Card 
                key={msg.id} 
                className={`hover:shadow-md transition-shadow cursor-pointer ${
                  selectedMessage?.id === msg.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => onMessageSelect(msg)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarImage src={getAgentAvatar(msg.from)} />
                      <AvatarFallback>
                        {getAgentName(msg.from)[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">
                          {getAgentName(msg.from)}
                        </span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-muted-foreground">
                          {getAgentName(msg.to)}
                        </span>
                        {getMessageTypeBadge(msg.type)}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {formatDate(msg.timestamp)}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        {getMessageTypeIcon(msg.type)}
                        <p className="text-sm flex-1">{msg.content}</p>
                      </div>
                      
                      {msg.metadata && (
                        <div className="mt-2 p-2 bg-muted rounded text-xs">
                          {msg.metadata.fileName && (
                            <div className="flex items-center gap-2">
                              <File className="w-3 h-3" />
                              <span>{msg.metadata.fileName}</span>
                              <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
