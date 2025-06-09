
import React from 'react';
import { useDataExport } from './data-export/useDataExport';
import { ExportTypeCard } from './data-export/ExportTypeCard';
import { ExportHistory } from './data-export/ExportHistory';
import { FileText, Database, Settings, MessageSquare } from 'lucide-react';

export const DataExport = () => {
  const {
    exportRequests,
    loading,
    exportingTypes,
    handleExportData,
    handleDownload
  } = useDataExport();

  const exportTypes = [
    {
      title: 'Profile Data',
      description: 'Export your profile information and settings',
      exportType: 'profile',
      icon: Settings
    },
    {
      title: 'Messages',
      description: 'Export all your messages and conversations',
      exportType: 'messages',
      icon: MessageSquare
    },
    {
      title: 'Complete Account',
      description: 'Export all your data in a comprehensive archive',
      exportType: 'complete',
      icon: Database
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exportTypes.map((type) => (
          <ExportTypeCard
            key={type.exportType}
            title={type.title}
            description={type.description}
            exportType={type.exportType}
            icon={type.icon}
            onExport={handleExportData}
            loading={exportingTypes.has(type.exportType)}
          />
        ))}
      </div>

      <ExportHistory
        requests={exportRequests}
        onDownload={handleDownload}
      />
    </div>
  );
};
