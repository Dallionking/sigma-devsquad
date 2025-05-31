
import { useEffect, useRef } from 'react';
import { useStateStore } from '@/contexts/StateStoreContext';

interface PerformanceMetrics {
  renderTime: number;
  updateCount: number;
  memoryUsage: number;
}

export const usePerformanceMonitor = (componentName: string) => {
  const { dispatch } = useStateStore();
  const renderStartTime = useRef<number>(0);
  const renderCount = useRef<number>(0);
  
  useEffect(() => {
    renderStartTime.current = performance.now();
    renderCount.current += 1;
  });
  
  useEffect(() => {
    const renderTime = performance.now() - renderStartTime.current;
    
    dispatch({
      type: 'LOG_RENDER_TIME',
      payload: {
        component: componentName,
        time: renderTime
      }
    });
  });
  
  const logNetworkRequest = (url: string, method: string, duration: number, status: number) => {
    dispatch({
      type: 'LOG_NETWORK_REQUEST',
      payload: {
        url,
        method,
        duration,
        status,
        component: componentName
      }
    });
  };
  
  const getMetrics = (): PerformanceMetrics => ({
    renderTime: performance.now() - renderStartTime.current,
    updateCount: renderCount.current,
    memoryUsage: 'memory' in performance ? (performance as any).memory.usedJSHeapSize : 0
  });
  
  return {
    logNetworkRequest,
    getMetrics,
    renderCount: renderCount.current
  };
};
