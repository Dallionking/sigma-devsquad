
import React, { useState } from 'react';
import { useSubscriptionData } from './subscription/useSubscriptionData';
import { CurrentSubscriptionCard } from './subscription/CurrentSubscriptionCard';
import { BillingCycleToggle } from './subscription/BillingCycleToggle';
import { SubscriptionPlanCard } from './subscription/SubscriptionPlanCard';
import { SubscriptionLoadingState } from './subscription/SubscriptionLoadingState';
import { BillingCycle } from './subscription/types';

export const SubscriptionManagement = () => {
  const {
    plans,
    currentSubscription,
    loading,
    handleUpgrade,
    handleCancelSubscription
  } = useSubscriptionData();
  
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  if (loading) {
    return <SubscriptionLoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      {currentSubscription && (
        <CurrentSubscriptionCard
          currentSubscription={currentSubscription}
          plans={plans}
          onCancelSubscription={handleCancelSubscription}
        />
      )}

      {/* Billing Cycle Toggle */}
      <BillingCycleToggle
        billingCycle={billingCycle}
        onBillingCycleChange={setBillingCycle}
      />

      {/* Subscription Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrentPlan = currentSubscription?.plan_id === plan.id;
          
          return (
            <SubscriptionPlanCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              isCurrentPlan={isCurrentPlan}
              onUpgrade={handleUpgrade}
            />
          );
        })}
      </div>
    </div>
  );
};
