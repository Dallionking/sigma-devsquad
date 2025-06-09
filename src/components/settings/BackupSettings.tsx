
import { useState } from "react";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";
import { Button } from "@/components/ui/button";
import { Upload, Download, Database } from "lucide-react";

interface BackupSettingsProps {
  autoBackup: boolean;
  setAutoBackup: (value: boolean) => void;
  searchQuery?: string;
}

export const BackupSettings = ({ autoBackup, setAutoBackup, searchQuery = "" }: BackupSettingsProps) => {
  const [backupFrequency, setBackupFrequency] = useState("daily");
  const [backupLocation, setBackupLocation] = useState("local");
  const [retentionDays, setRetentionDays] = useState("30");
  const [compressionEnabled, setCompressionEnabled] = useState(true);

  const handleSave = () => {
    console.log("Saving backup settings:", {
      autoBackup,
      backupFrequency,
      backupLocation,
      retentionDays,
      compressionEnabled
    });
  };

  const handleReset = () => {
    setAutoBackup(true);
    setBackupFrequency("daily");
    setBackupLocation("local");
    setRetentionDays("30");
    setCompressionEnabled(true);
  };

  return (
    <SettingsSection
      title="Backup & Restore"
      description="Manage system backups and restore points"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
    >
      <SettingItem
        id="auto-backup"
        type="switch"
        label="Auto Backup"
        description="Automatically backup configuration"
        checked={autoBackup}
        onCheckedChange={setAutoBackup}
      />

      <SettingItem
        id="backup-frequency"
        type="select"
        label="Backup Frequency"
        description="How often to create backups"
        value={backupFrequency}
        onValueChange={setBackupFrequency}
        options={[
          { value: "hourly", label: "Hourly" },
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" }
        ]}
      />

      <SettingItem
        id="backup-location"
        type="select"
        label="Backup Location"
        description="Where to store backup files"
        value={backupLocation}
        onValueChange={setBackupLocation}
        options={[
          { value: "local", label: "Local Storage" },
          { value: "cloud", label: "Cloud Storage" },
          { value: "network", label: "Network Drive" }
        ]}
      />

      <SettingItem
        id="retention-days"
        type="input"
        label="Retention Period (Days)"
        description="How long to keep backup files"
        value={retentionDays}
        onChange={setRetentionDays}
        inputType="number"
        placeholder="30"
      />

      <SettingItem
        id="compression-enabled"
        type="switch"
        label="Enable Compression"
        description="Compress backup files to save space"
        checked={compressionEnabled}
        onCheckedChange={setCompressionEnabled}
      />

      <div className="pt-4 border-t border-border">
        <h4 className="font-medium mb-4 text-card-foreground">Backup Actions</h4>
        <div className="flex flex-wrap gap-3">
          <Button className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Create Backup
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Restore from Backup
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Configuration
          </Button>
        </div>
      </div>
    </SettingsSection>
  );
};
