
import React from 'react';
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingTierData {
  id: string;
  name: string;
  description: string;
  features: PricingFeature[];
}

interface FeatureComparisonProps {
  showComparison: boolean;
  onToggleComparison: () => void;
  pricingTiers: PricingTierData[];
}

export const FeatureComparison = ({ showComparison, onToggleComparison, pricingTiers }: FeatureComparisonProps) => {
  return (
    <>
      <div className="text-center mb-8">
        <Button
          variant="outline"
          onClick={onToggleComparison}
          className="inline-flex items-center space-x-2"
        >
          <span>Compare All Features</span>
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {showComparison && (
        <EnhancedCard className="p-6 overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="font-semibold">Features</div>
              {pricingTiers.map(tier => (
                <div key={tier.id} className="text-center">
                  <div className="font-semibold">{tier.name}</div>
                  <div className="text-sm text-muted-foreground">{tier.description}</div>
                </div>
              ))}
            </div>
            <Separator className="mb-6" />
            {['Planning & Management', 'Development Tools', 'Collaboration', 'Analytics & Insights', 'Support & Security'].map(category => (
              <div key={category} className="mb-6">
                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">{category}</h4>
                {pricingTiers[0].features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="grid grid-cols-5 gap-4 py-2 border-b border-border/50">
                    <div className="text-sm">{feature.name}</div>
                    {pricingTiers.map(tier => {
                      const tierFeature = tier.features[featureIndex];
                      return (
                        <div key={tier.id} className="text-center">
                          {tierFeature?.included ? (
                            <Check className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            <div className="w-4 h-4 mx-auto" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </EnhancedCard>
      )}
    </>
  );
};
