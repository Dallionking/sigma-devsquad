
import { useState, useEffect, useRef } from "react";
import { ChatInterfaceTitle } from "./ChatInterfaceTitle";
import { ChatInterfaceActions } from "./ChatInterfaceActions";

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
  const [containerWidth, setContainerWidth] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  // Measure container width for responsive behavior
  useEffect(() => {
    const updateWidth = () => {
      if (headerRef.current) {
        setContainerWidth(headerRef.current.offsetWidth);
      }
    };

    updateWidth();
    
    const resizeObserver = new ResizeObserver(updateWidth);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={headerRef} className="flex items-center justify-between gap-4">
      <ChatInterfaceTitle />
      
      <ChatInterfaceActions
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
