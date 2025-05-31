
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RefreshCcw, Upload, Download, Database } from "lucide-react";

interface SyncLoadingStatesProps {
  operations: {
    type: 'upload' | 'download' | 'sync' | 'backup';
    label: string;
    progress?: number;
    isActive: boolean;
  }[];
}

export const SyncLoadingStates = ({ operations }: SyncLoadingStatesProps) => {
  const activeOperations = operations.filter(op => op.isActive);

  if (activeOperations.length === 0) return null;

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'upload': return Upload;
      case 'download': return Download;
      case 'backup': return Database;
      default: return RefreshCcw;
    }
  };

  return (
    <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
      <CardContent className="p-4 space-y-3">
        {activeOperations.map((operation, index) => {
          const OperationIcon = getOperationIcon(operation.type);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-2">
                <OperationIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {operation.label}
                </span>
              </div>
              {operation.progress !== undefined && (
                <Progress 
                  value={operation.progress} 
                  className="h-2"
                />
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
