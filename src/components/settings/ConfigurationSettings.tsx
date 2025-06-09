
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useConfigurationSettings } from "@/hooks/useConfigurationSettings";
import { Settings, Users, Database, HardDrive } from "lucide-react";
import { StateManagementTab } from "./tabs/StateManagementTab";
import { CollaborationTab } from "./tabs/CollaborationTab";
import { DataManagementTab } from "./tabs/DataManagementTab";

interface ConfigurationSettingsProps {
  searchQuery?: string;
}

export const ConfigurationSettings = ({ searchQuery = "" }: ConfigurationSettingsProps) => {
  const {
    // State Management
    stateConfig,
    updateStateConfig,
    saveStateSettings,
    resetStateSettings,
    
    // Collaboration
    collaborationConfig,
    updateCollaborationConfig,
    saveCollaborationSettings,
    resetCollaborationSettings,
    
    // Data Management
    dataConfig,
    updateDataConfig,
    saveDataSettings,
    resetDataSettings,
    
    // Utilities
    exportConfiguration
  } = useConfigurationSettings();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuration Options
          </CardTitle>
          <CardDescription>
            Advanced settings for state management, collaboration, and data management features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="state" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="state" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                State Management
              </TabsTrigger>
              <TabsTrigger value="collaboration" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Collaboration
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <HardDrive className="w-4 h-4" />
                Data Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="state" className="space-y-6 mt-6">
              <StateManagementTab
                stateConfig={stateConfig}
                updateStateConfig={updateStateConfig}
                saveStateSettings={saveStateSettings}
                resetStateSettings={resetStateSettings}
                searchQuery={searchQuery}
              />
            </TabsContent>

            <TabsContent value="collaboration" className="space-y-6 mt-6">
              <CollaborationTab
                collaborationConfig={collaborationConfig}
                updateCollaborationConfig={updateCollaborationConfig}
                saveCollaborationSettings={saveCollaborationSettings}
                resetCollaborationSettings={resetCollaborationSettings}
                searchQuery={searchQuery}
              />
            </TabsContent>

            <TabsContent value="data" className="space-y-6 mt-6">
              <DataManagementTab
                dataConfig={dataConfig || {
                  storageQuota: '100mb',
                  compressionLevel: 'medium',
                  retentionPeriod: '1month',
                  encryptionEnabled: true,
                  backupFrequency: 'daily',
                  syncPriority: 'balanced',
                  dataValidation: true,
                  autoCleanup: true,
                  indexingStrategy: 'standard',
                  cachingPolicy: 'lru'
                }}
                updateDataConfig={updateDataConfig || (() => {})}
                saveDataSettings={saveDataSettings || (() => {})}
                resetDataSettings={resetDataSettings || (() => {})}
                searchQuery={searchQuery}
              />
            </TabsContent>
          </Tabs>

          {/* Export Configuration */}
          <div className="mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={exportConfiguration}
              className="w-full"
            >
              Export Configuration Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
