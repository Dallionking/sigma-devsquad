
import { useState, useCallback, useRef } from 'react';

interface StateHistory<T> {
  state: T;
  timestamp: number;
  action: string;
}

export const useStateTransitions = <T>(initialState: T) => {
  const [currentState, setCurrentState] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const history = useRef<StateHistory<T>[]>([{
    state: initialState,
    timestamp: Date.now(),
    action: 'initial'
  }]);
  const currentIndex = useRef(0);

  const addToHistory = useCallback((state: T, action: string) => {
    // Remove any future history if we're not at the end
    history.current = history.current.slice(0, currentIndex.current + 1);
    
    // Add new state
    history.current.push({
      state,
      timestamp: Date.now(),
      action
    });
    
    currentIndex.current = history.current.length - 1;
    
    // Limit history size
    if (history.current.length > 50) {
      history.current = history.current.slice(-50);
      currentIndex.current = history.current.length - 1;
    }
  }, []);

  const updateState = useCallback(async (
    newState: T | ((prev: T) => T),
    action: string = 'update',
    options: {
      showLoading?: boolean;
      showSuccess?: boolean;
      delay?: number;
    } = {}
  ) => {
    const { showLoading = false, showSuccess = false, delay = 0 } = options;

    try {
      if (showLoading) {
        setIsLoading(true);
        setHasError(false);
      }

      // Simulate async operation if delay is specified
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const finalState = typeof newState === 'function' 
        ? (newState as (prev: T) => T)(currentState)
        : newState;

      setCurrentState(finalState);
      addToHistory(finalState, action);

      if (showSuccess) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }

      setHasError(false);
    } catch (error) {
      setHasError(true);
      setTimeout(() => setHasError(false), 3000);
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }, [currentState, addToHistory]);

  const undo = useCallback(() => {
    if (currentIndex.current > 0) {
      currentIndex.current -= 1;
      const previousState = history.current[currentIndex.current];
      setCurrentState(previousState.state);
      return true;
    }
    return false;
  }, []);

  const redo = useCallback(() => {
    if (currentIndex.current < history.current.length - 1) {
      currentIndex.current += 1;
      const nextState = history.current[currentIndex.current];
      setCurrentState(nextState.state);
      return true;
    }
    return false;
  }, []);

  const canUndo = currentIndex.current > 0;
  const canRedo = currentIndex.current < history.current.length - 1;

  const reset = useCallback(() => {
    setCurrentState(initialState);
    history.current = [{
      state: initialState,
      timestamp: Date.now(),
      action: 'reset'
    }];
    currentIndex.current = 0;
    setIsLoading(false);
    setHasError(false);
    setShowSuccess(false);
  }, [initialState]);

  return {
    state: currentState,
    updateState,
    isLoading,
    hasError,
    showSuccess,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
    history: history.current,
    currentIndex: currentIndex.current
  };
};
