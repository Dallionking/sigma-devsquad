
import { useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { useMessages } from "@/contexts/MessageContext";
import { ResponsiveText } from "./ResponsiveText";
import { cn } from "@/lib/utils";

interface MessagesListProps {
  selectedAgent: string;
  isTyping: boolean;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

export const MessagesList = ({
  selectedAgent,
  isTyping,
  onTouchStart,
  onTouchEnd
}: MessagesListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { agents } = useAgents();
  const { messages } = useMessages();

  const getAgentName = (agentId: string) => {
    if (agentId === "current-user") return "You";
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || agentId;
  };

  const getConversation = () => {
    if (!selectedAgent) return [];
    return messages.filter(msg => 
      (msg.from === selectedAgent && msg.to === "current-user") ||
      (msg.from === "current-user" && msg.to === selectedAgent)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [getConversation()]);

  return (
    <ScrollArea className="flex-1">
      <div 
        className="p-3 sm:p-4 space-y-3 sm:space-y-4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {getConversation().map((msg) => {
          const isFromUser = msg.from === "current-user";
          return (
            <div
              key={msg.id}
              className={cn(
                "flex gap-2 sm:gap-3 touch-manipulation",
                isFromUser ? "flex-row-reverse" : ""
              )}
            >
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8 shrink-0">
                <AvatarFallback className="text-responsive-xs">
                  {isFromUser ? "U" : getAgentName(selectedAgent)[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className={cn(
                "max-w-[85%] sm:max-w-[75%] min-w-0",
                isFromUser ? "items-end" : ""
              )}>
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 break-words-mobile min-h-[44px] flex items-center",
                    "touch-manipulation active:scale-[0.98] transition-transform duration-100",
                    isFromUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {msg.type === "task_assignment" ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                      <ResponsiveText 
                        variant="small" 
                        className="min-w-0 contrast-enhanced"
                      >
                        {msg.content}
                      </ResponsiveText>
                    </div>
                  ) : (
                    <ResponsiveText 
                      variant="small" 
                      className="contrast-enhanced"
                    >
                      {msg.content}
                    </ResponsiveText>
                  )}
                </div>
                
                <ResponsiveText 
                  variant="muted" 
                  className="mt-1 contrast-enhanced-muted"
                >
                  {formatTime(msg.timestamp)}
                </ResponsiveText>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex gap-2 sm:gap-3">
            <Avatar className="w-6 h-6 sm:w-8 sm:h-8 shrink-0">
              <AvatarFallback className="text-responsive-xs">
                {getAgentName(selectedAgent)[0]}
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg px-3 py-2 min-h-[44px] flex items-center">
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
  );
};
