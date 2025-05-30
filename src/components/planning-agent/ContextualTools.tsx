
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Search, 
  FileText, 
  ListTodo, 
  Code, 
  Lightbulb,
  Target,
  BarChart3,
  Zap
} from "lucide-react";

interface ContextualTool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  relevanceScore: number;
  category: "analysis" | "generation" | "planning" | "research";
  action: () => void;
}

interface ContextualToolsProps {
  currentMessage?: string;
  conversationContext?: string[];
  onToolSelect: (toolId: string) => void;
}

export const ContextualTools = ({ 
  currentMessage = "", 
  conversationContext = [], 
  onToolSelect 
}: ContextualToolsProps) => {
  const [relevantTools, setRelevantTools] = useState<ContextualTool[]>([]);

  const allTools: ContextualTool[] = [
    {
      id: "feature-breakdown",
      name: "Feature Breakdown",
      description: "Break down features into actionable tasks",
      icon: ListTodo,
      relevanceScore: 0,
      category: "planning",
      action: () => onToolSelect("feature-breakdown")
    },
    {
      id: "prd-generator",
      name: "PRD Generator",
      description: "Generate product requirements document",
      icon: FileText,
      relevanceScore: 0,
      category: "generation",
      action: () => onToolSelect("prd-generator")
    },
    {
      id: "code-analysis",
      name: "Code Analysis",
      description: "Analyze code patterns and architecture",
      icon: Code,
      relevanceScore: 0,
      category: "analysis",
      action: () => onToolSelect("code-analysis")
    },
    {
      id: "research-hub",
      name: "Research Hub",
      description: "Find relevant information and best practices",
      icon: Search,
      relevanceScore: 0,
      category: "research",
      action: () => onToolSelect("research-hub")
    },
    {
      id: "idea-generator",
      name: "Idea Generator",
      description: "Generate creative solutions and alternatives",
      icon: Lightbulb,
      relevanceScore: 0,
      category: "generation",
      action: () => onToolSelect("idea-generator")
    },
    {
      id: "goal-setter",
      name: "Goal Setter",
      description: "Define clear objectives and success metrics",
      icon: Target,
      relevanceScore: 0,
      category: "planning",
      action: () => onToolSelect("goal-setter")
    },
    {
      id: "metrics-analyzer",
      name: "Metrics Analyzer",
      description: "Analyze performance and success metrics",
      icon: BarChart3,
      relevanceScore: 0,
      category: "analysis",
      action: () => onToolSelect("metrics-analyzer")
    },
    {
      id: "workflow-optimizer",
      name: "Workflow Optimizer",
      description: "Optimize processes and workflows",
      icon: Zap,
      relevanceScore: 0,
      category: "planning",
      action: () => onToolSelect("workflow-optimizer")
    }
  ];

  useEffect(() => {
    // Calculate relevance scores based on context
    const contextText = [currentMessage, ...conversationContext].join(" ").toLowerCase();
    
    const keywords = {
      "feature-breakdown": ["feature", "breakdown", "task", "epic", "story", "development"],
      "prd-generator": ["prd", "requirements", "document", "specification", "spec"],
      "code-analysis": ["code", "architecture", "technical", "implementation", "development"],
      "research-hub": ["research", "investigate", "find", "explore", "learn", "study"],
      "idea-generator": ["idea", "brainstorm", "creative", "solution", "alternative", "innovative"],
      "goal-setter": ["goal", "objective", "target", "success", "metric", "kpi"],
      "metrics-analyzer": ["metric", "analytics", "performance", "data", "measurement"],
      "workflow-optimizer": ["workflow", "process", "optimize", "efficiency", "automation"]
    };

    const scoredTools = allTools.map(tool => {
      const toolKeywords = keywords[tool.id as keyof typeof keywords] || [];
      const score = toolKeywords.reduce((sum, keyword) => {
        const occurrences = (contextText.match(new RegExp(keyword, 'g')) || []).length;
        return sum + occurrences;
      }, 0);

      return { ...tool, relevanceScore: score };
    });

    // Sort by relevance and take top tools
    const sortedTools = scoredTools
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 6);

    setRelevantTools(sortedTools);
  }, [currentMessage, conversationContext]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "analysis":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "generation":
        return "bg-green-100 text-green-700 border-green-200";
      case "planning":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "research":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Brain className="w-4 h-4" />
          Contextual Tools
          <Badge variant="secondary" className="text-xs">
            Smart Suggestions
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          {relevantTools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={tool.action}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="p-1.5 rounded-md bg-muted">
                  <tool.icon className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{tool.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {tool.description}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {tool.relevanceScore > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {tool.relevanceScore}
                  </Badge>
                )}
                <Badge variant="outline" className={`text-xs ${getCategoryColor(tool.category)}`}>
                  {tool.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {relevantTools.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No contextual tools available</p>
            <p className="text-xs">Continue the conversation to see suggestions</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
