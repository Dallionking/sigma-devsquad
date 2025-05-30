
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
  const [isCanvasOpen, setIsCanvasOpen] = useState(true);

  const handleToggleCanvas = () => {
    setIsCanvasOpen(!isCanvasOpen);
  };

  return (
    <div className="relative h-full flex">
      {/* Main Chat Interface - Responsive Width */}
      <div className={`h-full transition-all duration-300 ${
        isCanvasOpen 
          ? 'w-full lg:w-3/5 xl:w-2/3' 
          : 'w-full'
      }`}>
        <Card className="h-full card-enhanced">
          <ChatInterface 
            onCreateTask={onCreateTask}
            onTrackWorkflow={onTrackWorkflow}
            onToggleCanvas={handleToggleCanvas}
          />
        </Card>
      </div>

      {/* Canvas - Responsive Positioning */}
      {isCanvasOpen && (
        <div className={`
          h-full transition-all duration-300
          absolute lg:relative
          top-0 right-0 lg:top-auto lg:right-auto
          w-full sm:w-2/3 lg:w-2/5 xl:w-1/3
          z-50 lg:z-auto
          ${isCanvasOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          <PlanningCanvas 
            selectedProject={selectedProject} 
            isOpen={isCanvasOpen}
            onToggle={handleToggleCanvas}
            className="h-full"
          />
        </div>
      )}

      {/* Overlay for mobile/tablet - only show on smaller screens */}
      {isCanvasOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={handleToggleCanvas}
        />
      )}
    </div>
  );
};
