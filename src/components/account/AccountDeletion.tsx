
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Shield, Clock } from "lucide-react";

export const AccountDeletion = () => {
  const { toast } = useToast();
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const handleRequestDeletion = async () => {
    if (confirmationText !== 'DELETE MY ACCOUNT') {
      toast({
        title: "Confirmation Required",
        description: "Please type 'DELETE MY ACCOUNT' to confirm.",
        variant: "destructive",
      });
      return;
    }

    if (!acknowledged) {
      toast({
        title: "Acknowledgment Required",
        description: "Please acknowledge that you understand the consequences.",
        variant: "destructive",
      });
      return;
    }

    setRequesting(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      // Generate a unique confirmation token
      const confirmationToken = crypto.randomUUID();
      
      // Schedule deletion for 30 days from now
      const scheduledDate = new Date();
      scheduledDate.setDate(scheduledDate.getDate() + 30);

      const { error } = await supabase
        .from('account_deletion_requests')
        .insert({
          user_id: user.user.id,
          reason,
          feedback,
          confirmation_token: confirmationToken,
          scheduled_deletion_date: scheduledDate.toISOString(),
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Account Deletion Requested",
        description: "Your account will be deleted in 30 days. You'll receive a confirmation email.",
      });

      // Reset form
      setReason('');
      setFeedback('');
      setConfirmationText('');
      setAcknowledged(false);
    } catch (error) {
      console.error('Error requesting account deletion:', error);
      toast({
        title: "Error",
        description: "Failed to request account deletion.",
        variant: "destructive",
      });
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Card */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </div>
          <CardDescription>
            Account deletion is permanent and cannot be undone. Please read carefully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                What happens when you delete your account:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>All your personal data will be permanently removed</li>
                <li>Your subscription will be cancelled immediately</li>
                <li>All agents and projects will be deleted</li>
                <li>Your username will become available to others</li>
                <li>This action cannot be reversed</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Grace Period
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Account deletion is scheduled for 30 days after your request. During this time, 
                you can cancel the deletion request by contacting support.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deletion Request Form */}
      <Card>
        <CardHeader>
          <CardTitle>Request Account Deletion</CardTitle>
          <CardDescription>
            Please provide some information about why you're leaving
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for leaving (optional)</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-using">Not using the service</SelectItem>
                <SelectItem value="too-expensive">Too expensive</SelectItem>
                <SelectItem value="found-alternative">Found an alternative</SelectItem>
                <SelectItem value="privacy-concerns">Privacy concerns</SelectItem>
                <SelectItem value="technical-issues">Technical issues</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Additional feedback (optional)</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Help us improve by sharing your experience..."
              rows={4}
            />
          </div>

          <div className="space-y-4 p-4 border-2 border-destructive/20 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="confirmation">
                Type "DELETE MY ACCOUNT" to confirm
              </Label>
              <Input
                id="confirmation"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="DELETE MY ACCOUNT"
                className="font-mono"
              />
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="acknowledge"
                checked={acknowledged}
                onCheckedChange={(checked) => setAcknowledged(checked === true)}
              />
              <Label htmlFor="acknowledge" className="text-sm leading-5">
                I understand that this action is permanent and irreversible. 
                All my data, including agents, projects, and subscription information 
                will be permanently deleted after 30 days.
              </Label>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={handleRequestDeletion}
            disabled={requesting || confirmationText !== 'DELETE MY ACCOUNT' || !acknowledged}
            className="w-full"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            {requesting ? 'Processing...' : 'Request Account Deletion'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
