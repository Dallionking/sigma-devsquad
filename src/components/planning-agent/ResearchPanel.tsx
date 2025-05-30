
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, BookOpen, TrendingUp, Globe, Zap } from "lucide-react";

export const ResearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const quickSearchTopics = [
    "AI agent patterns",
    "Workflow automation",
    "Developer tools UX",
    "Planning algorithms",
    "Multi-agent systems",
    "Task decomposition"
  ];

  const recentFindings = [
    {
      id: 1,
      title: "Agent Communication Protocols",
      source: "AI Research Papers",
      type: "academic",
      relevance: "high",
      summary: "Latest research on inter-agent communication patterns and protocols."
    },
    {
      id: 2,
      title: "Workflow Optimization Techniques",
      source: "Industry Blog",
      type: "practical",
      relevance: "medium",
      summary: "Real-world approaches to optimizing development workflows."
    },
    {
      id: 3,
      title: "Planning Agent Architecture",
      source: "Technical Documentation",
      type: "reference",
      relevance: "high",
      summary: "Comprehensive guide to building planning agent systems."
    }
  ];

  const handleQuickSearch = (topic: string) => {
    setSearchQuery(topic);
    // This would trigger the search in the ResearchBrowser
    console.log("Quick search for:", topic);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      console.log("Search completed for:", searchQuery);
    }, 1500);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "academic": return "📚";
      case "practical": return "🛠️";
      case "reference": return "📖";
      default: return "📄";
    }
  };

  const getRelevanceBadge = (relevance: string) => {
    const variants = {
      high: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
      medium: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
      low: "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
    };
    
    return (
      <Badge variant="outline" className={variants[relevance as keyof typeof variants]}>
        {relevance}
      </Badge>
    );
  };

  return (
    <div className="h-full overflow-y-auto space-y-4 p-4">
      {/* Quick Search */}
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

      {/* Recent Findings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-4 h-4" />
            Recent Findings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentFindings.map((finding) => (
              <div key={finding.id} className="border border-border rounded p-3 space-y-2 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{getTypeIcon(finding.type)}</span>
                    <h4 className="font-medium text-sm">{finding.title}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    {getRelevanceBadge(finding.relevance)}
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">{finding.summary}</p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="w-3 h-3" />
                  <span>{finding.source}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Research Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
              <BookOpen className="w-3 h-3 mr-2" />
              Browse documentation
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
              <TrendingUp className="w-3 h-3 mr-2" />
              Analyze trends
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
              <Globe className="w-3 h-3 mr-2" />
              Search web resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
