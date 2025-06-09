
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { DeletionWarningProps } from './types';

export const DeletionWarning = ({ onProceed, onCancel }: DeletionWarningProps) => {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-5 h-5" />
          Delete Account
        </CardTitle>
        <CardDescription>
          This action cannot be undone. Please read carefully before proceeding.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-destructive/10 p-4 rounded-lg">
          <h4 className="font-semibold text-destructive mb-2">What will happen:</h4>
          <ul className="space-y-1 text-sm text-destructive">
            <li>• Your account will be permanently deleted</li>
            <li>• All your data will be removed from our servers</li>
            <li>• Your subscription will be cancelled</li>
            <li>• This action cannot be reversed</li>
          </ul>
        </div>
        
        <div className="flex gap-4">
          <Button
            variant="destructive"
            onClick={onProceed}
            className="flex-1"
          >
            I Understand, Proceed
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
