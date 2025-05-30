
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, BookOpen, TrendingUp, Globe } from "lucide-react";

export const ResearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const researchResults = [
    {
      id: 1,
      title: "Best Practices for AI Agent Architecture",
      source: "AI Development Guide",
      url: "#",
      summary: "Comprehensive overview of designing scalable AI agent systems with proper separation of concerns.",
      relevance: "high",
      date: "2024-05-28"
    },
    {
      id: 2,
      title: "Workflow Automation in Software Development",
      source: "Tech Blog",
      url: "#",
      summary: "Analysis of automation tools and their impact on development team productivity.",
      relevance: "medium",
      date: "2024-05-25"
    },
    {
      id: 3,
      title: "User Interface Design for Developer Tools",
      source: "UX Research",
      url: "#",
      summary: "Study on interface patterns that improve developer experience and tool adoption.",
      relevance: "high",
      date: "2024-05-20"
    }
  ];

  const trendingTopics = [
    "AI-powered development tools",
    "Agent-based software architecture",
    "Developer workflow optimization",
    "Real-time collaboration platforms"
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const getRelevanceBadge = (relevance: string) => {
    const variants = {
      high: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
      medium: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
      low: "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
    };
    
    return (
      <Badge variant="outline" className={variants[relevance as keyof typeof variants]}>
        {relevance} relevance
      </Badge>
    );
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Research & Discovery
          </CardTitle>
          <CardDescription>Search for relevant information and industry insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for technologies, patterns, best practices..."
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
          
          {isSearching && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Searching...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => setSearchQuery(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Research Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Research Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {researchResults.map((result) => (
              <div key={result.id} className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-sm leading-tight">{result.title}</h4>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">{result.summary}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{result.source}</span>
                  </div>
                  {getRelevanceBadge(result.relevance)}
                </div>
                
                <div className="text-xs text-muted-foreground">{result.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Research Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <BookOpen className="w-3 h-3 mr-2" />
              Analyze competitor features
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <TrendingUp className="w-3 h-3 mr-2" />
              Research market trends
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Globe className="w-3 h-3 mr-2" />
              Find technical documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
