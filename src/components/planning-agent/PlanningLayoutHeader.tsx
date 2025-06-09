
import { Button } from "@/components/ui/button";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { 
  Brain, 
  PanelRightOpen,
  PanelRightClose,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanningLayoutHeaderProps {
  layoutMode: "single" | "dual";
  agentChatOpen: boolean;
  canvasMode: "hidden" | "split" | "modal";
  onLayoutModeToggle: () => void;
  onAgentChatToggle: () => void;
  onCanvasToggle: () => void;
}

export const PlanningLayoutHeader = ({
  layoutMode,
  agentChatOpen,
  canvasMode,
  onLayoutModeToggle,
  onAgentChatToggle,
  onCanvasToggle
}: PlanningLayoutHeaderProps) => {
  const { isMobile, isDesktop } = useResponsiveBreakpoints();

  return (
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
              onClick={onLayoutModeToggle}
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
            onClick={onAgentChatToggle}
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
            onClick={onCanvasToggle}
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
  );
};
