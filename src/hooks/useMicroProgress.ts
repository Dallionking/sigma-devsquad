
import { useState, useCallback } from 'react';

interface MicroProgressState {
  type: 'upload' | 'processing' | 'success' | 'transition' | null;
  message?: string;
  progress?: number;
  isVisible: boolean;
}

export const useMicroProgress = () => {
  const [progressState, setProgressState] = useState<MicroProgressState>({
    type: null,
    isVisible: false
  });

  const showUploadProgress = useCallback((message?: string, progress: number = 0) => {
    setProgressState({
      type: 'upload',
      message,
      progress,
      isVisible: true
    });
  }, []);

  const updateUploadProgress = useCallback((progress: number) => {
    setProgressState(prev => ({
      ...prev,
      progress
    }));
  }, []);

  const showProcessing = useCallback((message?: string) => {
    setProgressState({
      type: 'processing',
      message,
      isVisible: true
    });
  }, []);

  const showSuccess = useCallback((message?: string) => {
    setProgressState({
      type: 'success',
      message,
      isVisible: true
    });
    
    // Auto-hide after 2 seconds
    setTimeout(() => {
      hideProgress();
    }, 2000);
  }, []);

  const showTransition = useCallback((message?: string) => {
    setProgressState({
      type: 'transition',
      message,
      isVisible: true
    });
    
    // Auto-hide after 1.5 seconds
    setTimeout(() => {
      hideProgress();
    }, 1500);
  }, []);

  const hideProgress = useCallback(() => {
    setProgressState({
      type: null,
      isVisible: false
    });
  }, []);

  return {
    progressState,
    showUploadProgress,
    updateUploadProgress,
    showProcessing,
    showSuccess,
    showTransition,
    hideProgress
  };
};
