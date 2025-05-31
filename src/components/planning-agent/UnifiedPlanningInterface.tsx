
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { PlanningCanvas } from "./PlanningCanvas";
import { CommunicationPanel } from "./CommunicationPanel";
import { SpaceOptimizedContainer } from "@/components/layout/SpaceOptimizedContainer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Maximize2, Minimize2, MessageSquare, Brain, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnifiedPlanningInterfaceProps {
  selectedProject: string;
  onCreateTask?: () => void;
  onTrackWorkflow?: () => void;
}

export const UnifiedPlanningInterface = ({ 
  selectedProject, 
  onCreateTask, 
  onTrackWorkflow 
}: UnifiedPlanningInterfaceProps) => {
  const [canvasMode, setCanvasMode] = useState<"hidden" | "sidebar" | "modal">("hidden");
  const [isCommunicationOpen, setIsCommunicationOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleToggleCanvas = () => {
    if (canvasMode === "hidden") {
      setCanvasMode(isMobile ? "modal" : "sidebar");
    } else {
      setCanvasMode("hidden");
    }
  };

  const handleMaximizeCanvas = () => {
    setCanvasMode("modal");
  };

  const handleMinimizeCanvas = () => {
    setCanvasMode("sidebar");
  };

  return (
    <div className="relative h-full overflow-hidden">
      {/* Main Chat Interface */}
      <div className={cn(
        "h-full transition-all duration-300",
        canvasMode === "sidebar" && !isMobile ? "lg:mr-[50vw]" : "w-full"
      )}>
        <SpaceOptimizedContainer 
          variant={isMobile ? "compact" : "default"} 
          className="h-full"
        >
          <Card className="h-full bg-card/95 backdrop-blur-sm border shadow-sm">
            <div className="h-full flex flex-col">
              {/* Enhanced Header with Controls */}
              <div className="border-b border-border p-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Planning Agent</h2>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsCommunicationOpen(!isCommunicationOpen)}
                      className={cn(
                        "h-8",
                        isCommunicationOpen && "bg-primary text-primary-foreground"
                      )}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Team Chat
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleToggleCanvas}
                      className={cn(
                        "h-8",
                        canvasMode !== "hidden" && "bg-primary text-primary-foreground"
                      )}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Canvas
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="flex-1 min-h-0">
                <ChatInterface 
                  onCreateTask={onCreateTask}
                  onTrackWorkflow={onTrackWorkflow}
                  onToggleCanvas={handleToggleCanvas}
                />
              </div>
            </div>
          </Card>
        </SpaceOptimizedContainer>
      </div>

      {/* Canvas Sidebar */}
      {canvasMode === "sidebar" && !isMobile && (
        <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-1/2 z-40 border-l border-border">
          <div className="h-full bg-background">
            <div className="h-full flex flex-col">
              <div className="border-b border-border p-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Planning Canvas</h3>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMaximizeCanvas}
                      className="h-7 w-7 p-0"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCanvasMode("hidden")}
                      className="h-7 w-7 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <PlanningCanvas 
                  selectedProject={selectedProject} 
                  isOpen={true}
                  onToggle={() => setCanvasMode("hidden")}
                  className="h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Canvas Modal */}
      {canvasMode === "modal" && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" />
          <div className="fixed top-4 left-4 right-4 bottom-4 z-50 bg-background border border-border rounded-lg shadow-2xl">
            <div className="h-full flex flex-col">
              <div className="border-b border-border p-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Planning Canvas</h3>
                  <div className="flex items-center gap-2">
                    {!isMobile && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleMinimizeCanvas}
                      >
                        <Minimize2 className="w-4 h-4 mr-2" />
                        Sidebar
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCanvasMode("hidden")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <PlanningCanvas 
                  selectedProject={selectedProject} 
                  isOpen={true}
                  onToggle={() => setCanvasMode("hidden")}
                  className="h-full border-0"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Communication Panel */}
      <CommunicationPanel 
        isOpen={isCommunicationOpen}
        onToggle={() => setIsCommunicationOpen(!isCommunicationOpen)}
      />
    </div>
  );
};
