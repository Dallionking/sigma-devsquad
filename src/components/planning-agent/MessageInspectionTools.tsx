
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent, Message } from "@/pages/Index";
import { Search, Filter, MessageSquare, Clock, ArrowRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInspectionToolsProps {
  messages: Message[];
  agents: Agent[];
  selectedMessage: Message | null;
  onMessageSelect: (message: Message | null) => void;
}

export const MessageInspectionTools = ({
  messages,
  agents,
  selectedMessage,
  onMessageSelect
}: MessageInspectionToolsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [contentTypeFilter, setContentTypeFilter] = useState("all");

  const getAgentName = (agentType: string) => {
    return agents.find(a => a.type === agentType)?.name || agentType;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "request": return "bg-blue-50 text-blue-700 border-blue-200";
      case "response": return "bg-green-50 text-green-700 border-green-200";
      case "notification": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // Filter and sort messages
  const filteredMessages = messages
    .filter(message => {
      const matchesSearch = searchQuery === "" || 
        message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getAgentName(message.from).toLowerCase().includes(searchQuery.toLowerCase()) ||
        getAgentName(message.to).toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = contentTypeFilter === "all" || message.type === contentTypeFilter;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "timestamp":
          comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case "content":
          comparison = a.content.localeCompare(b.content);
          break;
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
        case "length":
          comparison = a.content.length - b.content.length;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const exportMessages = () => {
    const exportData = filteredMessages.map(msg => ({
      id: msg.id,
      from: getAgentName(msg.from),
      to: getAgentName(msg.to),
      type: msg.type,
      content: msg.content,
      timestamp: msg.timestamp,
      contentLength: msg.content.length
    }));
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agent-messages-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search messages, agents, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="request">Requests</SelectItem>
              <SelectItem value="response">Responses</SelectItem>
              <SelectItem value="notification">Notifications</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="timestamp">Time</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="length">Length</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </Button>
          
          <Button variant="outline" size="sm" onClick={exportMessages}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span>Showing {filteredMessages.length} of {messages.length} messages</span>
          {searchQuery && (
            <Badge variant="secondary">
              Search: "{searchQuery}"
            </Badge>
          )}
          {contentTypeFilter !== "all" && (
            <Badge variant="secondary">
              Type: {contentTypeFilter}
            </Badge>
          )}
        </div>
      </Card>

      {/* Message Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {filteredMessages.filter(m => m.type === "request").length}
            </div>
            <div className="text-sm text-muted-foreground">Requests</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredMessages.filter(m => m.type === "response").length}
            </div>
            <div className="text-sm text-muted-foreground">Responses</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredMessages.filter(m => m.type === "notification").length}
            </div>
            <div className="text-sm text-muted-foreground">Notifications</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(filteredMessages.reduce((acc, m) => acc + m.content.length, 0) / filteredMessages.length) || 0}
            </div>
            <div className="text-sm text-muted-foreground">Avg Length</div>
          </div>
        </Card>
      </div>

      {/* Detailed Message List */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Message Details ({filteredMessages.length})
        </h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMessages.map((message) => {
            const isSelected = selectedMessage?.id === message.id;
            
            return (
              <Card 
                key={message.id}
                className={cn(
                  "p-4 cursor-pointer transition-all duration-200",
                  isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-muted/50"
                )}
                onClick={() => onMessageSelect(isSelected ? null : message)}
              >
                <div className="space-y-3">
                  {/* Message Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs font-medium">
                        {getAgentName(message.from)}
                      </Badge>
                      
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      
                      <Badge variant="outline" className="text-xs font-medium">
                        {getAgentName(message.to)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline"
                        className={cn("text-xs", getTypeColor(message.type))}
                      >
                        {message.type}
                      </Badge>
                      
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Content */}
                  <div className="pl-4 border-l-2 border-muted">
                    <p className="text-sm text-foreground leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  
                  {/* Message Metadata */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-muted">
                    <div className="flex items-center space-x-4">
                      <span>ID: {message.id}</span>
                      <span>Length: {message.content.length} chars</span>
                    </div>
                    <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        {filteredMessages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No messages match the current filters</p>
          </div>
        )}
      </Card>
    </div>
  );
};
