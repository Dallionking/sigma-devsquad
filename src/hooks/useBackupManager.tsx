
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface BackupData {
  id: string;
  name: string;
  timestamp: number;
  data: Record<string, any>;
  size: number;
  compressed: boolean;
}

export const useBackupManager = () => {
  const [backups, setBackups] = useState<BackupData[]>([]);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const { toast } = useToast();

  // Load backups from localStorage on mount
  useState(() => {
    const savedBackups = localStorage.getItem('app-backups');
    if (savedBackups) {
      try {
        setBackups(JSON.parse(savedBackups));
      } catch (error) {
        console.error('Failed to load backups:', error);
      }
    }
  });

  // Save backups to localStorage
  const saveBackupsToStorage = useCallback((backupsToSave: BackupData[]) => {
    localStorage.setItem('app-backups', JSON.stringify(backupsToSave));
  }, []);

  // Create backup
  const createBackup = useCallback(async (name: string, dataToBackup: Record<string, any>) => {
    setIsCreatingBackup(true);
    
    try {
      const backup: BackupData = {
        id: `backup_${Date.now()}`,
        name: name.trim() || `Backup ${new Date().toLocaleString()}`,
        timestamp: Date.now(),
        data: dataToBackup,
        size: JSON.stringify(dataToBackup).length,
        compressed: false
      };

      const newBackups = [backup, ...backups].slice(0, 10); // Keep only latest 10 backups
      setBackups(newBackups);
      saveBackupsToStorage(newBackups);

      toast({
        title: "Backup Created",
        description: `Backup "${backup.name}" created successfully`,
      });

      return backup;
    } catch (error) {
      console.error('Failed to create backup:', error);
      toast({
        title: "Backup Failed",
        description: "Failed to create backup",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsCreatingBackup(false);
    }
  }, [backups, saveBackupsToStorage, toast]);

  // Restore from backup
  const restoreFromBackup = useCallback(async (backupId: string): Promise<Record<string, any> | null> => {
    setIsRestoring(true);
    
    try {
      const backup = backups.find(b => b.id === backupId);
      if (!backup) {
        throw new Error('Backup not found');
      }

      toast({
        title: "Backup Restored",
        description: `Data restored from "${backup.name}"`,
      });

      return backup.data;
    } catch (error) {
      console.error('Failed to restore backup:', error);
      toast({
        title: "Restore Failed",
        description: "Failed to restore from backup",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsRestoring(false);
    }
  }, [backups, toast]);

  // Delete backup
  const deleteBackup = useCallback((backupId: string) => {
    const newBackups = backups.filter(b => b.id !== backupId);
    setBackups(newBackups);
    saveBackupsToStorage(newBackups);

    toast({
      title: "Backup Deleted",
      description: "Backup deleted successfully"
    });
  }, [backups, saveBackupsToStorage, toast]);

  // Export backup as file
  const exportBackup = useCallback((backupId: string) => {
    const backup = backups.find(b => b.id === backupId);
    if (!backup) return;

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${backup.name.replace(/[^a-z0-9]/gi, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Backup Exported",
      description: "Backup file downloaded successfully"
    });
  }, [backups, toast]);

  // Import backup from file
  const importBackup = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target?.result as string);
        const importedBackup: BackupData = {
          ...backupData,
          id: `imported_${Date.now()}`,
          timestamp: Date.now()
        };

        const newBackups = [importedBackup, ...backups].slice(0, 10);
        setBackups(newBackups);
        saveBackupsToStorage(newBackups);

        toast({
          title: "Backup Imported",
          description: `Backup "${importedBackup.name}" imported successfully`
        });
      } catch (error) {
        console.error('Failed to import backup:', error);
        toast({
          title: "Import Failed",
          description: "Invalid backup file format",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  }, [backups, saveBackupsToStorage, toast]);

  // Get backup statistics
  const getBackupStats = useCallback(() => {
    const totalSize = backups.reduce((sum, backup) => sum + backup.size, 0);
    const totalBackups = backups.length;
    const oldestBackup = backups.length > 0 ? Math.min(...backups.map(b => b.timestamp)) : null;
    const newestBackup = backups.length > 0 ? Math.max(...backups.map(b => b.timestamp)) : null;

    return {
      totalSize,
      totalBackups,
      oldestBackup: oldestBackup ? new Date(oldestBackup) : null,
      newestBackup: newestBackup ? new Date(newestBackup) : null
    };
  }, [backups]);

  return {
    backups,
    isCreatingBackup,
    isRestoring,
    createBackup,
    restoreFromBackup,
    deleteBackup,
    exportBackup,
    importBackup,
    getBackupStats
  };
};
