
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, GitBranch, AlertTriangle, CheckCircle } from "lucide-react";

interface TaskDependency {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  dependsOn: string[];
  blockedTasks?: string[];
}

export const TaskDependencyVisualizer = () => {
  const dependencies: TaskDependency[] = [
    {
      id: "auth-login",
      title: "Login Implementation",
      status: "completed",
      dependsOn: [],
      blockedTasks: ["auth-oauth", "user-profile"]
    },
    {
      id: "auth-register", 
      title: "User Registration",
      status: "in-progress",
      dependsOn: [],
      blockedTasks: ["auth-password-reset", "auth-oauth"]
    },
    {
      id: "auth-password-reset",
      title: "Password Reset Flow",
      status: "pending",
      dependsOn: ["auth-register"]
    },
    {
      id: "auth-oauth",
      title: "OAuth Integration", 
      status: "pending",
      dependsOn: ["auth-login", "auth-register"]
    },
    {
      id: "user-profile",
      title: "User Profile Management",
      status: "blocked",
      dependsOn: ["auth-login", "database-setup"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "blocked":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "blocked":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <GitBranch className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="card-enhanced">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="w-5 h-5" />
          Task Dependencies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {dependencies.map((task) => (
          <div key={task.id} className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              {getStatusIcon(task.status)}
              <div className="flex-1">
                <h4 className="font-medium text-sm">{task.title}</h4>
                <Badge variant="outline" className={getStatusColor(task.status)}>
                  {task.status.replace("-", " ")}
                </Badge>
              </div>
            </div>

            {task.dependsOn.length > 0 && (
              <div className="ml-6 space-y-2">
                <div className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  Depends on:
                </div>
                <div className="space-y-1">
                  {task.dependsOn.map((depId) => {
                    const dependency = dependencies.find(d => d.id === depId);
                    return (
                      <div key={depId} className="flex items-center gap-2 text-xs p-2 bg-muted/50 rounded">
                        {dependency ? (
                          <>
                            {getStatusIcon(dependency.status)}
                            <span>{dependency.title}</span>
                            <Badge variant="outline" className={`${getStatusColor(dependency.status)} text-xs ml-auto`}>
                              {dependency.status}
                            </Badge>
                          </>
                        ) : (
                          <span className="text-muted-foreground">{depId}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {task.blockedTasks && task.blockedTasks.length > 0 && (
              <div className="ml-6 space-y-2">
                <div className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                  Blocking:
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {task.blockedTasks.map((blockedId) => (
                    <div key={blockedId} className="text-xs p-2 bg-amber-50 border border-amber-200 rounded text-amber-700">
                      {blockedId.replace("-", " ")}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="mt-4 pt-3 border-t">
          <Button variant="outline" size="sm" className="w-full">
            View Dependency Graph
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
