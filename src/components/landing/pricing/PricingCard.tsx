
import React from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PricingPlan } from './types';

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
  className?: string;
}

export const PricingCard = ({ plan, isYearly, className = '' }: PricingCardProps) => {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const isEnterprise = plan.isEnterprise;

  return (
    <Card className={`
      relative overflow-hidden transition-all duration-300 h-full
      ${plan.isRecommended 
        ? 'border-vibe-primary/50 shadow-xl scale-105 bg-gradient-to-br from-vibe-primary/5 to-vibe-secondary/5' 
        : 'border-border hover:border-vibe-primary/30 hover:shadow-lg'
      }
      ${className}
    `}>
      {/* Recommended Badge */}
      {plan.isRecommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-1 px-3 py-1 bg-vibe-primary text-white text-sm font-semibold rounded-full">
            <Star className="w-3 h-3 fill-current" />
            Recommended
          </div>
        </div>
      )}

      <CardHeader className="text-center pb-6 pt-8">
        <h3 className="vibe-heading-md text-foreground mb-2">{plan.name}</h3>
        <p className="vibe-body text-muted-foreground mb-6">{plan.description}</p>
        
        {/* Pricing */}
        <div className="mb-6">
          {isEnterprise ? (
            <div>
              <div className="vibe-heading-lg text-foreground">Custom Pricing</div>
              <div className="vibe-body-sm text-muted-foreground">Contact us for a quote</div>
            </div>
          ) : (
            <div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold text-foreground">${price}</span>
                <span className="vibe-body text-muted-foreground">
                  /{isYearly ? 'year' : 'month'}
                </span>
              </div>
              {isYearly && (
                <div className="vibe-body-sm text-green-600 font-medium">
                  Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button 
          className={`w-full ${
            plan.isRecommended 
              ? 'vibe-btn-primary' 
              : 'border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary/10'
          }`}
          variant={plan.isRecommended ? 'default' : 'outline'}
        >
          {isEnterprise ? 'Contact Sales' : 'Get Started'}
        </Button>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Plan Limits */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="vibe-body-sm text-muted-foreground space-y-1">
            <div>{plan.limits.projects}</div>
            <div>{plan.limits.integration}</div>
            <div>{plan.limits.support}</div>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground mb-3">Everything included:</h4>
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-vibe-primary mt-0.5 flex-shrink-0" />
              <span className="vibe-body-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
