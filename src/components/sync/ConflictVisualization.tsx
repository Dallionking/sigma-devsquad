
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitMerge, History, Eye, AlertTriangle, Check, X } from "lucide-react";

interface ConflictChange {
  line: number;
  type: 'added' | 'removed' | 'modified';
  content: string;
  context?: string;
}

interface ConflictData {
  id: string;
  file: string;
  localVersion: any;
  remoteVersion: any;
  timestamp: string;
  conflictType: 'edit' | 'delete' | 'create';
  changes: {
    local: ConflictChange[];
    remote: ConflictChange[];
  };
}

interface ConflictVisualizationProps {
  conflict: ConflictData;
  onResolve: (resolution: 'local' | 'remote' | 'merge') => void;
  onShowHistory: () => void;
}

export const ConflictVisualization = ({
  conflict,
  onResolve,
  onShowHistory
}: ConflictVisualizationProps) => {
  const [selectedResolution, setSelectedResolution] = useState<'local' | 'remote' | 'merge' | null>(null);
  const [mergePreview, setMergePreview] = useState<string>('');

  const renderDiffLine = (change: ConflictChange, side: 'local' | 'remote') => {
    const bgColor = change.type === 'added' 
      ? 'bg-green-50 dark:bg-green-950 border-l-4 border-l-green-500' 
      : change.type === 'removed'
      ? 'bg-red-50 dark:bg-red-950 border-l-4 border-l-red-500'
      : 'bg-yellow-50 dark:bg-yellow-950 border-l-4 border-l-yellow-500';

    const icon = change.type === 'added' 
      ? <span className="text-green-600">+</span>
      : change.type === 'removed'
      ? <span className="text-red-600">-</span>
      : <span className="text-yellow-600">~</span>;

    return (
      <div key={`${side}-${change.line}`} className={`p-2 font-mono text-sm ${bgColor}`}>
        <div className="flex items-start space-x-2">
          <span className="w-4 flex-shrink-0">{icon}</span>
          <span className="text-muted-foreground w-8 flex-shrink-0">{change.line}</span>
          <span className="flex-1">{change.content}</span>
        </div>
        {change.context && (
          <div className="ml-14 text-xs text-muted-foreground mt-1">
            Context: {change.context}
          </div>
        )}
      </div>
    );
  };

  const generateMergePreview = () => {
    // Simple merge preview - in real implementation, this would be more sophisticated
    const merged = `// Merged version preview
// Local changes: ${conflict.changes.local.length} modifications
// Remote changes: ${conflict.changes.remote.length} modifications
${JSON.stringify(conflict.localVersion, null, 2)}
// --- MERGE MARKER ---
${JSON.stringify(conflict.remoteVersion, null, 2)}`;
    
    setMergePreview(merged);
    setSelectedResolution('merge');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <GitMerge className="w-5 h-5" />
            <span>Conflict Resolution: {conflict.file}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={conflict.conflictType === 'edit' ? 'destructive' : 'secondary'}>
              {conflict.conflictType}
            </Badge>
            <Button variant="outline" size="sm" onClick={onShowHistory}>
              <History className="w-4 h-4 mr-1" />
              History
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs defaultValue="diff" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diff">Side-by-Side Diff</TabsTrigger>
            <TabsTrigger value="unified">Unified Diff</TabsTrigger>
            <TabsTrigger value="preview">Merge Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="diff" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Local Version */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    <span>Local Version</span>
                    <Badge variant="outline" className="ml-auto">
                      {conflict.changes.local.length} changes
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-1">
                      {conflict.changes.local.map((change) => 
                        renderDiffLine(change, 'local')
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Remote Version */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span>Remote Version</span>
                    <Badge variant="outline" className="ml-auto">
                      {conflict.changes.remote.length} changes
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-1">
                      {conflict.changes.remote.map((change) => 
                        renderDiffLine(change, 'remote')
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="unified" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Unified Diff View</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="font-mono text-sm space-y-1">
                    {/* Merge all changes and sort by line number */}
                    {[...conflict.changes.local, ...conflict.changes.remote]
                      .sort((a, b) => a.line - b.line)
                      .map((change, index) => renderDiffLine(change, 'local'))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            {mergePreview ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Merge Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <pre className="font-mono text-sm bg-muted p-4 rounded">
                      {mergePreview}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-8">
                <Button onClick={generateMergePreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  Generate Merge Preview
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Resolution Actions */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={selectedResolution === 'local' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedResolution('local');
                onResolve('local');
              }}
              className="flex items-center space-x-2"
            >
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>Use Local</span>
              {selectedResolution === 'local' && <Check className="w-4 h-4" />}
            </Button>

            <Button
              variant={selectedResolution === 'remote' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedResolution('remote');
                onResolve('remote');
              }}
              className="flex items-center space-x-2"
            >
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Use Remote</span>
              {selectedResolution === 'remote' && <Check className="w-4 h-4" />}
            </Button>

            <Button
              variant={selectedResolution === 'merge' ? 'default' : 'outline'}
              onClick={() => {
                generateMergePreview();
                onResolve('merge');
              }}
              className="flex items-center space-x-2"
            >
              <GitMerge className="w-4 h-4" />
              <span>Merge Both</span>
              {selectedResolution === 'merge' && <Check className="w-4 h-4" />}
            </Button>
          </div>

          {selectedResolution && (
            <div className="mt-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Resolution selected: {selectedResolution === 'local' ? 'Local version' : selectedResolution === 'remote' ? 'Remote version' : 'Merged version'}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
