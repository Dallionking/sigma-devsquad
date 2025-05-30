
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
    <div className="relative h-full">
      {/* Main Chat Interface - Always full width */}
      <div className="w-full h-full">
        <Card className="h-full card-enhanced">
          <ChatInterface 
            onCreateTask={onCreateTask}
            onTrackWorkflow={onTrackWorkflow}
            onToggleCanvas={handleToggleCanvas}
          />
        </Card>
      </div>

      {/* Canvas Overlay - Desktop and Mobile */}
      {isCanvasOpen && (
        <>
          {/* Canvas Panel */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-2/3 lg:w-1/2 z-50 transform transition-transform duration-300">
            <PlanningCanvas 
              selectedProject={selectedProject} 
              isOpen={isCanvasOpen}
              onToggle={handleToggleCanvas}
              className="h-full"
            />
          </div>

          {/* Backdrop overlay for mobile/tablet */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden"
            onClick={handleToggleCanvas}
          />
        </>
      )}
    </div>
  );
};
