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
      {/* Desktop Layout - Sidebar approach */}
      <div className="hidden lg:block h-full">
        <div className={`flex h-full transition-all duration-300 ${isCanvasOpen ? 'mr-[50vw]' : ''}`}>
          {/* Chat Interface - Full width when canvas closed, half width when open */}
          <div className="w-full h-full">
            <Card className="h-full card-enhanced">
              <ChatInterface 
                onCreateTask={onCreateTask}
                onTrackWorkflow={onTrackWorkflow}
                onToggleCanvas={handleToggleCanvas}
              />
            </Card>
          </div>
        </div>

        {/* Canvas Sidebar - Slides from right */}
        <div className={`fixed top-0 right-0 h-full w-1/2 z-40 transform transition-transform duration-300 ${
          isCanvasOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <PlanningCanvas 
            selectedProject={selectedProject} 
            isOpen={isCanvasOpen}
            onToggle={handleToggleCanvas}
            className="h-full"
          />
        </div>
      </div>

      {/* Mobile/Tablet Layout (unchanged) */}
      <div className="lg:hidden h-full flex">
        {/* Main Chat Interface - Full Width on Mobile */}
        <div className="w-full h-full">
          <Card className="h-full card-enhanced">
            <ChatInterface 
              onCreateTask={onCreateTask}
              onTrackWorkflow={onTrackWorkflow}
              onToggleCanvas={handleToggleCanvas}
            />
          </Card>
        </div>

        {/* Canvas - Overlay on Mobile */}
        {isCanvasOpen && (
          <div className="absolute top-0 right-0 w-full sm:w-2/3 h-full z-50 transition-transform duration-300">
            <PlanningCanvas 
              selectedProject={selectedProject} 
              isOpen={isCanvasOpen}
              onToggle={handleToggleCanvas}
              className="h-full"
            />
          </div>
        )}

        {/* Overlay for mobile/tablet */}
        {isCanvasOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={handleToggleCanvas}
          />
        )}
      </div>
    </div>
  );
};
