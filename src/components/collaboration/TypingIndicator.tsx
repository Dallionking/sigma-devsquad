
import React, { useState, useEffect } from 'react';
import { useWebSocket } from "@/contexts/WebSocketContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TypingUser {
  id: string;
  name: string;
  avatar?: string;
}

interface TypingIndicatorProps {
  componentId: string;
  className?: string;
}

export const TypingIndicator = ({ componentId, className }: TypingIndicatorProps) => {
  const { presenceUsers, onUpdate } = useWebSocket();
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);

  useEffect(() => {
    const unsubscribe = onUpdate((update) => {
      if (update.component === componentId && update.type === 'presence_update') {
        const userData = update.data;
        
        if (userData.isTyping) {
          setTypingUsers(prev => {
            const existing = prev.find(u => u.id === userData.id);
            if (existing) return prev;
            
            return [...prev, {
              id: userData.id,
              name: userData.name,
              avatar: userData.avatar
            }];
          });
          
          // Auto-remove typing indicator after 3 seconds
          setTimeout(() => {
            setTypingUsers(prev => prev.filter(u => u.id !== userData.id));
          }, 3000);
        } else {
          setTypingUsers(prev => prev.filter(u => u.id !== userData.id));
        }
      }
    });

    return unsubscribe;
  }, [onUpdate, componentId]);

  // Also check presence users for active typing in this component
  useEffect(() => {
    const activeTypers = presenceUsers.filter(user => 
      user.activeComponent === componentId && 
      user.id !== 'current-user'
    );
    
    // Simulate typing detection based on recent activity
    const recentTypers = activeTypers.filter(user => {
      const lastSeenTime = new Date(user.lastSeen).getTime();
      const now = Date.now();
      return (now - lastSeenTime) < 10000; // Active in last 10 seconds
    });

    if (recentTypers.length > 0) {
      setTypingUsers(recentTypers.map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar
      })));
    }
  }, [presenceUsers, componentId]);

  if (typingUsers.length === 0) return null;

  const renderTypingText = () => {
    if (typingUsers.length === 1) {
      return `${typingUsers[0].name} is typing...`;
    } else if (typingUsers.length === 2) {
      return `${typingUsers[0].name} and ${typingUsers[1].name} are typing...`;
    } else {
      return `${typingUsers[0].name} and ${typingUsers.length - 1} others are typing...`;
    }
  };

  return (
    <div className={cn("flex items-center gap-2 p-2 text-muted-foreground animate-fade-in", className)}>
      <div className="flex -space-x-1">
        {typingUsers.slice(0, 3).map((user) => (
          <Avatar key={user.id} className="w-6 h-6 border border-background">
            <AvatarFallback className="text-xs">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm">{renderTypingText()}</span>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
          <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
          <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
      </div>
    </div>
  );
};
