
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatHeader } from "./ChatHeader";
import { Plus, Target, Activity, Menu, Paperclip } from "lucide-react";

interface ChatInterfaceHeaderProps {
  onCreateTask?: () => void;
  onTrackWorkflow?: () => void;
  onToggleCanvas?: () => void;
  onToggleFileAttachment: () => void;
  attachedFilesCount: number;
  showFileAttachment: boolean;
}

export const ChatInterfaceHeader = ({
  onCreateTask,
  onTrackWorkflow,
  onToggleCanvas,
  onToggleFileAttachment,
  attachedFilesCount,
  showFileAttachment
}: ChatInterfaceHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <ChatHeader />
        <Badge variant="secondary" className="status-success flex items-center gap-2">
          <Activity className="w-3 h-3" />
          Agent Active
        </Badge>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          onClick={onCreateTask}
          className="btn-primary-enhanced gap-2"
          size="sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create Task</span>
        </Button>
        <Button 
          variant="outline"
          onClick={onTrackWorkflow}
          className="btn-secondary-enhanced gap-2"
          size="sm"
        >
          <Target className="w-4 h-4" />
          <span className="hidden sm:inline">Track Workflow</span>
        </Button>
        <Button
          variant="outline"
          onClick={onToggleFileAttachment}
          className={`gap-2 ${attachedFilesCount > 0 ? 'bg-primary/10' : ''}`}
          size="sm"
        >
          <Paperclip className="w-4 h-4" />
          <span className="hidden sm:inline">Files</span>
          {attachedFilesCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {attachedFilesCount}
            </Badge>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onToggleCanvas}
          className="gap-2"
          size="sm"
        >
          <Menu className="w-4 h-4" />
          <span className="hidden sm:inline">Canvas</span>
        </Button>
      </div>
    </div>
  );
};
