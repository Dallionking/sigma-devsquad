
import { Header } from "@/components/dashboard/Header";
import { Agent } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StateDebugger } from "@/components/state-management/StateDebugger";
import { PerformanceDashboard } from "@/components/state-management/PerformanceDashboard";
import { SyncStatusIndicator } from "@/components/state-management/SyncStatusIndicator";
import { useStateStore } from "@/contexts/StateStoreContext";
import { Database, Activity, Bug, Settings, Wifi } from "lucide-react";

const StateManagement = () => {
  // Mock agents data for header
  const mockAgents: Agent[] = [
    { 
      id: "1", 
      type: "planning", 
      name: "Planning Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 75, 
      lastActive: "2024-05-30T10:30:00Z",
      capabilities: ["requirement-analysis", "project-planning"],
      specialization: "Project Planning",
      background: "Expert in project planning and requirements analysis",
      description: "Analyzes requirements and creates project roadmaps"
    },
    { 
      id: "2", 
      type: "frontend", 
      name: "Frontend Agent", 
      status: "idle", 
      currentTask: "Idle", 
      progress: 0, 
      lastActive: "2024-05-30T10:25:00Z",
      capabilities: ["react-development", "ui-design"],
      specialization: "Frontend Development",
      background: "Expert in React and modern frontend technologies",
      description: "Builds user interfaces and client-side functionality"
    }
  ];

  const { state } = useStateStore();

  return (
    <div className="min-h-screen bg-background">
      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={mockAgents}
      />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">State Management</h1>
              <p className="text-muted-foreground mt-2">Monitor and debug application state, performance, and real-time sync</p>
            </div>
            <SyncStatusIndicator />
          </div>

          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Performance</span>
              </TabsTrigger>
              <TabsTrigger value="debugger" className="flex items-center space-x-2">
                <Bug className="w-4 h-4" />
                <span>Debugger</span>
              </TabsTrigger>
              <TabsTrigger value="state" className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>State Inspector</span>
              </TabsTrigger>
              <TabsTrigger value="sync" className="flex items-center space-x-2">
                <Wifi className="w-4 h-4" />
                <span>Sync Status</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <PerformanceDashboard />
            </TabsContent>

            <TabsContent value="debugger">
              <StateDebugger />
            </TabsContent>

            <TabsContent value="state">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">UI State</h3>
                    <pre className="text-sm bg-muted p-4 rounded overflow-auto h-[300px]">
                      {JSON.stringify(state.ui, null, 2)}
                    </pre>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Realtime State</h3>
                    <pre className="text-sm bg-muted p-4 rounded overflow-auto h-[300px]">
                      {JSON.stringify(state.realtime, null, 2)}
                    </pre>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Performance State</h3>
                    <pre className="text-sm bg-muted p-4 rounded overflow-auto h-[300px]">
                      {JSON.stringify(state.performance, null, 2)}
                    </pre>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Debug State</h3>
                    <pre className="text-sm bg-muted p-4 rounded overflow-auto h-[300px]">
                      {JSON.stringify({
                        enabled: state.debug.enabled,
                        actionHistoryCount: state.debug.actionHistory.length,
                        snapshotsCount: state.debug.stateSnapshots.length,
                        errorsCount: state.debug.errorLog.length
                      }, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sync">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Real-time Synchronization Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Connection Status</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {state.realtime.connected ? 'Connected' : 'Disconnected'}
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Pending Actions</h4>
                    <p className="text-2xl font-bold">
                      {state.realtime.pendingActions.length}
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Active Users</h4>
                    <p className="text-2xl font-bold">
                      {Object.keys(state.realtime.presence).length}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StateManagement;
