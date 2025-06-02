
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Send, 
  Plus,
  Settings,
  UserPlus,
  Crown,
  Shield,
  MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  role: "owner" | "admin" | "member";
  status: "online" | "away" | "busy" | "offline";
}

interface GroupRoom {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
  unreadCount: number;
  lastMessage?: {
    content: string;
    sender: string;
    timestamp: Date;
  };
  isPrivate: boolean;
}

interface GroupMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  edited?: boolean;
  replyTo?: string;
  mentions?: string[];
}

interface GroupChatRoomsProps {
  searchQuery?: string;
}

export const GroupChatRooms = ({ searchQuery }: GroupChatRoomsProps) => {
  const [selectedRoom, setSelectedRoom] = useState<GroupRoom | null>(null);
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const groupRooms: GroupRoom[] = [
    {
      id: "1",
      name: "Development Team",
      description: "Main development discussions",
      members: [
        { id: "1", name: "Alice Johnson", role: "owner", status: "online" },
        { id: "2", name: "Bob Smith", role: "admin", status: "away" },
        { id: "3", name: "Carol Williams", role: "member", status: "online" },
        { id: "4", name: "David Brown", role: "member", status: "offline" }
      ],
      unreadCount: 5,
      lastMessage: {
        content: "The new feature is ready for testing",
        sender: "Alice Johnson",
        timestamp: new Date(Date.now() - 300000)
      },
      isPrivate: false
    },
    {
      id: "2", 
      name: "Project Alpha",
      description: "Private project discussions",
      members: [
        { id: "1", name: "Alice Johnson", role: "owner", status: "online" },
        { id: "2", name: "Bob Smith", role: "member", status: "away" },
        { id: "3", name: "Carol Williams", role: "member", status: "online" }
      ],
      unreadCount: 2,
      lastMessage: {
        content: "Meeting tomorrow at 2 PM",
        sender: "Bob Smith", 
        timestamp: new Date(Date.now() - 1800000)
      },
      isPrivate: true
    },
    {
      id: "3",
      name: "Design Review",
      description: "UI/UX design discussions",
      members: [
        { id: "3", name: "Carol Williams", role: "owner", status: "online" },
        { id: "4", name: "David Brown", role: "member", status: "offline" },
        { id: "5", name: "Eve Wilson", role: "member", status: "busy" }
      ],
      unreadCount: 0,
      lastMessage: {
        content: "Love the new mockups!",
        sender: "David Brown",
        timestamp: new Date(Date.now() - 7200000)
      },
      isPrivate: false
    }
  ];

  const mockGroupMessages: GroupMessage[] = [
    {
      id: "1",
      senderId: "1",
      content: "Hey everyone! How's the sprint going?",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: "2",
      senderId: "2", 
      content: "Going well! Just finished the API integration.",
      timestamp: new Date(Date.now() - 3400000)
    },
    {
      id: "3",
      senderId: "3",
      content: "Great work @Bob! The UI is looking fantastic too.",
      timestamp: new Date(Date.now() - 3200000),
      mentions: ["2"]
    },
    {
      id: "4",
      senderId: "current-user",
      content: "Thanks @Carol! Should we schedule a demo for tomorrow?",
      timestamp: new Date(Date.now() - 3000000),
      mentions: ["3"]
    }
  ];

  useEffect(() => {
    if (selectedRoom) {
      setMessages(mockGroupMessages);
    }
  }, [selectedRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return;

    const message: GroupMessage = {
      id: Date.now().toString(),
      senderId: "current-user",
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner": return <Crown className="w-3 h-3 text-yellow-500" />;
      case "admin": return <Shield className="w-3 h-3 text-blue-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "busy": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filteredRooms = searchQuery 
    ? groupRooms.filter(room => 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : groupRooms;

  return (
    <div className="h-full flex">
      {/* Rooms List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-medium">Group Rooms</h3>
          <Button 
            size="sm" 
            onClick={() => setShowCreateRoom(true)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="space-y-2 p-2">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                  selectedRoom?.id === room.id && "bg-muted"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="font-medium flex items-center gap-1">
                      {room.isPrivate ? "🔒" : "#"} {room.name}
                    </div>
                    {room.unreadCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {room.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {room.members.length} members
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground mb-2">
                  {room.description}
                </div>
                
                {room.lastMessage && (
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">{room.lastMessage.sender}:</span>{" "}
                    {room.lastMessage.content.substring(0, 40)}
                    {room.lastMessage.content.length > 40 && "..."}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            {/* Room Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="text-lg">
                      {selectedRoom.isPrivate ? "🔒" : "#"}
                    </div>
                    <div>
                      <div className="font-medium">{selectedRoom.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedRoom.description}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowMembers(!showMembers)}
                  >
                    <Users className="w-4 h-4" />
                    {selectedRoom.members.length}
                  </Button>
                  <Button variant="outline" size="sm">
                    <UserPlus className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Online Members */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-muted-foreground">Online:</span>
                <div className="flex -space-x-2">
                  {selectedRoom.members
                    .filter(member => member.status === "online")
                    .slice(0, 5)
                    .map((member) => (
                    <div key={member.id} className="relative">
                      <Avatar className="w-6 h-6 border-2 border-background">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
                {selectedRoom.members.filter(m => m.status === "online").length > 5 && (
                  <span className="text-xs text-muted-foreground">
                    +{selectedRoom.members.filter(m => m.status === "online").length - 5} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Messages */}
              <div className={cn(
                "flex-1 flex flex-col",
                showMembers && "w-2/3"
              )}>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isOwnMessage = message.senderId === "current-user";
                      const sender = selectedRoom.members.find(m => m.id === message.senderId);
                      
                      return (
                        <div key={message.id} className="flex gap-3">
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage src={sender?.avatar} />
                            <AvatarFallback className="text-xs">
                              {sender?.name.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {sender?.name || "You"}
                              </span>
                              {sender && getRoleIcon(sender.role)}
                              <span className="text-xs text-muted-foreground">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            
                            <div className="text-sm">
                              {message.content.split(' ').map((word, index) => {
                                if (word.startsWith('@')) {
                                  const mentionedId = message.mentions?.find(id => 
                                    selectedRoom.members.find(m => m.id === id)?.name
                                      .toLowerCase().includes(word.slice(1).toLowerCase())
                                  );
                                  return (
                                    <span 
                                      key={index}
                                      className="bg-blue-500/20 text-blue-600 px-1 rounded"
                                    >
                                      {word}
                                    </span>
                                  );
                                }
                                return word + ' ';
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder={`Message #${selectedRoom.name}`}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[60px] resize-none"
                      rows={2}
                    />
                    
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                      className="h-[60px] px-4"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Members Panel */}
              {showMembers && (
                <div className="w-1/3 border-l">
                  <div className="p-4 border-b">
                    <h3 className="font-medium">Members ({selectedRoom.members.length})</h3>
                  </div>
                  <ScrollArea className="h-[calc(100%-60px)]">
                    <div className="space-y-2 p-2">
                      {selectedRoom.members.map((member) => (
                        <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                          <div className="relative">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="text-xs">
                                {member.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className={cn(
                              "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                              getStatusColor(member.status)
                            )} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{member.name}</span>
                              {getRoleIcon(member.role)}
                            </div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {member.status}
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Select a room</h3>
              <p>Choose a group room to start collaborating.</p>
              <Button className="mt-4" onClick={() => setShowCreateRoom(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Room
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
