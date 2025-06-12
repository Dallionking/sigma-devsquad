// Phase 11: Dashboard Layout Component
// Provides the main layout structure for dashboard pages

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Settings,
  Bell,
  User,
  Search,
  Home,
  BarChart3,
  FileText,
  Database,
  Users,
  Cog
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
  badge?: string | number;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  currentPath = '/dashboard' 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems: NavigationItem[] = [
    {
      label: 'Overview',
      href: '/dashboard',
      icon: <Home size={20} />,
      isActive: currentPath === '/dashboard'
    },
    {
      label: 'Analytics',
      href: '/dashboard/analytics',
      icon: <BarChart3 size={20} />,
      isActive: currentPath.startsWith('/dashboard/analytics')
    },
    {
      label: 'Reports',
      href: '/dashboard/reports',
      icon: <FileText size={20} />,
      isActive: currentPath.startsWith('/dashboard/reports'),
      badge: 3
    },
    {
      label: 'Data Sources',
      href: '/dashboard/data-sources',
      icon: <Database size={20} />,
      isActive: currentPath.startsWith('/dashboard/data-sources')
    },
    {
      label: 'Team',
      href: '/dashboard/team',
      icon: <Users size={20} />,
      isActive: currentPath.startsWith('/dashboard/team')
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: <Cog size={20} />,
      isActive: currentPath.startsWith('/dashboard/settings')
    }
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 40
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 40
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className="fixed left-0 top-0 z-50 h-full w-64 bg-card border-r border-border lg:translate-x-0 lg:static lg:z-auto"
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 size={20} className="text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Analytics</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-muted rounded-md"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${item.isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </motion.a>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">admin@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-card border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-muted rounded-md"
              >
                <Menu size={20} />
              </button>
              
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search dashboards, reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted rounded-md relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-muted rounded-md">
                <Settings size={20} />
              </button>
              <div className="ml-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer">
                <User size={16} className="text-primary-foreground" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
