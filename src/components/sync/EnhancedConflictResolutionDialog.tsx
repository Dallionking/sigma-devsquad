
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConflictVisualization } from './ConflictVisualization';
import { ConflictDetectionSystem } from './ConflictDetectionSystem';
import { VersionHistoryViewer } from './VersionHistoryViewer';
import { ManualOverridePanel } from './ManualOverridePanel';
import { useToast } from "@/hooks/use-toast";

interface ConflictData {
  id: string;
  file: string;
  localVersion: any;
  remoteVersion: any;
  timestamp: string;
  conflictType: 'edit' | 'delete' | 'create';
  changes: {
    local: Array<{
      line: number;
      type: 'added' | 'removed' | 'modified';
      content: string;
      context?: string;
    }>;
    remote: Array<{
      line: number;
      type: 'added' | 'removed' | 'modified';
      content: string;
      context?: string;
    }>;
  };
}

interface EnhancedConflictResolutionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conflicts: ConflictData[];
  onResolve: (conflictId: string, resolution: 'local' | 'remote' | 'merge') => void;
}

export const EnhancedConflictResolutionDialog = ({
  isOpen,
  onClose,
  conflicts,
  onResolve
}: EnhancedConflictResolutionDialogProps) => {
  const [selectedConflict, setSelectedConflict] = useState<ConflictData | null>(
    conflicts.length > 0 ? conflicts[0] : null
  );
  const [activeTab, setActiveTab] = useState('resolution');
  const { toast } = useToast();

  const handleResolve = (resolution: 'local' | 'remote' | 'merge') => {
    if (selectedConflict) {
      onResolve(selectedConflict.id, resolution);
      const remainingConflicts = conflicts.filter(c => c.id !== selectedConflict.id);
      setSelectedConflict(remainingConflicts.length > 0 ? remainingConflicts[0] : null);
      
      toast({
        title: "Conflict Resolved",
        description: `Applied ${resolution} resolution for ${selectedConflict.file}`
      });
    }
  };

  const handleRestoreVersion = (versionId: string) => {
    toast({
      title: "Version Restored",
      description: `Restored to version ${versionId}`
    });
  };

  const handleCompareVersions = (versionA: string, versionB: string) => {
    toast({
      title: "Comparing Versions",
      description: `Comparing ${versionA} with ${versionB}`
    });
  };

  const handleShowHistory = () => {
    setActiveTab('history');
  };

  // Mock conflict data with proper structure for visualization
  const mockConflictWithChanges: ConflictData = selectedConflict ? {
    ...selectedConflict,
    changes: {
      local: [
        { line: 1, type: 'modified', content: 'const theme = "dark";', context: 'Theme configuration' },
        { line: 5, type: 'added', content: 'export { theme };', context: 'Export statement' }
      ],
      remote: [
        { line: 1, type: 'modified', content: 'const theme = "light";', context: 'Theme configuration' },
        { line: 3, type: 'removed', content: 'const deprecated = true;', context: 'Deprecated variable' }
      ]
    }
  } : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enhanced Conflict Resolution</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resolution">Resolution</TabsTrigger>
            <TabsTrigger value="detection">Detection</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="override">Override</TabsTrigger>
          </TabsList>

          <TabsContent value="resolution" className="space-y-4">
            {mockConflictWithChanges ? (
              <ConflictVisualization
                conflict={mockConflictWithChanges}
                onResolve={handleResolve}
                onShowHistory={handleShowHistory}
              />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No conflicts to resolve
              </div>
            )}
          </TabsContent>

          <TabsContent value="detection" className="space-y-4">
            <ConflictDetectionSystem />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {selectedConflict ? (
              <VersionHistoryViewer
                file={selectedConflict.file}
                onRestoreVersion={handleRestoreVersion}
                onCompareVersions={handleCompareVersions}
              />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Select a conflict to view its history
              </div>
            )}
          </TabsContent>

          <TabsContent value="override" className="space-y-4">
            <ManualOverridePanel />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
