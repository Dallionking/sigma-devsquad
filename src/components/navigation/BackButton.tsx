
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigationHierarchy } from '@/contexts/NavigationHierarchyContext';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  customLabel?: string;
  showIcon?: boolean;
}

export const BackButton = ({ 
  className, 
  variant = 'ghost', 
  size = 'sm',
  customLabel,
  showIcon = true 
}: BackButtonProps) => {
  const { canGoBack, goBack, navigationStack } = useNavigationHierarchy();

  if (!canGoBack && navigationStack.length <= 1) {
    return null;
  }

  const previousLevel = navigationStack[navigationStack.length - 2];
  const label = customLabel || (previousLevel ? `Back to ${previousLevel.label}` : 'Back');

  return (
    <Button
      variant={variant}
      size={size}
      onClick={goBack}
      className={cn(
        "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors",
        className
      )}
    >
      {showIcon && <ArrowLeft className="w-4 h-4" />}
      <span>{label}</span>
    </Button>
  );
};
