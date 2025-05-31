
import React, { useState, useEffect } from 'react';
import { usePerformanceMonitoring } from '@/hooks/performance/usePerformanceMonitoring';
import { MemoryStatusCards } from './memory/MemoryStatusCards';
import { MemoryCharts } from './memory/MemoryCharts';
import { MemoryDetails } from './memory/MemoryDetails';
import { MemorySnapshot } from './memory/memoryUtils';

interface MemoryVisualizationProps {
  isRecording: boolean;
}

export const MemoryVisualization = ({ isRecording }: MemoryVisualizationProps) => {
  const [memoryHistory, setMemoryHistory] = useState<MemorySnapshot[]>([]);
  const [currentMemory, setCurrentMemory] = useState<MemorySnapshot | null>(null);
  const { measureMemoryUsage } = usePerformanceMonitoring();

  // Collect memory data
  useEffect(() => {
    if (!isRecording) return;

    const collectMemoryData = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const snapshot: MemorySnapshot = {
          timestamp: Date.now(),
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        };
        
        setCurrentMemory(snapshot);
        setMemoryHistory(prev => [...prev.slice(-59), snapshot]); // Keep last 60 readings
      }
    };

    collectMemoryData();
    const interval = setInterval(collectMemoryData, 2000);

    return () => clearInterval(interval);
  }, [isRecording]);

  const handleForceGC = () => {
    // Force garbage collection if available (Chrome DevTools)
    if ('gc' in window) {
      (window as any).gc();
      measureMemoryUsage();
    }
  };

  return (
    <div className="space-y-4">
      {/* Memory Status Summary */}
      <MemoryStatusCards 
        currentMemory={currentMemory}
        memoryHistory={memoryHistory}
        onForceGC={handleForceGC}
      />

      {/* Memory Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MemoryCharts 
          memoryHistory={memoryHistory}
          currentMemory={currentMemory}
        />
        <MemoryDetails currentMemory={currentMemory} />
      </div>
    </div>
  );
};
