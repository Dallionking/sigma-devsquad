
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Calendar,
  User,
  MessageSquare,
  Users,
  Hash,
  Filter,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  type: "message" | "user" | "room" | "file";
  content: string;
  author?: {
    name: string;
    avatar?: string;
  };
  source: {
    type: "direct" | "group" | "channel";
    name: string;
  };
  timestamp: Date;
  highlights?: string[];
}

interface CommunicationSearchProps {
  query: string;
  onClose: () => void;
}

export const CommunicationSearch = ({ query, onClose }: CommunicationSearchProps) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: "all",
    author: "",
    source: "all"
  });

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: "1",
      type: "message",
      content: "The new authentication module is ready for testing. Please review the implementation.",
      author: {
        name: "Alice Johnson",
        avatar: "/placeholder.svg"
      },
      source: {
        type: "group",
        name: "Development Team"
      },
      timestamp: new Date(Date.now() - 3600000),
      highlights: ["authentication", "testing"]
    },
    {
      id: "2",
      type: "message", 
      content: "Can someone help me with the API authentication? Getting 401 errors.",
      author: {
        name: "Bob Smith",
        avatar: "/placeholder.svg"
      },
      source: {
        type: "direct",
        name: "Bob Smith"
      },
      timestamp: new Date(Date.now() - 7200000),
      highlights: ["API", "authentication", "401"]
    },
    {
      id: "3",
      type: "user",
      content: "Alice Johnson - Senior Developer",
      source: {
        type: "direct",
        name: "Alice Johnson"
      },
      timestamp: new Date(),
      highlights: ["Alice"]
    },
    {
      id: "4",
      type: "room",
      content: "Development Team - Main development discussions",
      source: {
        type: "group",
        name: "Development Team"
      },
      timestamp: new Date(),
      highlights: ["Development"]
    },
    {
      id: "5",
      type: "file",
      content: "authentication-flow.pdf - Uploaded by Carol Williams",
      author: {
        name: "Carol Williams",
        avatar: "/placeholder.svg"
      },
      source: {
        type: "group",
        name: "Design Review"
      },
      timestamp: new Date(Date.now() - 14400000),
      highlights: ["authentication"]
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate search delay
    const timer = setTimeout(() => {
      const filtered = mockResults.filter(result => 
        result.content.toLowerCase().includes(query.toLowerCase()) ||
        result.highlights?.some(h => h.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const getResultIcon = (type: string) => {
    switch (type) {
      case "message": return <MessageSquare className="w-4 h-4" />;
      case "user": return <User className="w-4 h-4" />;
      case "room": return <Users className="w-4 h-4" />;
      case "file": return <Hash className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "direct": return <MessageSquare className="w-3 h-3" />;
      case "group": return <Users className="w-3 h-3" />;
      case "channel": return <Hash className="w-3 h-3" />;
      default: return <MessageSquare className="w-3 h-3" />;
    }
  };

  const highlightText = (text: string, highlights: string[] = []) => {
    if (!highlights.length) return text;
    
    let highlightedText = text;
    highlights.forEach(highlight => {
      const regex = new RegExp(`(${highlight})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const resultsByType = {
    all: searchResults,
    messages: searchResults.filter(r => r.type === "message"),
    users: searchResults.filter(r => r.type === "user"), 
    rooms: searchResults.filter(r => r.type === "room"),
    files: searchResults.filter(r => r.type === "file")
  };

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Results for "{query}"
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6 pb-0">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All
                <Badge variant="secondary" className="text-xs">
                  {resultsByType.all.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                Messages
                <Badge variant="secondary" className="text-xs">
                  {resultsByType.messages.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                Users
                <Badge variant="secondary" className="text-xs">
                  {resultsByType.users.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="rooms" className="flex items-center gap-2">
                Rooms
                <Badge variant="secondary" className="text-xs">
                  {resultsByType.rooms.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center gap-2">
                Files
                <Badge variant="secondary" className="text-xs">
                  {resultsByType.files.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="max-h-96 overflow-hidden">
            {Object.entries(resultsByType).map(([type, results]) => (
              <TabsContent key={type} value={type} className="mt-0">
                <ScrollArea className="h-96">
                  <div className="p-6 pt-0 space-y-3">
                    {isLoading ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Search className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                        <p>Searching...</p>
                      </div>
                    ) : results.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No {type === "all" ? "results" : type} found for "{query}"</p>
                      </div>
                    ) : (
                      results.map((result) => (
                        <div
                          key={result.id}
                          className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => {
                            console.log("Navigate to result:", result);
                            onClose();
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getResultIcon(result.type)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {result.type}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  {getSourceIcon(result.source.type)}
                                  <span>{result.source.name}</span>
                                </div>
                              </div>
                              
                              <div className="text-sm mb-2">
                                {highlightText(result.content, result.highlights)}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                {result.author && (
                                  <div className="flex items-center gap-2">
                                    <Avatar className="w-4 h-4">
                                      <AvatarImage src={result.author.avatar} />
                                      <AvatarFallback className="text-xs">
                                        {result.author.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">
                                      {result.author.name}
                                    </span>
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3" />
                                  <span>
                                    {result.timestamp.toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
