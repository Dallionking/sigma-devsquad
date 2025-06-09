
import { useEffect } from 'react';
import { useEventBus } from '../useEventBus';
import { StateSliceUpdateData, SelectorUpdateData, DebugEventData } from './types';

export const useDebugEventSubscriptions = (
  isCapturing: boolean,
  addDebugEntry: (type: any, source: string, data: any) => void
) => {
  const { subscribe } = useEventBus();

  useEffect(() => {
    if (!isCapturing) return;

    const unsubscribers: Array<() => void> = [];

    // Subscribe to state slice updates
    unsubscribers.push(
      subscribe('state-slice-update', (data: StateSliceUpdateData) => {
        addDebugEntry('state-update', `slice:${data.sliceId}`, data);
      })
    );

    // Subscribe to state selector updates
    unsubscribers.push(
      subscribe('state-selector-update', (data: SelectorUpdateData) => {
        addDebugEntry('selector-update', `selector:${data.label}`, data);
      })
    );

    // Subscribe to generic events
    unsubscribers.push(
      subscribe('debug-event', (data: DebugEventData) => {
        addDebugEntry('event', data.source || 'unknown', data);
      })
    );

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [isCapturing, subscribe, addDebugEntry]);
};
