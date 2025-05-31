
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  variant?: 'default' | 'compact' | 'minimal';
  showToggleIcon?: boolean;
}

export const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
  badge,
  icon,
  className,
  headerClassName,
  contentClassName,
  variant = 'default',
  showToggleIcon = true
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const variantClasses = {
    default: {
      container: 'border rounded-lg bg-card',
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
    }
  };

  const styles = variantClasses[variant];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn(styles.container, className)}>
      <CollapsibleTrigger asChild>
        <div className={cn(
          'flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors',
          styles.header,
          headerClassName
        )}>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <h3 className={cn(
              'font-medium truncate',
              variant === 'minimal' ? 'text-sm' : 'text-base'
            )}>
              {title}
            </h3>
            {badge && (
              <Badge variant="secondary" className="flex-shrink-0 text-xs">
                {badge}
              </Badge>
            )}
          </div>
          {showToggleIcon && (
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className={cn(styles.content, contentClassName)}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// Specialized collapsible components
export const CollapsibleCard = ({ 
  title, 
  children, 
  defaultOpen = true,
  className,
  ...props 
}: CollapsibleSectionProps) => (
  <Card className={className}>
    <CollapsibleSection
      title={title}
      defaultOpen={defaultOpen}
      variant="compact"
      {...props}
    >
      {children}
    </CollapsibleSection>
  </Card>
);

export const CollapsibleDetails = ({ 
  title, 
  children, 
  ...props 
}: CollapsibleSectionProps) => (
  <CollapsibleSection
    title={title}
    variant="minimal"
    defaultOpen={false}
    {...props}
  >
    {children}
  </CollapsibleSection>
);

// Accordion-style collapsible group
interface CollapsibleGroupProps {
  sections: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
    badge?: string | number;
    icon?: React.ReactNode;
  }>;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export const CollapsibleGroup = ({
  sections,
  allowMultiple = false,
  defaultOpen = [],
  className
}: CollapsibleGroupProps) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(defaultOpen));

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    
    if (allowMultiple) {
      if (newOpenSections.has(sectionId)) {
        newOpenSections.delete(sectionId);
      } else {
        newOpenSections.add(sectionId);
      }
    } else {
      if (newOpenSections.has(sectionId)) {
        newOpenSections.clear();
      } else {
        newOpenSections.clear();
        newOpenSections.add(sectionId);
      }
    }
    
    setOpenSections(newOpenSections);
  };

  return (
    <div className={cn('space-y-1', className)}>
      {sections.map((section) => (
        <CollapsibleSection
          key={section.id}
          title={section.title}
          badge={section.badge}
          icon={section.icon}
          defaultOpen={openSections.has(section.id)}
          variant="compact"
          className="transition-all duration-200"
        >
          {section.content}
        </CollapsibleSection>
      ))}
    </div>
  );
};
