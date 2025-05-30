
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import { EnhancedFileAttachment } from "./EnhancedFileAttachment";
import { ContextualTools } from "./ContextualTools";
import { Plus, Target, Activity, Menu, Paperclip } from "lucide-react";

type ChatMessage = {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  agent?: string;
  attachments?: Array<{
    type: "code" | "document" | "idea" | "file";
    content: string;
    title: string;
    fileId?: string;
  }>;
};

interface AttachedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
  url?: string;
}

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
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [showFileAttachment, setShowFileAttachment] = useState(false);

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
      attachments: attachedFiles.length > 0 ? attachedFiles.map(file => ({
        type: "file" as const,
        content: file.content || file.name,
        title: file.name,
        fileId: file.id
      })) : undefined
    };
    setMessages(prev => [...prev, newMessage]);

    // Clear attached files after sending
    setAttachedFiles([]);
    setShowFileAttachment(false);

    // Set typing indicator
    setIsTyping(true);

    // Enhanced agent response based on context
    setTimeout(() => {
      let responseContent = "I understand. Let me analyze that and provide you with a structured breakdown...";
      
      // Context-aware responses
      if (content.toLowerCase().includes('prd') || content.toLowerCase().includes('requirements')) {
        responseContent = "I'll help you create a comprehensive PRD. Let me generate a structured document with all the necessary sections.";
      } else if (content.toLowerCase().includes('task') || content.toLowerCase().includes('feature')) {
        responseContent = "Great! I'll break this down into manageable tasks and subtasks. Let me create a detailed breakdown for you.";
      } else if (content.toLowerCase().includes('research') || content.toLowerCase().includes('investigate')) {
        responseContent = "I'll help you research this topic. Let me gather relevant information and best practices.";
      }

      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: responseContent,
        timestamp: new Date(),
        agent: "Planning Agent"
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleFileAttach = (files: AttachedFile[]) => {
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const handleFileRemove = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleToolSelect = (toolId: string) => {
    console.log("Tool selected:", toolId);
    // This would trigger the appropriate tool in the canvas
  };

  const conversationContext = messages
    .slice(-5) // Last 5 messages for context
    .map(msg => msg.content);

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
              onClick={() => setShowFileAttachment(!showFileAttachment)}
              className={`gap-2 ${attachedFiles.length > 0 ? 'bg-primary/10' : ''}`}
              size="sm"
            >
              <Paperclip className="w-4 h-4" />
              <span className="hidden sm:inline">Files</span>
              {attachedFiles.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {attachedFiles.length}
                </Badge>
              )}
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

        {/* File Attachment Panel */}
        {showFileAttachment && (
          <div className="mb-4 border rounded-lg p-4 bg-muted/30">
            <EnhancedFileAttachment
              onFileAttach={handleFileAttach}
              attachedFiles={attachedFiles}
              onFileRemove={handleFileRemove}
            />
          </div>
        )}

        {/* Contextual Tools Panel */}
        <div className="mb-4">
          <ContextualTools
            currentMessage={messages[messages.length - 1]?.content}
            conversationContext={conversationContext}
            onToolSelect={handleToolSelect}
          />
        </div>

        <ChatInput 
          onSendMessage={handleSendMessage} 
          isTyping={isTyping}
          hasAttachments={attachedFiles.length > 0}
        />
      </CardContent>
    </div>
  );
};
