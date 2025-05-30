
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConnectionStatusBanner } from "@/components/ide-integration/ConnectionStatusBanner";
import { useIDEConnectionStatus } from "@/components/ide-integration/IDEConnectionStatus";
import { ConnectionStatusTab } from "@/components/ide-integration/ConnectionStatusTab";
import { ConfigurationTab } from "@/components/ide-integration/ConfigurationTab";
import { FileExplorerTab } from "@/components/ide-integration/FileExplorerTab";
import { TerminalTab } from "@/components/ide-integration/TerminalTab";
import { ExecutionTab } from "@/components/ide-integration/ExecutionTab";
import { SyncTab } from "@/components/ide-integration/SyncTab";
import { IDEIntegrationFlow } from "@/components/ide-integration/IDEIntegrationFlow";

const IDEIntegration = () => {
  const {
    connectionStatus,
    selectedIDE,
    setSelectedIDE,
    mockIDEs
  } = useIDEConnectionStatus();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">IDE Integration</h1>
          <p className="text-muted-foreground">
            Connect and synchronize with your development environment
          </p>
        </div>

        <ConnectionStatusBanner connectionStatus={connectionStatus} />

        <Tabs defaultValue="flow" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="flow">Flow</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
            <TabsTrigger value="sync">Sync</TabsTrigger>
          </TabsList>

          <TabsContent value="flow">
            <IDEIntegrationFlow />
          </TabsContent>

          <TabsContent value="status">
            <ConnectionStatusTab 
              ides={mockIDEs}
              selectedIDE={selectedIDE}
              setSelectedIDE={setSelectedIDE}
            />
          </TabsContent>

          <TabsContent value="configuration">
            <ConfigurationTab 
              selectedIDE={selectedIDE}
              ides={mockIDEs}
            />
          </TabsContent>

          <TabsContent value="files">
            <FileExplorerTab />
          </TabsContent>

          <TabsContent value="terminal">
            <TerminalTab />
          </TabsContent>

          <TabsContent value="execution">
            <ExecutionTab />
          </TabsContent>

          <TabsContent value="sync">
            <SyncTab 
              ides={mockIDEs}
              selectedIDE={selectedIDE}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IDEIntegration;
