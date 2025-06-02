
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreHorizontal,
  Reply,
  Edit3,
  Trash2,
  Pin,
  Check,
  CheckCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  edited?: boolean;
  editedAt?: Date;
  status: "sent" | "delivered" | "read";
  replies?: ChatMessage[];
  pinned?: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
  }>;
}

interface RealTimeChatInterfaceProps {
  roomId: string;
  currentUserId: string;
  onFileUpload?: (files: FileList) => void;
}

export const RealTimeChatInterface = ({ 
  roomId, 
  currentUserId,
  onFileUpload 
}: RealTimeChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: "1",
        content: "Hey everyone! Just wanted to share the latest updates on the project.",
        sender: { id: "user1", name: "Alice Johnson", avatar: "/placeholder.svg" },
        timestamp: new Date(Date.now() - 3600000),
        status: "read",
        pinned: true
      },
      {
        id: "2", 
        content: "Thanks for the update! The new features look great.",
        sender: { id: "user2", name: "Bob Smith", avatar: "/placeholder.svg" },
        timestamp: new Date(Date.now() - 1800000),
        status: "read",
        replies: [
          {
            id: "2-1",
            content: "I agree! Especially the new UI components.",
            sender: { id: "user3", name: "Carol Wilson", avatar: "/placeholder.svg" },
            timestamp: new Date(Date.now() - 1500000),
            status: "read"
          }
        ]
      },
      {
        id: "3",
        content: "Here's the design file we discussed earlier.",
        sender: { id: "user3", name: "Carol Wilson", avatar: "/placeholder.svg" },
        timestamp: new Date(Date.now() - 900000),
        status: "delivered",
        attachments: [
          {
            id: "file1",
            name: "design-mockup.figma",
            type: "figma",
            url: "#",
            size: 2048000
          }
        ]
      }
    ];
    setMessages(mockMessages);
  }, [roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: { id: currentUserId, name: "You" },
      timestamp: new Date(),
      status: "sent"
    };

    if (replyingTo) {
      // Add to replies of the original message
      setMessages(prev => prev.map(msg => 
        msg.id === replyingTo.id 
          ? { ...msg, replies: [...(msg.replies || []), message] }
          : msg
      ));
    } else {
      setMessages(prev => [...prev, message]);
    }

    setNewMessage("");
    setReplyingTo(null);
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: "delivered" } : msg
      ));
    }, 1000);
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: newContent, edited: true, editedAt: new Date() }
        : msg
    ));
    setEditingMessageId(null);
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const handlePinMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, pinned: !msg.pinned } : msg
    ));
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && onFileUpload) {
      onFileUpload(files);
    }
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
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (message: ChatMessage, isReply = false) => {
    const isOwnMessage = message.sender.id === currentUserId;
    
    return (
      <div
        key={message.id}
        className={cn(
          "flex gap-3 mb-4",
          isOwnMessage ? "justify-end" : "justify-start",
          isReply && "ml-8 mt-2"
        )}
      >
        {!isOwnMessage && !isReply && (
          <Avatar className="w-8 h-8">
            <AvatarImage src={message.sender.avatar} />
            <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
          </Avatar>
        )}
        
        <div className={cn("max-w-[70%] space-y-1", isOwnMessage && "order-2")}>
          {message.pinned && (
            <Badge variant="secondary" className="text-xs mb-1">
              <Pin className="w-3 h-3 mr-1" />
              Pinned
            </Badge>
          )}
          
          <div
            className={cn(
              "rounded-lg p-3 relative group",
              isOwnMessage 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted border"
            )}
          >
            {!isReply && (
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{message.sender.name}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setReplyingTo(message)}
                  >
                    <Reply className="w-3 h-3" />
                  </Button>
                  {isOwnMessage && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => setEditingMessageId(message.id)}
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handlePinMessage(message.id)}
                  >
                    <Pin className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
            
            <p className="text-sm">{message.content}</p>
            
            {message.edited && (
              <span className="text-xs opacity-70">(edited)</span>
            )}
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {message.attachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center gap-2 p-2 bg-background/10 rounded">
                    <Paperclip className="w-4 h-4" />
                    <span className="text-sm">{attachment.name}</span>
                    <span className="text-xs opacity-70">
                      {(attachment.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
              {isOwnMessage && getStatusIcon(message.status)}
            </div>
          </div>
          
          {/* Render replies */}
          {message.replies && message.replies.length > 0 && (
            <div className="space-y-2">
              {message.replies.map(reply => renderMessage(reply, true))}
            </div>
          )}
        </div>

        {isOwnMessage && !isReply && (
          <Avatar className="w-8 h-8 order-3">
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Chat Room</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {messages.length} messages
            </Badge>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
        {typingUsers.length > 0 && (
          <div className="text-sm text-muted-foreground">
            {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map(message => renderMessage(message))}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>
        
        {replyingTo && (
          <div className="p-3 bg-muted/50 border-t border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Reply className="w-4 h-4" />
                <span className="text-sm">Replying to {replyingTo.sender.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(null)}
              >
                ×
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1 truncate">
              {replyingTo.content}
            </p>
          </div>
        )}
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFileAttach}
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};
