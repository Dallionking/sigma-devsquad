
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
    <div className="flex h-full overflow-hidden">
      {/* Main Chat Interface - Takes remaining space */}
      <div className={`transition-all duration-300 ${
        isCanvasOpen ? 'w-1/2' : 'w-full'
      }`}>
        <Card className="h-full card-enhanced">
          <ChatInterface 
            onCreateTask={onCreateTask}
            onTrackWorkflow={onTrackWorkflow}
            onToggleCanvas={handleToggleCanvas}
          />
        </Card>
      </div>

      {/* Canvas Panel - Slides in from right and takes 50% */}
      {isCanvasOpen && (
        <>
          {/* Desktop Canvas - Side by side */}
          <div className="hidden lg:block w-1/2 h-full transition-all duration-300">
            <PlanningCanvas 
              selectedProject={selectedProject} 
              isOpen={isCanvasOpen}
              onToggle={handleToggleCanvas}
              className="h-full"
            />
          </div>

          {/* Mobile/Tablet Canvas - Full overlay */}
          <div className="lg:hidden fixed top-0 right-0 h-full w-full sm:w-2/3 z-50 transform transition-transform duration-300">
            <PlanningCanvas 
              selectedProject={selectedProject} 
              isOpen={isCanvasOpen}
              onToggle={handleToggleCanvas}
              className="h-full"
            />
          </div>

          {/* Backdrop overlay for mobile/tablet only */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={handleToggleCanvas}
          />
        </>
      )}
    </div>
  );
};
