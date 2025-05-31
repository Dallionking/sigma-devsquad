
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChatInterface } from "./ChatInterface";
import { PlanningCanvas } from "./PlanningCanvas";
import { SpaceOptimizedContainer } from "@/components/layout/SpaceOptimizedContainer";
import { useIsMobile } from "@/hooks/use-mobile";

interface PlanningCanvasLayoutProps {
  selectedProject: string;
  onCreateTask?: () => void;
  onTrackWorkflow?: () => void;
}

export const PlanningCanvasLayout = ({ selectedProject, onCreateTask, onTrackWorkflow }: PlanningCanvasLayoutProps) => {
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleToggleCanvas = () => {
    setIsCanvasOpen(!isCanvasOpen);
  };

  return (
    <div className="relative h-full overflow-hidden">
      {/* Main Chat Interface - Optimized spacing */}
      <div className={`h-full transition-all duration-300 ${
        isCanvasOpen ? 'lg:mr-[50vw]' : 'w-full'
      }`}>
        <SpaceOptimizedContainer 
          variant={isMobile ? "compact" : "default"} 
          className="h-full"
        >
          <Card className="h-full bg-card/95 backdrop-blur-sm border shadow-sm">
            <ChatInterface 
              onCreateTask={onCreateTask}
              onTrackWorkflow={onTrackWorkflow}
              onToggleCanvas={handleToggleCanvas}
            />
          </Card>
        </SpaceOptimizedContainer>
      </div>

      {/* Canvas Panel - Space optimized */}
      {isCanvasOpen && (
        <>
          {/* Desktop Canvas */}
          <div className="hidden lg:block fixed top-16 right-0 h-[calc(100vh-4rem)] w-1/2 z-40 transform transition-transform duration-300 translate-x-0">
            <SpaceOptimizedContainer variant="compact" className="h-full">
              <PlanningCanvas 
                selectedProject={selectedProject} 
                isOpen={isCanvasOpen}
                onToggle={handleToggleCanvas}
                className="h-full"
              />
            </SpaceOptimizedContainer>
          </div>

          {/* Mobile Canvas */}
          <div className="lg:hidden fixed top-0 right-0 h-full w-full sm:w-2/3 z-50 transform transition-transform duration-300">
            <SpaceOptimizedContainer variant="minimal" className="h-full">
              <PlanningCanvas 
                selectedProject={selectedProject} 
                isOpen={isCanvasOpen}
                onToggle={handleToggleCanvas}
                className="h-full"
              />
            </SpaceOptimizedContainer>
          </div>

          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={handleToggleCanvas}
          />
        </>
      )}
    </div>
  );
};
