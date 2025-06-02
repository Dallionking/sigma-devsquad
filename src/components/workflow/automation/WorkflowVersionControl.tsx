
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  GitBranch, 
  Tag, 
  Download, 
  Upload, 
  Play, 
  Archive,
  Star,
  Copy,
  Trash2
} from 'lucide-react';
import { WorkflowVersion } from '@/types/workflow-history';
import { useWorkflowHistory } from '@/hooks/useWorkflowHistory';

interface WorkflowVersionControlProps {
  versions: WorkflowVersion[];
  workflowId?: string;
}

export const WorkflowVersionControl: React.FC<WorkflowVersionControlProps> = ({
  versions,
  workflowId
}) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newVersionName, setNewVersionName] = useState('');
  const [newVersionDescription, setNewVersionDescription] = useState('');
  const [newVersionTags, setNewVersionTags] = useState('');
  const [selectedVersion, setSelectedVersion] = useState<WorkflowVersion | null>(null);

  const { createVersion, activateVersion, revertToVersion } = useWorkflowHistory();

  const handleCreateVersion = () => {
    if (!newVersionName.trim()) return;
    
    const tags = newVersionTags.split(',').map(tag => tag.trim()).filter(Boolean);
    
    // Mock current workflow snapshot - in real app this would come from current state
    const mockSnapshot = {
      id: 'current-workflow',
      name: 'Current Workflow',
      description: 'Current workflow state',
      isEnabled: true,
      priority: 1,
      trigger: { type: 'card_created' as const, config: {} },
      conditions: [],
      actions: [],
      createdAt: new Date().toISOString()
    };

    createVersion(
      workflowId || 'current-workflow',
      newVersionName,
      mockSnapshot,
      newVersionDescription || undefined,
      tags
    );

    setNewVersionName('');
    setNewVersionDescription('');
    setNewVersionTags('');
    setShowCreateDialog(false);
  };

  const handleActivateVersion = (versionId: string) => {
    activateVersion(versionId);
  };

  const handleRevertToVersion = (versionId: string) => {
    const reverted = revertToVersion(versionId);
    if (reverted) {
      console.log('Reverted to version:', reverted);
    }
  };

  const exportVersion = (version: WorkflowVersion) => {
    const blob = new Blob([JSON.stringify(version, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-version-${version.version}-${version.name.replace(/\s+/g, '-')}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Version Control
            </CardTitle>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Tag className="w-4 h-4 mr-2" />
                  Create Version
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Version</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Version Name</label>
                    <Input
                      value={newVersionName}
                      onChange={(e) => setNewVersionName(e.target.value)}
                      placeholder="e.g., v1.2.0 or Production Release"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description (Optional)</label>
                    <Textarea
                      value={newVersionDescription}
                      onChange={(e) => setNewVersionDescription(e.target.value)}
                      placeholder="Describe what changed in this version..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tags (Optional)</label>
                    <Input
                      value={newVersionTags}
                      onChange={(e) => setNewVersionTags(e.target.value)}
                      placeholder="stable, production, experimental (comma-separated)"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateVersion} disabled={!newVersionName.trim()}>
                      Create Version
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Versions List */}
      <div className="space-y-4">
        {versions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <GitBranch className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Versions Found</h3>
              <p className="text-muted-foreground mb-6">
                Create your first version to start tracking workflow changes.
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Tag className="w-4 h-4 mr-2" />
                Create First Version
              </Button>
            </CardContent>
          </Card>
        ) : (
          versions.map((version) => (
            <Card key={version.id} className={version.isActive ? 'ring-2 ring-green-500' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-semibold">{version.name}</h3>
                      <Badge variant="outline">v{version.version}</Badge>
                      {version.isActive && (
                        <Badge className="bg-green-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => exportVersion(version)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    
                    {!version.isActive && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleActivateVersion(version.id)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Activate
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleRevertToVersion(version.id)}
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Revert
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedVersion(version)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {version.description && (
                    <p className="text-muted-foreground">{version.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Created: {new Date(version.createdAt).toLocaleDateString()}</span>
                      <span>By: {version.createdBy}</span>
                    </div>
                    
                    {version.tags.length > 0 && (
                      <div className="flex gap-1">
                        {version.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <strong>Workflow Configuration:</strong>
                    <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                      <span>Enabled: {version.snapshot?.isEnabled ? 'Yes' : 'No'}</span>
                      <span>Priority: {version.snapshot?.priority}</span>
                      <span>Conditions: {version.snapshot?.conditions?.length || 0}</span>
                      <span>Actions: {version.snapshot?.actions?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Version Details Dialog */}
      {selectedVersion && (
        <Dialog open={!!selectedVersion} onOpenChange={() => setSelectedVersion(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                {selectedVersion.name} - Version {selectedVersion.version}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Version Info</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Created:</strong> {new Date(selectedVersion.createdAt).toLocaleString()}</div>
                    <div><strong>Created by:</strong> {selectedVersion.createdBy}</div>
                    <div><strong>Status:</strong> {selectedVersion.isActive ? 'Active' : 'Inactive'}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedVersion.tags.length > 0 ? (
                      selectedVersion.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No tags</span>
                    )}
                  </div>
                </div>
              </div>

              {selectedVersion.description && (
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedVersion.description}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Workflow Snapshot</h4>
                <pre className="bg-muted p-4 rounded text-xs overflow-auto max-h-96">
                  {JSON.stringify(selectedVersion.snapshot, null, 2)}
                </pre>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => exportVersion(selectedVersion)}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                
                {!selectedVersion.isActive && (
                  <Button onClick={() => {
                    handleActivateVersion(selectedVersion.id);
                    setSelectedVersion(null);
                  }}>
                    <Play className="w-4 h-4 mr-2" />
                    Activate Version
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
