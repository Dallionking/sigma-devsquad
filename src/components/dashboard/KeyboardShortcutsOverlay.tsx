
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Keyboard, Users, Bot, Home, Layers, Package, Brain, Monitor, Settings, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KeyboardShortcut {
  key: string;
  description: string;
  category: string;
  icon?: React.ComponentType<any>;
}

const shortcuts: KeyboardShortcut[] = [
  // View Switching
  { key: 'Alt + T', description: 'Switch to Team View', category: 'View Switching', icon: Users },
  { key: 'Alt + I', description: 'Switch to Individual Agents', category: 'View Switching', icon: Bot },
  
  // Navigation
  { key: 'Ctrl + H', description: 'Go to Dashboard', category: 'Navigation', icon: Home },
  { key: 'Ctrl + P', description: 'Go to Planning Agent', category: 'Navigation', icon: Layers },
  { key: 'Ctrl + A', description: 'Go to Agent Configuration', category: 'Navigation', icon: Bot },
  { key: 'Ctrl + M', description: 'Go to MCP Management', category: 'Navigation', icon: Package },
  { key: 'Ctrl + L', description: 'Go to LLM Integration', category: 'Navigation', icon: Brain },
  { key: 'Ctrl + I', description: 'Go to IDE Integration', category: 'Navigation', icon: Monitor },
  { key: 'Ctrl + ,', description: 'Go to Settings', category: 'Navigation', icon: Settings },
  
  // Browser Navigation
  { key: 'Alt + ←', description: 'Go Back', category: 'Browser', icon: ArrowLeft },
  { key: 'Alt + →', description: 'Go Forward', category: 'Browser', icon: ArrowRight },
  
  // General
  { key: '?', description: 'Show Keyboard Shortcuts', category: 'General', icon: Keyboard },
];

export const KeyboardShortcutsOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show overlay when ? is pressed (without any modifiers)
      if (event.key === '?' && !event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault();
        setIsOpen(true);
      }
      
      // Close overlay on Escape
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, KeyboardShortcut[]>);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryShortcuts.map((shortcut, index) => {
                    const Icon = shortcut.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {Icon && (
                            <Icon className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="text-sm font-medium">
                            {shortcut.description}
                          </span>
                        </div>
                        <Badge variant="outline" className="font-mono text-xs">
                          {shortcut.key}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Press <Badge variant="outline" className="mx-1 font-mono">?</Badge> anytime to show this overlay, or <Badge variant="outline" className="mx-1 font-mono">Esc</Badge> to close it.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
