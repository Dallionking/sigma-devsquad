
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Hash, 
  Search, 
  MoreHorizontal,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GroupRoom {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  unreadCount: number;
  lastActivity: Date;
  isPrivate: boolean;
  members: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
}

interface GroupChatRoomsProps {
  searchQuery?: string;
}

export const GroupChatRooms = ({ searchQuery }: GroupChatRoomsProps) => {
  const [rooms] = useState<GroupRoom[]>([
    {
      id: "1",
      name: "Development Team",
      description: "Main development discussions and updates",
      memberCount: 8,
      unreadCount: 3,
      lastActivity: new Date(Date.now() - 300000),
      isPrivate: false,
      members: [
        { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg" },
        { id: "2", name: "Bob Smith", avatar: "/placeholder.svg" },
        { id: "3", name: "Carol Williams", avatar: "/placeholder.svg" }
      ]
    },
    {
      id: "2", 
      name: "Design Review",
      description: "UI/UX design feedback and iterations",
      memberCount: 5,
      unreadCount: 0,
      lastActivity: new Date(Date.now() - 3600000),
      isPrivate: true,
      members: [
        { id: "3", name: "Carol Williams", avatar: "/placeholder.svg" },
        { id: "4", name: "David Brown", avatar: "/placeholder.svg" }
      ]
    },
    {
      id: "3",
      name: "Project Alpha",
      description: "Sprint planning and task coordination",
      memberCount: 12,
      unreadCount: 7,
      lastActivity: new Date(Date.now() - 1800000),
      isPrivate: false,
      members: [
        { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg" },
        { id: "2", name: "Bob Smith", avatar: "/placeholder.svg" },
        { id: "5", name: "Emma Davis", avatar: "/placeholder.svg" }
      ]
    }
  ]);

  const filteredRooms = rooms.filter(room =>
    !searchQuery || 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    if (diff < 60000) return "now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Group Chat Rooms</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {searchQuery && (
          <div className="text-sm text-muted-foreground">
            {filteredRooms.length} results for "{searchQuery}"
          </div>
        )}
      </div>

      {/* Rooms List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredRooms.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {searchQuery ? (
                <>
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No rooms found</h3>
                  <p>Try adjusting your search terms.</p>
                </>
              ) : (
                <>
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No group rooms</h3>
                  <p>Create or join group chat rooms to collaborate with your team.</p>
                </>
              )}
            </div>
          ) : (
            filteredRooms.map((room) => (
              <Card 
                key={room.id} 
                className={cn(
                  "cursor-pointer transition-colors hover:bg-muted/50",
                  room.unreadCount > 0 && "border-primary/20 bg-muted/30"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {room.isPrivate ? (
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Hash className="w-5 h-5 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{room.name}</span>
                          {room.isPrivate && (
                            <Badge variant="secondary" className="text-xs">
                              Private
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {room.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {room.unreadCount}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {formatTime(room.lastActivity)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {room.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {room.members.slice(0, 3).map((member) => (
                              <Avatar key={member.id} className="w-6 h-6 border-2 border-background">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="text-xs">
                                  {member.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {room.memberCount > 3 && (
                              <div className="w-6 h-6 bg-muted rounded-full border-2 border-background flex items-center justify-center">
                                <span className="text-xs font-medium">
                                  +{room.memberCount - 3}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {room.memberCount} members
                          </span>
                        </div>
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
