
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, RefreshCw, Globe, Search, MoreVertical } from "lucide-react";

interface BrowserNavigationProps {
  currentUrl: string;
  query: string;
  isLoading: boolean;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
}

export const BrowserNavigation = ({ 
  currentUrl, 
  query, 
  isLoading, 
  onQueryChange, 
  onSearch 
}: BrowserNavigationProps) => {
  return (
    <div className="border-b border-border p-3 space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" disabled>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" disabled>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onSearch}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={currentUrl || query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search research topics or enter URL..."
              className="pl-10"
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
            />
          </div>
          <Button onClick={onSearch} disabled={isLoading}>
            <Search className="w-4 h-4" />
          </Button>
        </div>
        
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
