
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pin, X, MessageSquare } from "lucide-react";

export const PinnedMessages = () => {
  const pinnedMessages = [
    {
      id: "1",
      content: "Important: All team members please review the new project guidelines",
      author: { name: "Alice Johnson", avatar: "/placeholder.svg" },
      timestamp: new Date(Date.now() - 3600000),
      room: "General"
    },
    {
      id: "2",
      content: "Reminder: Code review deadline is tomorrow at 5 PM",
      author: { name: "Bob Smith", avatar: "/placeholder.svg" },
      timestamp: new Date(Date.now() - 7200000),
      room: "Development"
    }
  ];

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleDateString() + ' ' + timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold flex items-center gap-2">
          <Pin className="w-5 h-5" />
          Pinned Messages
          <Badge variant="secondary">{pinnedMessages.length}</Badge>
        </h3>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {pinnedMessages.length > 0 ? (
            pinnedMessages.map((message) => (
              <Card key={message.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.author.avatar} />
                      <AvatarFallback>{message.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{message.author.name}</span>
                          <Badge variant="outline" className="text-xs">#{message.room}</Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm mb-2">{message.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.timestamp)}
                        </span>
                        <Pin className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <Pin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No pinned messages</h3>
              <p>Important messages will appear here when pinned.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
