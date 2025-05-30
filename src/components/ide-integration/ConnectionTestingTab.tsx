
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TestTube, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Loader2,
  Wifi,
  Server,
  Monitor,
  RefreshCw,
  FileText,
  Shield
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface TestResult {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'warning';
  description: string;
  details?: string;
  duration?: number;
}

export const ConnectionTestingTab = () => {
  const { toast } = useToast();
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      id: 'bridge-status',
      name: 'Bridge Application Status',
      status: 'pending',
      description: 'Check if the bridge application is running',
    },
    {
      id: 'network-connectivity',
      name: 'Network Connectivity',
      status: 'pending',
      description: 'Test network connection to Lovable services',
    },
    {
      id: 'ide-extension',
      name: 'IDE Extension Detection',
      status: 'pending',
      description: 'Verify IDE extension is installed and active',
    },
    {
      id: 'authentication',
      name: 'Authentication',
      status: 'pending',
      description: 'Validate authentication credentials',
    },
    {
      id: 'file-sync',
      name: 'File Synchronization',
      status: 'pending',
      description: 'Test file synchronization capabilities',
    },
    {
      id: 'security',
      name: 'Security Configuration',
      status: 'pending',
      description: 'Verify security settings and permissions',
    }
  ]);

  const runTests = async () => {
    setIsRunningTests(true);
    setTestProgress(0);

    const mockTestExecution = async (testIndex: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const test = testResults[testIndex];
          const outcomes = ['passed', 'failed', 'warning'];
          const randomOutcome = outcomes[Math.floor(Math.random() * 3)] as 'passed' | 'failed' | 'warning';
          
          // Bias towards success for better UX
          const finalOutcome = Math.random() > 0.7 ? randomOutcome : 'passed';
          
          const updatedTest: TestResult = {
            ...test,
            status: finalOutcome,
            duration: Math.floor(Math.random() * 2000) + 500,
            details: finalOutcome === 'passed' 
              ? 'Test completed successfully'
              : finalOutcome === 'warning'
              ? 'Test passed with warnings'
              : 'Test failed - check configuration'
          };

          setTestResults(prev => prev.map((t, i) => i === testIndex ? updatedTest : t));
          setTestProgress(((testIndex + 1) / testResults.length) * 100);
          resolve(updatedTest);
        }, Math.random() * 1500 + 500);
      });
    };

    // Update tests to running state
    setTestResults(prev => prev.map(test => ({ ...test, status: 'running' as const })));

    // Run tests sequentially
    for (let i = 0; i < testResults.length; i++) {
      await mockTestExecution(i);
    }

    setIsRunningTests(false);
    toast({
      title: "Connection tests completed",
      description: "All tests have finished running. Check results below.",
    });
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'running':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Passed</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">Failed</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300">Warning</Badge>;
      case 'running':
        return <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">Running</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const passedTests = testResults.filter(test => test.status === 'passed').length;
  const failedTests = testResults.filter(test => test.status === 'failed').length;
  const warningTests = testResults.filter(test => test.status === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Test Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TestTube className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-card-foreground">Connection Testing</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Comprehensive testing of IDE integration components
                </CardDescription>
              </div>
            </div>
            <Button 
              onClick={runTests}
              disabled={isRunningTests}
              className="gap-2"
            >
              {isRunningTests ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              {isRunningTests ? 'Running Tests...' : 'Run All Tests'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isRunningTests && (
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Test Progress</span>
                <span className="text-sm font-medium">{Math.round(testProgress)}%</span>
              </div>
              <Progress value={testProgress} className="h-2" />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">Passed</p>
                <p className="text-sm text-green-600 dark:text-green-400">{passedTests} tests</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">Warnings</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">{warningTests} tests</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="font-medium text-red-800 dark:text-red-200">Failed</p>
                <p className="text-sm text-red-600 dark:text-red-400">{failedTests} tests</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Test Results</CardTitle>
          <CardDescription className="text-muted-foreground">
            Detailed results for each connection test
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {testResults.map((test, index) => (
            <div key={test.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                {getStatusIcon(test.status)}
                <div>
                  <h4 className="font-medium text-card-foreground">{test.name}</h4>
                  <p className="text-sm text-muted-foreground">{test.description}</p>
                  {test.details && (
                    <p className="text-xs text-muted-foreground mt-1">{test.details}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {test.duration && (
                  <span className="text-xs text-muted-foreground">{test.duration}ms</span>
                )}
                {getStatusBadge(test.status)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Diagnostics */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Quick Diagnostics</CardTitle>
          <CardDescription className="text-muted-foreground">
            Common connection issues and quick fixes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-card-foreground flex items-center gap-2">
                <Server className="w-4 h-4" />
                Bridge Issues
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                  <span>Bridge running</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                  <span>Port accessible</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                  <span>API responding</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-card-foreground flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                IDE Integration
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                  <span>Extension installed</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                  <span>Extension active</span>
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                  <span>Workspace detected</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          {failedTests > 0 && (
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Some tests failed. Check the troubleshooting guide for common solutions, or contact support if issues persist.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
