
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Phone, 
  Video, 
  MoreHorizontal,
  Send,
  Paperclip,
  Smile
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isOwnMessage: boolean;
  status: "sent" | "delivered" | "read";
}

interface DirectMessagePanelProps {
  agentId: string;
}

export const DirectMessagePanel = ({ agentId }: DirectMessagePanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock agent data
  const agent = {
    id: agentId,
    name: "Alice Johnson",
    avatar: "/placeholder.svg",
    status: "online",
    lastSeen: "2 minutes ago"
  };

  // Mock messages
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: "1",
        content: "Hi! I've finished the authentication module. Could you review it when you have time?",
        timestamp: new Date(Date.now() - 3600000),
        isOwnMessage: false,
        status: "read"
      },
      {
        id: "2", 
        content: "Sure! I'll take a look at it this afternoon. Thanks for letting me know.",
        timestamp: new Date(Date.now() - 3540000),
        isOwnMessage: true,
        status: "read"
      },
      {
        id: "3",
        content: "Perfect! I've also added some unit tests. Let me know if you need any clarification on the implementation.",
        timestamp: new Date(Date.now() - 3480000),
        isOwnMessage: false,
        status: "read"
      },
      {
        id: "4",
        content: "Great work on the tests! The code looks solid. Just one minor suggestion about error handling.",
        timestamp: new Date(Date.now() - 1800000),
        isOwnMessage: true,
        status: "delivered"
      }
    ];

    setMessages(mockMessages);
  }, [agentId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      isOwnMessage: true,
      status: "sent"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-background/95 backdrop-blur-sm">
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
              <p className="text-sm text-muted-foreground">
                {agent.status === "online" ? "Active now" : `Last seen ${agent.lastSeen}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.isOwnMessage ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-lg px-3 py-2",
                  message.isOwnMessage
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <div className={cn(
                  "flex items-center justify-end gap-1 mt-1",
                  message.isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  <span className="text-xs">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
