
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { WifiOff, Clock, AlertCircle, RefreshCcw, ChevronRight } from "lucide-react";

interface EnhancedOfflineModeIndicatorProps {
  onShowDetails?: () => void;
  compact?: boolean;
}

export const EnhancedOfflineModeIndicator = ({ 
  onShowDetails, 
  compact = false 
}: EnhancedOfflineModeIndicatorProps) => {
  const { isOnline, pendingSync, forceSync } = useDataPersistence();

  if (isOnline) return null;

  if (compact) {
    return (
      <div className="flex items-center space-x-2 px-3 py-1 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
        <WifiOff className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
          Offline
        </span>
        {pendingSync > 0 && (
          <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">
            {pendingSync} queued
          </Badge>
        )}
        {onShowDetails && (
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={onShowDetails}
            className="h-6 w-6 p-0"
          >
            <ChevronRight className="w-3 h-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
              <WifiOff className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-orange-700 dark:text-orange-300">
                  Working Offline
                </h4>
                <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">
                  No Connection
                </Badge>
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Your changes are saved locally and will sync when connection is restored
              </p>
              {pendingSync > 0 && (
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-500">
                    {pendingSync} changes pending sync
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={forceSync}
              className="border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900"
            >
              <RefreshCcw className="w-4 h-4 mr-1" />
              Retry
            </Button>
            {onShowDetails && (
              <Button
                variant="outline"
                size="sm"
                onClick={onShowDetails}
                className="border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900"
              >
                Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
