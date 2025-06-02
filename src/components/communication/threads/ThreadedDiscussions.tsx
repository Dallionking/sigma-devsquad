
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Reply, Plus, Search } from "lucide-react";

interface ThreadedDiscussionsProps {
  roomId: string;
  currentUserId: string;
}

export const ThreadedDiscussions = ({ roomId, currentUserId }: ThreadedDiscussionsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedThread, setSelectedThread] = useState<string | null>(null);

  const threads = [
    {
      id: "1",
      title: "Project Architecture Discussion",
      author: { name: "Alice Johnson", avatar: "/placeholder.svg" },
      replyCount: 12,
      lastActivity: new Date(Date.now() - 1800000),
      status: "active"
    },
    {
      id: "2",
      title: "Code Review Process",
      author: { name: "Bob Smith", avatar: "/placeholder.svg" },
      replyCount: 8,
      lastActivity: new Date(Date.now() - 3600000),
      status: "resolved"
    },
    {
      id: "3",
      title: "UI/UX Feedback Needed",
      author: { name: "Carol Wilson", avatar: "/placeholder.svg" },
      replyCount: 5,
      lastActivity: new Date(Date.now() - 7200000),
      status: "active"
    }
  ];

  const filteredThreads = threads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Less than an hour ago";
    if (hours < 24) return `${hours} hours ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Threaded Discussions
            </CardTitle>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Thread
            </Button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96">
            <div className="p-4 space-y-3">
              {filteredThreads.map((thread) => (
                <div
                  key={thread.id}
                  className={`border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedThread === thread.id ? "bg-muted border-primary" : ""
                  }`}
                  onClick={() => setSelectedThread(thread.id)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={thread.author.avatar} />
                      <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{thread.title}</h4>
                        <Badge 
                          variant={thread.status === "active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {thread.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by {thread.author.name}</span>
                        <div className="flex items-center gap-1">
                          <Reply className="w-3 h-3" />
                          <span>{thread.replyCount} replies</span>
                        </div>
                        <span>{formatTime(thread.lastActivity)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredThreads.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No discussions found</h3>
                  <p>Start a new thread to begin the conversation.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
