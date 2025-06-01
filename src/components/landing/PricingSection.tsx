
import React, { useState } from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowRight,
  Check,
  Star,
  Shield,
  Zap,
  Users,
  Building,
  Crown,
  Calculator,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  CreditCard,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const pricingTiers = [
    {
      id: 'solo',
      name: 'Solo',
      description: 'Perfect for individual developers',
      monthlyPrice: 49,
      annualPrice: 39,
      icon: Users,
      color: 'text-blue-500',
      bgGradient: 'from-blue-50/50 to-blue-100/50',
      borderColor: 'border-blue-200/50',
      features: [
        { name: 'Up to 5 AI Agents', included: true },
        { name: 'Up to 3 Projects', included: true },
        { name: 'Basic Planning Tools', included: true },
        { name: 'Code Generation & Review', included: true },
        { name: 'Community Support', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Standard Templates', included: true },
        { name: 'Priority Support', included: false },
        { name: 'Advanced Integrations', included: false },
        { name: 'Custom Workflows', included: false }
      ],
      limits: {
        agents: '5 agents',
        projects: '3 projects',
        storage: '10GB storage'
      }
    },
    {
      id: 'team',
      name: 'Team',
      description: 'Ideal for small to medium teams',
      monthlyPrice: 99,
      annualPrice: 79,
      icon: Zap,
      color: 'text-vibe-primary',
      bgGradient: 'from-vibe-primary/10 to-vibe-secondary/10',
      borderColor: 'border-vibe-primary/30',
      isPopular: true,
      features: [
        { name: 'Unlimited AI Agents', included: true },
        { name: 'Unlimited Projects', included: true },
        { name: 'Advanced Planning Tools', included: true },
        { name: 'Code Generation & Review', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Premium Templates', included: true },
        { name: 'Team Collaboration', included: true },
        { name: 'Advanced Integrations', included: true },
        { name: 'Custom Workflows', included: false }
      ],
      limits: {
        agents: 'Unlimited',
        projects: 'Unlimited',
        storage: '100GB storage'
      }
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For growing organizations',
      monthlyPrice: 249,
      annualPrice: 199,
      icon: Building,
      color: 'text-purple-500',
      bgGradient: 'from-purple-50/50 to-purple-100/50',
      borderColor: 'border-purple-200/50',
      features: [
        { name: 'Unlimited AI Agents', included: true },
        { name: 'Unlimited Projects', included: true },
        { name: 'Advanced Planning Tools', included: true },
        { name: 'Code Generation & Review', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Premium Templates', included: true },
        { name: 'Team Collaboration', included: true },
        { name: 'Advanced Integrations', included: true },
        { name: 'Custom Workflows', included: true },
        { name: 'SSO & Advanced Security', included: true },
        { name: 'Dedicated Account Manager', included: true }
      ],
      limits: {
        agents: 'Unlimited',
        projects: 'Unlimited',
        storage: '500GB storage'
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom solutions for large teams',
      monthlyPrice: null,
      annualPrice: null,
      icon: Crown,
      color: 'text-amber-500',
      bgGradient: 'from-amber-50/50 to-amber-100/50',
      borderColor: 'border-amber-200/50',
      features: [
        { name: 'Everything in Business', included: true },
        { name: 'Custom AI Agent Development', included: true },
        { name: 'On-premise Deployment', included: true },
        { name: 'Custom Integrations', included: true },
        { name: '24/7 Dedicated Support', included: true },
        { name: 'Custom SLA', included: true },
        { name: 'Advanced Compliance', included: true },
        { name: 'Training & Onboarding', included: true }
      ],
      limits: {
        agents: 'Unlimited',
        projects: 'Unlimited',
        storage: 'Unlimited'
      }
    }
  ];

  const getPrice = (tier: typeof pricingTiers[0]) => {
    if (tier.monthlyPrice === null) return 'Custom';
    return billingCycle === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
  };

  const getSavings = (tier: typeof pricingTiers[0]) => {
    if (tier.monthlyPrice === null || tier.annualPrice === null) return null;
    return Math.round(((tier.monthlyPrice - tier.annualPrice) / tier.monthlyPrice) * 100);
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

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
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
          </div>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingTiers.map((tier, index) => (
            <AnimatedSection key={tier.id} animation="fade-up" delay={200 + index * 100}>
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
                          ${getPrice(tier)}
                          <span className="text-lg font-normal text-muted-foreground">/month</span>
                        </div>
                        {billingCycle === 'annual' && getSavings(tier) && (
                          <div className="text-sm text-vibe-primary font-medium">
                            Save {getSavings(tier)}% annually
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
                      onClick={() => setSelectedTier(selectedTier === tier.id ? null : tier.id)}
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
                  onClick={() => handleGetStarted(tier.id)}
                >
                  {tier.monthlyPrice === null ? 'Contact Sales' : 'Start Free Trial'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </EnhancedButton>
              </EnhancedCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <AnimatedSection animation="fade-up" delay={600}>
          <div className="text-center mb-8">
            <Button
              variant="outline"
              onClick={() => setShowComparison(!showComparison)}
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
        </AnimatedSection>

        {/* ROI Calculator Section */}
        <AnimatedSection animation="fade-up" delay={700}>
          <div className="mt-16 text-center">
            <EnhancedCard className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-vibe-primary/5 to-vibe-secondary/5">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Calculator className="w-6 h-6 text-vibe-primary" />
                <h3 className="text-2xl font-bold">Return on Investment</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-vibe-primary mb-2">300%</div>
                  <div className="text-sm text-muted-foreground">Faster Development</div>
                  <div className="text-xs text-muted-foreground mt-1">vs. traditional methods</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-vibe-secondary mb-2">$4,000+</div>
                  <div className="text-sm text-muted-foreground">Monthly Savings</div>
                  <div className="text-xs text-muted-foreground mt-1">per developer equivalent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-vibe-accent mb-2">2 Hours</div>
                  <div className="text-sm text-muted-foreground">Break-even Time</div>
                  <div className="text-xs text-muted-foreground mt-1">of saved development</div>
                </div>
              </div>
              
              <p className="text-muted-foreground text-center max-w-2xl mx-auto">
                Our customers typically save 20+ hours per week worth $2,000-3,000 in development costs, 
                making Vibe DevSquad pay for itself in just the first day of use.
              </p>
            </EnhancedCard>
          </div>
        </AnimatedSection>

        {/* Trust Indicators */}
        <AnimatedSection animation="fade-up" delay={800}>
          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <Shield className="w-5 h-5 text-green-500" />
                <div className="text-left">
                  <div className="text-sm font-medium">Enterprise Security</div>
                  <div className="text-xs text-muted-foreground">SOC 2 Type II</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <div className="text-left">
                  <div className="text-sm font-medium">99.9% Uptime</div>
                  <div className="text-xs text-muted-foreground">Guaranteed SLA</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Users className="w-5 h-5 text-purple-500" />
                <div className="text-left">
                  <div className="text-sm font-medium">2,500+ Teams</div>
                  <div className="text-xs text-muted-foreground">Trusted globally</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Sparkles className="w-5 h-5 text-vibe-primary" />
                <div className="text-left">
                  <div className="text-sm font-medium">5-Min Setup</div>
                  <div className="text-xs text-muted-foreground">Start immediately</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ or Additional Info */}
        <AnimatedSection animation="fade-up" delay={900}>
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Info className="w-4 h-4" />
                <span>All plans include: 14-day free trial • No setup fees • Cancel anytime • 24/7 support</span>
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-vibe-energy/10 rounded-full text-sm text-vibe-energy font-medium">
                <div className="w-2 h-2 bg-vibe-energy rounded-full animate-pulse mr-2"></div>
                147 teams signed up in the last 7 days
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
