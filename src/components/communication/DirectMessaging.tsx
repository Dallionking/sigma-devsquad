
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  MoreVertical, 
  Phone, 
  Video,
  Paperclip,
  Smile,
  Edit,
  Trash2,
  Reply
} from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "away" | "busy" | "offline";
  lastSeen?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  edited?: boolean;
  replyTo?: string;
  type: "text" | "file" | "image";
  reactions?: { emoji: string; users: string[] }[];
}

interface DirectMessagingProps {
  searchQuery?: string;
}

export const DirectMessaging = ({ searchQuery }: DirectMessagingProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const users: User[] = [
    {
      id: "1",
      name: "Alice Johnson",
      avatar: "/placeholder.svg",
      status: "online"
    },
    {
      id: "2", 
      name: "Bob Smith",
      avatar: "/placeholder.svg",
      status: "away",
      lastSeen: "5 minutes ago"
    },
    {
      id: "3",
      name: "Carol Williams",
      avatar: "/placeholder.svg", 
      status: "busy"
    },
    {
      id: "4",
      name: "David Brown",
      avatar: "/placeholder.svg",
      status: "offline",
      lastSeen: "2 hours ago"
    }
  ];

  const mockMessages: Message[] = [
    {
      id: "1",
      senderId: "1",
      content: "Hey! How's the project coming along?",
      timestamp: new Date(Date.now() - 3600000),
      type: "text"
    },
    {
      id: "2", 
      senderId: "current-user",
      content: "Going well! Just finished the authentication module.",
      timestamp: new Date(Date.now() - 3500000),
      type: "text"
    },
    {
      id: "3",
      senderId: "1", 
      content: "That's great! Can you share the implementation details?",
      timestamp: new Date(Date.now() - 3400000),
      type: "text",
      reactions: [{ emoji: "👍", users: ["current-user"] }]
    }
  ];

  useEffect(() => {
    if (selectedUser) {
      setMessages(mockMessages);
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage && selectedUser) {
      const timer = setTimeout(() => {
        setTypingUsers(prev => [...prev.filter(id => id !== selectedUser.id)]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [newMessage, selectedUser]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      content: newMessage,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedUser.id,
        content: "Thanks for the update!",
        timestamp: new Date(),
        type: "text"
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: newContent, edited: true }
        : msg
    ));
    setEditingMessage(null);
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "busy": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filteredUsers = searchQuery 
    ? users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  return (
    <div className="h-full flex">
      {/* Users List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h3 className="font-medium">Direct Messages</h3>
        </div>
        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="space-y-2 p-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                  selectedUser?.id === user.id && "bg-muted"
                )}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                    getStatusColor(user.status)
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.status === "online" ? "Online" : user.lastSeen || user.status}
                  </div>
                </div>
                {user.id === "1" && (
                  <Badge variant="destructive" className="text-xs">2</Badge>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback className="text-sm">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                    getStatusColor(selectedUser.status)
                  )} />
                </div>
                <div>
                  <div className="font-medium">{selectedUser.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {selectedUser.status === "online" ? "Online" : selectedUser.lastSeen || selectedUser.status}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => {
                  const isOwnMessage = message.senderId === "current-user";
                  const sender = users.find(u => u.id === message.senderId);
                  
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        isOwnMessage && "flex-row-reverse"
                      )}
                    >
                      {!isOwnMessage && (
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={sender?.avatar} />
                          <AvatarFallback className="text-xs">
                            {sender?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={cn(
                        "max-w-[70%] space-y-1",
                        isOwnMessage && "items-end"
                      )}>
                        <div
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm relative group",
                            isOwnMessage 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted text-foreground"
                          )}
                          onMouseEnter={() => {
                            // Show message actions on hover
                          }}
                        >
                          {editingMessage === message.id ? (
                            <div className="space-y-2">
                              <Textarea
                                defaultValue={message.content}
                                className="text-sm"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleEditMessage(message.id, e.currentTarget.value);
                                  }
                                  if (e.key === "Escape") {
                                    setEditingMessage(null);
                                  }
                                }}
                              />
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">Save</Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => setEditingMessage(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {message.content}
                              {message.edited && (
                                <span className="text-xs opacity-70 ml-2">(edited)</span>
                              )}
                            </>
                          )}
                          
                          {/* Message Actions */}
                          <div className="absolute -top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex gap-1 bg-background border rounded-md p-1 shadow-sm">
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <Smile className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <Reply className="w-3 h-3" />
                              </Button>
                              {isOwnMessage && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-6 w-6 p-0"
                                    onClick={() => setEditingMessage(message.id)}
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-6 w-6 p-0"
                                    onClick={() => handleDeleteMessage(message.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Reactions */}
                        {message.reactions && message.reactions.length > 0 && (
                          <div className="flex gap-1">
                            {message.reactions.map((reaction, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs cursor-pointer hover:bg-muted"
                              >
                                {reaction.emoji} {reaction.users.length}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Typing Indicator */}
                {typingUsers.length > 0 && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={selectedUser.avatar} />
                      <AvatarFallback className="text-xs">
                        {selectedUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2">
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

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[60px] resize-none pr-20"
                    rows={2}
                  />
                  <div className="absolute right-2 bottom-2 flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p>Choose a user from the list to start messaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
