
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe, TrendingUp } from "lucide-react";

interface Finding {
  id: number;
  title: string;
  source: string;
  type: "academic" | "practical" | "reference";
  relevance: "high" | "medium" | "low";
  summary: string;
}

export const RecentFindings = () => {
  const recentFindings: Finding[] = [
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
  );
};
