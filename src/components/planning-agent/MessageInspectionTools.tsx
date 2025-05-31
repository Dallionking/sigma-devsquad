
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Agent, Message } from "@/types";
import { Search, Filter, Eye, Code, Clock } from "lucide-react";
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
  const [selectedAgent, setSelectedAgent] = useState<string>("all");

  const filteredMessages = messages.filter(message => {
    const matchesSearch = searchQuery === "" || 
      message.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgent = selectedAgent === "all" || 
      message.from === selectedAgent || message.to === selectedAgent;
    return matchesSearch && matchesAgent;
  });

  const getAgentName = (agentType: string) => {
    const agent = agents.find(a => a.type === agentType);
    return agent?.name || agentType;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Message Inspection Tools</h3>
        
        {/* Search and Filter Controls */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search message content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Agent:</span>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedAgent === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedAgent("all")}
              >
                All Agents
              </Badge>
              {agents.map(agent => (
                <Badge
                  key={agent.id}
                  variant={selectedAgent === agent.type ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedAgent(agent.type)}
                >
                  {agent.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message List */}
          <div>
            <h4 className="font-medium mb-3">Messages ({filteredMessages.length})</h4>
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {filteredMessages.map(message => (
                  <div
                    key={message.id}
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-all",
                      selectedMessage?.id === message.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => onMessageSelect(
                      selectedMessage?.id === message.id ? null : message
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {getAgentName(message.from)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">→</span>
                        <Badge variant="secondary" className="text-xs">
                          {getAgentName(message.to)}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {message.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {message.content}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(message.timestamp)}
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Inspect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Message Details */}
          <div>
            <h4 className="font-medium mb-3">Message Details</h4>
            {selectedMessage ? (
              <Card className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Message ID</label>
                    <p className="text-sm text-muted-foreground font-mono">
                      {selectedMessage.id}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">From</label>
                      <p className="text-sm">{getAgentName(selectedMessage.from)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">To</label>
                      <p className="text-sm">{getAgentName(selectedMessage.to)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Badge variant="outline" className="ml-2">
                      {selectedMessage.type}
                    </Badge>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Timestamp</label>
                    <p className="text-sm text-muted-foreground">
                      {formatTimestamp(selectedMessage.timestamp)}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">
                        {selectedMessage.content}
                      </p>
                    </div>
                  </div>
                  
                  {selectedMessage.metadata && (
                    <div>
                      <label className="text-sm font-medium">Metadata</label>
                      <div className="mt-2 p-3 bg-muted rounded-lg">
                        <pre className="text-xs">
                          {JSON.stringify(selectedMessage.metadata, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Code className="w-4 h-4 mr-2" />
                      View Raw
                    </Button>
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <Eye className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  Select a message to inspect its details
                </p>
              </Card>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
