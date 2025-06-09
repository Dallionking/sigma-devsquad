
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Send } from "lucide-react";

interface DirectMessagingProps {
  searchQuery?: string;
}

export const DirectMessaging = ({ searchQuery = "" }: DirectMessagingProps) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const users = [
    { id: "1", name: "Alice Johnson", status: "online", unread: 3 },
    { id: "2", name: "Bob Smith", status: "away", unread: 0 },
    { id: "3", name: "Carol Wilson", status: "online", unread: 1 },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex">
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-3">Direct Messages</h3>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 ${
                  selectedUser === user.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedUser(user.id)}
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{user.name}</span>
                    {user.unread > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                        {user.unread}
                      </Badge>
                    )}
                  </div>
                  <span className={`text-xs ${
                    user.status === "online" ? "text-green-500" : "text-yellow-500"
                  }`}>
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 border-b">
              <h3 className="font-semibold">
                {users.find(u => u.id === selectedUser)?.name}
              </h3>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="text-center text-muted-foreground text-sm">
                  Start of conversation
                </div>
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && setMessage("")}
                />
                <Button onClick={() => setMessage("")}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select a user to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
