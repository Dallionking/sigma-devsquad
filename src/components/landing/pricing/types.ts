
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isRecommended?: boolean;
  isEnterprise?: boolean;
  features: string[];
  limits: {
    projects: string;
    integration: string;
    support: string;
  };
}

export interface PricingFeature {
  name: string;
  individual: boolean | string;
  professional: boolean | string;
  team: boolean | string;
  enterprise: boolean | string;
}
