
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Play, CheckCircle, XCircle, AlertTriangle, Code } from "lucide-react";

interface RuleTesterProps {
  ruleName: string;
  condition: string;
  action: string;
  onClose: () => void;
}

interface TestResult {
  success: boolean;
  message: string;
  executionTime: number;
  output?: string;
}

export const RuleTester = ({ ruleName, condition, action, onClose }: RuleTesterProps) => {
  const [testInput, setTestInput] = useState('{\n  "task": {\n    "priority": "high",\n    "deadline": "2024-05-31"\n  },\n  "error_rate": 2.5\n}');
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runTest = async () => {
    setIsRunning(true);
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      JSON.parse(testInput);
      const mockResult: TestResult = {
        success: Math.random() > 0.3,
        message: Math.random() > 0.3 ? "Rule executed successfully" : "Condition not met",
        executionTime: Math.floor(Math.random() * 200) + 50,
        output: Math.random() > 0.3 ? "notify_team AND escalate_to_manager executed" : "No action taken"
      };
      setTestResult(mockResult);
    } catch (error) {
      setTestResult({
        success: false,
        message: "Invalid JSON input",
        executionTime: 0
      });
    }
    
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Test Rule: {ruleName}</h3>
          <p className="text-sm text-muted-foreground">Test your rule with sample data</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>Rule Definition</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium">Condition:</label>
                <div className="mt-1 p-2 bg-muted rounded text-sm font-mono">
                  {condition}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Action:</label>
                <div className="mt-1 p-2 bg-muted rounded text-sm font-mono">
                  {action}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Test Input</CardTitle>
              <CardDescription>
                Provide sample data to test your rule against
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                rows={8}
                className="font-mono text-sm"
                placeholder="Enter test data in JSON format"
              />
              <div className="mt-3">
                <Button 
                  onClick={runTest} 
                  disabled={isRunning}
                  className="flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>{isRunning ? "Running..." : "Run Test"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              {!testResult ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Click "Run Test" to see results</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert className={testResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    <div className="flex items-center space-x-2">
                      {testResult.success ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <AlertDescription className={testResult.success ? "text-green-800" : "text-red-800"}>
                        {testResult.message}
                      </AlertDescription>
                    </div>
                  </Alert>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium">Status:</label>
                      <Badge 
                        variant={testResult.success ? "default" : "destructive"}
                        className="ml-2"
                      >
                        {testResult.success ? "Success" : "Failed"}
                      </Badge>
                    </div>
                    <div>
                      <label className="font-medium">Execution Time:</label>
                      <span className="ml-2">{testResult.executionTime}ms</span>
                    </div>
                  </div>

                  {testResult.output && (
                    <div>
                      <label className="text-sm font-medium">Output:</label>
                      <div className="mt-1 p-2 bg-muted rounded text-sm font-mono">
                        {testResult.output}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-muted rounded">
                  <div className="font-semibold">95%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center p-3 bg-muted rounded">
                  <div className="font-semibold">125ms</div>
                  <div className="text-muted-foreground">Avg Runtime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
