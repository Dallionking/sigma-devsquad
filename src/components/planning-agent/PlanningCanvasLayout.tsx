
import { Card } from "@/components/ui/card";
import { ChatInterface } from "./ChatInterface";
import { PlanningCanvas } from "./PlanningCanvas";

interface PlanningCanvasLayoutProps {
  selectedProject: string;
}

export const PlanningCanvasLayout = ({ selectedProject }: PlanningCanvasLayoutProps) => {
  return (
    <div className="relative h-full">
      {/* Main Chat Interface - Full Width */}
      <div className="h-full">
        <Card className="h-full card-enhanced">
          <ChatInterface />
        </Card>
      </div>

      {/* Canvas Menu - Slides out from right */}
      <PlanningCanvas selectedProject={selectedProject} />
    </div>
  );
};
