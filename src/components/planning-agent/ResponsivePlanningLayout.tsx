
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChatInterface } from "./ChatInterface";
import { SpaceOptimizedContainer } from "@/components/layout/SpaceOptimizedContainer";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { PlanningLayoutHeader } from "./PlanningLayoutHeader";
import { CanvasPanel } from "./CanvasPanel";
import { AgentChatPanel } from "./AgentChatPanel";
import { CanvasModal } from "./CanvasModal";
import { MobileAgentChatModal } from "./MobileAgentChatModal";
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

  const handleCloseCanvas = () => {
    setCanvasMode("hidden");
    setLayoutMode("single");
  };

  const handleCloseAgentChat = () => {
    setAgentChatOpen(false);
  };

  const handleLayoutModeToggle = () => {
    setLayoutMode(layoutMode === "single" ? "dual" : "single");
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
                <PlanningLayoutHeader
                  layoutMode={layoutMode}
                  agentChatOpen={agentChatOpen}
                  canvasMode={canvasMode}
                  onLayoutModeToggle={handleLayoutModeToggle}
                  onAgentChatToggle={handleToggleAgentChat}
                  onCanvasToggle={handleToggleCanvas}
                />

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
          <CanvasPanel
            selectedProject={selectedProject}
            onMaximize={handleMaximizeCanvas}
            onClose={handleCloseCanvas}
          />
        )}

        {/* Agent Chat Panel - Grid Column */}
        {agentChatOpen && isDesktop && (
          <AgentChatPanel onClose={handleCloseAgentChat} />
        )}
      </div>

      {/* Modal Canvas - Full Screen */}
      {canvasMode === "modal" && (
        <CanvasModal
          selectedProject={selectedProject}
          onMinimize={handleMinimizeCanvas}
          onClose={handleCloseCanvas}
        />
      )}

      {/* Mobile Agent Chat Modal */}
      {agentChatOpen && (isMobile || isTablet) && (
        <MobileAgentChatModal onClose={handleCloseAgentChat} />
      )}
    </div>
  );
};
