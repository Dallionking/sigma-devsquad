
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Settings, 
  TrendingUp, 
  Filter, 
  Search, 
  BarChart, 
  Lightbulb, 
  Zap,
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AdvancedOption {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  isActive?: boolean;
}

interface AdvancedOptionsMenuProps {
  options: AdvancedOption[];
  onOptionSelect: (optionId: string) => void;
}

export const AdvancedOptionsMenu = ({ options, onOptionSelect }: AdvancedOptionsMenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeOptions, setActiveOptions] = useState<Set<string>>(new Set());

  const handleOptionClick = (option: AdvancedOption) => {
    setActiveOptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(option.id)) {
        newSet.delete(option.id);
      } else {
        newSet.add(option.id);
      }
      return newSet;
    });
    
    option.action();
    onOptionSelect(option.id);
  };

  return (
    <TooltipProvider>
      <Card className="p-4">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Advanced Communication Tools
              </div>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-3 mt-4">
            <div className="text-sm text-muted-foreground mb-3">
              Select advanced tools to enhance your communication analysis:
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {options.map((option) => {
                const IconComponent = option.icon;
                const isActive = activeOptions.has(option.id);
                
                return (
                  <Tooltip key={option.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleOptionClick(option)}
                        className={`flex items-center gap-2 h-auto p-3 ${
                          isActive ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-medium text-sm">{option.label}</div>
                        </div>
                        {isActive && (
                          <Badge variant="secondary" className="ml-auto">
                            Active
                          </Badge>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      <div className="space-y-2">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm">{option.description}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
            
            {activeOptions.size > 0 && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Info className="w-4 h-4" />
                  Active Tools ({activeOptions.size})
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(activeOptions).map(optionId => {
                    const option = options.find(o => o.id === optionId);
                    return option ? (
                      <Badge key={optionId} variant="outline" className="text-xs">
                        {option.label}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </TooltipProvider>
  );
};
