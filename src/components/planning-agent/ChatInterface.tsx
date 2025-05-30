
import { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";

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
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (messageContent: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
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

  return (
    <div className="flex flex-col h-full bg-background rounded-lg border border-border">
      <ChatHeader />
      <ChatMessageList messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} />
    </div>
  );
};
