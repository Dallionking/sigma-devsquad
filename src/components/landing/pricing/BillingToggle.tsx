
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BillingToggleProps {
  billingCycle: 'monthly' | 'annual';
  onToggle: () => void;
}

export const BillingToggle = ({ billingCycle, onToggle }: BillingToggleProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-12">
      <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
        Monthly
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="relative w-12 h-6 p-0 border-2"
      >
        <div className={`absolute w-4 h-4 bg-primary rounded-full transition-transform duration-200 ${
          billingCycle === 'annual' ? 'translate-x-3' : '-translate-x-3'
        }`} />
      </Button>
      <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
        Annual
      </span>
      <Badge variant="secondary" className="ml-2">Save 20%</Badge>
    </div>
  );
};
