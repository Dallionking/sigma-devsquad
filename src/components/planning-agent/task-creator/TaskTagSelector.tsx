
import { Badge } from "@/components/ui/badge";
import { GitBranch } from "lucide-react";

interface TaskTagSelectorProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export const TaskTagSelector = ({ selectedTags, onTagToggle }: TaskTagSelectorProps) => {
  const suggestedTags = [
    "authentication", "ui", "api", "database", "testing", 
    "documentation", "security", "performance", "mobile", "integration"
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <GitBranch className="w-4 h-4" />
        Tags
      </label>
      <div className="flex flex-wrap gap-2">
        {suggestedTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
