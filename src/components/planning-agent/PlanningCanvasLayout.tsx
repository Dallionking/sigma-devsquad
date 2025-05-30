
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChatInterface } from "./ChatInterface";
import { PlanningCanvas } from "./PlanningCanvas";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

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
    <div className="relative h-full">
      {/* Desktop Layout with Resizable Panels */}
      <div className="hidden lg:block h-full">
        {isCanvasOpen ? (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={35} minSize={25} maxSize={60}>
              <Card className="h-full card-enhanced">
                <ChatInterface 
                  onCreateTask={onCreateTask}
                  onTrackWorkflow={onTrackWorkflow}
                  onToggleCanvas={handleToggleCanvas}
                />
              </Card>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={65} minSize={40}>
              <PlanningCanvas 
                selectedProject={selectedProject} 
                isOpen={isCanvasOpen}
                onToggle={handleToggleCanvas}
                className="h-full"
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <Card className="h-full card-enhanced">
            <ChatInterface 
              onCreateTask={onCreateTask}
              onTrackWorkflow={onTrackWorkflow}
              onToggleCanvas={handleToggleCanvas}
            />
          </Card>
        )}
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
