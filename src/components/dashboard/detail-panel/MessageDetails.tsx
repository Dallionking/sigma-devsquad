
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Message, Agent } from "@/types";
import { 
  MessageSquare, 
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageDetailsProps {
  message: Message;
  agents: Agent[];
}

export const MessageDetails = ({ message, agents }: MessageDetailsProps) => {
  const getAgentName = (agentType: string) => {
    const agent = agents.find(a => a.type === agentType);
    return agent?.name || agentType;
  };

  const typeConfig = {
    request: { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
    response: { color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
    notification: { color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" }
  };

  const config = typeConfig[message.type];

  return (
    <div className="space-y-6">
      {/* Message Header */}
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-3">Message Details</h3>
        <div className="flex items-center space-x-3 mb-3">
          <Badge 
            variant="secondary"
            className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
          >
            {getAgentName(message.from)}
          </Badge>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <Badge 
            variant="secondary"
            className="text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20"
          >
            {getAgentName(message.to)}
          </Badge>
        </div>
        <Badge 
          variant="secondary" 
          className={cn(config.bg, config.color)}
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          {message.type}
        </Badge>
      </div>

      {/* Message Content */}
      <Card className="p-4">
        <h4 className="font-medium text-card-foreground mb-3">Content</h4>
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-card-foreground leading-relaxed">
            {message.content}
          </p>
        </div>
      </Card>

      {/* Message Metadata */}
      <Card className="p-4">
        <h4 className="font-medium text-card-foreground mb-3">Metadata</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Timestamp</span>
            <span className="text-sm text-card-foreground">
              {new Date(message.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Message ID</span>
            <span className="text-sm text-card-foreground font-mono">{message.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-sm text-card-foreground">{message.type}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
