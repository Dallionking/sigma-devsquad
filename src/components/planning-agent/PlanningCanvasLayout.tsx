
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChatInterface } from "./ChatInterface";
import { PlanningCanvas } from "./PlanningCanvas";

interface PlanningCanvasLayoutProps {
  selectedProject: string;
  onCreateTask?: () => void;
  onTrackWorkflow?: () => void;
}

export const PlanningCanvasLayout = ({ selectedProject, onCreateTask, onTrackWorkflow }: PlanningCanvasLayoutProps) => {
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  const handleToggleCanvas = () => {
    setIsCanvasOpen(!isCanvasOpen);
  };

  return (
    <div className="h-full overflow-hidden">
      {/* When canvas is closed - Chat takes full width */}
      {!isCanvasOpen && (
        <Card className="h-full card-enhanced">
          <ChatInterface 
            onCreateTask={onCreateTask}
            onTrackWorkflow={onTrackWorkflow}
            onToggleCanvas={handleToggleCanvas}
          />
        </Card>
      )}

      {/* When canvas is open - Split screen layout */}
      {isCanvasOpen && (
        <div className="flex h-full gap-4">
          {/* Chat Interface - Takes 50% */}
          <div className="w-1/2">
            <Card className="h-full card-enhanced">
              <ChatInterface 
                onCreateTask={onCreateTask}
                onTrackWorkflow={onTrackWorkflow}
                onToggleCanvas={handleToggleCanvas}
              />
            </Card>
          </div>

          {/* Planning Canvas - Takes 50% */}
          <div className="w-1/2">
            <PlanningCanvas 
              selectedProject={selectedProject} 
              isOpen={isCanvasOpen}
              onToggle={handleToggleCanvas}
              className="h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};
