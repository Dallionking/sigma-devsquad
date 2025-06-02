
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DeletionFormProps } from './types';

export const DeletionForm = ({ onSubmit, onCancel, loading = false }: DeletionFormProps) => {
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason) {
      onSubmit(reason, feedback);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Deletion Request</CardTitle>
        <CardDescription>
          Please help us understand why you're leaving
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="reason">Reason for deletion (required)</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-using">Not using the service</SelectItem>
                <SelectItem value="too-expensive">Too expensive</SelectItem>
                <SelectItem value="missing-features">Missing features</SelectItem>
                <SelectItem value="found-alternative">Found an alternative</SelectItem>
                <SelectItem value="privacy-concerns">Privacy concerns</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="feedback">Additional feedback (optional)</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Help us improve by sharing your experience..."
              rows={4}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="destructive"
              disabled={!reason || loading}
              className="flex-1"
            >
              {loading ? 'Submitting...' : 'Submit Deletion Request'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
