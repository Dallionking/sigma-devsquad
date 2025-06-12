// Phase 11: Responsive Chart Container Component
// Provides responsive behavior and loading states for all chart components

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, AlertCircle } from 'lucide-react';

export interface ChartContainerProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  className?: string;
  minHeight?: number;
  maxHeight?: number;
  aspectRatio?: number; // width/height ratio
  refreshable?: boolean;
  lastUpdated?: Date | string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children,
  loading = false,
  error = null,
  onRefresh,
  className = '',
  minHeight = 200,
  maxHeight = 600,
  aspectRatio,
  refreshable = true,
  lastUpdated
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;
        let height = minHeight;
        
        if (aspectRatio) {
          height = clientWidth / aspectRatio;
        }
        
        // Constrain height within bounds
        height = Math.max(minHeight, Math.min(maxHeight, height));
        
        setContainerSize({ width: clientWidth, height });
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [minHeight, maxHeight, aspectRatio]);

  const formatLastUpdated = (timestamp: Date | string) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const renderHeader = () => {
    if (!title && !subtitle && !refreshable) return null;

    return (
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {title && (
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                {title}
                {loading && (
                  <RefreshCw className="h-4 w-4 animate-spin text-gray-500" />
                )}
              </CardTitle>
            )}
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          
          <div className="flex items-center gap-2">
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                {formatLastUpdated(lastUpdated)}
              </span>
            )}
            {refreshable && onRefresh && (
              <button
                onClick={onRefresh}
                disabled={loading}
                className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 transition-colors"
                title="Refresh data"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </CardHeader>
    );
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex items-center justify-center p-8" style={{ minHeight }}>
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              {error}
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Try again
                </button>
              )}
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="space-y-3 p-4" style={{ minHeight }}>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-32 w-full" />
          <div className="flex space-x-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      );
    }

    return (
      <div 
        ref={containerRef}
        className="w-full"
        style={{ 
          height: containerSize.height || minHeight,
          minHeight 
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <Card className={`transition-all duration-200 ${className}`}>
      {renderHeader()}
      <CardContent className="pt-2">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

// Hook for responsive chart behavior
export const useChartResponsive = (
  minHeight: number = 200,
  maxHeight: number = 600,
  aspectRatio?: number
) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const { clientWidth } = ref.current;
        let height = minHeight;
        
        if (aspectRatio) {
          height = clientWidth / aspectRatio;
        }
        
        height = Math.max(minHeight, Math.min(maxHeight, height));
        setDimensions({ width: clientWidth, height });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => resizeObserver.disconnect();
  }, [minHeight, maxHeight, aspectRatio]);

  return { ref, dimensions };
};

export default ChartContainer;
