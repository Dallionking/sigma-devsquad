
import React from 'react';
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp, Star, ArrowRight } from "lucide-react";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingTierData {
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

interface PricingTierProps {
  tier: PricingTierData;
  billingCycle: 'monthly' | 'annual';
  selectedTier: string | null;
  onToggleFeatures: (tierId: string) => void;
  onGetStarted: (tierId: string) => void;
}

export const PricingTier = ({ 
  tier, 
  billingCycle, 
  selectedTier, 
  onToggleFeatures, 
  onGetStarted 
}: PricingTierProps) => {
  const getPrice = () => {
    if (tier.monthlyPrice === null) return 'Custom';
    return billingCycle === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
  };

  const getSavings = () => {
    if (tier.monthlyPrice === null || tier.annualPrice === null) return null;
    return Math.round(((tier.monthlyPrice - tier.annualPrice) / tier.monthlyPrice) * 100);
  };

  return (
    <EnhancedCard 
      className={`p-6 h-full relative ${tier.bgGradient} ${tier.borderColor} ${
        tier.isPopular ? 'ring-2 ring-vibe-primary ring-offset-2' : ''
      }`}
      hoverEffect="lift"
    >
      {tier.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-vibe-primary text-white px-3 py-1">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <div className="text-center mb-6">
        <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center ${tier.borderColor} border`}>
          <tier.icon className={`w-6 h-6 ${tier.color}`} />
        </div>
        <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
        
        <div className="mb-4">
          {tier.monthlyPrice === null ? (
            <div className="text-3xl font-bold">Custom</div>
          ) : (
            <>
              <div className="text-3xl font-bold">
                ${getPrice()}
                <span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              {billingCycle === 'annual' && getSavings() && (
                <div className="text-sm text-vibe-primary font-medium">
                  Save {getSavings()}% annually
                </div>
              )}
            </>
          )}
        </div>

        <div className="text-xs text-muted-foreground mb-6">
          {tier.limits.agents} • {tier.limits.projects} • {tier.limits.storage}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {tier.features.slice(0, 5).map((feature, featureIndex) => (
          <div key={featureIndex} className="flex items-center space-x-2">
            <Check className={`w-4 h-4 ${feature.included ? 'text-green-500' : 'text-muted-foreground/30'}`} />
            <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/50'}`}>
              {feature.name}
            </span>
          </div>
        ))}
        {tier.features.length > 5 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFeatures(tier.id)}
            className="w-full text-xs"
          >
            {selectedTier === tier.id ? (
              <>Show Less <ChevronUp className="w-3 h-3 ml-1" /></>
            ) : (
              <>Show All Features <ChevronDown className="w-3 h-3 ml-1" /></>
            )}
          </Button>
        )}
        {selectedTier === tier.id && tier.features.slice(5).map((feature, featureIndex) => (
          <div key={featureIndex + 5} className="flex items-center space-x-2">
            <Check className={`w-4 h-4 ${feature.included ? 'text-green-500' : 'text-muted-foreground/30'}`} />
            <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/50'}`}>
              {feature.name}
            </span>
          </div>
        ))}
      </div>

      <EnhancedButton
        variant={tier.isPopular ? "enhanced-primary" : "enhanced-secondary"}
        className="w-full"
        onClick={() => onGetStarted(tier.id)}
      >
        {tier.monthlyPrice === null ? 'Contact Sales' : 'Start Free Trial'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </EnhancedButton>
    </EnhancedCard>
  );
};
