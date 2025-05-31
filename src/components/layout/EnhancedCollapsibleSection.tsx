
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Minimize2, Maximize2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedCollapsibleSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  variant?: 'default' | 'compact' | 'minimal' | 'elevated';
  showToggleIcon?: boolean;
  priority?: 'high' | 'medium' | 'low';
  storageKey?: string;
  keyboardShortcut?: string;
  onToggle?: (isOpen: boolean) => void;
}

// Hook for managing collapse state with localStorage
const useCollapsibleState = (id: string, defaultOpen: boolean, storageKey?: string) => {
  const [isOpen, setIsOpen] = useState(() => {
    if (storageKey && typeof window !== 'undefined') {
      const stored = localStorage.getItem(`collapsible-${storageKey}-${id}`);
      return stored ? JSON.parse(stored) : defaultOpen;
    }
    return defaultOpen;
  });

  useEffect(() => {
    if (storageKey && typeof window !== 'undefined') {
      localStorage.setItem(`collapsible-${storageKey}-${id}`, JSON.stringify(isOpen));
    }
  }, [id, isOpen, storageKey]);

  return [isOpen, setIsOpen] as const;
};

export const EnhancedCollapsibleSection = ({
  id,
  title,
  children,
  defaultOpen = true,
  badge,
  icon,
  className,
  headerClassName,
  contentClassName,
  variant = 'default',
  showToggleIcon = true,
  priority = 'medium',
  storageKey,
  keyboardShortcut,
  onToggle
}: EnhancedCollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useCollapsibleState(id, defaultOpen, storageKey);

  const handleToggle = (newState: boolean) => {
    setIsOpen(newState);
    onToggle?.(newState);
  };

  // Keyboard shortcut handling
  useEffect(() => {
    if (!keyboardShortcut) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcutMatch = keyboardShortcut.split('+').every(key => {
        switch (key.toLowerCase()) {
          case 'ctrl':
            return event.ctrlKey;
          case 'alt':
            return event.altKey;
          case 'shift':
            return event.shiftKey;
          default:
            return event.key.toLowerCase() === key.toLowerCase();
        }
      });

      if (shortcutMatch) {
        event.preventDefault();
        handleToggle(!isOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyboardShortcut, isOpen]);

  const variantClasses = {
    default: {
      container: 'border rounded-lg bg-card shadow-sm',
      header: 'p-3 sm:p-4',
      content: 'px-3 pb-3 sm:px-4 sm:pb-4'
    },
    compact: {
      container: 'border rounded-md bg-card',
      header: 'p-2 sm:p-3',
      content: 'px-2 pb-2 sm:px-3 sm:pb-3'
    },
    minimal: {
      container: 'border-b bg-transparent',
      header: 'p-2',
      content: 'px-2 pb-2'
    },
    elevated: {
      container: 'border rounded-xl bg-card shadow-md hover:shadow-lg transition-shadow',
      header: 'p-4 sm:p-5',
      content: 'px-4 pb-4 sm:px-5 sm:pb-5'
    }
  };

  const priorityStyles = {
    high: 'ring-2 ring-primary/20 bg-primary/5',
    medium: '',
    low: 'opacity-90'
  };

  const styles = variantClasses[variant];

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={handleToggle} 
      className={cn(
        styles.container,
        priorityStyles[priority],
        'transition-all duration-200',
        className
      )}
    >
      <CollapsibleTrigger asChild>
        <div 
          className={cn(
            'flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md',
            styles.header,
            headerClassName
          )}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-controls={`collapsible-content-${id}`}
          aria-label={`Toggle ${title} section${keyboardShortcut ? ` (${keyboardShortcut})` : ''}`}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {icon && <div className="flex-shrink-0 text-muted-foreground">{icon}</div>}
            <div className="min-w-0 flex-1">
              <h3 className={cn(
                'font-medium truncate',
                variant === 'minimal' ? 'text-sm' : 'text-base',
                priority === 'high' && 'text-primary'
              )}>
                {title}
              </h3>
              {keyboardShortcut && (
                <span className="text-xs text-muted-foreground">
                  Press {keyboardShortcut} to toggle
                </span>
              )}
            </div>
            {badge && (
              <Badge 
                variant={priority === 'high' ? 'default' : 'secondary'} 
                className="flex-shrink-0 text-xs"
              >
                {badge}
              </Badge>
            )}
          </div>
          {showToggleIcon && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto hover:bg-muted/70"
              aria-label={isOpen ? 'Collapse section' : 'Expand section'}
            >
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent 
        id={`collapsible-content-${id}`}
        className={cn(
          styles.content,
          'animate-in slide-in-from-top-1 duration-200',
          contentClassName
        )}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// Specialized collapsible components for different use cases
export const CollapsibleSettingsSection = ({ 
  id,
  title, 
  children, 
  className,
  ...props 
}: Omit<EnhancedCollapsibleSectionProps, 'variant' | 'priority'>) => (
  <EnhancedCollapsibleSection
    id={id}
    title={title}
    variant="elevated"
    priority="medium"
    storageKey="settings"
    className={className}
    {...props}
  >
    {children}
  </EnhancedCollapsibleSection>
);

export const CollapsibleAdvancedSection = ({ 
  id,
  title, 
  children, 
  className,
  ...props 
}: Omit<EnhancedCollapsibleSectionProps, 'variant' | 'priority' | 'defaultOpen'>) => (
  <EnhancedCollapsibleSection
    id={id}
    title={title}
    variant="compact"
    priority="low"
    defaultOpen={false}
    storageKey="advanced"
    icon={<Settings className="w-4 h-4" />}
    badge="Advanced"
    className={className}
    {...props}
  >
    {children}
  </EnhancedCollapsibleSection>
);

export const CollapsibleQuickSection = ({ 
  id,
  title, 
  children, 
  className,
  ...props 
}: Omit<EnhancedCollapsibleSectionProps, 'variant' | 'priority'>) => (
  <EnhancedCollapsibleSection
    id={id}
    title={title}
    variant="minimal"
    priority="high"
    className={className}
    {...props}
  >
    {children}
  </EnhancedCollapsibleSection>
);

// Group component for managing multiple collapsible sections
export const CollapsibleGroup = ({
  sections,
  allowMultiple = true,
  className,
  storageKey
}: {
  sections: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
    priority?: 'high' | 'medium' | 'low';
    defaultOpen?: boolean;
    badge?: string | number;
    icon?: React.ReactNode;
  }>;
  allowMultiple?: boolean;
  className?: string;
  storageKey?: string;
}) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const handleToggle = (sectionId: string, isOpen: boolean) => {
    const newOpenSections = new Set(openSections);
    
    if (allowMultiple) {
      if (isOpen) {
        newOpenSections.add(sectionId);
      } else {
        newOpenSections.delete(sectionId);
      }
    } else {
      if (isOpen) {
        newOpenSections.clear();
        newOpenSections.add(sectionId);
      } else {
        newOpenSections.delete(sectionId);
      }
    }
    
    setOpenSections(newOpenSections);
  };

  return (
    <div className={cn('space-y-3', className)}>
      {sections.map((section) => (
        <EnhancedCollapsibleSection
          key={section.id}
          id={section.id}
          title={section.title}
          badge={section.badge}
          icon={section.icon}
          priority={section.priority || 'medium'}
          defaultOpen={section.defaultOpen ?? true}
          variant="default"
          storageKey={storageKey}
          onToggle={(isOpen) => handleToggle(section.id, isOpen)}
        >
          {section.content}
        </EnhancedCollapsibleSection>
      ))}
    </div>
  );
};
