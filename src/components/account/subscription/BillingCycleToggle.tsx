
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BillingCycle } from './types';

interface BillingCycleToggleProps {
  billingCycle: BillingCycle;
  onBillingCycleChange: (cycle: BillingCycle) => void;
}

export const BillingCycleToggle = ({
  billingCycle,
  onBillingCycleChange
}: BillingCycleToggleProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center p-1 bg-muted rounded-lg">
        <Button
          variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onBillingCycleChange('monthly')}
        >
          Monthly
        </Button>
        <Button
          variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onBillingCycleChange('yearly')}
        >
          Yearly
          <Badge variant="secondary" className="ml-2 text-xs">Save 20%</Badge>
        </Button>
      </div>
    </div>
  );
};
