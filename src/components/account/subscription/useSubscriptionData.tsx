
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionPlan, UserSubscription } from './types';

export const useSubscriptionData = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPlansAndSubscription = async () => {
    try {
      // Fetch subscription plans
      const { data: plansData, error: plansError } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly');

      if (plansError) throw plansError;

      // Transform the data to match our SubscriptionPlan interface
      const transformedPlans: SubscriptionPlan[] = (plansData || []).map(plan => ({
        id: plan.id,
        name: plan.name,
        description: plan.description || '',
        price_monthly: plan.price_monthly,
        price_yearly: plan.price_yearly,
        features: Array.isArray(plan.features) ? plan.features as string[] : [],
        is_active: plan.is_active || false,
      }));

      // Fetch current user subscription
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .eq('status', 'active')
        .single();

      if (subscriptionError && subscriptionError.code !== 'PGRST116') {
        throw subscriptionError;
      }

      setPlans(transformedPlans);
      setCurrentSubscription(subscriptionData);
    } catch (error) {
      console.error('Error fetching subscription data:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription information.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId: string) => {
    toast({
      title: "Upgrade Started",
      description: "Redirecting to payment processing...",
    });
    // In a real implementation, this would integrate with Stripe
  };

  const handleCancelSubscription = async () => {
    if (!currentSubscription) return;

    try {
      const { error } = await supabase
        .from('user_subscriptions')
        .update({ cancel_at_period_end: true })
        .eq('id', currentSubscription.id);

      if (error) throw error;

      toast({
        title: "Subscription Cancelled",
        description: "Your subscription will end at the current billing period.",
      });

      fetchPlansAndSubscription();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPlansAndSubscription();
  }, []);

  return {
    plans,
    currentSubscription,
    loading,
    handleUpgrade,
    handleCancelSubscription,
    refreshData: fetchPlansAndSubscription
  };
};
