
import { useMemo, useCallback, useRef, useEffect } from 'react';
import { useEventBus } from './useEventBus';

export type StateSelector<T, R> = (state: T) => R;
export type StateComparator<R> = (prev: R, next: R) => boolean;

interface SelectorConfig<R> {
  comparator?: StateComparator<R>;
  debounceMs?: number;
  debugLabel?: string;
}

// Default shallow equality comparator
const shallowEqual = <T>(prev: T, next: T): boolean => {
  if (prev === next) return true;
  
  if (typeof prev !== 'object' || typeof next !== 'object' || !prev || !next) {
    return false;
  }

  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);

  if (prevKeys.length !== nextKeys.length) return false;

  for (const key of prevKeys) {
    if (!(key in next) || (prev as any)[key] !== (next as any)[key]) {
      return false;
    }
  }

  return true;
};

export const useStateSelector = <T, R>(
  state: T,
  selector: StateSelector<T, R>,
  config: SelectorConfig<R> = {}
): R => {
  const {
    comparator = shallowEqual,
    debounceMs = 0,
    debugLabel
  } = config;

  const { emit } = useEventBus();
  const prevResultRef = useRef<R>();
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  const selectedValue = useMemo(() => {
    const result = selector(state);
    
    // Debug logging
    if (debugLabel) {
      console.log(`StateSelector [${debugLabel}]:`, {
        input: state,
        output: result,
        changed: prevResultRef.current !== undefined && !comparator(prevResultRef.current, result)
      });
    }

    return result;
  }, [state, selector, comparator, debugLabel]);

  // Handle debounced updates
  useEffect(() => {
    if (debounceMs > 0) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        if (prevResultRef.current === undefined || !comparator(prevResultRef.current, selectedValue)) {
          prevResultRef.current = selectedValue;
          
          if (debugLabel) {
            emit('state-selector-update', {
              label: debugLabel,
              value: selectedValue,
              timestamp: Date.now()
            });
          }
        }
      }, debounceMs);

      return () => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
      };
    } else {
      if (prevResultRef.current === undefined || !comparator(prevResultRef.current, selectedValue)) {
        prevResultRef.current = selectedValue;
        
        if (debugLabel) {
          emit('state-selector-update', {
            label: debugLabel,
            value: selectedValue,
            timestamp: Date.now()
          });
        }
      }
    }
  }, [selectedValue, comparator, debounceMs, debugLabel, emit]);

  return selectedValue;
};

// Hook for creating memoized selectors
export const useCreateSelector = <T, R>(
  selectorFn: StateSelector<T, R>,
  deps: any[] = []
): StateSelector<T, R> => {
  return useCallback(selectorFn, deps);
};

// Hook for multiple selectors
export const useMultipleSelectors = <T>(
  state: T,
  selectors: Record<string, StateSelector<T, any>>,
  config: SelectorConfig<any> = {}
): Record<string, any> => {
  return useMemo(() => {
    const result: Record<string, any> = {};
    
    Object.entries(selectors).forEach(([key, selector]) => {
      result[key] = selector(state);
    });

    return result;
  }, [state, selectors]);
};
