
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import { Plus, Target, Activity, Menu } from "lucide-react";

type ChatMessage = {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  agent?: string; // Optional for user messages
};

interface ChatInterfaceProps {
  onCreateTask?: () => void;
  onTrackWorkflow?: () => void;
  onToggleCanvas?: () => void;
}

export const ChatInterface = ({ onCreateTask, onTrackWorkflow, onToggleCanvas }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "agent",
      content: "Hello! I'm your Planning Agent. I can help you break down complex projects, analyze requirements, and create actionable task plans. What would you like to work on today?",
      timestamp: new Date(),
      agent: "Planning Agent"
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);

    // Set typing indicator
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: "I understand. Let me analyze that and provide you with a structured breakdown...",
        timestamp: new Date(),
        agent: "Planning Agent"
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ChatHeader />
            <Badge variant="secondary" className="status-success flex items-center gap-2">
              <Activity className="w-3 h-3" />
              Agent Active
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={onCreateTask}
              className="btn-primary-enhanced gap-2"
              size="sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </Button>
            <Button 
              variant="outline"
              onClick={onTrackWorkflow}
              className="btn-secondary-enhanced gap-2"
              size="sm"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Track Workflow</span>
            </Button>
            <Button
              variant="outline"
              onClick={onToggleCanvas}
              className="gap-2"
              size="sm"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Canvas</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0 p-4 pt-0">
        <div className="flex-1 overflow-hidden mb-4">
          <ChatMessageList messages={messages} isTyping={isTyping} />
        </div>
        <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} />
      </CardContent>
    </div>
  );
};
