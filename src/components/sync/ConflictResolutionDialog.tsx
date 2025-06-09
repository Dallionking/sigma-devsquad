
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, User, Globe } from "lucide-react";

interface ConflictData {
  id: string;
  file: string;
  localVersion: any;
  remoteVersion: any;
  timestamp: string;
  conflictType: 'edit' | 'delete' | 'create';
}

interface ConflictResolutionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conflicts: ConflictData[];
  onResolve: (conflictId: string, resolution: 'local' | 'remote' | 'merge') => void;
}

export const ConflictResolutionDialog = ({
  isOpen,
  onClose,
  conflicts,
  onResolve
}: ConflictResolutionDialogProps) => {
  const [selectedConflict, setSelectedConflict] = useState<ConflictData | null>(
    conflicts.length > 0 ? conflicts[0] : null
  );

  const handleResolve = (resolution: 'local' | 'remote' | 'merge') => {
    if (selectedConflict) {
      onResolve(selectedConflict.id, resolution);
      const remainingConflicts = conflicts.filter(c => c.id !== selectedConflict.id);
      setSelectedConflict(remainingConflicts.length > 0 ? remainingConflicts[0] : null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span>Resolve Sync Conflicts</span>
            <Badge variant="destructive">{conflicts.length} conflicts</Badge>
          </DialogTitle>
          <DialogDescription>
            Choose how to resolve each conflict between local and remote versions
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-4">
          {/* Conflict List */}
          <div className="w-1/3 space-y-2">
            <h4 className="font-medium text-sm">Conflicts</h4>
            {conflicts.map((conflict) => (
              <Card 
                key={conflict.id}
                className={`cursor-pointer transition-colors ${
                  selectedConflict?.id === conflict.id 
                    ? 'bg-primary/10 border-primary' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedConflict(conflict)}
              >
                <CardContent className="p-3">
                  <div className="font-medium text-sm">{conflict.file}</div>
                  <div className="text-xs text-muted-foreground flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(conflict.timestamp).toLocaleString()}</span>
                  </div>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {conflict.conflictType}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Conflict Details */}
          {selectedConflict && (
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Local Version */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Local Version</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-32">
                      {JSON.stringify(selectedConflict.localVersion, null, 2)}
                    </pre>
                  </CardContent>
                </Card>

                {/* Remote Version */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>Remote Version</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-32">
                      {JSON.stringify(selectedConflict.remoteVersion, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              </div>

              {/* Resolution Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleResolve('local')}
                  className="flex-1"
                >
                  Use Local
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleResolve('remote')}
                  className="flex-1"
                >
                  Use Remote
                </Button>
                <Button
                  onClick={() => handleResolve('merge')}
                  className="flex-1"
                >
                  Merge Both
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
