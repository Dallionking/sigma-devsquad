
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw, Database, Activity } from "lucide-react";

export const QuickActionsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="flex flex-col items-center space-y-2 h-auto py-4">
            <Save className="w-6 h-6" />
            <span>Force Save</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
            <RotateCcw className="w-6 h-6" />
            <span>Restore State</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
            <Database className="w-6 h-6" />
            <span>Clear Cache</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
            <Activity className="w-6 h-6" />
            <span>Run Diagnostics</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
