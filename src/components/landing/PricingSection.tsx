
import React, { useState } from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { PricingComparisonSection } from "./PricingComparisonSection";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard } from "lucide-react";
import { BillingToggle } from "./pricing/BillingToggle";
import { PricingTier } from "./pricing/PricingTier";
import { FeatureComparison } from "./pricing/FeatureComparison";
import { ROISection } from "./pricing/ROISection";
import { TrustIndicators } from "./pricing/TrustIndicators";
import { pricingTiers } from "./pricing/pricingData";

export const PricingSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [showComparison, setShowComparison] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleGetStarted = (tier: string) => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate(`/auth?tab=signup&plan=${tier}`);
    }
  };

  return (
    <section id="pricing" className="py-12 md:py-24 bg-gradient-to-b from-muted/30 via-muted/20 to-transparent relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-vibe-primary/10 to-vibe-secondary/10 rounded-full border border-vibe-primary/20 mb-6 backdrop-blur-sm">
              <CreditCard className="w-4 h-4 text-vibe-primary mr-2" />
              <span className="text-sm font-medium text-vibe-primary">Transparent Pricing</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Start free and scale as you grow. All plans include a 14-day free trial with no credit card required.
            </p>

            <BillingToggle 
              billingCycle={billingCycle}
              onToggle={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            />
          </div>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingTiers.map((tier, index) => (
            <AnimatedSection key={tier.id} animation="fade-up" delay={200 + index * 100}>
              <PricingTier
                tier={tier}
                billingCycle={billingCycle}
                selectedTier={selectedTier}
                onToggleFeatures={(tierId) => setSelectedTier(selectedTier === tierId ? null : tierId)}
                onGetStarted={handleGetStarted}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* Add Pricing Comparison Section */}
        <PricingComparisonSection />

        {/* Feature Comparison Table */}
        <AnimatedSection animation="fade-up" delay={600}>
          <FeatureComparison
            showComparison={showComparison}
            onToggleComparison={() => setShowComparison(!showComparison)}
            pricingTiers={pricingTiers}
          />
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={700}>
          <ROISection />
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={800}>
          <TrustIndicators />
        </AnimatedSection>
      </div>
    </section>
  );
};
