
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useEnhancedStateManagement } from "@/hooks/useEnhancedStateManagement";
import { useStateDebugger } from "@/hooks/useStateDebugger";
import { Eye, Bug, History, Search, Filter, Download } from "lucide-react";

interface StateDebuggerProps {
  sliceId?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export const StateDebugger = ({ 
  sliceId = 'global', 
  autoRefresh = true,
  refreshInterval = 1000 
}: StateDebuggerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateSlice, setSelectedStateSlice] = useState(sliceId);
  const [debugFilter, setDebugFilter] = useState<'all' | 'errors' | 'warnings' | 'updates'>('all');

  const { state, selectors } = useEnhancedStateManagement({
    sliceId: selectedStateSlice,
    initialState: {},
    enablePerformanceMonitoring: true
  });

  const {
    debugHistory,
    performanceMetrics,
    stateValidationErrors,
    subscribeToDebugEvents,
    exportDebugData,
    clearDebugHistory
  } = useStateDebugger({
    sliceId: selectedStateSlice,
    maxEntries: 1000,
    captureStackTrace: false,
    autoCapture: autoRefresh,
    enableRealTimeTracking: autoRefresh,
    trackPerformance: true
  });

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Trigger debug data refresh
        subscribeToDebugEvents();
      }, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, subscribeToDebugEvents]);

  const filteredHistory = debugHistory.filter(entry => {
    const matchesSearch = searchQuery === '' || 
      JSON.stringify(entry).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = debugFilter === 'all' || 
      (debugFilter === 'errors' && entry.type === 'error') ||
      (debugFilter === 'warnings' && entry.type === 'warning') ||
      (debugFilter === 'updates' && entry.type === 'state_update');
    
    return matchesSearch && matchesFilter;
  });

  const renderStateTree = (obj: any, path = '', level = 0) => {
    if (level > 3) return <span className="text-muted-foreground">...</span>;
    
    return (
      <div className={`ml-${level * 4} text-xs font-mono`}>
        {Object.entries(obj || {}).map(([key, value]) => (
          <div key={key} className="py-1">
            <span className="text-blue-600 dark:text-blue-400">{key}:</span>
            {typeof value === 'object' && value !== null ? (
              <div className="ml-2">
                {renderStateTree(value, `${path}.${key}`, level + 1)}
              </div>
            ) : (
              <span className="ml-2 text-green-600 dark:text-green-400">
                {typeof value === 'string' ? `"${value}"` : String(value)}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bug className="w-5 h-5" />
              State Debugger
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={autoRefresh ? "default" : "secondary"}>
                {autoRefresh ? 'Live' : 'Paused'}
              </Badge>
              <Button variant="outline" size="sm" onClick={exportDebugData}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="state" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="state">Current State</TabsTrigger>
              <TabsTrigger value="history">Debug History</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="validation">Validation</TabsTrigger>
            </TabsList>

            <TabsContent value="state" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="bg-muted p-4 rounded-lg max-h-96 overflow-auto">
                {renderStateTree(state)}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={debugFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDebugFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={debugFilter === 'errors' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => setDebugFilter('errors')}
                >
                  Errors
                </Button>
                <Button
                  variant={debugFilter === 'warnings' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDebugFilter('warnings')}
                >
                  Warnings
                </Button>
                <Button
                  variant={debugFilter === 'updates' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDebugFilter('updates')}
                >
                  Updates
                </Button>
                <Button variant="outline" size="sm" onClick={clearDebugHistory}>
                  Clear
                </Button>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-auto">
                {filteredHistory.map((entry, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant={
                        entry.type === 'error' ? 'destructive' :
                        entry.type === 'warning' ? 'default' : 'secondary'
                      }>
                        {entry.type}
                      </Badge>
                      <span className="text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="mt-2 text-xs font-mono">
                      {JSON.stringify(entry.data, null, 2)}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium">Render Time</div>
                    <div className="text-2xl font-bold">
                      {performanceMetrics?.renderTime?.toFixed(2) || '0.00'}ms
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium">State Updates</div>
                    <div className="text-2xl font-bold">
                      {performanceMetrics?.updateCount || 0}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="validation" className="space-y-4">
              {stateValidationErrors.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No validation errors detected
                </div>
              ) : (
                <div className="space-y-2">
                  {stateValidationErrors.map((error, index) => (
                    <div key={index} className="p-3 border border-red-200 rounded-lg bg-red-50">
                      <div className="font-medium text-red-700">{error.field}</div>
                      <div className="text-sm text-red-600">{error.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
