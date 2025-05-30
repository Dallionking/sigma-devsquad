
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
        return "status-error";
      case "medium":
        return "status-warning";
      case "low":
        return "status-success";
      default:
        return "status-info";
    }
  };

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="btn-primary-enhanced rounded-full shadow-lg hover-scale"
        size="sm"
      >
        <Eye className="w-4 h-4 mr-2" />
        Feature Breakdown
      </Button>
    );
  }

  return (
    <Card className="w-80 max-h-96 shadow-xl card-enhanced">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-responsive-base">
            <Layers className="w-5 h-5" />
            Feature Breakdown
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0 hover-scale"
          >
            <EyeOff className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription className="text-muted-enhanced">
          Interactive feature hierarchy and complexity analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-64 overflow-y-auto">
        <div className="space-y-2">
          {featureTree.map((feature) => (
            <div key={feature.id} className="space-y-1">
              {/* Enhanced Parent Feature */}
              <div 
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-200 hover-scale"
                onClick={() => toggleFeature(feature.id)}
              >
                {expandedFeatures.has(feature.id) ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0 text-primary" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                )}
                <span className="text-responsive-sm font-medium flex-1">{feature.name}</span>
                <Badge variant="outline" className={getComplexityColor(feature.complexity)}>
                  {feature.complexity}
                </Badge>
              </div>

              {/* Enhanced Child Features */}
              {expandedFeatures.has(feature.id) && feature.children && (
                <div className="ml-6 space-y-1 fade-in">
                  {feature.children.map((child) => (
                    <div key={child.id} className="flex items-center gap-2 p-2 text-xs rounded-md hover:bg-muted/30 transition-colors duration-200">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full flex-shrink-0" />
                      <span className="flex-1 text-responsive-sm">{child.name}</span>
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

        {/* Enhanced Summary */}
        <div className="mt-4 pt-3 border-t border-border">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-muted/50">
              <div className="font-medium text-foreground text-responsive-base">12</div>
              <div className="text-muted-foreground">Features</div>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <div className="font-medium text-foreground text-responsive-base">36</div>
              <div className="text-muted-foreground">Est. Days</div>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <div className="font-medium text-foreground text-responsive-base">3</div>
              <div className="text-muted-foreground">Epics</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
