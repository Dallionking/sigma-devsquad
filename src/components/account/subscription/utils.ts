
import { Check, Crown, Zap } from "lucide-react";

export const getPlanIcon = (planName: string) => {
  switch (planName.toLowerCase()) {
    case 'pro': return Zap;
    case 'enterprise': return Crown;
    default: return Check;
  }
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100);
};
