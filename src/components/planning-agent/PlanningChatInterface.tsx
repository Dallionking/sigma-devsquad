
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send,
  Paperclip,
  Bot,
  User
} from "lucide-react";

interface ChatMessage {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const PlanningChatInterface = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your Planning Agent. I can help you break down requirements, create project plans, and generate PRDs. What would you like to work on today?",
      timestamp: new Date().toISOString()
    }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: chatHistory.length + 1,
      type: "user",
      content: chatMessage,
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: chatHistory.length + 2,
        type: "assistant", 
        content: "I understand you want to work on that feature. Let me analyze the requirements and create a detailed breakdown for you.",
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Planning Assistant
          <Badge variant="secondary" className="ml-auto">Online</Badge>
        </CardTitle>
      </CardHeader>
      
      {/* Chat Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === "assistant" && (
                  <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
                {message.type === "user" && (
                  <User className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      
      {/* Chat Input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Type your message..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button variant="outline" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button onClick={handleSendMessage} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
