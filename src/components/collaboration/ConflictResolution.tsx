
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { AlertTriangle, Users, GitMerge, Clock, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConflictData {
  id: string;
  componentId: string;
  conflictingUsers: Array<{
    id: string;
    name: string;
    content: string;
    timestamp: string;
  }>;
  originalContent: string;
  conflictType: 'edit' | 'delete' | 'move';
}

interface ConflictResolutionProps {
  conflict: ConflictData;
  onResolve: (resolution: 'accept-mine' | 'accept-theirs' | 'merge' | 'manual', mergedContent?: string) => void;
  onDismiss: () => void;
  className?: string;
}

export const ConflictResolution = ({ 
  conflict, 
  onResolve, 
  onDismiss, 
  className 
}: ConflictResolutionProps) => {
  const [selectedResolution, setSelectedResolution] = useState<string>('');
  const [mergedContent, setMergedContent] = useState('');
  const [showMergeEditor, setShowMergeEditor] = useState(false);
  const { sendUpdate } = useWebSocket();

  const handleResolve = (resolution: 'accept-mine' | 'accept-theirs' | 'merge' | 'manual') => {
    if (resolution === 'manual' && !mergedContent.trim()) {
      return;
    }

    // Send resolution update
    sendUpdate({
      type: 'edit_conflict',
      data: {
        action: 'resolve',
        conflictId: conflict.id,
        resolution,
        mergedContent: resolution === 'manual' ? mergedContent : undefined
      },
      userId: 'current-user',
      component: conflict.componentId
    });

    onResolve(resolution, resolution === 'manual' ? mergedContent : undefined);
  };

  const getConflictIcon = () => {
    switch (conflict.conflictType) {
      case 'edit': return <GitMerge className="w-4 h-4" />;
      case 'delete': return <X className="w-4 h-4" />;
      case 'move': return <Users className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Card className={cn("border-destructive bg-destructive/5", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-5 h-5" />
          Edit Conflict Detected
          <Badge variant="destructive">{conflict.conflictType}</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Multiple users are editing the same content simultaneously. Choose how to resolve this conflict.
          </AlertDescription>
        </Alert>

        {/* Conflicting Changes */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            Conflicting Changes
          </h4>
          
          {conflict.conflictingUsers.map((user, index) => (
            <div key={user.id} className="p-3 border rounded-lg bg-background">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{user.name}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {formatTime(user.timestamp)}
                  </div>
                </div>
                {getConflictIcon()}
              </div>
              
              <div className="text-sm bg-muted p-2 rounded font-mono max-h-20 overflow-y-auto">
                {user.content}
              </div>
            </div>
          ))}
        </div>

        {/* Resolution Options */}
        <div className="space-y-3">
          <h4 className="font-medium">Resolution Options</h4>
          
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant={selectedResolution === 'accept-mine' ? 'default' : 'outline'}
              className="justify-start h-auto p-3"
              onClick={() => setSelectedResolution('accept-mine')}
            >
              <div className="text-left">
                <div className="font-medium">Keep My Changes</div>
                <div className="text-xs text-muted-foreground">
                  Discard other users' changes and keep your version
                </div>
              </div>
            </Button>
            
            <Button
              variant={selectedResolution === 'accept-theirs' ? 'default' : 'outline'}
              className="justify-start h-auto p-3"
              onClick={() => setSelectedResolution('accept-theirs')}
            >
              <div className="text-left">
                <div className="font-medium">Accept Their Changes</div>
                <div className="text-xs text-muted-foreground">
                  Accept the latest changes from other users
                </div>
              </div>
            </Button>
            
            <Button
              variant={selectedResolution === 'merge' ? 'default' : 'outline'}
              className="justify-start h-auto p-3"
              onClick={() => setSelectedResolution('merge')}
            >
              <div className="text-left">
                <div className="font-medium">Auto-Merge</div>
                <div className="text-xs text-muted-foreground">
                  Automatically combine compatible changes
                </div>
              </div>
            </Button>
            
            <Button
              variant={selectedResolution === 'manual' ? 'default' : 'outline'}
              className="justify-start h-auto p-3"
              onClick={() => {
                setSelectedResolution('manual');
                setShowMergeEditor(true);
                setMergedContent(conflict.originalContent);
              }}
            >
              <div className="text-left">
                <div className="font-medium">Manual Merge</div>
                <div className="text-xs text-muted-foreground">
                  Manually edit and combine changes
                </div>
              </div>
            </Button>
          </div>
        </div>

        {/* Manual Merge Editor */}
        {showMergeEditor && selectedResolution === 'manual' && (
          <div className="space-y-2">
            <h4 className="font-medium">Manual Merge Editor</h4>
            <Textarea
              value={mergedContent}
              onChange={(e) => setMergedContent(e.target.value)}
              placeholder="Edit the content to manually resolve conflicts..."
              className="min-h-[100px] font-mono text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t">
          <Button
            onClick={() => handleResolve(selectedResolution as any)}
            disabled={!selectedResolution || (selectedResolution === 'manual' && !mergedContent.trim())}
            className="flex-1"
          >
            <Check className="w-4 h-4 mr-2" />
            Resolve Conflict
          </Button>
          
          <Button variant="outline" onClick={onDismiss}>
            <X className="w-4 h-4 mr-2" />
            Dismiss
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
