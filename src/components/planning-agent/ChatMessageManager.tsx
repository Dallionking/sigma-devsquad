
import { useState } from "react";

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

export const useChatMessageManager = () => {
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

  const handleSendMessage = (content: string, attachedFiles: AttachedFile[]) => {
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

  return {
    messages,
    isTyping,
    handleSendMessage
  };
};
