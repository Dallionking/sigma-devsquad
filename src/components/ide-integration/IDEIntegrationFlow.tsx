
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Wifi, 
  FolderOpen, 
  Terminal, 
  Code, 
  RefreshCw,
  CheckCircle,
  ArrowRight,
  Play
} from "lucide-react";

interface FlowStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  status: "completed" | "current" | "pending";
  action?: string;
}

export const IDEIntegrationFlow = () => {
  const flowSteps: FlowStep[] = [
    {
      id: 1,
      title: "Configure IDE Connection",
      description: "Set up connection parameters, workspace path, and sync preferences",
      icon: Settings,
      status: "completed",
      action: "Configure"
    },
    {
      id: 2,
      title: "Establish Connection",
      description: "Connect to your IDE and verify the integration is working",
      icon: Wifi,
      status: "current",
      action: "Connect"
    },
    {
      id: 3,
      title: "Browse Project Files",
      description: "Explore your project structure and navigate through files",
      icon: FolderOpen,
      status: "pending",
      action: "Browse"
    },
    {
      id: 4,
      title: "Execute Commands",
      description: "Run development scripts, build commands, and terminal operations",
      icon: Terminal,
      status: "pending",
      action: "Execute"
    },
    {
      id: 5,
      title: "View and Edit Code",
      description: "Review code, make changes, and manage your development workflow",
      icon: Code,
      status: "pending",
      action: "Edit"
    },
    {
      id: 6,
      title: "Synchronize Changes",
      description: "Keep your local and remote environments in sync automatically",
      icon: RefreshCw,
      status: "pending",
      action: "Sync"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300";
      case "current":
        return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300";
      case "pending":
        return "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "current":
        return <Play className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">IDE Integration Flow</CardTitle>
        <p className="text-muted-foreground">
          Follow these steps to set up and use your IDE integration effectively
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {flowSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {index < flowSteps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-border"></div>
              )}
              
              <div className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                {/* Step Icon */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  step.status === "completed" 
                    ? "bg-green-100 dark:bg-green-900" 
                    : step.status === "current"
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-gray-100 dark:bg-gray-900"
                }`}>
                  <step.icon className={`w-6 h-6 ${
                    step.status === "completed" 
                      ? "text-green-600 dark:text-green-400" 
                      : step.status === "current"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`} />
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-card-foreground">{step.title}</h3>
                    <Badge variant="outline" className={getStatusColor(step.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(step.status)}
                        <span className="capitalize">{step.status}</span>
                      </div>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  
                  {step.action && (
                    <Button 
                      size="sm" 
                      variant={step.status === "current" ? "default" : "outline"}
                      disabled={step.status === "pending"}
                      className="w-24"
                    >
                      {step.action}
                    </Button>
                  )}
                </div>

                {/* Arrow for flow indication */}
                {index < flowSteps.length - 1 && (
                  <div className="hidden md:flex items-center">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {flowSteps.filter(step => step.status === "completed").length} of {flowSteps.length} completed
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ 
                width: `${(flowSteps.filter(step => step.status === "completed").length / flowSteps.length) * 100}%` 
              }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
