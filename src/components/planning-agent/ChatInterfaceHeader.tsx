
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Target, 
  Paperclip, 
  Brain,
  MessageSquare,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInterfaceHeaderProps {
  onCreateTask?: () => void;
  onTrackWorkflow?: () => void;
  onToggleCanvas?: () => void;
  onToggleFileAttachment?: () => void;
  attachedFilesCount?: number;
  showFileAttachment?: boolean;
  canvasOpen?: boolean;
}

export const ChatInterfaceHeader = ({
  onCreateTask,
  onTrackWorkflow,
  onToggleCanvas,
  onToggleFileAttachment,
  attachedFilesCount = 0,
  showFileAttachment = false,
  canvasOpen = false
}: ChatInterfaceHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-3">
      {/* Agent Status */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 bg-green-500/20 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-full border border-green-500/30">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium whitespace-nowrap">Agent Active</span>
        </div>
      </div>

      {/* Action Buttons - Responsive Layout */}
      <div className={cn(
        "flex items-center gap-2 transition-all duration-300",
        canvasOpen ? "flex-wrap justify-end max-w-[60%]" : "flex-nowrap"
      )}>
        <Button
          variant="outline"
          size="sm"
          onClick={onCreateTask}
          className={cn(
            "transition-all duration-200 hover:bg-primary/10",
            canvasOpen ? "h-8 px-2 text-xs" : "h-9 px-3"
          )}
        >
          <Plus className={cn("mr-1", canvasOpen ? "w-3 h-3" : "w-4 h-4")} />
          <span className={canvasOpen ? "hidden sm:inline" : ""}>Create Task</span>
          {canvasOpen && <span className="sm:hidden">Task</span>}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onTrackWorkflow}
          className={cn(
            "transition-all duration-200 hover:bg-primary/10",
            canvasOpen ? "h-8 px-2 text-xs" : "h-9 px-3"
          )}
        >
          <Target className={cn("mr-1", canvasOpen ? "w-3 h-3" : "w-4 h-4")} />
          <span className={canvasOpen ? "hidden sm:inline" : ""}>Track Workflow</span>
          {canvasOpen && <span className="sm:hidden">Track</span>}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onToggleFileAttachment}
          className={cn(
            "relative transition-all duration-200 hover:bg-primary/10",
            showFileAttachment && "bg-primary/20 text-primary",
            canvasOpen ? "h-8 px-2 text-xs" : "h-9 px-3"
          )}
        >
          <Paperclip className={cn(canvasOpen ? "w-3 h-3" : "w-4 h-4")} />
          {!canvasOpen && <span className="ml-1">Files</span>}
          {attachedFilesCount > 0 && (
            <Badge 
              variant="secondary" 
              className={cn(
                "absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center",
                canvasOpen ? "h-3 w-3 text-[10px]" : ""
              )}
            >
              {attachedFilesCount}
            </Badge>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onToggleCanvas}
          className={cn(
            "transition-all duration-200",
            canvasOpen 
              ? "bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-2 text-xs" 
              : "hover:bg-primary/10 h-9 px-3"
          )}
        >
          <Brain className={cn(canvasOpen ? "w-3 h-3" : "w-4 h-4 mr-1")} />
          {!canvasOpen && "Canvas"}
        </Button>
      </div>
    </div>
  );
};
