
import { useCallback, useRef, useEffect } from 'react';
import { useEventBus } from '../useEventBus';

interface BatchConfig {
  maxBatchSize: number;
  batchDelay: number;
  priority: 'low' | 'normal' | 'high';
  enableDeduplication?: boolean;
}

interface BatchedUpdate<T = any> {
  id: string;
  updateFn: () => void;
  data: T;
  priority: 'low' | 'normal' | 'high';
  timestamp: number;
}

interface BatchQueue {
  high: BatchedUpdate[];
  normal: BatchedUpdate[];
  low: BatchedUpdate[];
}

export const useBatchedUpdates = (config: BatchConfig = {
  maxBatchSize: 10,
  batchDelay: 16, // ~60fps
  priority: 'normal',
  enableDeduplication: true
}) => {
  const { emit } = useEventBus();
  const queueRef = useRef<BatchQueue>({
    high: [],
    normal: [],
    low: []
  });
  const processingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const idCounterRef = useRef(0);

  // Add update to batch queue
  const batchUpdate = useCallback(<T>(
    updateFn: () => void,
    data?: T,
    priority: 'low' | 'normal' | 'high' = config.priority
  ) => {
    const update: BatchedUpdate<T> = {
      id: `batch_${++idCounterRef.current}`,
      updateFn,
      data: data as T,
      priority,
      timestamp: Date.now()
    };

    // Deduplication logic
    if (config.enableDeduplication && data) {
      const queue = queueRef.current[priority];
      const existingIndex = queue.findIndex(existing => 
        JSON.stringify(existing.data) === JSON.stringify(data)
      );
      
      if (existingIndex !== -1) {
        // Replace existing update
        queue[existingIndex] = update;
        return update.id;
      }
    }

    queueRef.current[priority].push(update);

    // Schedule processing if not already scheduled
    if (!processingRef.current) {
      scheduleProcessing();
    }

    return update.id;
  }, [config.priority, config.enableDeduplication]);

  // Schedule batch processing
  const scheduleProcessing = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      processBatch();
    }, config.batchDelay);
  }, [config.batchDelay]);

  // Process the batch queue
  const processBatch = useCallback(() => {
    if (processingRef.current) return;

    processingRef.current = true;
    const startTime = performance.now();

    try {
      // Process by priority: high -> normal -> low
      const priorities: (keyof BatchQueue)[] = ['high', 'normal', 'low'];
      let processedCount = 0;

      for (const priority of priorities) {
        const queue = queueRef.current[priority];
        const batchSize = Math.min(queue.length, config.maxBatchSize - processedCount);
        
        if (batchSize === 0) continue;

        const batch = queue.splice(0, batchSize);
        processedCount += batchSize;

        // Execute updates in the batch
        batch.forEach(update => {
          try {
            update.updateFn();
          } catch (error) {
            console.error(`Error in batched update ${update.id}:`, error);
          }
        });

        emit('batch-processed', {
          priority,
          batchSize,
          processedCount,
          timestamp: Date.now()
        });

        // Stop if we've reached max batch size
        if (processedCount >= config.maxBatchSize) break;
      }

      const processingTime = performance.now() - startTime;

      emit('batch-performance', {
        processedCount,
        processingTime,
        queueSizes: {
          high: queueRef.current.high.length,
          normal: queueRef.current.normal.length,
          low: queueRef.current.low.length
        },
        timestamp: Date.now()
      });

      // Schedule next batch if there are remaining updates
      const hasRemainingUpdates = Object.values(queueRef.current).some(queue => queue.length > 0);
      if (hasRemainingUpdates) {
        scheduleProcessing();
      }

    } finally {
      processingRef.current = false;
    }
  }, [config.maxBatchSize, emit, scheduleProcessing]);

  // Force immediate processing
  const flushBatch = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    processBatch();
  }, [processBatch]);

  // Cancel a specific update
  const cancelUpdate = useCallback((updateId: string) => {
    Object.values(queueRef.current).forEach(queue => {
      const index = queue.findIndex(update => update.id === updateId);
      if (index !== -1) {
        queue.splice(index, 1);
      }
    });
  }, []);

  // Get queue statistics
  const getQueueStats = useCallback(() => {
    return {
      high: queueRef.current.high.length,
      normal: queueRef.current.normal.length,
      low: queueRef.current.low.length,
      total: Object.values(queueRef.current).reduce((sum, queue) => sum + queue.length, 0),
      isProcessing: processingRef.current
    };
  }, []);

  // Clear all queues
  const clearQueues = useCallback(() => {
    queueRef.current = { high: [], normal: [], low: [] };
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    processingRef.current = false;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    batchUpdate,
    flushBatch,
    cancelUpdate,
    getQueueStats,
    clearQueues
  };
};

// React-specific batched state updates
export const useBatchedStateUpdates = <T>(
  initialState: T,
  batchConfig?: Partial<BatchConfig>
) => {
  const { batchUpdate } = useBatchedUpdates({
    maxBatchSize: 5,
    batchDelay: 16,
    priority: 'normal',
    enableDeduplication: true,
    ...batchConfig
  });

  const stateRef = useRef(initialState);
  const listenersRef = useRef<Set<(state: T) => void>>(new Set());

  // Subscribe to state changes
  const subscribe = useCallback((listener: (state: T) => void) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  // Batched state update
  const setState = useCallback((update: T | ((prev: T) => T)) => {
    batchUpdate(() => {
      const newState = typeof update === 'function' 
        ? (update as (prev: T) => T)(stateRef.current)
        : update;
      
      stateRef.current = newState;
      
      // Notify all listeners
      listenersRef.current.forEach(listener => {
        try {
          listener(newState);
        } catch (error) {
          console.error('Error in state listener:', error);
        }
      });
    }, update);
  }, [batchUpdate]);

  return {
    getState: () => stateRef.current,
    setState,
    subscribe
  };
};
