
import { Bot } from "lucide-react";

export const DefaultContent = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
      <Bot className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-medium text-card-foreground mb-2">No Selection</h3>
    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
      Select an agent, task, or message from the main area to view detailed information and controls.
    </p>
  </div>
);
