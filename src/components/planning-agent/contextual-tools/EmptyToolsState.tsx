
import { Brain } from "lucide-react";

export const EmptyToolsState = () => {
  return (
    <div className="text-center py-6 text-muted-foreground">
      <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
      <p className="text-sm">No contextual tools available</p>
      <p className="text-xs">Continue the conversation to see suggestions</p>
    </div>
  );
};
