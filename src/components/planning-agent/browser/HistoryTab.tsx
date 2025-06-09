
import { Button } from "@/components/ui/button";
import { History, ExternalLink } from "lucide-react";

interface HistoryTabProps {
  history: string[];
  onHistoryItemClick: (searchTerm: string) => void;
}

export const HistoryTab = ({ history, onHistoryItemClick }: HistoryTabProps) => {
  if (history.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <History className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No search history</p>
          <p className="text-sm text-muted-foreground mt-1">Your previous searches will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground mb-3">
        Recent searches
      </div>
      {history.map((searchTerm, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer"
          onClick={() => onHistoryItemClick(searchTerm)}
        >
          <History className="w-4 h-4 text-muted-foreground" />
          <span className="flex-1">{searchTerm}</span>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      ))}
    </div>
  );
};
