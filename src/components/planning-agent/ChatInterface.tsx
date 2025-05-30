
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Code, FileText, Lightbulb, Paperclip, Mic, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
          type: "idea" as const,
          content: "Consider starting with a high-level overview of your project goals and target audience.",
          title: "Getting Started Tip"
        }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

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

    // Simulate intelligent agent response with context awareness
    setTimeout(() => {
      const responses = [
        {
          content: "I understand you want to work on that. Let me analyze the requirements and suggest a structured approach. Based on your input, I can help create a detailed project roadmap.",
          attachments: [
            {
              type: "document" as const,
              content: "# Project Analysis\n\n## Key Requirements\n- Feature analysis\n- Technical specifications\n- Timeline estimation\n\n## Next Steps\n1. Define user stories\n2. Create technical architecture\n3. Establish milestones",
              title: "Requirements Analysis"
            }
          ]
        },
        {
          content: "Great! I can help break that down into manageable components. Let me create a structured plan that considers dependencies, technical constraints, and user impact.",
          attachments: [
            {
              type: "code" as const,
              content: "// Example implementation approach\nconst projectStructure = {\n  frontend: 'React + TypeScript',\n  backend: 'Node.js + Express',\n  database: 'PostgreSQL',\n  deployment: 'Docker + AWS'\n};",
              title: "Technical Stack Suggestion"
            }
          ]
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: randomResponse.content,
        timestamp: new Date(),
        attachments: randomResponse.attachments
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Variable response time for realism
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Voice input functionality would be implemented here
    console.log("Voice input toggled:", !isRecording);
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

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full bg-background rounded-lg border border-border">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Planning Agent</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Clear conversation</DropdownMenuItem>
            <DropdownMenuItem>Export chat</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            {message.type === "agent" && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            
            <div className={`max-w-[75%] space-y-2 ${message.type === "user" ? "order-2" : ""}`}>
              <Card className={`p-4 ${
                message.type === "user" 
                  ? "bg-primary text-primary-foreground ml-auto shadow-md" 
                  : "bg-card border border-border hover:shadow-sm transition-shadow"
              }`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </Card>
              
              {/* Attachments */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="space-y-2">
                  {message.attachments.map((attachment, index) => (
                    <Card key={index} className="p-3 bg-muted/50 border-l-4 border-l-blue-500 hover:bg-muted/70 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        {getAttachmentIcon(attachment.type)}
                        <span className="font-medium text-sm">{attachment.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          {attachment.type}
                        </Badge>
                      </div>
                      <pre className="text-xs text-muted-foreground whitespace-pre-wrap overflow-x-auto">
                        {attachment.content}
                      </pre>
                    </Card>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <span>{formatTimestamp(message.timestamp)}</span>
                {message.type === "agent" && <Badge variant="outline" className="text-xs">AI</Badge>}
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
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <Card className="p-4 bg-muted">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">Agent is thinking...</span>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="border-t border-border p-4 bg-muted/30">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your project requirements, ask for analysis, or request feature breakdowns..."
              className="min-h-[48px] max-h-[120px] resize-none pr-20 text-sm"
              disabled={isTyping}
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleVoiceInput}
                disabled={isTyping}
              >
                <Mic className={`w-4 h-4 ${isRecording ? 'text-red-500' : 'text-muted-foreground'}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                disabled={isTyping}
              >
                <Paperclip className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            size="sm"
            className="h-12 px-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>{inputValue.length}/2000</span>
        </div>
      </div>
    </div>
  );
};
