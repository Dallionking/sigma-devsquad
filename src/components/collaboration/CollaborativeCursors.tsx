
import React, { useState, useEffect, useCallback } from 'react';
import { useWebSocket, PresenceUser } from '@/contexts/WebSocketContext';
import { cn } from '@/lib/utils';

interface CursorPosition {
  x: number;
  y: number;
  userId: string;
  userName: string;
  color: string;
}

interface CollaborativeCursorsProps {
  className?: string;
}

export const CollaborativeCursors = ({ className }: CollaborativeCursorsProps) => {
  const [cursors, setCursors] = useState<CursorPosition[]>([]);
  const { presenceUsers, sendPresence, isConnected } = useWebSocket();

  const userColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
  ];

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isConnected) return;

    const cursorData = {
      x: e.clientX,
      y: e.clientY
    };

    sendPresence({ cursor: cursorData });
  }, [isConnected, sendPresence]);

  useEffect(() => {
    if (!isConnected) return;

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, isConnected]);

  useEffect(() => {
    const newCursors = presenceUsers
      .filter(user => user.cursor && user.id !== 'current-user')
      .map((user, index) => ({
        x: user.cursor!.x,
        y: user.cursor!.y,
        userId: user.id,
        userName: user.name,
        color: userColors[index % userColors.length]
      }));

    setCursors(newCursors);
  }, [presenceUsers]);

  if (!isConnected || cursors.length === 0) return null;

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-50", className)}>
      {cursors.map((cursor) => (
        <div
          key={cursor.userId}
          className="absolute transition-all duration-100 ease-out"
          style={{
            left: `${cursor.x}px`,
            top: `${cursor.y}px`,
            transform: 'translate(-2px, -2px)'
          }}
        >
          {/* Cursor pointer */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="drop-shadow-sm"
          >
            <path
              d="M0 0L20 7.5L7.5 20L0 0Z"
              fill={cursor.color}
              stroke="white"
              strokeWidth="1"
            />
          </svg>
          
          {/* User name label */}
          <div
            className="absolute top-5 left-2 px-2 py-1 rounded text-xs text-white font-medium whitespace-nowrap"
            style={{ backgroundColor: cursor.color }}
          >
            {cursor.userName}
          </div>
        </div>
      ))}
    </div>
  );
};
