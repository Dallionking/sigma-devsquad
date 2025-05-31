
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info, HelpCircle } from "lucide-react";

interface VisualizationTool {
  name: string;
  description: string;
  useCase: string;
  features: string[];
}

interface VisualizationToolsTooltipProps {
  tools: VisualizationTool[];
  trigger?: React.ReactNode;
}

export const VisualizationToolsTooltip = ({ 
  tools, 
  trigger = <Button variant="ghost" size="sm"><HelpCircle className="w-4 h-4" /></Button>
}: VisualizationToolsTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {trigger}
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center" className="max-w-md">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium">
              <Info className="w-4 h-4" />
              Visualization Tools Guide
            </div>
            
            <div className="space-y-3">
              {tools.map((tool, index) => (
                <div key={index} className="space-y-1">
                  <div className="font-medium text-sm">{tool.name}</div>
                  <div className="text-xs text-muted-foreground">{tool.description}</div>
                  <div className="text-xs">
                    <span className="font-medium">Best for:</span> {tool.useCase}
                  </div>
                  {tool.features.length > 0 && (
                    <div className="text-xs">
                      <span className="font-medium">Features:</span>
                      <ul className="list-disc list-inside ml-2 mt-1">
                        {tool.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
