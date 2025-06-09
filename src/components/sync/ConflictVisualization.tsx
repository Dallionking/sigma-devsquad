
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, GitMerge, FileText, User, Clock } from "lucide-react";

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

interface ConflictVisualizationProps {
  conflict: ConflictData;
  onResolve: (resolution: 'local' | 'remote' | 'merge') => void;
  onShowHistory: () => void;
}

export const ConflictVisualization = ({ conflict, onResolve, onShowHistory }: ConflictVisualizationProps) => {
  const [selectedResolution, setSelectedResolution] = useState<'local' | 'remote' | 'merge' | null>(null);
  const [mergePreview, setMergePreview] = useState<string>('');

  const renderDiff = (changes: typeof conflict.changes.local, side: 'local' | 'remote') => {
    return (
      <div className="space-y-1 font-mono text-sm">
        {changes.map((change, index) => (
          <div key={index} className={`p-2 rounded ${
            change.type === 'added' ? 'bg-green-50 border-l-4 border-green-500' :
            change.type === 'removed' ? 'bg-red-50 border-l-4 border-red-500' :
            'bg-yellow-50 border-l-4 border-yellow-500'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">
                Line {change.line}
              </Badge>
              <Badge variant={
                change.type === 'added' ? 'default' :
                change.type === 'removed' ? 'destructive' : 'secondary'
              } className="text-xs">
                {change.type}
              </Badge>
              {change.context && (
                <span className="text-xs text-muted-foreground">{change.context}</span>
              )}
            </div>
            <div className="bg-white p-2 rounded border">
              {change.content}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleCreateMerge = () => {
    // Simulate intelligent merge creation
    const localChanges = conflict.changes.local.map(c => c.content).join('\n');
    const remoteChanges = conflict.changes.remote.map(c => c.content).join('\n');
    setMergePreview(`// Merged version:\n${localChanges}\n${remoteChanges}`);
    setSelectedResolution('merge');
  };

  return (
    <div className="space-y-4">
      {/* Conflict Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Conflict in {conflict.file}
            </div>
            <Badge variant="outline">
              {conflict.conflictType} conflict
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {new Date(conflict.timestamp).toLocaleString()}
            </div>
            <Button variant="link" size="sm" onClick={onShowHistory}>
              View File History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Side-by-side Comparison */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="comparison" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="comparison">Compare Changes</TabsTrigger>
              <TabsTrigger value="preview">Resolution Preview</TabsTrigger>
              <TabsTrigger value="metadata">Conflict Details</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Local Changes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderDiff(conflict.changes.local, 'local')}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Remote Changes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderDiff(conflict.changes.remote, 'remote')}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              {selectedResolution === 'merge' && mergePreview ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Merge Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded text-sm overflow-auto">
                      {mergePreview}
                    </pre>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Select a resolution option to see preview
                </div>
              )}
            </TabsContent>

            <TabsContent value="metadata" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium">Local Version</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {JSON.stringify(conflict.localVersion, null, 2)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium">Remote Version</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {JSON.stringify(conflict.remoteVersion, null, 2)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Resolution Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Resolution Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant={selectedResolution === 'local' ? 'default' : 'outline'}
              onClick={() => setSelectedResolution('local')}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <FileText className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium">Keep Local</div>
                <div className="text-xs text-muted-foreground">
                  Use your local changes
                </div>
              </div>
            </Button>

            <Button
              variant={selectedResolution === 'remote' ? 'default' : 'outline'}
              onClick={() => setSelectedResolution('remote')}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <User className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium">Accept Remote</div>
                <div className="text-xs text-muted-foreground">
                  Use remote changes
                </div>
              </div>
            </Button>

            <Button
              variant={selectedResolution === 'merge' ? 'default' : 'outline'}
              onClick={handleCreateMerge}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <GitMerge className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium">Smart Merge</div>
                <div className="text-xs text-muted-foreground">
                  Combine both changes
                </div>
              </div>
            </Button>
          </div>

          {selectedResolution && (
            <Button
              onClick={() => onResolve(selectedResolution)}
              className="w-full mt-4"
            >
              Apply {selectedResolution} Resolution
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
