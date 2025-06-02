
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Download, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface DataExportRequest {
  id: string;
  export_type: string;
  status: string;
  file_url: string;
  expires_at: string;
  created_at: string;
}

export const DataExport = () => {
  const { toast } = useToast();
  const [exportRequests, setExportRequests] = useState<DataExportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExportType, setSelectedExportType] = useState<string>('full');
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    fetchExportRequests();
  }, []);

  const fetchExportRequests = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('data_export_requests')
        .select('*')
        .eq('user_id', user.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setExportRequests(data || []);
    } catch (error) {
      console.error('Error fetching export requests:', error);
      toast({
        title: "Error",
        description: "Failed to load export requests.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestExport = async () => {
    if (!selectedExportType) return;

    setRequesting(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('data_export_requests')
        .insert({
          user_id: user.user.id,
          export_type: selectedExportType,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Export Requested",
        description: "Your data export request has been submitted. You'll be notified when it's ready.",
      });

      fetchExportRequests();
    } catch (error) {
      console.error('Error requesting export:', error);
      toast({
        title: "Error",
        description: "Failed to request data export.",
        variant: "destructive",
      });
    } finally {
      setRequesting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'processing': return 'secondary';
      case 'completed': return 'default';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const formatExportType = (type: string) => {
    switch (type) {
      case 'full': return 'Complete Data Export';
      case 'profile': return 'Profile Data Only';
      case 'subscription': return 'Subscription Data';
      case 'billing': return 'Billing History';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Request New Export */}
      <Card>
        <CardHeader>
          <CardTitle>Request Data Export</CardTitle>
          <CardDescription>
            Download your data in a portable format. Exports are available for 30 days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={selectedExportType} onValueChange={setSelectedExportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select export type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Complete Data Export</SelectItem>
                  <SelectItem value="profile">Profile Data Only</SelectItem>
                  <SelectItem value="subscription">Subscription Data</SelectItem>
                  <SelectItem value="billing">Billing History</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleRequestExport} 
              disabled={requesting || !selectedExportType}
            >
              <FileText className="w-4 h-4 mr-2" />
              {requesting ? 'Requesting...' : 'Request Export'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export History */}
      <Card>
        <CardHeader>
          <CardTitle>Export History</CardTitle>
          <CardDescription>View and download your previous data exports</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-40"></div>
                    <div className="h-3 bg-muted rounded w-32"></div>
                  </div>
                  <div className="h-8 bg-muted rounded w-24"></div>
                </div>
              ))}
            </div>
          ) : exportRequests.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No export requests</h3>
              <p className="text-muted-foreground">
                Your data export requests will appear here once you create them.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {exportRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(request.status)}
                      <span className="font-medium">
                        {formatExportType(request.export_type)}
                      </span>
                      <Badge variant={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Requested: {new Date(request.created_at).toLocaleDateString()}
                      {request.expires_at && request.status === 'completed' && (
                        <span className="ml-4">
                          Expires: {new Date(request.expires_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    {request.status === 'completed' && request.file_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(request.file_url, '_blank')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
