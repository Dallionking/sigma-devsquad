
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  GitBranch, 
  Plus, 
  Download, 
  Upload,
  Star,
  Play,
  Pause,
  Tag
} from 'lucide-react';
import { WorkflowVersion } from '@/types/workflow-history';

interface WorkflowVersionControlProps {
  versions: WorkflowVersion[];
  workflowId?: string;
}

export const WorkflowVersionControl: React.FC<WorkflowVersionControlProps> = ({
  versions,
  workflowId
}) => {
  const [showCreateVersion, setShowCreateVersion] = useState(false);
  const [newVersionName, setNewVersionName] = useState('');
  const [newVersionDescription, setNewVersionDescription] = useState('');

  const handleCreateVersion = () => {
    // This would be handled by the parent component
    console.log('Creating version:', { name: newVersionName, description: newVersionDescription });
    setShowCreateVersion(false);
    setNewVersionName('');
    setNewVersionDescription('');
  };

  const handleActivateVersion = (versionId: string) => {
    console.log('Activating version:', versionId);
  };

  const handleRevertToVersion = (versionId: string) => {
    console.log('Reverting to version:', versionId);
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
            <Button onClick={() => setShowCreateVersion(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Version
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Create Version Form */}
      {showCreateVersion && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Version</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Version Name</label>
              <Input
                value={newVersionName}
                onChange={(e) => setNewVersionName(e.target.value)}
                placeholder="e.g., Production Release v2.1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={newVersionDescription}
                onChange={(e) => setNewVersionDescription(e.target.value)}
                placeholder="Describe the changes in this version..."
                rows={3}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleCreateVersion}>Create Version</Button>
              <Button variant="outline" onClick={() => setShowCreateVersion(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Versions List */}
      <div className="space-y-4">
        {versions.map((version) => (
          <Card key={version.id} className={version.isActive ? 'border-green-500 bg-green-50' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={version.isActive ? 'default' : 'outline'}>
                      v{version.version}
                    </Badge>
                    {version.isActive && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                  <h3 className="font-medium">{version.name}</h3>
                </div>
                <div className="flex items-center gap-2">
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
                    <Download className="w-4 h-4 mr-2" />
                    Revert
                  </Button>
                </div>
              </div>

              {version.description && (
                <p className="text-sm text-muted-foreground mb-3">{version.description}</p>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Created by {version.createdBy}</span>
                <span>{new Date(version.createdAt).toLocaleString()}</span>
              </div>

              {version.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <Tag className="w-3 h-3" />
                  {version.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {versions.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No Versions Created</h3>
              <p>Create your first version to start tracking workflow changes.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
