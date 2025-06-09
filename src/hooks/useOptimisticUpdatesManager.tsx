
import { useState, useCallback } from 'react';
import { useOptimisticUpdates } from './useOptimisticUpdates';
import { useToast } from '@/hooks/use-toast';

export const useOptimisticUpdatesManager = () => {
  const { 
    applyOptimisticUpdate, 
    rollbackUpdate, 
    hasPendingUpdates, 
    pendingCount, 
    pendingUpdates 
  } = useOptimisticUpdates();
  
  const { toast } = useToast();

  const createOptimisticUpdate = useCallback((
    operation: string,
    updateData: any,
    updateFn: () => void,
    rollbackFn: () => void
  ) => {
    const updateId = `${operation}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    applyOptimisticUpdate(updateId, updateFn, rollbackFn, updateData);
    
    toast({
      title: "Update Applied",
      description: `${operation} update applied optimistically`,
    });
    
    return updateId;
  }, [applyOptimisticUpdate, toast]);

  const rollbackWithConfirmation = useCallback((updateId: string) => {
    rollbackUpdate(updateId);
    toast({
      title: "Update Rolled Back",
      description: "Changes have been successfully reverted",
      variant: "destructive"
    });
  }, [rollbackUpdate, toast]);

  return {
    createOptimisticUpdate,
    rollbackWithConfirmation,
    hasPendingUpdates,
    pendingCount,
    pendingUpdates,
    rollbackUpdate
  };
};
