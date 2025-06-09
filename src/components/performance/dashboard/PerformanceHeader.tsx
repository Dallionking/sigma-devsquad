
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, RefreshCw } from 'lucide-react';

interface PerformanceHeaderProps {
  overallStatus: {
    status: string;
    color: string;
  };
  isRecording: boolean;
  onToggleRecording: () => void;
  onRefresh: () => void;
}

export const PerformanceHeader = ({
  overallStatus,
  isRecording,
  onToggleRecording,
  onRefresh
}: PerformanceHeaderProps) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Performance Dashboard
          <Badge variant={overallStatus.color as any}>
            {overallStatus.status}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="sm"
            onClick={onToggleRecording}
            className="flex items-center gap-1"
          >
            {isRecording ? (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Recording
              </>
            ) : (
              <>
                <Activity className="w-4 h-4" />
                Start Recording
              </>
            )}
          </Button>
        </div>
      </CardTitle>
    </CardHeader>
  );
};
