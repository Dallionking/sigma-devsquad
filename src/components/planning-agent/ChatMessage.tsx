
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Code, FileText, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  attachments?: Array<{
    type: "code" | "document" | "idea";
    content: string;
    title: string;
  }>;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case "code":
        return <Code className="w-3 h-3" />;
      case "document":
        return <FileText className="w-3 h-3" />;
      case "idea":
        return <Lightbulb className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
      {message.type === "agent" && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={`max-w-[75%] space-y-2 ${message.type === "user" ? "order-2" : ""}`}>
        <Card className={`p-4 ${
          message.type === "user" 
            ? "bg-primary text-primary-foreground ml-auto shadow-md" 
            : "bg-card border border-border hover:shadow-sm transition-shadow"
        }`}>
          <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
        </Card>
        
        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="space-y-2">
            {message.attachments.map((attachment, index) => (
              <Card key={index} className="p-3 bg-muted/50 border-l-4 border-l-blue-500 hover:bg-muted/70 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  {getAttachmentIcon(attachment.type)}
                  <span className="font-medium text-sm">{attachment.title}</span>
                  <Badge variant="secondary" className="text-xs">
                    {attachment.type}
                  </Badge>
                </div>
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap overflow-x-auto">
                  {attachment.content}
                </pre>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <span>{formatTimestamp(message.timestamp)}</span>
          {message.type === "agent" && <Badge variant="outline" className="text-xs">AI</Badge>}
        </div>
      </div>

      {message.type === "user" && (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 order-3">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
};
