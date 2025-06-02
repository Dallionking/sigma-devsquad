
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Crown, Zap } from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  is_active: boolean;
}

interface UserSubscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  billing_cycle: string;
}

export const SubscriptionManagement = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    fetchPlansAndSubscription();
  }, []);

  const fetchPlansAndSubscription = async () => {
    try {
      // Fetch subscription plans
      const { data: plansData, error: plansError } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly');

      if (plansError) throw plansError;

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

      setPlans(plansData || []);
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

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'pro': return <Zap className="w-5 h-5" />;
      case 'enterprise': return <Crown className="w-5 h-5" />;
      default: return <Check className="w-5 h-5" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded mb-4"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-3 bg-muted rounded"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      {currentSubscription && (
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>Your active subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={currentSubscription.status === 'active' ? 'default' : 'secondary'}>
                    {currentSubscription.status}
                  </Badge>
                  <span className="font-medium">
                    {plans.find(p => p.id === currentSubscription.plan_id)?.name || 'Unknown Plan'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentSubscription.cancel_at_period_end 
                    ? `Cancels on ${new Date(currentSubscription.current_period_end).toLocaleDateString()}`
                    : `Renews on ${new Date(currentSubscription.current_period_end).toLocaleDateString()}`
                  }
                </p>
              </div>
              {!currentSubscription.cancel_at_period_end && (
                <Button variant="outline" onClick={handleCancelSubscription}>
                  Cancel Subscription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center">
        <div className="flex items-center p-1 bg-muted rounded-lg">
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
            <Badge variant="secondary" className="ml-2 text-xs">Save 20%</Badge>
          </Button>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrentPlan = currentSubscription?.plan_id === plan.id;
          const price = billingCycle === 'monthly' ? plan.price_monthly : plan.price_yearly;
          
          return (
            <Card key={plan.id} className={`relative ${isCurrentPlan ? 'ring-2 ring-vibe-primary' : ''}`}>
              {isCurrentPlan && (
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
                  Current Plan
                </Badge>
              )}
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {getPlanIcon(plan.name)}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="text-3xl font-bold">
                  {formatPrice(price)}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={isCurrentPlan ? "secondary" : "default"}
                  disabled={isCurrentPlan}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {isCurrentPlan ? 'Current Plan' : 'Upgrade to ' + plan.name}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
