
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle } from "lucide-react";
import { DeletionStatusProps } from './types';

export const DeletionStatus = ({ request, onCancel }: DeletionStatusProps) => {
  const isScheduled = request.status === 'pending';
  const deletionDate = new Date(request.scheduled_deletion_date);

  return (
    <Card className={isScheduled ? 'border-orange-500' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isScheduled ? (
            <Clock className="w-5 h-5 text-orange-500" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          Account Deletion Status
        </CardTitle>
        <CardDescription>
          Current status of your account deletion request
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant={isScheduled ? 'default' : 'secondary'}>
            {request.status}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Requested on {new Date(request.created_at).toLocaleDateString()}
          </span>
        </div>

        {isScheduled && (
          <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
            <p className="font-medium text-orange-800 dark:text-orange-200">
              Account scheduled for deletion
            </p>
            <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
              Your account will be permanently deleted on{' '}
              {deletionDate.toLocaleDateString()} at{' '}
              {deletionDate.toLocaleTimeString()}
            </p>
          </div>
        )}

        {request.reason && (
          <div>
            <h4 className="font-medium mb-1">Reason</h4>
            <p className="text-sm text-muted-foreground capitalize">
              {request.reason.replace('-', ' ')}
            </p>
          </div>
        )}

        {request.feedback && (
          <div>
            <h4 className="font-medium mb-1">Feedback</h4>
            <p className="text-sm text-muted-foreground">{request.feedback}</p>
          </div>
        )}

        {isScheduled && (
          <Button variant="outline" onClick={onCancel} className="w-full">
            Cancel Deletion Request
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
