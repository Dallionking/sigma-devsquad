
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { PlanningCanvas } from "./PlanningCanvas";
import { UnifiedCommunicationHub } from "@/components/communication/UnifiedCommunicationHub";
import { SpaceOptimizedContainer } from "@/components/layout/SpaceOptimizedContainer";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { 
  Maximize2, 
  Minimize2, 
  MessageSquare, 
  Brain, 
  X, 
  PanelRightOpen,
  PanelRightClose,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResponsivePlanningLayoutProps {
  selectedProject: string;
  onCreateTask?: () => void;
  onTrackWorkflow?: () => void;
}

export const ResponsivePlanningLayout = ({ 
  selectedProject, 
  onCreateTask, 
  onTrackWorkflow 
}: ResponsivePlanningLayoutProps) => {
  const [canvasMode, setCanvasMode] = useState<"hidden" | "split" | "modal">("hidden");
  const [agentChatOpen, setAgentChatOpen] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"single" | "dual">("single");
  const { isMobile, isTablet, isDesktop } = useResponsiveBreakpoints();

  const handleToggleCanvas = () => {
    if (canvasMode === "hidden") {
      setCanvasMode(isMobile ? "modal" : "split");
      setLayoutMode("dual");
    } else {
      setCanvasMode("hidden");
      setLayoutMode("single");
    }
  };

  const handleToggleAgentChat = () => {
    setAgentChatOpen(!agentChatOpen);
  };

  const handleMaximizeCanvas = () => {
    setCanvasMode("modal");
  };

  const handleMinimizeCanvas = () => {
    if (isMobile) {
      setCanvasMode("hidden");
      setLayoutMode("single");
    } else {
      setCanvasMode("split");
      setLayoutMode("dual");
    }
  };

  const isCanvasOpen = canvasMode !== "hidden";

  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-[#0A0E1A] via-background to-background">
      {/* CSS Grid Layout Container */}
      <div 
        className={cn(
          "h-full grid transition-all duration-300 ease-in-out gap-2 p-2",
          // Grid template columns based on layout mode and agent chat state
          layoutMode === "dual" && !agentChatOpen && isDesktop && "grid-cols-[1fr_1fr]",
          layoutMode === "dual" && agentChatOpen && isDesktop && "grid-cols-[1fr_1fr_300px]",
          layoutMode === "single" && !agentChatOpen && "grid-cols-[1fr]",
          layoutMode === "single" && agentChatOpen && isDesktop && "grid-cols-[1fr_300px]",
          // Mobile and tablet adjustments
          (isMobile || isTablet) && "grid-cols-[1fr]"
        )}
        style={{
          gridTemplateRows: "1fr",
          minHeight: "0"
        }}
      >
        {/* Main Chat Interface */}
        <div className="min-w-0 min-h-0 flex flex-col">
          <SpaceOptimizedContainer 
            variant={isMobile ? "compact" : "default"} 
            className="h-full"
          >
            <Card className="h-full bg-card/95 backdrop-blur-sm border border-border/30 shadow-xl">
              <div className="h-full flex flex-col">
                {/* Enhanced Header with Responsive Controls */}
                <div className="border-b border-border/20 p-3 bg-gradient-to-r from-[#0A0E1A]/80 to-background/80 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6] rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                          Vibe DevSquad
                        </h2>
                        <p className="text-xs text-muted-foreground">AI Collaboration Hub</p>
                      </div>
                    </div>
                    
                    {/* Responsive Action Buttons */}
                    <div className="flex items-center gap-1">
                      {/* Layout Toggle - Desktop Only */}
                      {isDesktop && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setLayoutMode(layoutMode === "single" ? "dual" : "single")}
                          className="h-8 w-8 p-0 hover:bg-[#8B5CF6]/10"
                          title="Toggle Layout Mode"
                        >
                          <Layout className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {/* Agent Chat Toggle with Visual State */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleToggleAgentChat}
                        className={cn(
                          "h-8 px-2 border-[#3B82F6]/30 hover:bg-[#3B82F6]/10 transition-all duration-200",
                          agentChatOpen && "bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6] shadow-sm"
                        )}
                        title={agentChatOpen ? "Close Agent Chat" : "Open Agent Chat"}
                      >
                        {agentChatOpen ? (
                          <PanelRightClose className="w-4 h-4" />
                        ) : (
                          <PanelRightOpen className="w-4 h-4" />
                        )}
                        {!isMobile && (
                          <span className="ml-1 text-xs">Chat</span>
                        )}
                      </Button>
                      
                      {/* Canvas Toggle */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleToggleCanvas}
                        className={cn(
                          "h-8 px-2 border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10 transition-all duration-200",
                          canvasMode !== "hidden" && "bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6] shadow-sm"
                        )}
                        title={canvasMode !== "hidden" ? "Close Canvas" : "Open Canvas"}
                      >
                        <Brain className="w-4 h-4" />
                        {!isMobile && (
                          <span className="ml-1 text-xs">Canvas</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Chat Interface with Responsive Actions */}
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

        {/* Canvas Panel - Split View (Desktop) */}
        {canvasMode === "split" && isDesktop && (
          <div className="min-w-0 min-h-0 flex flex-col">
            <div className="h-full border border-border/30 bg-background/95 backdrop-blur-sm rounded-lg">
              <div className="h-full flex flex-col">
                <div className="border-b border-border/20 p-3 bg-gradient-to-r from-[#0A0E1A]/80 to-background/80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-[#8B5CF6]" />
                      <h3 className="text-sm font-semibold">Planning Canvas</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMaximizeCanvas}
                        className="h-7 w-7 p-0 hover:bg-[#8B5CF6]/10"
                        title="Maximize Canvas"
                      >
                        <Maximize2 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCanvasMode("hidden");
                          setLayoutMode("single");
                        }}
                        className="h-7 w-7 p-0 hover:bg-red-500/10 hover:text-red-500"
                        title="Close Canvas"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-h-0">
                  <PlanningCanvas 
                    selectedProject={selectedProject} 
                    isOpen={true}
                    onToggle={() => {
                      setCanvasMode("hidden");
                      setLayoutMode("single");
                    }}
                    className="h-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agent Chat Panel - Grid Column */}
        {agentChatOpen && isDesktop && (
          <div className="min-w-0 min-h-0 flex flex-col">
            <div className="h-full border border-border/30 bg-background/95 backdrop-blur-sm rounded-lg">
              <div className="h-full flex flex-col">
                <div className="border-b border-border/20 p-3 bg-gradient-to-r from-[#0A0E1A]/80 to-background/80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
                      <h3 className="text-sm font-semibold">Agent Chat</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAgentChatOpen(false)}
                      className="h-7 w-7 p-0 hover:bg-red-500/10 hover:text-red-500"
                      title="Close Agent Chat"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 min-h-0 p-3">
                  <UnifiedCommunicationHub showPresence={true} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Canvas - Full Screen */}
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
                        Split View
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCanvasMode("hidden");
                        setLayoutMode("single");
                      }}
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
                  onToggle={() => {
                    setCanvasMode("hidden");
                    setLayoutMode("single");
                  }}
                  className="h-full border-0"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Agent Chat Modal */}
      {agentChatOpen && (isMobile || isTablet) && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setAgentChatOpen(false)} />
          <div className="fixed inset-x-4 top-16 bottom-4 z-50 bg-background border border-border/30 rounded-lg shadow-xl">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Agent Communication
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setAgentChatOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 min-h-0 p-4">
                <UnifiedCommunicationHub showPresence={true} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
