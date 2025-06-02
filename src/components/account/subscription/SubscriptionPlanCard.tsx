
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { SubscriptionPlan, BillingCycle } from './types';
import { getPlanIcon, formatPrice } from './utils';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  billingCycle: BillingCycle;
  isCurrentPlan: boolean;
  onUpgrade: (planId: string) => void;
}

export const SubscriptionPlanCard = ({
  plan,
  billingCycle,
  isCurrentPlan,
  onUpgrade
}: SubscriptionPlanCardProps) => {
  const price = billingCycle === 'monthly' ? plan.price_monthly : plan.price_yearly;
  const IconComponent = getPlanIcon(plan.name);

  return (
    <Card className={`relative ${isCurrentPlan ? 'ring-2 ring-vibe-primary' : ''}`}>
      {isCurrentPlan && (
        <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
          Current Plan
        </Badge>
      )}
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <IconComponent className="w-5 h-5" />
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
          onClick={() => onUpgrade(plan.id)}
        >
          {isCurrentPlan ? 'Current Plan' : 'Upgrade to ' + plan.name}
        </Button>
      </CardContent>
    </Card>
  );
};
