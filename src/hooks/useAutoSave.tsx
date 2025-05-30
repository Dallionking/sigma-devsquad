
import { useEffect, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface AutoSaveOptions {
  delay?: number;
  onSave: () => void | Promise<void>;
  enabled?: boolean;
  showToast?: boolean;
}

export const useAutoSave = (data: any, options: AutoSaveOptions) => {
  const { delay = 2000, onSave, enabled = true, showToast = false } = options;
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousDataRef = useRef(data);
  const isSavingRef = useRef(false);

  const save = useCallback(async () => {
    if (isSavingRef.current) return;
    
    try {
      isSavingRef.current = true;
      await onSave();
      
      if (showToast) {
        toast({
          title: "Auto-saved",
          description: "Your changes have been automatically saved.",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
      toast({
        title: "Auto-save Failed",
        description: "Failed to save changes automatically.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      isSavingRef.current = false;
    }
  }, [onSave, showToast, toast]);

  useEffect(() => {
    if (!enabled) return;

    // Check if data has actually changed
    const hasChanged = JSON.stringify(data) !== JSON.stringify(previousDataRef.current);
    
    if (hasChanged) {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(save, delay);
      previousDataRef.current = data;
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, save, enabled]);

  // Manual save function
  const forceSave = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    await save();
  }, [save]);

  return { forceSave, isSaving: isSavingRef.current };
};
