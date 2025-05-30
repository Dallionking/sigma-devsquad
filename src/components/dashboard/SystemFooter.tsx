
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Message } from "@/types";
import { ChevronUp, ChevronDown, Terminal, MessageSquare, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemFooterProps {
  onToggle: () => void;
  messages: Message[];
}

export const SystemFooter = ({ onToggle, messages }: SystemFooterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const recentLogs = [
    { id: 1, timestamp: "10:32:45", level: "INFO", message: "Backend Agent: Authentication endpoint implementation started" },
    { id: 2, timestamp: "10:32:42", level: "INFO", message: "Planning Agent: Requirements analysis completed successfully" },
    { id: 3, timestamp: "10:32:40", level: "WARN", message: "DevOps Agent: CI/CD pipeline configuration requires attention" },
    { id: 4, timestamp: "10:32:38", level: "INFO", message: "Documentation Agent: API documentation update in progress" },
    { id: 5, timestamp: "10:32:35", level: "ERROR", message: "DevOps Agent: Failed to connect to deployment server" },
  ];

  const recentMessages = messages
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const handleToggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-card border-t border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-sm font-medium text-card-foreground">System Logs & Activity</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {recentLogs.length} entries
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleExpansion}
            className="h-8"
          >
            {isExpanded ? (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Collapse
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Expand
              </>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8"
          >
            Close
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        isExpanded ? "max-h-80" : "max-h-24"
      )}>
        <div className="flex">
          {/* System Logs */}
          <div className="flex-1 p-4 border-r border-border">
            <div className="flex items-center space-x-2 mb-3">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <h4 className="text-sm font-medium text-card-foreground">System Logs</h4>
            </div>
            
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-center space-x-3 text-xs font-mono">
                  <span className="text-muted-foreground">{log.timestamp}</span>
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs px-1.5 py-0.5",
                      log.level === "ERROR" && "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300",
                      log.level === "WARN" && "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
                      log.level === "INFO" && "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    )}
                  >
                    {log.level}
                  </Badge>
                  <span className="text-card-foreground flex-1">{log.message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="w-96 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <h4 className="text-sm font-medium text-card-foreground">Recent Messages</h4>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {recentMessages.map((message) => (
                <div key={message.id} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-blue-600 dark:text-blue-400">{message.from}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium text-teal-600 dark:text-teal-400">{message.to}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-card-foreground truncate">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
