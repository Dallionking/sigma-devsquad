
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
      {/* Main Chat Interface - Fixed Width */}
      <div className="w-full lg:w-[600px] xl:w-[700px] h-full flex-shrink-0">
        <Card className="h-full card-enhanced">
          <ChatInterface 
            onCreateTask={onCreateTask}
            onTrackWorkflow={onTrackWorkflow}
            onToggleCanvas={handleToggleCanvas}
          />
        </Card>
      </div>

      {/* Canvas - Expands to the right */}
      {isCanvasOpen && (
        <div className={`
          h-full transition-all duration-300
          absolute lg:relative
          top-0 right-0 lg:top-auto lg:right-auto lg:left-auto
          w-full sm:w-2/3 lg:flex-1 lg:min-w-[400px]
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
