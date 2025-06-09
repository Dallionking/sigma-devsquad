
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserSubscription, SubscriptionPlan } from './types';

interface CurrentSubscriptionCardProps {
  currentSubscription: UserSubscription;
  plans: SubscriptionPlan[];
  onCancelSubscription: () => void;
}

export const CurrentSubscriptionCard = ({
  currentSubscription,
  plans,
  onCancelSubscription
}: CurrentSubscriptionCardProps) => {
  return (
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
            <Button variant="outline" onClick={onCancelSubscription}>
              Cancel Subscription
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
