
import {
  Home,
  Layers,
  Folder,
  Presentation,
  Bot,
  Package,
  Brain,
  Monitor,
  User,
  CreditCard,
  Users,
  Settings
} from 'lucide-react';

export const navigationConfig = [
  // Main Navigation
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: Home,
    category: 'main' as const,
    showInMobile: true,
    showInHeader: true
  },
  {
    id: 'planning-agent',
    label: 'Planning Agent',
    path: '/planning-agent',
    icon: Layers,
    category: 'main' as const,
    showInMobile: true,
    showInHeader: true
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    icon: Folder,
    category: 'main' as const,
    showInMobile: true,
    showInHeader: true
  },
  {
    id: 'presentations',
    label: 'Presentations',
    path: '/presentations',
    icon: Presentation,
    category: 'main' as const,
    showInMobile: true,
    showInHeader: true
  },

  // Configuration Navigation
  {
    id: 'agent-configuration',
    label: 'Agent Configuration',
    path: '/agent-configuration',
    icon: Bot,
    category: 'configuration' as const,
    showInMobile: true,
    showInHeader: false
  },
  {
    id: 'mcp-management',
    label: 'MCP Management',
    path: '/mcp-management',
    icon: Package,
    category: 'configuration' as const,
    showInMobile: true,
    showInHeader: false
  },
  {
    id: 'llm-integration',
    label: 'LLM Integration',
    path: '/llm-integration',
    icon: Brain,
    category: 'configuration' as const,
    showInMobile: true,
    showInHeader: false
  },
  {
    id: 'ide-integration',
    label: 'IDE Integration',
    path: '/ide-integration',
    icon: Monitor,
    category: 'configuration' as const,
    showInMobile: true,
    showInHeader: false
  },

  // Account Navigation
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: User,
    category: 'account' as const,
    showInMobile: true,
    showInHeader: false
  },
  {
    id: 'account',
    label: 'Account & Billing',
    path: '/account',
    icon: CreditCard,
    category: 'account' as const,
    showInMobile: true,
    showInHeader: false
  },
  {
    id: 'teams',
    label: 'Teams',
    path: '/teams',
    icon: Users,
    category: 'account' as const,
    showInMobile: true,
    showInHeader: false
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: Settings,
    category: 'account' as const,
    showInMobile: true,
    showInHeader: false
  }
];
