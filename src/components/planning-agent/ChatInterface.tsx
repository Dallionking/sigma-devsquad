
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Code, FileText, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  attachments?: Array<{
    type: "code" | "document" | "idea";
    content: string;
    title: string;
  }>;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "agent",
      content: "Hello! I'm your Planning Agent. I'm here to help you analyze requirements, create project roadmaps, and break down features. What project would you like to work on today?",
      timestamp: new Date(),
      attachments: [
        {
          type: "idea",
          content: "Consider starting with a high-level overview of your project goals and target audience.",
          title: "Getting Started Tip"
        }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: "I understand you want to work on that. Let me analyze the requirements and suggest a structured approach. Based on your input, I can help create a detailed project roadmap.",
        timestamp: new Date(),
        attachments: [
          {
            type: "document",
            content: "# Project Analysis\n\n## Key Requirements\n- Feature analysis\n- Technical specifications\n- Timeline estimation",
            title: "Requirements Analysis"
          }
        ]
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case "code":
        return <Code className="w-3 h-3" />;
      case "document":
        return <FileText className="w-3 h-3" />;
      case "idea":
        return <Lightbulb className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.type === "agent" && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            
            <div className={`max-w-[70%] space-y-2 ${message.type === "user" ? "order-2" : ""}`}>
              <Card className={`p-3 ${
                message.type === "user" 
                  ? "bg-primary text-primary-foreground ml-auto" 
                  : "bg-muted"
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </Card>
              
              {/* Attachments */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="space-y-2">
                  {message.attachments.map((attachment, index) => (
                    <Card key={index} className="p-3 bg-card border-l-4 border-l-blue-500">
                      <div className="flex items-center gap-2 mb-2">
                        {getAttachmentIcon(attachment.type)}
                        <span className="font-medium text-sm">{attachment.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          {attachment.type}
                        </Badge>
                      </div>
                      <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                        {attachment.content}
                      </pre>
                    </Card>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>

            {message.type === "user" && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 order-3">
                <User className="w-4 h-4 text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <Card className="p-3 bg-muted">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your project requirements, ask for analysis, or request feature breakdowns..."
            className="min-h-[60px] resize-none"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            size="sm"
            className="self-end"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
