
import { useState, useEffect, useRef } from "react";
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveActionButtons } from "./ResponsiveActionButtons";

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
      <div className="flex items-center gap-3 min-w-0">
        <CardTitle className="text-lg font-semibold truncate">
          Planning Assistant
        </CardTitle>
        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
          Online
        </Badge>
      </div>
      
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
    </div>
  );
};
