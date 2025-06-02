
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
  variant = 'outline', 
  size = 'default',
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
        "flex items-center gap-2 font-semibold transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg",
        size === 'sm' && "h-8 px-3 text-sm",
        size === 'default' && "h-10 px-4 text-base",
        size === 'lg' && "h-12 px-6 text-lg",
        className
      )}
    >
      {showIcon && <ArrowLeft className={cn(
        size === 'sm' ? "w-3 h-3" : size === 'default' ? "w-4 h-4" : "w-5 h-5"
      )} />}
      <span className="font-semibold">{label}</span>
    </Button>
  );
};
