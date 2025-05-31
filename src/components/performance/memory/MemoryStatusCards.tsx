
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HardDrive, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { MemorySnapshot, formatBytes, getMemoryStatus, getMemoryTrend } from './memoryUtils';

interface MemoryStatusCardsProps {
  currentMemory: MemorySnapshot | null;
  memoryHistory: MemorySnapshot[];
  onForceGC: () => void;
}

export const MemoryStatusCards = ({ currentMemory, memoryHistory, onForceGC }: MemoryStatusCardsProps) => {
  const memoryStatus = getMemoryStatus(currentMemory);
  const memoryTrend = getMemoryTrend(memoryHistory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="w-4 h-4" />
            <span className="font-medium">Used Memory</span>
          </div>
          <div className="text-2xl font-bold">
            {currentMemory ? formatBytes(currentMemory.usedJSHeapSize) : '0 MB'}
          </div>
          <Badge variant={memoryStatus.color} className="mt-1">
            {memoryStatus.status}
          </Badge>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Memory Trend</span>
          </div>
          <div className="text-2xl font-bold">
            {memoryTrend > 0 ? '+' : ''}{formatBytes(Math.abs(memoryTrend))}
          </div>
          <Badge variant={memoryTrend > 1024 * 1024 ? "outline" : "secondary"} className="mt-1">
            {memoryTrend > 0 ? "Increasing" : memoryTrend < 0 ? "Decreasing" : "Stable"}
          </Badge>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">Usage %</span>
          </div>
          <div className="text-2xl font-bold">
            {currentMemory 
              ? ((currentMemory.usedJSHeapSize / currentMemory.jsHeapSizeLimit) * 100).toFixed(1)
              : '0.0'
            }%
          </div>
          <div className="text-sm text-muted-foreground">of heap limit</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-4 h-4" />
            <span className="font-medium">Actions</span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onForceGC}
            className="w-full"
            disabled={!('gc' in window)}
          >
            Force GC
          </Button>
          <div className="text-xs text-muted-foreground mt-1">
            {('gc' in window) ? 'Available in DevTools' : 'Not available'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
