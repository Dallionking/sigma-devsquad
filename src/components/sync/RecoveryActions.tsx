
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { useToast } from "@/hooks/use-toast";
import { RefreshCcw, Download, Upload, AlertTriangle, RotateCcw } from "lucide-react";

export const RecoveryActions = () => {
  const [isRecovering, setIsRecovering] = useState(false);
  const { forceSync, backups, restoreFromBackup } = useDataPersistence();
  const { toast } = useToast();

  const handleForceSync = async () => {
    setIsRecovering(true);
    try {
      await forceSync();
      toast({
        title: "Sync Initiated",
        description: "Attempting to synchronize all pending changes",
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Unable to sync changes. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsRecovering(false);
    }
  };

  const handleRestoreBackup = async () => {
    if (backups.length === 0) {
      toast({
        title: "No Backups Available",
        description: "No backup data found to restore from",
        variant: "destructive",
      });
      return;
    }

    setIsRecovering(true);
    try {
      const latestBackup = backups[backups.length - 1];
      await restoreFromBackup(latestBackup.id);
      toast({
        title: "Backup Restored",
        description: "Successfully restored from latest backup",
      });
    } catch (error) {
      toast({
        title: "Restore Failed",
        description: "Failed to restore from backup",
        variant: "destructive",
      });
    } finally {
      setIsRecovering(false);
    }
  };

  const handleClearCache = () => {
    localStorage.removeItem('sync-queue');
    sessionStorage.clear();
    toast({
      title: "Cache Cleared",
      description: "Local cache has been cleared. Please refresh the page.",
    });
  };

  return (
    <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
      <CardHeader>
        <CardTitle className="text-sm flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-yellow-700 dark:text-yellow-300">Recovery Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleForceSync}
            disabled={isRecovering}
            className="border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900"
          >
            {isRecovering ? (
              <RefreshCcw className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-1" />
            )}
            Force Sync
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRestoreBackup}
            disabled={isRecovering || backups.length === 0}
            className="border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900"
          >
            <Download className="w-4 h-4 mr-1" />
            Restore Backup
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClearCache}
            className="border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900 col-span-2"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Clear Cache & Restart
          </Button>
        </div>

        <div className="text-xs text-yellow-600 dark:text-yellow-400">
          Use these actions if you're experiencing sync issues or data conflicts
        </div>
      </CardContent>
    </Card>
  );
};
