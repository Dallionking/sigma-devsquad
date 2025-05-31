
export interface MemorySnapshot {
  timestamp: number;
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

export const formatBytes = (bytes: number): string => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};

export const getMemoryStatus = (currentMemory: MemorySnapshot | null): { 
  status: string, 
  color: 'default' | 'secondary' | 'outline' | 'destructive' 
} => {
  if (!currentMemory) return { status: 'unknown', color: 'secondary' };
  
  const usagePercent = (currentMemory.usedJSHeapSize / currentMemory.jsHeapSizeLimit) * 100;
  
  if (usagePercent < 50) return { status: 'optimal', color: 'default' };
  if (usagePercent < 75) return { status: 'moderate', color: 'outline' };
  return { status: 'high', color: 'destructive' };
};

export const getMemoryTrend = (memoryHistory: MemorySnapshot[]): number => {
  return memoryHistory.length >= 2 
    ? memoryHistory[memoryHistory.length - 1].usedJSHeapSize - memoryHistory[memoryHistory.length - 2].usedJSHeapSize
    : 0;
};

export const createChartData = (memoryHistory: MemorySnapshot[]) => {
  return memoryHistory.map(snapshot => ({
    time: new Date(snapshot.timestamp).toLocaleTimeString(),
    used: snapshot.usedJSHeapSize / (1024 * 1024),
    total: snapshot.totalJSHeapSize / (1024 * 1024),
    limit: snapshot.jsHeapSizeLimit / (1024 * 1024)
  }));
};

export const createPieData = (currentMemory: MemorySnapshot | null) => {
  if (!currentMemory) return [];
  
  return [
    {
      name: 'Used Memory',
      value: currentMemory.usedJSHeapSize,
      color: '#8884d8'
    },
    {
      name: 'Available Memory',
      value: Math.max(0, currentMemory.totalJSHeapSize - currentMemory.usedJSHeapSize),
      color: '#82ca9d'
    },
    {
      name: 'System Reserved',
      value: Math.max(0, currentMemory.jsHeapSizeLimit - currentMemory.totalJSHeapSize),
      color: '#ffc658'
    }
  ];
};
