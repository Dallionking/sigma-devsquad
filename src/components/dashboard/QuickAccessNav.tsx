
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Layers, 
  Bot, 
  Package, 
  Brain, 
  Monitor, 
  Settings, 
  ArrowRight 
} from "lucide-react";

export const QuickAccessNav = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: "Planning Agent",
      description: "AI-powered project planning",
      icon: Layers,
      path: "/planning-agent",
      color: "text-blue-500"
    },
    {
      title: "Agent Configuration",
      description: "Configure and manage agents",
      icon: Bot,
      path: "/agent-configuration",
      color: "text-green-500"
    },
    {
      title: "MCP Management",
      description: "Model Context Protocol",
      icon: Package,
      path: "/mcp-management",
      color: "text-purple-500"
    },
    {
      title: "LLM Integration",
      description: "Language model settings",
      icon: Brain,
      path: "/llm-integration",
      color: "text-orange-500"
    },
    {
      title: "IDE Integration",
      description: "Development environment",
      icon: Monitor,
      path: "/ide-integration",
      color: "text-cyan-500"
    },
    {
      title: "System Settings",
      description: "Global configuration",
      icon: Settings,
      path: "/settings",
      color: "text-gray-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Access</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Button
                key={link.path}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-accent/50"
                onClick={() => navigate(link.path)}
              >
                <div className="flex items-center justify-between w-full">
                  <Icon className={`w-5 h-5 ${link.color}`} />
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{link.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {link.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
