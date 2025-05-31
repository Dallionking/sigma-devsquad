
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStateStore } from '@/contexts/StateStoreContext';
import { Bug, Activity, Clock, Zap, AlertTriangle, Play } from 'lucide-react';

export const StateDebugger = () => {
  const { state, dispatch, replayActions, timeTravel } = useStateStore();
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [replayMode, setReplayMode] = useState(false);
  
  const toggleDebugMode = () => {
    dispatch({ type: 'TOGGLE_DEBUG' });
  };
  
  const clearHistory = () => {
    dispatch({
      type: 'CLEAR_DEBUG_HISTORY'
    });
  };
  
  const replayFromAction = (actionIndex: number) => {
    const actionsToReplay = state.debug.actionHistory.slice(actionIndex);
    setReplayMode(true);
    replayActions(actionsToReplay);
    setTimeout(() => setReplayMode(false), 1000);
  };
  
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };
  
  const getActionColor = (actionType: string) => {
    if (actionType.includes('ERROR')) return 'destructive';
    if (actionType.includes('SUCCESS')) return 'default';
    if (actionType.includes('LOADING')) return 'secondary';
    return 'outline';
  };
  
  if (!state.debug.enabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bug className="w-5 h-5" />
            <span>State Debugger</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Bug className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Debug Mode Disabled</h3>
            <p className="text-muted-foreground mb-4">
              Enable debug mode to track state changes and performance metrics
            </p>
            <Button onClick={toggleDebugMode}>
              Enable Debug Mode
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="h-[600px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bug className="w-5 h-5" />
            <span>State Debugger</span>
            {replayMode && (
              <Badge variant="secondary" className="animate-pulse">
                <Play className="w-3 h-3 mr-1" />
                Replaying
              </Badge>
            )}
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={clearHistory}>
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={toggleDebugMode}>
              Disable
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[500px]">
        <Tabs defaultValue="actions" className="h-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="state">State</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="actions" className="h-[450px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Action History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[350px]">
                    <div className="space-y-2">
                      {state.debug.actionHistory.map((action, index) => (
                        <div
                          key={index}
                          className={`p-2 border rounded cursor-pointer hover:bg-muted ${
                            selectedAction === action ? 'bg-muted' : ''
                          }`}
                          onClick={() => setSelectedAction(action)}
                        >
                          <div className="flex items-center justify-between">
                            <Badge variant={getActionColor(action.type)}>
                              {action.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(action.timestamp || 0)}
                            </span>
                          </div>
                          {action.source && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Source: {action.source}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Action Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedAction ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Type</label>
                        <p className="text-sm text-muted-foreground">{selectedAction.type}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Timestamp</label>
                        <p className="text-sm text-muted-foreground">
                          {formatTimestamp(selectedAction.timestamp || 0)}
                        </p>
                      </div>
                      
                      {selectedAction.source && (
                        <div>
                          <label className="text-sm font-medium">Source</label>
                          <p className="text-sm text-muted-foreground">{selectedAction.source}</p>
                        </div>
                      )}
                      
                      {selectedAction.payload && (
                        <div>
                          <label className="text-sm font-medium">Payload</label>
                          <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                            {JSON.stringify(selectedAction.payload, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const actionIndex = state.debug.actionHistory.findIndex(a => a === selectedAction);
                          replayFromAction(actionIndex);
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Replay from here
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Select an action to view details</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="state" className="h-[450px]">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Current State</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[350px]">
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(state, null, 2)}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="h-[450px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>Render Times</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {Object.entries(state.performance.renderTimes).map(([component, time]) => (
                        <div key={component} className="flex justify-between items-center">
                          <span className="text-sm">{component}</span>
                          <Badge variant={time > 16 ? 'destructive' : 'secondary'}>
                            {time.toFixed(2)}ms
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">State Updates</label>
                      <p className="text-2xl font-bold">{state.performance.stateUpdates}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Memory Usage</label>
                      <p className="text-sm text-muted-foreground">
                        {(state.performance.memoryUsage / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Network Requests</label>
                      <p className="text-sm text-muted-foreground">
                        {state.performance.networkRequests.length} requests
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="errors" className="h-[450px]">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Error Log</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[350px]">
                  {state.debug.errorLog.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No errors recorded</p>
                  ) : (
                    <div className="space-y-2">
                      {state.debug.errorLog.map((error, index) => (
                        <div key={index} className="p-2 border border-red-200 rounded">
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-medium text-red-700">
                              {error.message}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(error.timestamp)}
                            </span>
                          </div>
                          {error.stack && (
                            <pre className="text-xs text-muted-foreground mt-2 overflow-auto">
                              {error.stack}
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
