
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from '@/types';
import { mockMessages } from '@/data/mockData';

interface MessageContextType {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => Message;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  removeMessage: (id: string) => void;
  getMessageById: (id: string) => Message | undefined;
  getMessagesByAgent: (agentType: string) => Message[];
  getConversation: (fromAgent: string, toAgent: string) => Message[];
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const addMessage = (messageData: Omit<Message, 'id' | 'timestamp'>): Message => {
    const newMessage: Message = {
      ...messageData,
      id: `message_${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    console.log('New message created:', newMessage);
    return newMessage;
  };

  const updateMessage = (id: string, updates: Partial<Message>) => {
    setMessages(prev => prev.map(message => 
      message.id === id ? { ...message, ...updates } : message
    ));
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  const getMessageById = (id: string) => {
    return messages.find(message => message.id === id);
  };

  const getMessagesByAgent = (agentType: string) => {
    return messages.filter(message => 
      message.from === agentType || message.to === agentType
    );
  };

  const getConversation = (fromAgent: string, toAgent: string) => {
    return messages.filter(message => 
      (message.from === fromAgent && message.to === toAgent) ||
      (message.from === toAgent && message.to === fromAgent)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  return (
    <MessageContext.Provider value={{
      messages,
      addMessage,
      updateMessage,
      removeMessage,
      getMessageById,
      getMessagesByAgent,
      getConversation
    }}>
      {children}
    </MessageContext.Provider>
  );
};
