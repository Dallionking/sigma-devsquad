
import { Button } from "@/components/ui/button";
import { PlanningCanvas } from "./PlanningCanvas";
import { Brain, Maximize2, X } from "lucide-react";

interface CanvasPanelProps {
  selectedProject: string;
  onMaximize: () => void;
  onClose: () => void;
}

export const CanvasPanel = ({
  selectedProject,
  onMaximize,
  onClose
}: CanvasPanelProps) => {
  return (
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
                  onClick={onMaximize}
                  className="h-7 w-7 p-0 hover:bg-[#8B5CF6]/10"
                  title="Maximize Canvas"
                >
                  <Maximize2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
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
              onToggle={onClose}
              className="h-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
