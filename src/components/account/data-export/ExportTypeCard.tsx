
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ExportTypeCardProps } from './types';

export const ExportTypeCard = ({
  title,
  description,
  exportType,
  icon: Icon,
  onExport,
  loading = false
}: ExportTypeCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => onExport(exportType)}
          disabled={loading}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          {loading ? 'Exporting...' : 'Export Data'}
        </Button>
      </CardContent>
    </Card>
  );
};
