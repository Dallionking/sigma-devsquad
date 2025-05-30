
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only-focusable"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <div className="container-responsive py-responsive fade-in">
        {/* Enhanced header section with better typography */}
        <header className="mb-8 text-center lg:text-left">
          <h1 className="heading-primary mb-4">
            IDE Integration
          </h1>
          <p className="text-muted-enhanced max-w-3xl mx-auto lg:mx-0">
            Connect and synchronize with your development environment for seamless workflow integration
          </p>
        </header>

        {/* Enhanced connection status banner */}
        <div className="mb-8">
          <ConnectionStatusBanner connectionStatus={connectionStatus} />
        </div>

        {/* Enhanced tabs with better responsive design */}
        <main id="main-content" role="main" aria-label="IDE Integration tools">
          <Tabs defaultValue="flow" className="space-y-8">
            {/* Enhanced tab navigation with scroll support on mobile */}
            <div className="relative">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1 bg-muted/50 p-1 rounded-xl h-auto">
                <TabsTrigger 
                  value="flow" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  <span className="hidden sm:inline">Integration </span>Flow
                </TabsTrigger>
                <TabsTrigger 
                  value="status" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  Status
                </TabsTrigger>
                <TabsTrigger 
                  value="configuration" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  <span className="hidden sm:inline">Config</span><span className="sm:hidden">Cfg</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="files" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  Files
                </TabsTrigger>
                <TabsTrigger 
                  value="terminal" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  Terminal
                </TabsTrigger>
                <TabsTrigger 
                  value="execution" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  <span className="hidden sm:inline">Execute</span><span className="sm:hidden">Run</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="sync" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  Sync
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Enhanced tab content with consistent spacing */}
            <div className="mt-8">
              <TabsContent value="flow" className="space-y-6 fade-in">
                <IDEIntegrationFlow />
              </TabsContent>

              <TabsContent value="status" className="space-y-6 fade-in">
                <ConnectionStatusTab 
                  ides={mockIDEs}
                  selectedIDE={selectedIDE}
                  setSelectedIDE={setSelectedIDE}
                />
              </TabsContent>

              <TabsContent value="configuration" className="space-y-6 fade-in">
                <ConfigurationTab 
                  selectedIDE={selectedIDE}
                  ides={mockIDEs}
                />
              </TabsContent>

              <TabsContent value="files" className="space-y-6 fade-in">
                <FileExplorerTab />
              </TabsContent>

              <TabsContent value="terminal" className="space-y-6 fade-in">
                <TerminalTab />
              </TabsContent>

              <TabsContent value="execution" className="space-y-6 fade-in">
                <ExecutionTab />
              </TabsContent>

              <TabsContent value="sync" className="space-y-6 fade-in">
                <SyncTab 
                  ides={mockIDEs}
                  selectedIDE={selectedIDE}
                />
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default IDEIntegration;
