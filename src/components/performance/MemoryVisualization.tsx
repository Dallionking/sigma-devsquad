
import React, { useState, useEffect } from 'react';
import { usePerformanceMonitoring } from '@/hooks/performance/usePerformanceMonitoring';
import { useStateTransitions } from '@/hooks/performance/useStateTransitions';
import { StateTransitionAnimations } from './memory/StateTransitionAnimations';
import { MemoryStatusCards } from './memory/MemoryStatusCards';
import { MemoryCharts } from './memory/MemoryCharts';
import { MemoryDetails } from './memory/MemoryDetails';
import { MemorySnapshot } from './memory/memoryUtils';

interface MemoryVisualizationProps {
  isRecording: boolean;
}

interface MemoryState {
  memoryHistory: MemorySnapshot[];
  currentMemory: MemorySnapshot | null;
  lastGCTime: number | null;
}

export const MemoryVisualization = ({ isRecording }: MemoryVisualizationProps) => {
  const { measureMemoryUsage } = usePerformanceMonitoring();
  
  const {
    state: memoryState,
    updateState: updateMemoryState,
    isLoading,
    hasError,
    showSuccess,
    undo,
    redo,
    canUndo,
    canRedo
  } = useStateTransitions<MemoryState>({
    memoryHistory: [],
    currentMemory: null,
    lastGCTime: null
  });

  // Collect memory data with smooth transitions
  useEffect(() => {
    if (!isRecording) return;

    const collectMemoryData = async () => {
      try {
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          const snapshot: MemorySnapshot = {
            timestamp: Date.now(),
            usedJSHeapSize: memory.usedJSHeapSize,
            totalJSHeapSize: memory.totalJSHeapSize,
            jsHeapSizeLimit: memory.jsHeapSizeLimit
          };
          
          await updateMemoryState(prev => ({
            ...prev,
            currentMemory: snapshot,
            memoryHistory: [...prev.memoryHistory.slice(-59), snapshot]
          }), 'memory_update', {
            showLoading: false,
            showSuccess: false
          });
        }
      } catch (error) {
        await updateMemoryState(prev => prev, 'memory_error', {
          showLoading: false,
          showSuccess: false
        });
      }
    };

    collectMemoryData();
    const interval = setInterval(collectMemoryData, 2000);

    return () => clearInterval(interval);
  }, [isRecording, updateMemoryState]);

  const handleForceGC = async () => {
    if ('gc' in window) {
      await updateMemoryState(prev => ({
        ...prev,
        lastGCTime: Date.now()
      }), 'force_gc', {
        showLoading: true,
        showSuccess: true,
        delay: 800
      });

      // Actually trigger GC after state update
      setTimeout(() => {
        (window as any).gc();
        measureMemoryUsage();
      }, 100);
    }
  };

  const handleUndo = () => {
    const success = undo();
    if (!success) {
      // Show contextual feedback for failed undo
      updateMemoryState(prev => prev, 'undo_failed');
    }
  };

  const handleRedo = () => {
    const success = redo();
    if (!success) {
      // Show contextual feedback for failed redo
      updateMemoryState(prev => prev, 'redo_failed');
    }
  };

  return (
    <StateTransitionAnimations
      isLoading={isLoading}
      hasError={hasError}
      showSuccess={showSuccess}
      enableUndoRedo={true}
      onUndo={handleUndo}
      onRedo={handleRedo}
      canUndo={canUndo}
      canRedo={canRedo}
    >
      <div className="space-y-4">
        {/* Memory Status Summary with smooth transitions */}
        <div className="animate-in fade-in-0 duration-300">
          <MemoryStatusCards 
            currentMemory={memoryState.currentMemory}
            memoryHistory={memoryState.memoryHistory}
            onForceGC={handleForceGC}
          />
        </div>

        {/* Memory Charts with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-100">
            <MemoryCharts 
              memoryHistory={memoryState.memoryHistory}
              currentMemory={memoryState.currentMemory}
            />
          </div>
          <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500 delay-200">
            <MemoryDetails currentMemory={memoryState.currentMemory} />
          </div>
        </div>
      </div>
    </StateTransitionAnimations>
  );
};
