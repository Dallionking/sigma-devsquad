
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, ChevronDown, ChevronRight, Eye, EyeOff } from "lucide-react";

export const FeatureBreakdown = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());

  const featureTree = [
    {
      id: "auth",
      name: "User Authentication",
      complexity: "high",
      children: [
        { id: "auth-login", name: "Login System", complexity: "medium", estimated: "3 days" },
        { id: "auth-register", name: "Registration", complexity: "medium", estimated: "2 days" },
        { id: "auth-forgot", name: "Password Reset", complexity: "low", estimated: "1 day" },
        { id: "auth-oauth", name: "OAuth Integration", complexity: "high", estimated: "4 days" }
      ]
    },
    {
      id: "dashboard",
      name: "Agent Dashboard",
      complexity: "high",
      children: [
        { id: "dash-overview", name: "Overview Panel", complexity: "medium", estimated: "3 days" },
        { id: "dash-real-time", name: "Real-time Updates", complexity: "high", estimated: "5 days" },
        { id: "dash-metrics", name: "Performance Metrics", complexity: "medium", estimated: "2 days" }
      ]
    },
    {
      id: "workflow",
      name: "Workflow Management",
      complexity: "high",
      children: [
        { id: "workflow-visual", name: "Visual Workflow", complexity: "high", estimated: "6 days" },
        { id: "workflow-automation", name: "Task Automation", complexity: "high", estimated: "7 days" },
        { id: "workflow-templates", name: "Workflow Templates", complexity: "medium", estimated: "3 days" }
      ]
    }
  ];

  const toggleFeature = (featureId: string) => {
    const newExpanded = new Set(expandedFeatures);
    if (newExpanded.has(featureId)) {
      newExpanded.delete(featureId);
    } else {
      newExpanded.add(featureId);
    }
    setExpandedFeatures(newExpanded);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "high":
        return "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300";
      case "low":
        return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300";
    }
  };

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="rounded-full shadow-lg"
        size="sm"
      >
        <Eye className="w-4 h-4 mr-2" />
        Feature Breakdown
      </Button>
    );
  }

  return (
    <Card className="w-80 max-h-96 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Layers className="w-4 h-4" />
            Feature Breakdown
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0"
          >
            <EyeOff className="w-3 h-3" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          Interactive feature hierarchy and complexity analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-64 overflow-y-auto">
        <div className="space-y-2">
          {featureTree.map((feature) => (
            <div key={feature.id} className="space-y-1">
              {/* Parent Feature */}
              <div 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => toggleFeature(feature.id)}
              >
                {expandedFeatures.has(feature.id) ? (
                  <ChevronDown className="w-3 h-3 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                )}
                <span className="text-sm font-medium flex-1">{feature.name}</span>
                <Badge variant="outline" className={getComplexityColor(feature.complexity)}>
                  {feature.complexity}
                </Badge>
              </div>

              {/* Child Features */}
              {expandedFeatures.has(feature.id) && feature.children && (
                <div className="ml-5 space-y-1">
                  {feature.children.map((child) => (
                    <div key={child.id} className="flex items-center gap-2 p-1.5 text-xs">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full flex-shrink-0" />
                      <span className="flex-1">{child.name}</span>
                      <span className="text-muted-foreground text-xs">{child.estimated}</span>
                      <Badge variant="outline" className={`${getComplexityColor(child.complexity)} text-xs`}>
                        {child.complexity}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-3 border-t border-border">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <div className="font-medium text-foreground">12</div>
              <div className="text-muted-foreground">Features</div>
            </div>
            <div>
              <div className="font-medium text-foreground">36</div>
              <div className="text-muted-foreground">Est. Days</div>
            </div>
            <div>
              <div className="font-medium text-foreground">3</div>
              <div className="text-muted-foreground">Epics</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
