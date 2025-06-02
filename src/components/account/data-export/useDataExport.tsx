
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DataExportRequest } from './types';

export const useDataExport = () => {
  const { toast } = useToast();
  const [exportRequests, setExportRequests] = useState<DataExportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportingTypes, setExportingTypes] = useState<Set<string>>(new Set());

  const fetchExportRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('data_export_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setExportRequests(data || []);
    } catch (error) {
      console.error('Error fetching export requests:', error);
      toast({
        title: "Error",
        description: "Failed to load export history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async (exportType: string) => {
    setExportingTypes(prev => new Set(prev).add(exportType));

    try {
      const { error } = await supabase
        .from('data_export_requests')
        .insert({
          export_type: exportType,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Export Request Submitted",
        description: `Your ${exportType} data export has been queued for processing.`,
      });

      fetchExportRequests();
    } catch (error) {
      console.error('Error creating export request:', error);
      toast({
        title: "Error",
        description: "Failed to create export request.",
        variant: "destructive",
      });
    } finally {
      setExportingTypes(prev => {
        const next = new Set(prev);
        next.delete(exportType);
        return next;
      });
    }
  };

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    fetchExportRequests();
  }, []);

  return {
    exportRequests,
    loading,
    exportingTypes,
    handleExportData,
    handleDownload,
    refreshData: fetchExportRequests
  };
};
