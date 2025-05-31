
import React, { useState } from 'react';
import { PricingHeader } from './pricing/PricingHeader';
import { BillingToggle } from './pricing/BillingToggle';
import { PricingCard } from './pricing/PricingCard';
import { FeatureComparison } from './pricing/FeatureComparison';
import { ROICalculator } from './pricing/ROICalculator';
import { PricingCallToAction } from './pricing/PricingCallToAction';
import { pricingPlans } from './pricing/pricingData';

export const LandingPricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="section-padding bg-gradient-to-b from-background to-background/95" id="pricing">
      <div className="container-responsive">
        <PricingHeader />
        
        <BillingToggle isYearly={isYearly} onToggle={setIsYearly} />
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div key={plan.id} className={`fade-in-up stagger-${index + 2}`}>
              <PricingCard plan={plan} isYearly={isYearly} />
            </div>
          ))}
        </div>

        <FeatureComparison />
        
        <ROICalculator />
        
        <PricingCallToAction />
      </div>
    </section>
  );
};
