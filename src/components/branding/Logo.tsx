
import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, Cpu, Network } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

const sizeClasses = {
  sm: {
    container: 'h-8',
    icon: 'w-6 h-6',
    text: 'text-lg',
    subtext: 'text-xs'
  },
  md: {
    container: 'h-10',
    icon: 'w-8 h-8',
    text: 'text-xl',
    subtext: 'text-sm'
  },
  lg: {
    container: 'h-12',
    icon: 'w-10 h-10',
    text: 'text-2xl',
    subtext: 'text-base'
  },
  xl: {
    container: 'h-16',
    icon: 'w-12 h-12',
    text: 'text-3xl',
    subtext: 'text-lg'
  }
};

export const Logo = ({ size = 'md', variant = 'full', className }: LogoProps) => {
  const classes = sizeClasses[size];

  const IconComponent = () => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-lg opacity-90" />
      <div className="relative bg-background rounded-lg p-1.5 border border-primary/20">
        <div className="relative">
          <Bot className={cn(classes.icon, "text-primary")} />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-background" />
        </div>
      </div>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={cn(classes.container, 'flex items-center', className)}>
        <IconComponent />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={cn('flex flex-col', className)}>
        <h1 className={cn(classes.text, 'font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent')}>
          DevAgent Command
        </h1>
        <p className={cn(classes.subtext, 'text-muted-foreground font-medium -mt-1')}>
          AI Workforce Hub
        </p>
      </div>
    );
  }

  return (
    <div className={cn(classes.container, 'flex items-center space-x-3', className)}>
      <IconComponent />
      <div className="flex flex-col">
        <h1 className={cn(classes.text, 'font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight')}>
          DevAgent Command
        </h1>
        <p className={cn(classes.subtext, 'text-muted-foreground font-medium -mt-1')}>
          AI Workforce Hub
        </p>
      </div>
    </div>
  );
};

// Brand guidelines component for reference
export const BrandGuidelines = () => (
  <div className="space-y-6 p-6 bg-card rounded-lg">
    <h3 className="text-lg font-semibold">Brand Guidelines</h3>
    
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Primary Colors</h4>
        <div className="flex space-x-2">
          <div className="w-12 h-12 bg-primary rounded-lg border" title="Primary" />
          <div className="w-12 h-12 bg-blue-600 rounded-lg" title="Blue" />
          <div className="w-12 h-12 bg-purple-600 rounded-lg" title="Purple" />
          <div className="w-12 h-12 bg-green-500 rounded-lg" title="Success" />
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Typography</h4>
        <div className="space-y-1">
          <p className="text-2xl font-bold">Primary Heading</p>
          <p className="text-lg font-semibold">Secondary Heading</p>
          <p className="text-base font-medium">Body Medium</p>
          <p className="text-sm text-muted-foreground">Body Small</p>
        </div>
      </div>
    </div>
  </div>
);
