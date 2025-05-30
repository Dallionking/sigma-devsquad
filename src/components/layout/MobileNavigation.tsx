
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Bot, Brain, Settings, Package, Monitor, Layers } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '@/components/branding/Logo';
import { Badge } from '@/components/ui/badge';

interface MobileNavigationProps {
  activeAgents?: number;
  totalAgents?: number;
}

export const MobileNavigation = ({ activeAgents = 0, totalAgents = 0 }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: Bot },
    { path: '/planning-agent', label: 'Planning Agent', icon: Layers },
    { path: '/agent-configuration', label: 'Agent Config', icon: Bot },
    { path: '/mcp-management', label: 'MCP Management', icon: Package },
    { path: '/llm-integration', label: 'LLM Integration', icon: Brain },
    { path: '/ide-integration', label: 'IDE Integration', icon: Monitor },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Logo size="sm" variant="full" />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
                className="p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Agent Status */}
            <div className="p-4 bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">System Status</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-sm font-medium mt-1">
                {activeAgents} of {totalAgents} agents working
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Button
                      key={item.path}
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start h-12"
                      onClick={() => handleNavigate(item.path)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>System Healthy</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
