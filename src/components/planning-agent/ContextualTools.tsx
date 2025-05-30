
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import { createAllTools, ContextualTool } from "./contextual-tools/ToolDefinitions";
import { useToolRelevanceCalculator } from "./contextual-tools/ToolRelevanceCalculator";
import { ToolItem } from "./contextual-tools/ToolItem";
import { EmptyToolsState } from "./contextual-tools/EmptyToolsState";

interface ContextualToolsProps {
  currentMessage?: string;
  conversationContext?: string[];
  onToolSelect: (toolId: string) => void;
}

export const ContextualTools = ({ 
  currentMessage = "", 
  conversationContext = [], 
  onToolSelect 
}: ContextualToolsProps) => {
  const [relevantTools, setRelevantTools] = useState<ContextualTool[]>([]);
  const allTools = createAllTools(onToolSelect);
  const { calculateRelevance } = useToolRelevanceCalculator(allTools, currentMessage, conversationContext);

  useEffect(() => {
    const scoredTools = calculateRelevance(allTools);
    const sortedTools = scoredTools
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 6);

    setRelevantTools(sortedTools);
  }, [currentMessage, conversationContext]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Brain className="w-4 h-4" />
          Contextual Tools
          <Badge variant="secondary" className="text-xs">
            Smart Suggestions
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          {relevantTools.map((tool) => (
            <ToolItem
              key={tool.id}
              tool={tool}
              onToolClick={tool.action}
            />
          ))}
        </div>

        {relevantTools.length === 0 && <EmptyToolsState />}
      </CardContent>
    </Card>
  );
};
