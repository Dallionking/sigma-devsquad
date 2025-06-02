
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import { ExportHistoryProps } from './types';

export const ExportHistory = ({ requests, onDownload }: ExportHistoryProps) => {
  if (requests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Export History</CardTitle>
          <CardDescription>No export requests found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>You haven't made any data export requests yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export History</CardTitle>
        <CardDescription>Your recent data export requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium capitalize">{request.export_type}</span>
                  <Badge variant={request.status === 'completed' ? 'default' : 'secondary'}>
                    {request.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Requested on {new Date(request.created_at).toLocaleDateString()}
                </p>
                {request.expires_at && (
                  <p className="text-xs text-muted-foreground">
                    Expires on {new Date(request.expires_at).toLocaleDateString()}
                  </p>
                )}
              </div>
              {request.file_url && request.status === 'completed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDownload(request.file_url!)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
