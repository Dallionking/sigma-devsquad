
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, Hash, Plus } from "lucide-react";

interface GroupChatRoomsProps {
  searchQuery?: string;
}

export const GroupChatRooms = ({ searchQuery = "" }: GroupChatRoomsProps) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const rooms = [
    {
      id: "1",
      name: "General",
      description: "Team-wide discussions",
      memberCount: 12,
      unread: 5,
      type: "public"
    },
    {
      id: "2", 
      name: "Development",
      description: "Code reviews and development chat",
      memberCount: 8,
      unread: 2,
      type: "public"
    },
    {
      id: "3",
      name: "Design Team",
      description: "Design discussions and feedback",
      memberCount: 4,
      unread: 0,
      type: "private"
    }
  ];

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex">
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Chat Rooms</h3>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              New Room
            </Button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search rooms..." className="pl-10" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 ${
                  selectedRoom === room.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedRoom(room.id)}
              >
                <div className="p-2 bg-muted rounded">
                  <Hash className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{room.name}</span>
                    {room.unread > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                        {room.unread}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{room.memberCount} members</span>
                    <Badge variant={room.type === "public" ? "secondary" : "outline"} className="text-xs">
                      {room.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Hash className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold">
                    {rooms.find(r => r.id === selectedRoom)?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {rooms.find(r => r.id === selectedRoom)?.description}
                  </p>
                </div>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="text-center text-muted-foreground text-sm">
                  Welcome to #{rooms.find(r => r.id === selectedRoom)?.name}
                </div>
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Hash className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select a room to join the conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
