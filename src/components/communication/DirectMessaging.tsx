
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Search, 
  Phone, 
  Video, 
  MoreHorizontal,
  Clock,
  Check,
  CheckCheck
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { useMessages } from "@/contexts/MessageContext";
import { DirectMessagePanel } from "./DirectMessagePanel";
import { cn } from "@/lib/utils";

interface DirectMessage {
  id: string;
  agentId: string;
  agentName: string;
  agentAvatar?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  status: "delivered" | "read" | "sent";
}

interface DirectMessagingProps {
  searchQuery?: string;
}

export const DirectMessaging = ({ searchQuery }: DirectMessagingProps) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [conversations, setConversations] = useState<DirectMessage[]>([]);
  const { agents } = useAgents();
  const { messages } = useMessages();

  // Mock conversations data
  useEffect(() => {
    const mockConversations: DirectMessage[] = [
      {
        id: "1",
        agentId: "1",
        agentName: "Alice Johnson",
        agentAvatar: "/placeholder.svg",
        lastMessage: "The authentication module is ready for testing. Let me know if you need any help with the implementation.",
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        unreadCount: 2,
        isOnline: true,
        status: "delivered"
      },
      {
        id: "2",
        agentId: "2", 
        agentName: "Bob Smith",
        agentAvatar: "/placeholder.svg",
        lastMessage: "Thanks for the code review! I've addressed all the comments.",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        unreadCount: 0,
        isOnline: true,
        status: "read"
      },
      {
        id: "3",
        agentId: "3",
        agentName: "Carol Williams",
        agentAvatar: "/placeholder.svg",
        lastMessage: "The new design mockups are in the shared folder. Please take a look when you have a chance.",
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        unreadCount: 1,
        isOnline: false,
        status: "sent"
      },
      {
        id: "4",
        agentId: "4",
        agentName: "David Brown",
        agentAvatar: "/placeholder.svg",
        lastMessage: "Database migration completed successfully. All tests are passing.",
        timestamp: new Date(Date.now() - 14400000), // 4 hours ago
        unreadCount: 0,
        isOnline: true,
        status: "read"
      },
      {
        id: "5",
        agentId: "5",
        agentName: "Emma Davis",
        agentAvatar: "/placeholder.svg",
        lastMessage: "Can we schedule a quick call to discuss the API endpoints?",
        timestamp: new Date(Date.now() - 21600000), // 6 hours ago
        unreadCount: 3,
        isOnline: false,
        status: "delivered"
      }
    ];

    setConversations(mockConversations);
  }, []);

  const filteredConversations = conversations.filter(conv =>
    !searchQuery || 
    conv.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgent(agentId);
    // Mark messages as read
    setConversations(prev => 
      prev.map(conv => 
        conv.agentId === agentId 
          ? { ...conv, unreadCount: 0, status: "read" as const }
          : conv
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <Check className="w-3 h-3 text-muted-foreground" />;
      case "delivered": return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      case "read": return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default: return null;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    if (diff < 60000) return "now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return timestamp.toLocaleDateString();
  };

  if (selectedAgent) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <Button
            variant="ghost"
            onClick={() => setSelectedAgent(null)}
            className="mb-2"
          >
            ← Back to conversations
          </Button>
        </div>
        <DirectMessagePanel agentId={selectedAgent} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Direct Messages</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {searchQuery && (
          <div className="text-sm text-muted-foreground">
            {filteredConversations.length} results for "{searchQuery}"
          </div>
        )}
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredConversations.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {searchQuery ? (
                <>
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No conversations found</h3>
                  <p>Try adjusting your search terms.</p>
                </>
              ) : (
                <>
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No direct messages</h3>
                  <p>Start a conversation with your team members.</p>
                </>
              )}
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50",
                  conversation.unreadCount > 0 && "bg-muted/30 border-primary/20"
                )}
                onClick={() => handleSelectAgent(conversation.agentId)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={conversation.agentAvatar} />
                      <AvatarFallback>
                        {conversation.agentName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn(
                        "font-medium text-sm",
                        conversation.unreadCount > 0 && "text-foreground"
                      )}>
                        {conversation.agentName}
                      </span>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(conversation.status)}
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className={cn(
                        "text-sm text-muted-foreground truncate mr-2",
                        conversation.unreadCount > 0 && "text-foreground font-medium"
                      )}>
                        {conversation.lastMessage}
                      </p>
                      
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
