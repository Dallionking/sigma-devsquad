
import { useEffect, useCallback, useRef } from 'react';
import { useEventBus } from '../useEventBus';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  stateUpdateTime: number;
  componentCount: number;
  eventProcessingTime: number;
}

interface PerformanceThresholds {
  maxRenderTime: number;
  maxMemoryUsage: number;
  maxStateUpdateTime: number;
}

interface PerformanceAlert {
  type: 'warning' | 'error';
  metric: string;
  value: number;
  threshold: number;
  timestamp: number;
}

export const usePerformanceMonitoring = (
  thresholds: PerformanceThresholds = {
    maxRenderTime: 16, // 60fps target
    maxMemoryUsage: 50 * 1024 * 1024, // 50MB
    maxStateUpdateTime: 5
  }
) => {
  const { emit, subscribe } = useEventBus();
  const metricsRef = useRef<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    stateUpdateTime: 0,
    componentCount: 0,
    eventProcessingTime: 0
  });
  const observerRef = useRef<PerformanceObserver>();

  // Monitor render performance
  const startRenderMeasurement = useCallback((componentName: string) => {
    performance.mark(`${componentName}-render-start`);
  }, []);

  const endRenderMeasurement = useCallback((componentName: string) => {
    performance.mark(`${componentName}-render-end`);
    performance.measure(
      `${componentName}-render`,
      `${componentName}-render-start`,
      `${componentName}-render-end`
    );

    const measures = performance.getEntriesByName(`${componentName}-render`);
    if (measures.length > 0) {
      const renderTime = measures[measures.length - 1].duration;
      metricsRef.current.renderTime = renderTime;

      if (renderTime > thresholds.maxRenderTime) {
        emitPerformanceAlert('warning', 'renderTime', renderTime, thresholds.maxRenderTime);
      }

      emit('performance-metric', {
        type: 'render',
        component: componentName,
        value: renderTime,
        timestamp: Date.now()
      });
    }
  }, [emit, thresholds.maxRenderTime]);

  // Monitor memory usage
  const measureMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = memory.usedJSHeapSize;
      metricsRef.current.memoryUsage = memoryUsage;

      if (memoryUsage > thresholds.maxMemoryUsage) {
        emitPerformanceAlert('error', 'memoryUsage', memoryUsage, thresholds.maxMemoryUsage);
      }

      emit('performance-metric', {
        type: 'memory',
        value: memoryUsage,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        timestamp: Date.now()
      });
    }
  }, [emit, thresholds.maxMemoryUsage]);

  // Monitor state update performance
  const measureStateUpdate = useCallback((updateFn: () => void, stateName: string) => {
    const startTime = performance.now();
    updateFn();
    const endTime = performance.now();
    const updateTime = endTime - startTime;

    metricsRef.current.stateUpdateTime = updateTime;

    if (updateTime > thresholds.maxStateUpdateTime) {
      emitPerformanceAlert('warning', 'stateUpdateTime', updateTime, thresholds.maxStateUpdateTime);
    }

    emit('performance-metric', {
      type: 'stateUpdate',
      stateName,
      value: updateTime,
      timestamp: Date.now()
    });
  }, [emit, thresholds.maxStateUpdateTime]);

  // Emit performance alert
  const emitPerformanceAlert = useCallback((
    type: 'warning' | 'error',
    metric: string,
    value: number,
    threshold: number
  ) => {
    const alert: PerformanceAlert = {
      type,
      metric,
      value,
      threshold,
      timestamp: Date.now()
    };

    emit('performance-alert', alert);
    console.warn(`Performance ${type}: ${metric} (${value}) exceeded threshold (${threshold})`);
  }, [emit]);

  // Get performance snapshot
  const getPerformanceSnapshot = useCallback(() => {
    measureMemoryUsage();
    
    return {
      ...metricsRef.current,
      timestamp: Date.now()
    };
  }, [measureMemoryUsage]);

  // Setup performance observer
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      observerRef.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            emit('performance-entry', {
              name: entry.name,
              duration: entry.duration,
              startTime: entry.startTime,
              timestamp: Date.now()
            });
          }
        });
      });

      observerRef.current.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
    }

    // Periodic memory monitoring
    const memoryInterval = setInterval(measureMemoryUsage, 5000);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearInterval(memoryInterval);
    };
  }, [emit, measureMemoryUsage]);

  // Subscribe to state events for monitoring
  useEffect(() => {
    const unsubscribers = [
      subscribe('state-slice-update', (data: any) => {
        const startTime = performance.now();
        // Monitor state processing time
        setTimeout(() => {
          const processingTime = performance.now() - startTime;
          metricsRef.current.eventProcessingTime = processingTime;
          
          emit('performance-metric', {
            type: 'eventProcessing',
            event: 'state-slice-update',
            value: processingTime,
            timestamp: Date.now()
          });
        }, 0);
      })
    ];

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [subscribe, emit]);

  return {
    startRenderMeasurement,
    endRenderMeasurement,
    measureMemoryUsage,
    measureStateUpdate,
    getPerformanceSnapshot,
    metrics: metricsRef.current
  };
};

// Component performance monitoring hook
export const useComponentPerformance = (componentName: string) => {
  const { startRenderMeasurement, endRenderMeasurement } = usePerformanceMonitoring();

  useEffect(() => {
    startRenderMeasurement(componentName);
    
    return () => {
      endRenderMeasurement(componentName);
    };
  });

  return {
    measureRender: (renderFn: () => void) => {
      startRenderMeasurement(`${componentName}-custom`);
      renderFn();
      endRenderMeasurement(`${componentName}-custom`);
    }
  };
};
