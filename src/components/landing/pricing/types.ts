
export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingTierData {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  icon: React.ComponentType<any>;
  color: string;
  bgGradient: string;
  borderColor: string;
  isPopular?: boolean;
  features: PricingFeature[];
  limits: {
    agents: string;
    projects: string;
    storage: string;
  };
}
