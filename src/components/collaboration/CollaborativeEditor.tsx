
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { Users, Lock, Unlock, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollaborativeEditorProps {
  title: string;
  initialContent: string;
  componentId: string;
  onSave?: (content: string) => void;
  className?: string;
}

export const CollaborativeEditor = ({ 
  title, 
  initialContent, 
  componentId, 
  onSave,
  className 
}: CollaborativeEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockHolder, setLockHolder] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { sendUpdate, sendPresence, onUpdate, optimisticUpdate, presenceUsers } = useWebSocket();

  // Listen for updates
  useEffect(() => {
    const unsubscribe = onUpdate((update) => {
      if (update.component === componentId) {
        if (update.type === 'edit_conflict') {
          setIsLocked(true);
          setLockHolder(update.userId);
        } else if (update.data.action === 'unlock') {
          setIsLocked(false);
          setLockHolder(null);
        } else if (update.data.action === 'content_update' && !isEditing) {
          setContent(update.data.content);
        }
      }
    });

    return unsubscribe;
  }, [onUpdate, componentId, isEditing]);

  // Send presence updates
  useEffect(() => {
    if (isEditing) {
      sendPresence({ 
        activeComponent: componentId,
        cursor: textareaRef.current ? {
          x: textareaRef.current.selectionStart,
          y: textareaRef.current.selectionEnd
        } : undefined
      });
    }
  }, [isEditing, componentId, sendPresence]);

  const handleStartEdit = () => {
    if (isLocked && lockHolder) return;
    
    setIsEditing(true);
    sendUpdate({
      type: 'edit_conflict',
      data: { action: 'lock' },
      userId: 'current-user',
      component: componentId
    });
  };

  const handleStopEdit = () => {
    setIsEditing(false);
    sendUpdate({
      type: 'edit_conflict',
      data: { action: 'unlock' },
      userId: 'current-user',
      component: componentId
    });
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    setHasUnsavedChanges(value !== initialContent);
    
    // Send real-time updates
    sendUpdate({
      type: 'agent_update',
      data: { 
        action: 'content_update',
        content: value,
        partial: true
      },
      userId: 'current-user',
      component: componentId
    });
  };

  const handleSave = () => {
    optimisticUpdate(
      () => {
        setHasUnsavedChanges(false);
        onSave?.(content);
      },
      () => {
        setHasUnsavedChanges(true);
      }
    );

    sendUpdate({
      type: 'agent_update',
      data: { 
        action: 'save',
        content: content
      },
      userId: 'current-user',
      component: componentId
    });
  };

  const activeUsers = presenceUsers.filter(user => user.activeComponent === componentId);

  return (
    <Card className={cn("relative", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          
          <div className="flex items-center gap-2">
            {activeUsers.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                {activeUsers.length} editing
              </Badge>
            )}
            
            {isLocked && lockHolder && (
              <Badge variant="destructive" className="text-xs">
                <Lock className="w-3 h-3 mr-1" />
                Locked by {lockHolder}
              </Badge>
            )}
            
            {hasUnsavedChanges && (
              <Button
                size="sm"
                onClick={handleSave}
                className="h-7"
              >
                <Save className="w-3 h-3 mr-1" />
                Save
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          onFocus={handleStartEdit}
          onBlur={handleStopEdit}
          disabled={isLocked && lockHolder !== 'current-user'}
          placeholder="Start typing to collaborate..."
          className="min-h-[200px] resize-none"
        />
        
        {isLocked && lockHolder && lockHolder !== 'current-user' && (
          <div className="bg-destructive/10 border border-destructive/20 rounded p-3 text-sm">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-destructive" />
              <span>This section is being edited by {lockHolder}</span>
            </div>
            <p className="text-muted-foreground mt-1">
              Please wait for them to finish or try again later.
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{content.length} characters</span>
          {isEditing && (
            <div className="flex items-center gap-1">
              <Unlock className="w-3 h-3" />
              <span>You are editing</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
