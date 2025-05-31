
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreHorizontal,
  File,
  Image as ImageIcon,
  Download
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { useMessages } from "@/contexts/MessageContext";
import { FileUploadDialog } from "./FileUploadDialog";

interface DirectMessagePanelProps {
  agentId: string;
}

export const DirectMessagePanel = ({ agentId }: DirectMessagePanelProps) => {
  const [message, setMessage] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { agents } = useAgents();
  const { messages, addMessage } = useMessages();
  
  const agent = agents.find(a => a.id === agentId);
  const conversation = messages.filter(msg => 
    (msg.from === agentId && msg.to === "current-user") ||
    (msg.from === "current-user" && msg.to === agentId)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    addMessage({
      from: "current-user",
      to: agentId,
      content: message,
      type: "direct"
    });

    setMessage("");
    
    // Simulate agent response
    setIsTyping(true);
    setTimeout(() => {
      addMessage({
        from: agentId,
        to: "current-user",
        content: `Thanks for your message! I'll help you with that right away.`,
        type: "direct"
      });
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = (files: File[]) => {
    files.forEach(file => {
      addMessage({
        from: "current-user",
        to: agentId,
        content: `Shared file: ${file.name}`,
        type: "file_share",
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        }
      });
    });
    setShowFileUpload(false);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <ImageIcon className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Agent not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Agent Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={agent.avatar} />
                <AvatarFallback>
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div>
              <h3 className="font-medium">{agent.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {agent.specialization.replace(/-/g, ' ')}
                </Badge>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {conversation.map((msg) => {
            const isFromUser = msg.from === "current-user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isFromUser ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="text-xs">
                    {isFromUser ? "U" : agent.name[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`max-w-[70%] ${isFromUser ? "items-end" : ""}`}>
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      isFromUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.type === "file_share" ? (
                      <div className="flex items-center gap-2">
                        {getFileIcon(msg.metadata?.fileType || "")}
                        <span>{msg.content}</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
          
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="text-xs">{agent.name[0]}</AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="min-h-[60px] resize-none"
            rows={2}
          />
          
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFileUpload(true)}
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* File Upload Dialog */}
      <FileUploadDialog
        open={showFileUpload}
        onOpenChange={setShowFileUpload}
        onUpload={handleFileUpload}
      />
    </div>
  );
};
