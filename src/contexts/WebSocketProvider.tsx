
import React, { createContext, useContext, ReactNode } from 'react';

interface WebSocketContextType {
  isConnected: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  connect: () => void;
  disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  // Simple mock implementation for now
  const contextValue: WebSocketContextType = {
    isConnected: false,
    connectionStatus: 'disconnected',
    connect: () => {
      console.log('WebSocket connect called');
    },
    disconnect: () => {
      console.log('WebSocket disconnect called');
    }
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};
