
import { ResponsiveActionButtons } from "./ResponsiveActionButtons";

interface ChatInterfaceActionsProps {
  onCreateTask?: () => void;
  onTrackWorkflow?: () => void;
  onToggleCanvas?: () => void;
  onToggleFileAttachment?: () => void;
  attachedFilesCount?: number;
  showFileAttachment?: boolean;
  canvasOpen?: boolean;
  containerWidth: number;
}

export const ChatInterfaceActions = ({
  onCreateTask,
  onTrackWorkflow,
  onToggleCanvas,
  onToggleFileAttachment,
  attachedFilesCount = 0,
  showFileAttachment = false,
  canvasOpen = false,
  containerWidth
}: ChatInterfaceActionsProps) => {
  return (
    <div className="flex-shrink-0">
      <ResponsiveActionButtons
        onCreateTask={onCreateTask}
        onTrackWorkflow={onTrackWorkflow}
        onToggleCanvas={onToggleCanvas}
        onToggleFileAttachment={onToggleFileAttachment}
        attachedFilesCount={attachedFilesCount}
        showFileAttachment={showFileAttachment}
        canvasOpen={canvasOpen}
        containerWidth={containerWidth}
      />
    </div>
  );
};
