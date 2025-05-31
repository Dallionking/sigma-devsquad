
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useEventBus, useEventSubscription } from './useEventBus';
import { useStateSelector } from './useStateSelector';

interface StateSliceConfig<T> {
  sliceId: string;
  initialState: T;
  persistToSession?: boolean;
  syncAcrossComponents?: boolean;
  debugMode?: boolean;
}

interface StateSliceUpdate<T> {
  sliceId: string;
  updates: Partial<T>;
  source?: string;
  timestamp: number;
}

export const useComponentStateSlice = <T extends Record<string, any>>(
  config: StateSliceConfig<T>
) => {
  const {
    sliceId,
    initialState,
    persistToSession = false,
    syncAcrossComponents = true,
    debugMode = false
  } = config;

  const { emit } = useEventBus();

  // Initialize state from session storage if persistence is enabled
  const getInitialState = useCallback((): T => {
    if (persistToSession) {
      try {
        const stored = sessionStorage.getItem(`state-slice-${sliceId}`);
        if (stored) {
          return { ...initialState, ...JSON.parse(stored) };
        }
      } catch (error) {
        console.warn(`Failed to load persisted state for ${sliceId}:`, error);
      }
    }
    return initialState;
  }, [sliceId, initialState, persistToSession]);

  const [state, setState] = useState<T>(getInitialState);

  // Update state function
  const updateState = useCallback((updates: Partial<T>, source?: string) => {
    setState(prevState => {
      const newState = { ...prevState, ...updates };
      
      if (debugMode) {
        console.log(`StateSlice [${sliceId}] Update:`, {
          from: prevState,
          updates,
          to: newState,
          source
        });
      }

      // Persist to session storage if enabled
      if (persistToSession) {
        try {
          sessionStorage.setItem(`state-slice-${sliceId}`, JSON.stringify(newState));
        } catch (error) {
          console.warn(`Failed to persist state for ${sliceId}:`, error);
        }
      }

      // Emit update event for cross-component sync
      if (syncAcrossComponents) {
        emit('state-slice-update', {
          sliceId,
          updates,
          source: source || 'local',
          timestamp: Date.now()
        } as StateSliceUpdate<T>);
      }

      return newState;
    });
  }, [sliceId, debugMode, persistToSession, syncAcrossComponents, emit]);

  // Reset state function
  const resetState = useCallback((source?: string) => {
    setState(initialState);
    
    if (persistToSession) {
      sessionStorage.removeItem(`state-slice-${sliceId}`);
    }

    if (syncAcrossComponents) {
      emit('state-slice-reset', {
        sliceId,
        source: source || 'local',
        timestamp: Date.now()
      });
    }

    if (debugMode) {
      console.log(`StateSlice [${sliceId}] Reset by ${source || 'local'}`);
    }
  }, [sliceId, initialState, persistToSession, syncAcrossComponents, emit, debugMode]);

  // Subscribe to external updates if sync is enabled
  useEventSubscription<StateSliceUpdate<T>>(
    'state-slice-update',
    useCallback((update) => {
      if (update.sliceId === sliceId && update.source !== 'local') {
        setState(prevState => ({ ...prevState, ...update.updates }));
        
        if (debugMode) {
          console.log(`StateSlice [${sliceId}] External Update:`, update);
        }
      }
    }, [sliceId, debugMode]),
    [sliceId, debugMode]
  );

  // Subscribe to external resets if sync is enabled
  useEventSubscription(
    'state-slice-reset',
    useCallback((resetEvent: { sliceId: string; source: string }) => {
      if (resetEvent.sliceId === sliceId && resetEvent.source !== 'local') {
        setState(initialState);
        
        if (debugMode) {
          console.log(`StateSlice [${sliceId}] External Reset by ${resetEvent.source}`);
        }
      }
    }, [sliceId, initialState, debugMode]),
    [sliceId, initialState, debugMode]
  );

  // Selector function for efficient data access
  const createSelector = useCallback(<R>(
    selector: (state: T) => R,
    debugLabel?: string
  ) => {
    return useStateSelector(state, selector, {
      debugLabel: debugLabel ? `${sliceId}.${debugLabel}` : undefined
    });
  }, [state, sliceId]);

  // Batch update function
  const batchUpdate = useCallback((updateFn: (currentState: T) => Partial<T>, source?: string) => {
    setState(prevState => {
      const updates = updateFn(prevState);
      const newState = { ...prevState, ...updates };
      
      if (debugMode) {
        console.log(`StateSlice [${sliceId}] Batch Update:`, {
          from: prevState,
          updates,
          to: newState,
          source
        });
      }

      // Persist and sync
      if (persistToSession) {
        try {
          sessionStorage.setItem(`state-slice-${sliceId}`, JSON.stringify(newState));
        } catch (error) {
          console.warn(`Failed to persist state for ${sliceId}:`, error);
        }
      }

      if (syncAcrossComponents) {
        emit('state-slice-update', {
          sliceId,
          updates,
          source: source || 'local',
          timestamp: Date.now()
        } as StateSliceUpdate<T>);
      }

      return newState;
    });
  }, [sliceId, debugMode, persistToSession, syncAcrossComponents, emit]);

  return {
    state,
    updateState,
    resetState,
    createSelector,
    batchUpdate,
    sliceId
  };
};
