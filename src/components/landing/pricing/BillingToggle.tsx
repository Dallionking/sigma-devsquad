
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface BillingToggleProps {
  isYearly: boolean;
  onToggle: (yearly: boolean) => void;
}

export const BillingToggle = ({ isYearly, onToggle }: BillingToggleProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-12 fade-in-up stagger-1">
      <Label htmlFor="billing-toggle" className={`font-medium transition-colors ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
        Monthly
      </Label>
      
      <div className="relative">
        <Switch
          id="billing-toggle"
          checked={isYearly}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-vibe-primary"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Label htmlFor="billing-toggle" className={`font-medium transition-colors ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
          Yearly
        </Label>
        <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
          Save 20%
        </div>
      </div>
    </div>
  );
};
