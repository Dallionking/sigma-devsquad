
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertTriangle, RefreshCcw, History, Download, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StateSnapshot<T> {
  id: string;
  timestamp: number;
  data: T;
  version: string;
  checksum: string;
  metadata: {
    source: string;
    description?: string;
    tags?: string[];
  };
}

interface StateRecoveryInfo {
  hasCorruptedData: boolean;
  lastValidVersion?: StateSnapshot<any>;
  corruptionDetails?: string;
  suggestedAction: 'restore' | 'reset' | 'merge';
}

interface StateRecoveryPanelProps<T> {
  recoveryInfo: StateRecoveryInfo | null;
  versionHistory: StateSnapshot<T>[];
  onRestore: (snapshotId: string) => void;
  onReset: () => void;
  onExport: (snapshot: StateSnapshot<T>) => void;
  onImport: (file: File) => void;
  onClearRecovery: () => void;
}

export const StateRecoveryPanel = <T,>({
  recoveryInfo,
  versionHistory,
  onRestore,
  onReset,
  onExport,
  onImport,
  onClearRecovery
}: StateRecoveryPanelProps<T>) => {
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [selectedSnapshot, setSelectedSnapshot] = useState<StateSnapshot<T> | null>(null);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const { toast } = useToast();

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'auto-save': return <RefreshCcw className="w-3 h-3" />;
      case 'manual': return <CheckCircle className="w-3 h-3" />;
      default: return <History className="w-3 h-3" />;
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  const handleRestoreConfirm = () => {
    if (selectedSnapshot) {
      onRestore(selectedSnapshot.id);
      setShowRestoreDialog(false);
      setSelectedSnapshot(null);
      toast({
        title: "State Restored",
        description: `Successfully restored to version from ${formatTimestamp(selectedSnapshot.timestamp)}`
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Recovery Alert */}
      {recoveryInfo && (
        <Alert variant={recoveryInfo.hasCorruptedData ? "destructive" : "default"}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p><strong>State Recovery Required:</strong> {recoveryInfo.corruptionDetails}</p>
              <div className="flex gap-2">
                {recoveryInfo.lastValidVersion && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRestore(recoveryInfo.lastValidVersion!.id)}
                  >
                    <RefreshCcw className="w-4 h-4 mr-1" />
                    Restore Last Valid
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onReset}
                >
                  Reset to Default
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClearRecovery}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* State Management Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>State Management</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVersionHistory(true)}
              >
                <History className="w-4 h-4 mr-1" />
                Version History ({versionHistory.length})
              </Button>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-1" />
                    Import
                  </span>
                </Button>
              </label>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Available Versions:</span>
              <div className="text-muted-foreground">{versionHistory.length} snapshots</div>
            </div>
            <div>
              <span className="font-medium">Latest Backup:</span>
              <div className="text-muted-foreground">
                {versionHistory.length > 0 
                  ? formatTimestamp(versionHistory[0].timestamp)
                  : 'No backups available'
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Version History Dialog */}
      <Dialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Version History</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3">
            {versionHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No version history available
              </div>
            ) : (
              versionHistory.map((snapshot) => (
                <Card key={snapshot.id} className="hover:bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getSourceIcon(snapshot.metadata.source)}
                          <span className="font-medium">
                            {snapshot.metadata.description || 'State Snapshot'}
                          </span>
                          <Badge variant="outline">{snapshot.metadata.source}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatTimestamp(snapshot.timestamp)} • Version {snapshot.version}
                        </div>
                        {snapshot.metadata.tags && (
                          <div className="flex gap-1 mt-1">
                            {snapshot.metadata.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onExport(snapshot)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedSnapshot(snapshot);
                            setShowRestoreDialog(true);
                          }}
                        >
                          <RefreshCcw className="w-4 h-4 mr-1" />
                          Restore
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Restore Confirmation Dialog */}
      <Dialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm State Restoration</DialogTitle>
          </DialogHeader>
          
          {selectedSnapshot && (
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This will restore your state to the selected version. Any unsaved changes will be lost.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <div><strong>Version:</strong> {selectedSnapshot.version}</div>
                <div><strong>Created:</strong> {formatTimestamp(selectedSnapshot.timestamp)}</div>
                <div><strong>Source:</strong> {selectedSnapshot.metadata.source}</div>
                {selectedSnapshot.metadata.description && (
                  <div><strong>Description:</strong> {selectedSnapshot.metadata.description}</div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRestoreDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRestoreConfirm}>
              Restore State
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
