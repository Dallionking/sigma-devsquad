
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import { Plus, Target, Activity } from "lucide-react";

export const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "agent" as const,
      content: "Hello! I'm your Planning Agent. I can help you break down complex projects, analyze requirements, and create actionable task plans. What would you like to work on today?",
      timestamp: new Date(),
      agent: "Planning Agent"
    }
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: (Date.now() + 1).toString(),
        type: "agent" as const,
        content: "I understand. Let me analyze that and provide you with a structured breakdown...",
        timestamp: new Date(),
        agent: "Planning Agent"
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  const handleCreateTask = () => {
    console.log("Create Task clicked");
    // This will be handled by parent component
  };

  const handleTrackWorkflow = () => {
    console.log("Track Workflow clicked");
    // This will be handled by parent component
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
              onClick={handleCreateTask}
              className="btn-primary-enhanced gap-2"
              size="sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </Button>
            <Button 
              variant="outline"
              onClick={handleTrackWorkflow}
              className="btn-secondary-enhanced gap-2"
              size="sm"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Track Workflow</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0 p-4 pt-0">
        <div className="flex-1 overflow-hidden mb-4">
          <ChatMessageList messages={messages} />
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </CardContent>
    </div>
  );
};
