
import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatTypingIndicator } from "./ChatTypingIndicator";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  attachments?: Array<{
    type: "code" | "document" | "idea" | "file";
    content: string;
    title: string;
    fileId?: string;
  }>;
}

interface ChatMessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export const ChatMessageList = ({ messages, isTyping }: ChatMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isTyping && <ChatTypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
