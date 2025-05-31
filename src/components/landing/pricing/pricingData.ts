
import { PricingPlan, PricingFeature } from './types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'individual',
    name: 'Individual',
    description: 'Basic orchestration for solo developers and freelancers',
    monthlyPrice: 49,
    yearlyPrice: 39, // 20% discount
    features: [
      'Basic AI orchestration',
      'Standard LLM integration',
      'Core development tools',
      'Email support',
      'Basic templates',
    ],
    limits: {
      projects: 'Up to 3 concurrent projects',
      integration: 'Standard LLM integration',
      support: 'Email support',
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Advanced integrations and comprehensive dashboards for growing teams',
    monthlyPrice: 99,
    yearlyPrice: 79, // 20% discount
    isRecommended: true,
    features: [
      'Advanced AI orchestration',
      'Full team structure',
      'Advanced analytics dashboard',
      'Priority support',
      'Premium templates',
      'Code review automation',
      'Advanced integrations',
    ],
    limits: {
      projects: 'Up to 10 concurrent projects',
      integration: 'Full team structure',
      support: 'Priority support',
    },
  },
  {
    id: 'team',
    name: 'Team',
    description: 'Custom team structures and collaboration features for development shops',
    monthlyPrice: 249,
    yearlyPrice: 199, // 20% discount
    features: [
      'Custom team structures',
      'Premium LLM integration',
      'Advanced collaboration tools',
      'Real-time sync',
      'Custom workflows',
      'Advanced security',
      'Dedicated account manager',
    ],
    limits: {
      projects: 'Up to 20 concurrent projects',
      integration: 'Premium LLM integration',
      support: 'Dedicated account manager',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Fully customized solutions and dedicated support for large organizations',
    monthlyPrice: 0,
    yearlyPrice: 0,
    isEnterprise: true,
    features: [
      'Unlimited everything',
      'Enterprise integration',
      'Custom development',
      '24/7 dedicated support',
      'SLA guarantees',
      'On-premise deployment',
      'Custom training',
      'White-label options',
    ],
    limits: {
      projects: 'Unlimited projects',
      integration: 'Enterprise integration',
      support: '24/7 dedicated support',
    },
  },
];

export const pricingFeatures: PricingFeature[] = [
  {
    name: 'Concurrent Projects',
    individual: '3 projects',
    professional: '10 projects',
    team: '20 projects',
    enterprise: 'Unlimited',
  },
  {
    name: 'LLM Integration',
    individual: 'Standard',
    professional: 'Advanced',
    team: 'Premium',
    enterprise: 'Enterprise',
  },
  {
    name: 'Team Structure',
    individual: false,
    professional: true,
    team: true,
    enterprise: true,
  },
  {
    name: 'Analytics Dashboard',
    individual: 'Basic',
    professional: 'Advanced',
    team: 'Advanced',
    enterprise: 'Custom',
  },
  {
    name: 'Code Review Automation',
    individual: false,
    professional: true,
    team: true,
    enterprise: true,
  },
  {
    name: 'Real-time Collaboration',
    individual: false,
    professional: 'Basic',
    team: 'Advanced',
    enterprise: 'Custom',
  },
  {
    name: 'Custom Workflows',
    individual: false,
    professional: false,
    team: true,
    enterprise: true,
  },
  {
    name: 'Support Level',
    individual: 'Email',
    professional: 'Priority',
    team: 'Dedicated',
    enterprise: '24/7 Dedicated',
  },
];
