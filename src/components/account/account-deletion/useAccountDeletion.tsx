
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AccountDeletionRequest } from './types';

export const useAccountDeletion = () => {
  const { toast } = useToast();
  const [deletionRequest, setDeletionRequest] = useState<AccountDeletionRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchDeletionRequest = async () => {
    try {
      const { data, error } = await supabase
        .from('account_deletion_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      setDeletionRequest(data);
    } catch (error) {
      console.error('Error fetching deletion request:', error);
      toast({
        title: "Error",
        description: "Failed to load deletion request status.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitDeletionRequest = async (reason: string, feedback: string) => {
    setSubmitting(true);

    try {
      // Calculate deletion date (7 days from now)
      const deletionDate = new Date();
      deletionDate.setDate(deletionDate.getDate() + 7);

      // Generate a confirmation token
      const confirmationToken = crypto.randomUUID();

      const { error } = await supabase
        .from('account_deletion_requests')
        .insert({
          reason,
          feedback,
          scheduled_deletion_date: deletionDate.toISOString(),
          status: 'pending',
          confirmation_token: confirmationToken
        });

      if (error) throw error;

      toast({
        title: "Deletion Request Submitted",
        description: "Your account deletion has been scheduled. You can cancel it anytime before the deletion date.",
      });

      fetchDeletionRequest();
    } catch (error) {
      console.error('Error submitting deletion request:', error);
      toast({
        title: "Error",
        description: "Failed to submit deletion request.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const cancelDeletionRequest = async () => {
    if (!deletionRequest) return;

    try {
      const { error } = await supabase
        .from('account_deletion_requests')
        .update({ status: 'cancelled' })
        .eq('id', deletionRequest.id);

      if (error) throw error;

      toast({
        title: "Deletion Cancelled",
        description: "Your account deletion request has been cancelled.",
      });

      fetchDeletionRequest();
    } catch (error) {
      console.error('Error cancelling deletion request:', error);
      toast({
        title: "Error",
        description: "Failed to cancel deletion request.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDeletionRequest();
  }, []);

  return {
    deletionRequest,
    loading,
    submitting,
    submitDeletionRequest,
    cancelDeletionRequest,
    refreshData: fetchDeletionRequest
  };
};
