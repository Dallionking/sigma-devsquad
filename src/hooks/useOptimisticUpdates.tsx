
import { useState, useCallback } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { useToast } from '@/hooks/use-toast';

interface OptimisticUpdate<T> {
  id: string;
  data: T;
  rollback: () => void;
  timestamp: number;
}

export const useOptimisticUpdates = <T extends any>() => {
  const [pendingUpdates, setPendingUpdates] = useState<Map<string, OptimisticUpdate<T>>>(new Map());
  const { optimisticUpdate } = useWebSocket();
  const { toast } = useToast();

  const applyOptimisticUpdate = useCallback((
    updateId: string,
    updateFn: () => void,
    rollbackFn: () => void,
    data: T
  ) => {
    // Apply the update immediately
    updateFn();
    
    // Track the update
    const update: OptimisticUpdate<T> = {
      id: updateId,
      data,
      rollback: rollbackFn,
      timestamp: Date.now()
    };
    
    setPendingUpdates(prev => new Map(prev).set(updateId, update));
    
    // Use the WebSocket optimistic update system
    optimisticUpdate(
      () => {
        // Update already applied above
      },
      () => {
        // Rollback
        rollbackFn();
        setPendingUpdates(prev => {
          const newMap = new Map(prev);
          newMap.delete(updateId);
          return newMap;
        });
      }
    );
    
    // Auto-cleanup successful updates
    setTimeout(() => {
      setPendingUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(updateId);
        return newMap;
      });
    }, 5000);
  }, [optimisticUpdate]);

  const rollbackUpdate = useCallback((updateId: string) => {
    const update = pendingUpdates.get(updateId);
    if (update) {
      update.rollback();
      setPendingUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(updateId);
        return newMap;
      });
      
      toast({
        title: "Update Rolled Back",
        description: "Changes have been reverted",
      });
    }
  }, [pendingUpdates, toast]);

  const hasPendingUpdates = pendingUpdates.size > 0;
  const pendingCount = pendingUpdates.size;

  return {
    applyOptimisticUpdate,
    rollbackUpdate,
    hasPendingUpdates,
    pendingCount,
    pendingUpdates: Array.from(pendingUpdates.values())
  };
};
