
export interface DataExportRequest {
  id: string;
  export_type: string;
  status: string;
  file_url?: string;
  created_at: string;
  expires_at?: string;
}

export interface ExportTypeCardProps {
  title: string;
  description: string;
  exportType: string;
  icon: React.ComponentType<{ className?: string }>;
  onExport: (type: string) => void;
  loading?: boolean;
}

export interface ExportHistoryProps {
  requests: DataExportRequest[];
  onDownload: (url: string) => void;
}
