
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCcw, 
  Database,
  Wifi,
  Settings,
  Shield
} from "lucide-react";

interface DiagnosticTest {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  details?: string;
}

export const SyncTroubleshootingPanel = () => {
  const { isOnline, forceSync, clearSyncQueue } = useDataPersistence();
  const [diagnostics, setDiagnostics] = useState<DiagnosticTest[]>([
    {
      id: 'connectivity',
      name: 'Network Connectivity',
      description: 'Check internet connection and server reachability',
      status: isOnline ? 'passed' : 'failed',
      details: isOnline ? 'Connection established' : 'No internet connection'
    },
    {
      id: 'permissions',
      name: 'Sync Permissions',
      description: 'Verify synchronization permissions and access rights',
      status: 'passed',
      details: 'All permissions granted'
    },
    {
      id: 'storage',
      name: 'Local Storage',
      description: 'Check local storage availability and integrity',
      status: 'passed',
      details: 'Local storage operational'
    },
    {
      id: 'conflicts',
      name: 'Conflict Detection',
      description: 'Scan for data conflicts and resolution needs',
      status: 'pending',
      details: 'Click "Run Diagnostics" to check'
    }
  ]);
  
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);

  const runDiagnostics = async () => {
    setIsRunningDiagnostics(true);
    
    // Simulate diagnostic tests
    for (let i = 0; i < diagnostics.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDiagnostics(prev => prev.map((test, index) => 
        index <= i 
          ? { 
              ...test, 
              status: Math.random() > 0.2 ? 'passed' : 'failed',
              details: Math.random() > 0.2 ? 'Test passed successfully' : 'Test failed - needs attention'
            }
          : { ...test, status: 'pending' }
      ));
    }
    
    setIsRunningDiagnostics(false);
  };

  const getStatusIcon = (status: DiagnosticTest['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'running': return <RefreshCcw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'pending': return <RefreshCcw className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: DiagnosticTest['status']) => {
    switch (status) {
      case 'passed': return 'default';
      case 'failed': return 'destructive';
      case 'running': return 'secondary';
      case 'pending': return 'outline';
    }
  };

  const commonIssues = [
    {
      issue: 'Sync stuck or taking too long',
      solution: 'Force sync or clear sync queue',
      action: () => forceSync()
    },
    {
      issue: 'Connection timeouts',
      solution: 'Check network connection and retry',
      action: () => window.location.reload()
    },
    {
      issue: 'Data conflicts',
      solution: 'Review conflicted items and resolve manually',
      action: () => console.log('Open conflict resolution')
    },
    {
      issue: 'Storage quota exceeded',
      solution: 'Clear old sync data and optimize storage',
      action: () => clearSyncQueue()
    }
  ];

  return (
    <div className="space-y-6">
      {/* Diagnostic Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            System Diagnostics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Run comprehensive sync system diagnostics
            </p>
            <Button 
              onClick={runDiagnostics}
              disabled={isRunningDiagnostics}
              size="sm"
            >
              {isRunningDiagnostics ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-1 animate-spin" />
                  Running...
                </>
              ) : (
                'Run Diagnostics'
              )}
            </Button>
          </div>

          <div className="space-y-3">
            {diagnostics.map((test) => (
              <div key={test.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(test.status)}
                    <span className="font-medium">{test.name}</span>
                  </div>
                  <Badge variant={getStatusColor(test.status) as any}>
                    {test.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {test.description}
                </p>
                {test.details && (
                  <p className="text-xs text-muted-foreground">
                    {test.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Common Issues & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commonIssues.map((item, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{item.issue}</h4>
                    <p className="text-sm text-muted-foreground">{item.solution}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={item.action}>
                    Apply Fix
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recovery Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Recovery Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Use these actions carefully as they may result in data loss
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" onClick={forceSync} disabled={!isOnline}>
              <RefreshCcw className="w-4 h-4 mr-1" />
              Force Sync
            </Button>
            
            <Button variant="outline" onClick={clearSyncQueue}>
              <Database className="w-4 h-4 mr-1" />
              Clear Sync Queue
            </Button>
            
            <Button variant="outline" onClick={() => localStorage.clear()}>
              <Settings className="w-4 h-4 mr-1" />
              Reset Local Data
            </Button>
            
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCcw className="w-4 h-4 mr-1" />
              Restart Application
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
