
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { 
  Plus, 
  BarChart3, 
  Paperclip, 
  Brain,
  Keyboard,
  Zap,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResponsiveActionButtonsProps {
  onCreateTask?: () => void;
  onTrackWorkflow?: () => void;
  onToggleCanvas?: () => void;
  onToggleFileAttachment?: () => void;
  attachedFilesCount?: number;
  showFileAttachment?: boolean;
  canvasOpen?: boolean;
  containerWidth?: number;
}

export const ResponsiveActionButtons = ({
  onCreateTask,
  onTrackWorkflow,
  onToggleCanvas,
  onToggleFileAttachment,
  attachedFilesCount = 0,
  showFileAttachment = false,
  canvasOpen = false,
  containerWidth = 0
}: ResponsiveActionButtonsProps) => {
  const { isMobile, isTablet } = useResponsiveBreakpoints();
  
  // Determine button size based on container width
  const getButtonSize = () => {
    if (isMobile || containerWidth < 400) return "sm";
    if (isTablet || containerWidth < 600) return "sm";
    return "default";
  };

  const getButtonVariant = () => {
    return containerWidth < 500 ? "ghost" : "outline";
  };

  const shouldShowText = () => {
    return !isMobile && containerWidth > 500;
  };

  const buttonSize = getButtonSize();
  const buttonVariant = getButtonVariant();
  const showText = shouldShowText();

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {/* Create Task Button */}
      <Button
        variant={buttonVariant}
        size={buttonSize}
        onClick={onCreateTask}
        className={cn(
          "transition-all duration-200 hover:scale-105",
          !showText && "aspect-square"
        )}
        title="Create New Task"
      >
        <Plus className="w-4 h-4" />
        {showText && <span className="ml-2">Create Task</span>}
      </Button>

      {/* Track Workflow Button */}
      <Button
        variant={buttonVariant}
        size={buttonSize}
        onClick={onTrackWorkflow}
        className={cn(
          "transition-all duration-200 hover:scale-105",
          !showText && "aspect-square"
        )}
        title="Track Workflow Progress"
      >
        <BarChart3 className="w-4 h-4" />
        {showText && <span className="ml-2">Track Workflow</span>}
      </Button>

      {/* File Attachment Button */}
      <Button
        variant={showFileAttachment ? "default" : buttonVariant}
        size={buttonSize}
        onClick={onToggleFileAttachment}
        className={cn(
          "relative transition-all duration-200 hover:scale-105",
          !showText && "aspect-square",
          showFileAttachment && "bg-primary/20 text-primary border-primary"
        )}
        title="Attach Files"
      >
        <Paperclip className="w-4 h-4" />
        {showText && <span className="ml-2">Files</span>}
        {attachedFilesCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {attachedFilesCount}
          </Badge>
        )}
      </Button>

      {/* Canvas Toggle Button */}
      <Button
        variant={canvasOpen ? "default" : buttonVariant}
        size={buttonSize}
        onClick={onToggleCanvas}
        className={cn(
          "transition-all duration-200 hover:scale-105",
          !showText && "aspect-square",
          canvasOpen && "bg-primary/20 text-primary border-primary"
        )}
        title="Toggle Planning Canvas"
      >
        <Brain className="w-4 h-4" />
        {showText && <span className="ml-2">Canvas</span>}
      </Button>

      {/* Quick Actions - Only show on larger containers */}
      {containerWidth > 700 && (
        <>
          <div className="w-px h-6 bg-border mx-1" />
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs hover:bg-primary/10"
            title="Quick Actions (Ctrl+K)"
          >
            <Keyboard className="w-3 h-3 mr-1" />
            Quick
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-xs hover:bg-primary/10"
            title="AI Suggestions"
          >
            <Zap className="w-3 h-3 mr-1" />
            AI
          </Button>
        </>
      )}
    </div>
  );
};
