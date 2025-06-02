
import { 
  Home,
  Layers,
  Folder,
  Bot,
  Package,
  Brain,
  Monitor,
  Settings,
  User,
  CreditCard,
  Users
} from 'lucide-react';
import { NavItem } from './types';

export const navigationItems: NavItem[] = [
  // Primary navigation
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: Home, level: 'primary' },
  { id: 'planning', label: 'Planning Agent', path: '/planning-agent', icon: Layers, level: 'primary' },
  { id: 'projects', label: 'Projects', path: '/projects', icon: Folder, level: 'primary' },
  
  // Configuration section
  { id: 'agent-config', label: 'Agent Config', path: '/agent-configuration', icon: Bot, level: 'secondary', category: 'Configuration' },
  { id: 'mcp', label: 'MCP Management', path: '/mcp-management', icon: Package, level: 'secondary', category: 'Configuration' },
  { id: 'llm', label: 'LLM Integration', path: '/llm-integration', icon: Brain, level: 'secondary', category: 'Configuration' },
  { id: 'ide', label: 'IDE Integration', path: '/ide-integration', icon: Monitor, level: 'secondary', category: 'Configuration' },
  
  // Account section
  { id: 'profile', label: 'Profile', path: '/profile', icon: User, level: 'secondary', category: 'Account' },
  { id: 'account', label: 'Account & Billing', path: '/account', icon: CreditCard, level: 'secondary', category: 'Account' },
  { id: 'teams', label: 'Teams', path: '/teams', icon: Users, level: 'secondary', category: 'Account' },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings, level: 'secondary', category: 'Account' },
];
