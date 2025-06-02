
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Pin, 
  MessageSquare, 
  Users, 
  Calendar,
  ExternalLink,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PinnedMessage {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  source: {
    type: "direct" | "group" | "channel";
    name: string;
    id: string;
  };
  pinnedBy: {
    id: string;
    name: string;
  };
  pinnedAt: Date;
  originalTimestamp: Date;
  category?: "announcement" | "important" | "deadline" | "resource";
  reactions?: { emoji: string; count: number }[];
}

interface PinnedMessagesProps {
  searchQuery?: string;
}

export const PinnedMessages = ({ searchQuery }: PinnedMessagesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const pinnedMessages: PinnedMessage[] = [
    {
      id: "1",
      content: "🚀 Major release v2.0 is scheduled for next Friday! Please ensure all features are tested and documented.",
      author: {
        id: "1",
        name: "Alice Johnson",
        avatar: "/placeholder.svg"
      },
      source: {
        type: "group",
        name: "Development Team",
        id: "dev-team"
      },
      pinnedBy: {
        id: "1",
        name: "Alice Johnson"
      },
      pinnedAt: new Date(Date.now() - 86400000),
      originalTimestamp: new Date(Date.now() - 172800000),
      category: "announcement",
      reactions: [
        { emoji: "🚀", count: 12 },
        { emoji: "👍", count: 8 }
      ]
    },
    {
      id: "2",
      content: "📋 Sprint retrospective meeting tomorrow at 2 PM in Conference Room A. Agenda attached.",
      author: {
        id: "2",
        name: "Bob Smith",
        avatar: "/placeholder.svg"
      },
      source: {
        type: "group",
        name: "Project Alpha",
        id: "project-alpha"
      },
      pinnedBy: {
        id: "3",
        name: "Carol Williams"
      },
      pinnedAt: new Date(Date.now() - 43200000),
      originalTimestamp: new Date(Date.now() - 86400000),
      category: "deadline",
      reactions: [
        { emoji: "📅", count: 6 }
      ]
    },
    {
      id: "3",
      content: "📚 New design system documentation is now available. Please review and update your components accordingly: https://design.company.com",
      author: {
        id: "3",
        name: "Carol Williams",
        avatar: "/placeholder.svg"
      },
      source: {
        type: "channel",
        name: "design-updates",
        id: "design-channel"
      },
      pinnedBy: {
        id: "4",
        name: "David Brown"
      },
      pinnedAt: new Date(Date.now() - 21600000),
      originalTimestamp: new Date(Date.now() - 259200000),
      category: "resource",
      reactions: [
        { emoji: "📚", count: 15 },
        { emoji: "🎨", count: 9 }
      ]
    },
    {
      id: "4",
      content: "⚠️ Database maintenance scheduled for this weekend. Services will be down from 2 AM to 6 AM on Saturday.",
      author: {
        id: "4",
        name: "David Brown",
        avatar: "/placeholder.svg"
      },
      source: {
        type: "group",
        name: "Infrastructure Team",
        id: "infra-team"
      },
      pinnedBy: {
        id: "1",
        name: "Alice Johnson"
      },
      pinnedAt: new Date(Date.now() - 10800000),
      originalTimestamp: new Date(Date.now() - 432000000),
      category: "important"
    }
  ];

  const categories = [
    { id: "all", label: "All Messages", count: pinnedMessages.length },
    { id: "announcement", label: "Announcements", count: pinnedMessages.filter(m => m.category === "announcement").length },
    { id: "important", label: "Important", count: pinnedMessages.filter(m => m.category === "important").length },
    { id: "deadline", label: "Deadlines", count: pinnedMessages.filter(m => m.category === "deadline").length },
    { id: "resource", label: "Resources", count: pinnedMessages.filter(m => m.category === "resource").length }
  ];

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "announcement": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "important": return "bg-red-500/10 text-red-700 border-red-200";
      case "deadline": return "bg-orange-500/10 text-orange-700 border-orange-200";
      case "resource": return "bg-green-500/10 text-green-700 border-green-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "direct": return <MessageSquare className="w-4 h-4" />;
      case "group": return <Users className="w-4 h-4" />;
      case "channel": return <span className="text-sm font-bold">#</span>;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const filteredMessages = pinnedMessages.filter(message => {
    const matchesCategory = selectedCategory === "all" || message.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.source.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleUnpin = (messageId: string) => {
    console.log("Unpinning message:", messageId);
    // Implementation would update the pinned messages
  };

  const handleGoToMessage = (message: PinnedMessage) => {
    console.log("Navigating to message:", message);
    // Implementation would navigate to the original message location
  };

  return (
    <div className="h-full flex flex-col">
      {/* Category Filters */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.label}
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Pinned Messages List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Pin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No pinned messages</h3>
              <p>Pin important messages to keep them easily accessible.</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <Card key={message.id} className="relative">
                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.author.avatar} />
                        <AvatarFallback className="text-xs">
                          {message.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {message.author.name}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {getSourceIcon(message.source.type)}
                            <span>{message.source.name}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {message.category && (
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs", getCategoryColor(message.category))}
                            >
                              {message.category}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            Pinned by {message.pinnedBy.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleGoToMessage(message)}
                        className="h-8 w-8 p-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUnpin(message.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="mb-3">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>

                  {/* Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      {message.reactions.map((reaction, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="text-xs cursor-pointer hover:bg-muted"
                        >
                          {reaction.emoji} {reaction.count}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {message.originalTimestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Pin className="w-3 h-3" />
                        <span>
                          Pinned {message.pinnedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
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
