
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Square, RotateCcw, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export const ExecutionTab = () => {
  const [selectedScript, setSelectedScript] = useState("dev");

  const scripts = [
    { name: "dev", command: "npm run dev", description: "Start development server" },
    { name: "build", command: "npm run build", description: "Build for production" },
    { name: "test", command: "npm test", description: "Run test suite" },
    { name: "lint", command: "npm run lint", description: "Check code quality" },
    { name: "type-check", command: "tsc --noEmit", description: "TypeScript type checking" }
  ];

  const executionHistory = [
    {
      id: 1,
      script: "dev",
      status: "running",
      startTime: "10:30:45",
      duration: "2m 15s",
      output: "Server running on http://localhost:3000"
    },
    {
      id: 2,
      script: "test",
      status: "completed",
      startTime: "10:25:12",
      duration: "45s",
      output: "All tests passed (15/15)"
    },
    {
      id: 3,
      script: "build",
      status: "failed",
      startTime: "10:20:08",
      duration: "1m 23s",
      output: "Error: TypeScript compilation failed"
    },
    {
      id: 4,
      script: "lint",
      status: "completed",
      startTime: "10:15:33",
      duration: "12s",
      output: "No linting errors found"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      running: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
      completed: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
      failed: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Code Execution Panel</CardTitle>
          <CardDescription className="text-muted-foreground">
            Execute scripts and monitor their output
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Script Selection */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Select value={selectedScript} onValueChange={setSelectedScript}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {scripts.map((script) => (
                    <SelectItem key={script.name} value={script.name}>
                      <div className="flex flex-col">
                        <span className="font-medium">{script.command}</span>
                        <span className="text-xs text-muted-foreground">{script.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button>
                <Play className="w-4 h-4 mr-1" />
                Execute
              </Button>
              <Button variant="outline">
                <Square className="w-4 h-4 mr-1" />
                Stop
              </Button>
              <Button variant="outline">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Current Output */}
          <div>
            <h4 className="font-medium text-card-foreground mb-2">Current Output</h4>
            <div className="bg-black text-green-400 p-4 rounded-md h-32 overflow-y-auto font-mono text-sm">
              <div className="text-blue-400">$ npm run dev</div>
              <div className="text-green-400">
                {`> my-app@0.1.0 dev`}<br/>
                {`> vite`}<br/><br/>
                VITE v5.0.0  ready in 524 ms<br/>
                {`➜  Local:   http://localhost:3000/`}<br/>
                {`➜  Network: use --host to expose`}<br/>
                {`➜  press h + enter to show help`}<br/>
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Execution History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Execution History</CardTitle>
          <CardDescription className="text-muted-foreground">
            Recent script executions and their results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {executionHistory.map((execution) => (
              <div 
                key={execution.id}
                className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(execution.status)}
                  <div>
                    <div className="font-medium text-card-foreground">{execution.script}</div>
                    <div className="text-sm text-muted-foreground">{execution.output}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="outline" 
                    className={`mb-1 ${getStatusBadge(execution.status)}`}
                  >
                    {execution.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {execution.startTime} • {execution.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
