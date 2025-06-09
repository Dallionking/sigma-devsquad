
import { Button } from "@/components/ui/button";
import { PlanningCanvas } from "./PlanningCanvas";
import { Brain, Minimize2, X } from "lucide-react";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";

interface CanvasModalProps {
  selectedProject: string;
  onMinimize: () => void;
  onClose: () => void;
}

export const CanvasModal = ({
  selectedProject,
  onMinimize,
  onClose
}: CanvasModalProps) => {
  const { isDesktop } = useResponsiveBreakpoints();

  return (
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
                    onClick={onMinimize}
                    className="border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10"
                  >
                    <Minimize2 className="w-4 h-4 mr-2" />
                    Split View
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
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
              onToggle={onClose}
              className="h-full border-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};
