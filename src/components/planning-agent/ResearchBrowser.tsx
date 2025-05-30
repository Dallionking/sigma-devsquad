
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import { BrowserNavigation } from "./browser/BrowserNavigation";
import { SearchResults } from "./browser/SearchResults";
import { BookmarksTab } from "./browser/BookmarksTab";
import { HistoryTab } from "./browser/HistoryTab";
import { ResearchResult, ResearchBrowserProps } from "./browser/types";
import { mockResults } from "./browser/mockData";

export const ResearchBrowser = ({ onResultSelect, initialQuery = "" }: ResearchBrowserProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ResearchResult[]>([]);
  const [bookmarks, setBookmarks] = useState<ResearchResult[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("results");

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

  const handleHistoryItemClick = (searchTerm: string) => {
    setQuery(searchTerm);
    handleSearch();
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
            <BookmarksTab 
              bookmarks={bookmarks}
              onBookmark={handleBookmark}
            />
          </TabsContent>

          <TabsContent value="history" className="flex-1 overflow-y-auto p-3 mt-0">
            <HistoryTab 
              history={history}
              onHistoryItemClick={handleHistoryItemClick}
            />
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
