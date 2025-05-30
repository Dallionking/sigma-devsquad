import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  History, 
  Bookmark,
  Globe,
  ExternalLink,
  Download
} from "lucide-react";
import { BrowserNavigation } from "./browser/BrowserNavigation";
import { SearchResults } from "./browser/SearchResults";

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

interface ResearchBrowserProps {
  onResultSelect?: (result: ResearchResult) => void;
  initialQuery?: string;
}

export const ResearchBrowser = ({ onResultSelect, initialQuery = "" }: ResearchBrowserProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ResearchResult[]>([]);
  const [bookmarks, setBookmarks] = useState<ResearchResult[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("results");

  // Helper function for type icons
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "academic": return "📚";
      case "news": return "📰";
      case "documentation": return "📖";
      default: return "🌐";
    }
  };

  // Mock research results for demonstration
  const mockResults: ResearchResult[] = [
    {
      id: "1",
      title: "AI Agent Architecture Best Practices - Comprehensive Guide",
      url: "https://ai-development.guide/agent-architecture",
      snippet: "Learn the fundamental principles of building scalable AI agent systems with proper separation of concerns, event-driven architecture, and robust error handling.",
      domain: "ai-development.guide",
      timestamp: new Date("2024-05-28"),
      relevanceScore: 95,
      type: "documentation"
    },
    {
      id: "2",
      title: "Research: Multi-Agent Communication Patterns",
      url: "https://arxiv.org/papers/multi-agent-communication",
      snippet: "Academic paper exploring various communication patterns between autonomous agents in distributed systems.",
      domain: "arxiv.org",
      timestamp: new Date("2024-05-27"),
      relevanceScore: 88,
      type: "academic"
    },
    {
      id: "3",
      title: "Planning Agent Implementation in Modern Software",
      url: "https://techblog.example.com/planning-agents",
      snippet: "Industry case study on implementing planning agents for workflow automation and task management in enterprise software.",
      domain: "techblog.example.com",
      timestamp: new Date("2024-05-26"),
      relevanceScore: 82,
      type: "web"
    },
    {
      id: "4",
      title: "Breaking: New Advances in AI Agent Coordination",
      url: "https://technews.com/ai-agent-coordination",
      snippet: "Latest developments in AI agent coordination technologies and their impact on software development workflows.",
      domain: "technews.com",
      timestamp: new Date("2024-05-25"),
      relevanceScore: 76,
      type: "news"
    }
  ];

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  }, [initialQuery]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setCurrentUrl(`search://${query}`);
    
    // Add to history
    setHistory(prev => [query, ...prev.slice(0, 9)]);
    
    // Simulate API call to Browser MCP
    setTimeout(() => {
      const filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.snippet.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filteredResults);
      setIsLoading(false);
      setActiveTab("results");
    }, 1500);
  };

  const handleBookmark = (result: ResearchResult) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === result.id);
      if (exists) {
        return prev.filter(b => b.id !== result.id);
      }
      return [result, ...prev];
    });
  };

  const isBookmarked = (resultId: string) => {
    return bookmarks.some(b => b.id === resultId);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <BrowserNavigation 
        currentUrl={currentUrl}
        query={query}
        isLoading={isLoading}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-3 mt-3">
            <TabsTrigger value="results">Search Results</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="flex-1 overflow-y-auto p-3 mt-0">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-muted-foreground">Searching...</span>
                </div>
              </div>
            ) : query ? (
              <SearchResults 
                results={results}
                query={query}
                isBookmarked={isBookmarked}
                onResultSelect={onResultSelect}
                onBookmark={handleBookmark}
              />
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Start your research</p>
                  <p className="text-sm text-muted-foreground mt-1">Enter a search query to find relevant information</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookmarks" className="flex-1 overflow-y-auto p-3 mt-0">
            {bookmarks.length > 0 ? (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {bookmarks.length} bookmarked results
                </div>
                {bookmarks.map((result) => (
                  <Card key={result.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getTypeIcon(result.type)}</span>
                            <h3 className="font-medium text-primary hover:underline cursor-pointer">
                              {result.title}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{result.snippet}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Globe className="w-3 h-3" />
                            <span>{result.domain}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(result)}
                          className="text-primary"
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No bookmarks yet</p>
                  <p className="text-sm text-muted-foreground mt-1">Bookmark interesting results to save them for later</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="flex-1 overflow-y-auto p-3 mt-0">
            {history.length > 0 ? (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground mb-3">
                  Recent searches
                </div>
                {history.map((searchTerm, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer"
                    onClick={() => {
                      setQuery(searchTerm);
                      handleSearch();
                    }}
                  >
                    <History className="w-4 h-4 text-muted-foreground" />
                    <span className="flex-1">{searchTerm}</span>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <History className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No search history</p>
                  <p className="text-sm text-muted-foreground mt-1">Your previous searches will appear here</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Status Bar */}
      <div className="border-t border-border p-2 text-xs text-muted-foreground flex items-center justify-between">
        <span>Browser MCP Connected</span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-6 text-xs">
            <Download className="w-3 h-3 mr-1" />
            Export Results
          </Button>
        </div>
      </div>
    </div>
  );
};
