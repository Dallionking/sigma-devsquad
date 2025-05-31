
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { MemorySnapshot, formatBytes } from './memoryUtils';

interface MemoryDetailsProps {
  currentMemory: MemorySnapshot | null;
}

export const MemoryDetails = ({ currentMemory }: MemoryDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Memory Limits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentMemory && (
            <>
              <div className="flex justify-between">
                <span className="text-sm">Used Memory:</span>
                <span className="font-mono">{formatBytes(currentMemory.usedJSHeapSize)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Allocated:</span>
                <span className="font-mono">{formatBytes(currentMemory.totalJSHeapSize)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Heap Size Limit:</span>
                <span className="font-mono">{formatBytes(currentMemory.jsHeapSizeLimit)}</span>
              </div>
              
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground mb-2">Memory Pressure</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ 
                      width: `${(currentMemory.usedJSHeapSize / currentMemory.jsHeapSizeLimit) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
