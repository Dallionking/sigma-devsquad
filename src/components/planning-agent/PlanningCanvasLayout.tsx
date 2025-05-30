
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
    <div className="h-full overflow-hidden relative">
      {/* Main Chat Interface - Always visible, adjusts width when canvas opens */}
      <div className={`transition-all duration-300 ease-in-out ${
        isCanvasOpen ? 'w-1/2 pr-2' : 'w-full'
      }`}>
        <Card className="h-full card-enhanced">
          <ChatInterface 
            onCreateTask={onCreateTask}
            onTrackWorkflow={onTrackWorkflow}
            onToggleCanvas={handleToggleCanvas}
          />
        </Card>
      </div>

      {/* Planning Canvas - Slides in from the right */}
      <div className={`absolute top-0 right-0 h-full transition-all duration-300 ease-in-out ${
        isCanvasOpen 
          ? 'w-1/2 translate-x-0 opacity-100' 
          : 'w-1/2 translate-x-full opacity-0 pointer-events-none'
      }`}>
        <div className="pl-2 h-full">
          <PlanningCanvas 
            selectedProject={selectedProject} 
            isOpen={isCanvasOpen}
            onToggle={handleToggleCanvas}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};
