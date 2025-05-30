
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

export interface ContextualTool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  relevanceScore: number;
  category: "analysis" | "generation" | "planning" | "research";
  action: () => void;
}

export const createAllTools = (onToolSelect: (toolId: string) => void): ContextualTool[] => [
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

export const getToolKeywords = () => ({
  "feature-breakdown": ["feature", "breakdown", "task", "epic", "story", "development"],
  "prd-generator": ["prd", "requirements", "document", "specification", "spec"],
  "code-analysis": ["code", "architecture", "technical", "implementation", "development"],
  "research-hub": ["research", "investigate", "find", "explore", "learn", "study"],
  "idea-generator": ["idea", "brainstorm", "creative", "solution", "alternative", "innovative"],
  "goal-setter": ["goal", "objective", "target", "success", "metric", "kpi"],
  "metrics-analyzer": ["metric", "analytics", "performance", "data", "measurement"],
  "workflow-optimizer": ["workflow", "process", "optimize", "efficiency", "automation"]
});
