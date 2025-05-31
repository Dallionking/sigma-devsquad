
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { PlanningCanvas } from "./PlanningCanvas";
import { UnifiedCommunicationHub } from "@/components/communication/UnifiedCommunicationHub";
import { SpaceOptimizedContainer } from "@/components/layout/SpaceOptimizedContainer";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
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
  const { isMobile, isTablet, isDesktop } = useResponsiveBreakpoints();

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
    if (isMobile) {
      setCanvasMode("hidden");
    } else {
      setCanvasMode("sidebar");
    }
  };

  const isCanvasOpen = canvasMode !== "hidden";

  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-[#0A0E1A] via-background to-background">
      {/* Main Chat Interface - Properly responsive */}
      <div className={cn(
        "h-full transition-all duration-300 ease-in-out",
        canvasMode === "sidebar" && isDesktop ? "mr-[40vw]" : "w-full"
      )}>
        <SpaceOptimizedContainer 
          variant={isMobile ? "compact" : "default"} 
          className="h-full"
        >
          <Card className="h-full bg-card/95 backdrop-blur-sm border border-border/30 shadow-xl">
            <div className="h-full flex flex-col">
              {/* Enhanced Header with Vibe DevSquad Branding */}
              <div className="border-b border-border/20 p-4 bg-gradient-to-r from-[#0A0E1A]/80 to-background/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6] rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                        Vibe DevSquad
                      </h2>
                      <p className="text-xs text-muted-foreground">AI Collaboration Hub</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!isMobile && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsCommunicationOpen(!isCommunicationOpen)}
                        className={cn(
                          "h-8 border-[#3B82F6]/30 hover:bg-[#3B82F6]/10",
                          isCommunicationOpen && "bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]"
                        )}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Team Chat
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleToggleCanvas}
                      className={cn(
                        "h-8 border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10",
                        canvasMode !== "hidden" && "bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]"
                      )}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Canvas
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chat Interface - Responsive layout */}
              <div className="flex-1 min-h-0">
                <ChatInterface 
                  onCreateTask={onCreateTask}
                  onTrackWorkflow={onTrackWorkflow}
                  onToggleCanvas={handleToggleCanvas}
                  canvasOpen={isCanvasOpen}
                />
              </div>
            </div>
          </Card>
        </SpaceOptimizedContainer>
      </div>

      {/* Canvas Sidebar - Desktop Only */}
      {canvasMode === "sidebar" && isDesktop && (
        <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-[40vw] z-40 border-l border-border/30 bg-background/95 backdrop-blur-sm">
          <div className="h-full flex flex-col">
            <div className="border-b border-border/20 p-3 bg-gradient-to-r from-[#0A0E1A]/80 to-background/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#8B5CF6]" />
                  <h3 className="font-semibold">Planning Canvas</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMaximizeCanvas}
                    className="h-7 w-7 p-0 hover:bg-[#8B5CF6]/10"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCanvasMode("hidden")}
                    className="h-7 w-7 p-0 hover:bg-red-500/10 hover:text-red-500"
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
      )}

      {/* Canvas Modal - Mobile/Tablet and Maximized */}
      {canvasMode === "modal" && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
          <div className="fixed top-4 left-4 right-4 bottom-4 z-50 bg-background/95 backdrop-blur-sm border border-border/30 rounded-2xl shadow-2xl">
            <div className="h-full flex flex-col">
              <div className="border-b border-border/20 p-4 bg-gradient-to-r from-[#0A0E1A]/80 to-background/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-[#8B5CF6]" />
                    <h3 className="text-lg font-semibold">Planning Canvas</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {isDesktop && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleMinimizeCanvas}
                        className="border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10"
                      >
                        <Minimize2 className="w-4 h-4 mr-2" />
                        Sidebar
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCanvasMode("hidden")}
                      className="border-red-500/30 hover:bg-red-500/10 hover:text-red-500"
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

      {/* Enhanced Communication Panel - Uses new unified hub */}
      {isCommunicationOpen && (
        <>
          {/* Desktop Panel */}
          <div className="hidden lg:block fixed top-16 right-0 h-[calc(100vh-4rem)] w-1/2 z-20 bg-background/95 backdrop-blur-sm border-l border-border/30 shadow-lg">
            <div className="h-full flex flex-col">
              {/* Header with close button */}
              <div className="border-b border-border/20 p-4 bg-gradient-to-r from-[#0A0E1A]/80 to-background/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#3B82F6]" />
                    <h3 className="text-lg font-semibold">Team Communication</h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCommunicationOpen(false)}
                    className="border-red-500/30 hover:bg-red-500/10 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {/* Communication Hub */}
              <div className="flex-1 min-h-0 p-4">
                <UnifiedCommunicationHub showPresence={true} />
              </div>
            </div>
          </div>

          {/* Mobile Panel */}
          <div className="lg:hidden fixed inset-0 z-50 bg-background p-4">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Agent Communication
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsCommunicationOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 min-h-0">
                <UnifiedCommunicationHub showPresence={true} />
              </div>
            </div>
          </div>

          {/* Mobile Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsCommunicationOpen(false)}
          />
        </>
      )}
    </div>
  );
};
