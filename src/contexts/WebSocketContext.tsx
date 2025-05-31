
import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface PresenceUser {
  id: string;
  name: string;
  avatar?: string;
  cursor?: { x: number; y: number };
  activeComponent?: string;
  lastSeen: string;
}

export interface RealtimeUpdate {
  id: string;
  type: 'agent_update' | 'task_update' | 'message_update' | 'presence_update' | 'edit_conflict';
  data: any;
  userId: string;
  timestamp: string;
  component?: string;
}

interface WebSocketContextType {
  isConnected: boolean;
  presenceUsers: PresenceUser[];
  sendUpdate: (update: Omit<RealtimeUpdate, 'id' | 'timestamp'>) => void;
  sendPresence: (presence: Partial<PresenceUser>) => void;
  onUpdate: (callback: (update: RealtimeUpdate) => void) => () => void;
  optimisticUpdate: (updateFn: () => void, rollbackFn: () => void) => void;
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
  userId: string;
  userName: string;
}

export const WebSocketProvider = ({ children, userId, userName }: WebSocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [presenceUsers, setPresenceUsers] = useState<PresenceUser[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const updateCallbacksRef = useRef<Set<(update: RealtimeUpdate) => void>>(new Set());
  const optimisticUpdatesRef = useRef<Map<string, () => void>>(new Map());
  const { toast } = useToast();

  // Simulate WebSocket connection (in production, this would connect to your WebSocket server)
  useEffect(() => {
    // Mock WebSocket connection
    const mockWs = {
      send: (data: string) => {
        console.log('WebSocket send:', JSON.parse(data));
      },
      close: () => {
        setIsConnected(false);
      }
    };

    wsRef.current = mockWs as any;
    setIsConnected(true);

    // Simulate connection established
    toast({
      title: "Connected",
      description: "Real-time collaboration active",
    });

    // Mock presence updates
    const mockPresenceInterval = setInterval(() => {
      const mockUsers: PresenceUser[] = [
        {
          id: 'user-1',
          name: 'Sarah Chen',
          avatar: '/avatars/sarah.jpg',
          activeComponent: 'agent-grid',
          lastSeen: new Date().toISOString()
        },
        {
          id: 'user-2', 
          name: 'Mike Rodriguez',
          avatar: '/avatars/mike.jpg',
          activeComponent: 'task-management',
          lastSeen: new Date().toISOString()
        }
      ].filter(user => user.id !== userId);

      setPresenceUsers(mockUsers);
    }, 5000);

    return () => {
      clearInterval(mockPresenceInterval);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [userId, toast]);

  const sendUpdate = (update: Omit<RealtimeUpdate, 'id' | 'timestamp'>) => {
    if (!isConnected || !wsRef.current) return;

    const fullUpdate: RealtimeUpdate = {
      ...update,
      id: `update-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    wsRef.current.send(JSON.stringify({
      type: 'realtime_update',
      data: fullUpdate
    }));

    // Broadcast to local callbacks
    updateCallbacksRef.current.forEach(callback => callback(fullUpdate));
  };

  const sendPresence = (presence: Partial<PresenceUser>) => {
    if (!isConnected || !wsRef.current) return;

    const presenceUpdate = {
      ...presence,
      id: userId,
      name: userName,
      lastSeen: new Date().toISOString()
    };

    wsRef.current.send(JSON.stringify({
      type: 'presence_update',
      data: presenceUpdate
    }));
  };

  const onUpdate = (callback: (update: RealtimeUpdate) => void) => {
    updateCallbacksRef.current.add(callback);
    return () => {
      updateCallbacksRef.current.delete(callback);
    };
  };

  const optimisticUpdate = (updateFn: () => void, rollbackFn: () => void) => {
    const updateId = `optimistic-${Date.now()}`;
    
    // Apply optimistic update immediately
    updateFn();
    optimisticUpdatesRef.current.set(updateId, rollbackFn);

    // Simulate server response (in production, this would be handled by WebSocket messages)
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      
      if (!success) {
        // Rollback on failure
        rollbackFn();
        optimisticUpdatesRef.current.delete(updateId);
        
        toast({
          title: "Update Failed",
          description: "Changes have been reverted",
          variant: "destructive"
        });
      } else {
        optimisticUpdatesRef.current.delete(updateId);
      }
    }, 1000);
  };

  return (
    <WebSocketContext.Provider value={{
      isConnected,
      presenceUsers,
      sendUpdate,
      sendPresence,
      onUpdate,
      optimisticUpdate
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};
