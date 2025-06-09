
import { Users, Zap, Building, Crown } from "lucide-react";
import { PricingTierData } from "./types";

export const pricingTiers: PricingTierData[] = [
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
