
import React, { useState } from 'react';
import { SettingsSection } from "../SettingsSection";
import { SettingItem } from "../SettingItem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database, HardDrive, Clock, Shield, Zap } from "lucide-react";

interface DataManagementConfig {
  storageQuota: string;
  compressionLevel: string;
  retentionPeriod: string;
  encryptionEnabled: boolean;
  backupFrequency: string;
  syncPriority: string;
  dataValidation: boolean;
  autoCleanup: boolean;
  indexingStrategy: string;
  cachingPolicy: string;
}

interface DataManagementTabProps {
  dataConfig: DataManagementConfig;
  updateDataConfig: (updates: Partial<DataManagementConfig>) => void;
  saveDataSettings: () => void;
  resetDataSettings: () => void;
  searchQuery?: string;
}

export const DataManagementTab = ({
  dataConfig,
  updateDataConfig,
  saveDataSettings,
  resetDataSettings,
  searchQuery = ""
}: DataManagementTabProps) => {
  const [storageUsage] = useState({ used: 45, total: 100 }); // MB
  const [optimizationInProgress, setOptimizationInProgress] = useState(false);

  const handleOptimizeStorage = async () => {
    setOptimizationInProgress(true);
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOptimizationInProgress(false);
  };

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Storage Overview
          </CardTitle>
          <CardDescription>
            Current storage usage and optimization status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage Used</span>
              <span>{storageUsage.used}MB / {storageUsage.total}MB</span>
            </div>
            <Progress value={(storageUsage.used / storageUsage.total) * 100} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">2.3MB</div>
              <div className="text-xs text-muted-foreground">State Data</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">1.8MB</div>
              <div className="text-xs text-muted-foreground">Cache</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">0.9MB</div>
              <div className="text-xs text-muted-foreground">Temp Files</div>
            </div>
          </div>

          <Button 
            onClick={handleOptimizeStorage}
            disabled={optimizationInProgress}
            className="w-full"
          >
            {optimizationInProgress ? 'Optimizing...' : 'Optimize Storage'}
          </Button>
        </CardContent>
      </Card>

      {/* Data Management Settings */}
      <SettingsSection
        title="Data Storage & Management"
        description="Configure how data is stored, compressed, and managed"
        onSave={saveDataSettings}
        onReset={resetDataSettings}
        searchQuery={searchQuery}
      >
        <SettingItem
          id="storage-quota"
          type="select"
          label="Storage Quota Limits"
          description="Maximum storage allocation for application data"
          value={dataConfig.storageQuota}
          onValueChange={(value) => updateDataConfig({ storageQuota: value })}
          options={[
            { value: "50mb", label: "50 MB - Basic" },
            { value: "100mb", label: "100 MB - Standard" },
            { value: "250mb", label: "250 MB - Extended" },
            { value: "500mb", label: "500 MB - Premium" },
            { value: "unlimited", label: "Unlimited - Enterprise" }
          ]}
        />

        <SettingItem
          id="compression-level"
          type="select"
          label="Data Compression Settings"
          description="Level of compression applied to stored data"
          value={dataConfig.compressionLevel}
          onValueChange={(value) => updateDataConfig({ compressionLevel: value })}
          options={[
            { value: "none", label: "None - No compression" },
            { value: "light", label: "Light - 10-20% reduction" },
            { value: "medium", label: "Medium - 30-50% reduction" },
            { value: "aggressive", label: "Aggressive - 50-70% reduction" }
          ]}
        />

        <SettingItem
          id="retention-period"
          type="select"
          label="Data Retention Policies"
          description="How long to keep different types of data"
          value={dataConfig.retentionPeriod}
          onValueChange={(value) => updateDataConfig({ retentionPeriod: value })}
          options={[
            { value: "1week", label: "1 Week - Minimal retention" },
            { value: "1month", label: "1 Month - Standard retention" },
            { value: "3months", label: "3 Months - Extended retention" },
            { value: "1year", label: "1 Year - Long-term retention" },
            { value: "indefinite", label: "Indefinite - Permanent storage" }
          ]}
        />

        <SettingItem
          id="encryption-enabled"
          type="switch"
          label="Data Encryption Options"
          description="Encrypt sensitive data at rest and in transit"
          checked={dataConfig.encryptionEnabled}
          onCheckedChange={(checked) => updateDataConfig({ encryptionEnabled: checked })}
        />

        <SettingItem
          id="backup-frequency"
          type="select"
          label="Backup Scheduling Options"
          description="How frequently to create data backups"
          value={dataConfig.backupFrequency}
          onValueChange={(value) => updateDataConfig({ backupFrequency: value })}
          options={[
            { value: "realtime", label: "Real-time - Continuous backup" },
            { value: "hourly", label: "Hourly - Every hour" },
            { value: "daily", label: "Daily - Once per day" },
            { value: "weekly", label: "Weekly - Once per week" },
            { value: "manual", label: "Manual - On-demand only" }
          ]}
        />

        <SettingItem
          id="sync-priority"
          type="select"
          label="Synchronization Priority Rules"
          description="Priority order for data synchronization"
          value={dataConfig.syncPriority}
          onValueChange={(value) => updateDataConfig({ syncPriority: value })}
          options={[
            { value: "user-data", label: "User Data First" },
            { value: "critical-state", label: "Critical State First" },
            { value: "recent-changes", label: "Recent Changes First" },
            { value: "size-optimized", label: "Smallest Files First" },
            { value: "balanced", label: "Balanced Priority" }
          ]}
        />

        <SettingItem
          id="data-validation"
          type="switch"
          label="Data Integrity Validation"
          description="Validate data integrity during operations"
          checked={dataConfig.dataValidation}
          onCheckedChange={(checked) => updateDataConfig({ dataValidation: checked })}
        />

        <SettingItem
          id="auto-cleanup"
          type="switch"
          label="Automatic Cleanup Processes"
          description="Automatically clean up temporary and unused data"
          checked={dataConfig.autoCleanup}
          onCheckedChange={(checked) => updateDataConfig({ autoCleanup: checked })}
        />

        <SettingItem
          id="indexing-strategy"
          type="select"
          label="Data Indexing Strategies"
          description="How to index data for faster access"
          value={dataConfig.indexingStrategy}
          onValueChange={(value) => updateDataConfig({ indexingStrategy: value })}
          options={[
            { value: "minimal", label: "Minimal - Essential indexes only" },
            { value: "standard", label: "Standard - Common access patterns" },
            { value: "comprehensive", label: "Comprehensive - Full indexing" },
            { value: "adaptive", label: "Adaptive - Based on usage patterns" }
          ]}
        />

        <SettingItem
          id="caching-policy"
          type="select"
          label="Caching Policy Configuration"
          description="How to cache frequently accessed data"
          value={dataConfig.cachingPolicy}
          onValueChange={(value) => updateDataConfig({ cachingPolicy: value })}
          options={[
            { value: "lru", label: "LRU - Least Recently Used" },
            { value: "lfu", label: "LFU - Least Frequently Used" },
            { value: "fifo", label: "FIFO - First In, First Out" },
            { value: "adaptive", label: "Adaptive - Smart caching" },
            { value: "disabled", label: "Disabled - No caching" }
          ]}
        />

        {/* Data Management Status */}
        <Card className="mt-4 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="w-4 h-4" />
              Current Data Management Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Encryption:</span>
                <Badge variant={dataConfig.encryptionEnabled ? "default" : "secondary"} className="ml-2">
                  {dataConfig.encryptionEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Compression:</span>
                <Badge variant="outline" className="ml-2">
                  {dataConfig.compressionLevel}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Backup:</span>
                <Badge variant="outline" className="ml-2">
                  {dataConfig.backupFrequency}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Validation:</span>
                <Badge variant={dataConfig.dataValidation ? "default" : "secondary"} className="ml-2">
                  {dataConfig.dataValidation ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </SettingsSection>
    </div>
  );
};
