
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Zap } from "lucide-react";

interface QuickSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export const QuickSearch = ({ onSearch, isSearching }: QuickSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const quickSearchTopics = [
    "AI agent patterns",
    "Workflow automation",
    "Developer tools UX",
    "Planning algorithms",
    "Multi-agent systems",
    "Task decomposition"
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    onSearch(searchQuery);
  };

  const handleQuickSearch = (topic: string) => {
    setSearchQuery(topic);
    onSearch(topic);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Zap className="w-4 h-4" />
          Quick Research
        </CardTitle>
        <CardDescription className="text-sm">
          Start research on common planning agent topics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Research topic or question..."
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="text-sm"
          />
          <Button onClick={handleSearch} disabled={isSearching} size="sm">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        
        {isSearching && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Researching...
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Quick Topics:</p>
          <div className="flex flex-wrap gap-1">
            {quickSearchTopics.map((topic, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-6 px-2"
                onClick={() => handleQuickSearch(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
