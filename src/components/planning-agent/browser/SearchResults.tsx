
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, ExternalLink, Share, Bookmark } from "lucide-react";

interface ResearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  domain: string;
  timestamp: Date;
  relevanceScore: number;
  type: "web" | "academic" | "news" | "documentation";
}

interface SearchResultsProps {
  results: ResearchResult[];
  query: string;
  isBookmarked: (id: string) => boolean;
  onResultSelect?: (result: ResearchResult) => void;
  onBookmark: (result: ResearchResult) => void;
}

export const SearchResults = ({ 
  results, 
  query, 
  isBookmarked, 
  onResultSelect, 
  onBookmark 
}: SearchResultsProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "academic": return "📚";
      case "news": return "📰";
      case "documentation": return "📖";
      default: return "🌐";
    }
  };

  const getRelevanceBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-100 text-green-800">High Relevance</Badge>;
    if (score >= 70) return <Badge className="bg-yellow-100 text-yellow-800">Medium Relevance</Badge>;
    return <Badge className="bg-gray-100 text-gray-800">Low Relevance</Badge>;
  };

  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No results found for "{query}"</p>
          <p className="text-sm text-muted-foreground mt-1">Try different keywords or check your spelling</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Found {results.length} results for "{query}"
      </div>
      {results.map((result) => (
        <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(result.type)}</span>
                  <h3 
                    className="font-medium text-primary hover:underline"
                    onClick={() => onResultSelect?.(result)}
                  >
                    {result.title}
                  </h3>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.snippet}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Globe className="w-3 h-3" />
                    <span>{result.domain}</span>
                    <span>•</span>
                    <span>{result.timestamp.toLocaleDateString()}</span>
                  </div>
                  {getRelevanceBadge(result.relevanceScore)}
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBookmark(result)}
                  className={isBookmarked(result.id) ? "text-primary" : ""}
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
