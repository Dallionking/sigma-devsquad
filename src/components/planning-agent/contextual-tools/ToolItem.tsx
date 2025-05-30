
import { Badge } from "@/components/ui/badge";
import { ContextualTool } from "./ToolDefinitions";

interface ToolItemProps {
  tool: ContextualTool;
  onToolClick: () => void;
}

export const ToolItem = ({ tool, onToolClick }: ToolItemProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "analysis":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "generation":
        return "bg-green-100 text-green-700 border-green-200";
      case "planning":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "research":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div
      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={onToolClick}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="p-1.5 rounded-md bg-muted">
          <tool.icon className="w-3 h-3" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium">{tool.name}</div>
          <div className="text-xs text-muted-foreground truncate">
            {tool.description}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {tool.relevanceScore > 0 && (
          <Badge variant="outline" className="text-xs">
            {tool.relevanceScore}
          </Badge>
        )}
        <Badge variant="outline" className={`text-xs ${getCategoryColor(tool.category)}`}>
          {tool.category}
        </Badge>
      </div>
    </div>
  );
};
