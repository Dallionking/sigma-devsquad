
import React from 'react';
import { cn } from '@/lib/utils';
import { Zap, Radio, Waves } from 'lucide-react';

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
      {/* Dynamic background with vibe waves */}
      <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary via-vibe-secondary to-vibe-accent rounded-xl opacity-90 animate-pulse-subtle" />
      <div className="absolute inset-0 bg-gradient-to-tr from-vibe-energy via-transparent to-vibe-flow rounded-xl opacity-60 animate-bounce-subtle" />
      
      {/* Main icon container */}
      <div className="relative bg-background/95 backdrop-blur rounded-xl p-1.5 border border-vibe-primary/30 shadow-lg">
        <div className="relative flex items-center justify-center">
          <Zap className={cn(classes.icon, "text-vibe-primary animate-pulse")} />
          <div className="absolute -top-1 -right-1">
            <Radio className="w-3 h-3 text-vibe-energy animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute -bottom-1 -left-1">
            <Waves className="w-3 h-3 text-vibe-flow animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
      
      {/* Energy rings */}
      <div className="absolute inset-0 rounded-xl border-2 border-vibe-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
      <div className="absolute inset-0 rounded-xl border border-vibe-secondary/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
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
        <h1 className={cn(classes.text, 'font-bold bg-gradient-to-r from-vibe-primary via-vibe-energy to-vibe-accent bg-clip-text text-transparent animate-gradient')}>
          Vibe DevSquad
        </h1>
        <p className={cn(classes.subtext, 'text-vibe-muted font-medium -mt-1 tracking-wider')}>
          AI Collaboration Hub
        </p>
      </div>
    );
  }

  return (
    <div className={cn(classes.container, 'flex items-center space-x-3', className)}>
      <IconComponent />
      <div className="flex flex-col">
        <h1 className={cn(classes.text, 'font-bold bg-gradient-to-r from-vibe-primary via-vibe-energy to-vibe-accent bg-clip-text text-transparent leading-tight animate-gradient')}>
          Vibe DevSquad
        </h1>
        <p className={cn(classes.subtext, 'text-vibe-muted font-medium -mt-1 tracking-wider')}>
          AI Collaboration Hub
        </p>
      </div>
    </div>
  );
};

// Updated brand guidelines for Vibe DevSquad
export const BrandGuidelines = () => (
  <div className="space-y-6 p-6 bg-card rounded-lg border border-vibe-primary/20">
    <h3 className="text-lg font-semibold text-vibe-primary">Vibe DevSquad Brand Guidelines</h3>
    
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2 text-vibe-secondary">Primary Vibe Colors</h4>
        <div className="flex space-x-2">
          <div className="w-12 h-12 bg-vibe-primary rounded-lg border shadow-md" title="Vibe Primary" />
          <div className="w-12 h-12 bg-vibe-secondary rounded-lg shadow-md" title="Vibe Secondary" />
          <div className="w-12 h-12 bg-vibe-accent rounded-lg shadow-md" title="Vibe Accent" />
          <div className="w-12 h-12 bg-vibe-energy rounded-lg shadow-md" title="Vibe Energy" />
          <div className="w-12 h-12 bg-vibe-flow rounded-lg shadow-md" title="Vibe Flow" />
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2 text-vibe-secondary">Status Colors</h4>
        <div className="flex space-x-2">
          <div className="w-12 h-12 bg-vibe-success rounded-lg shadow-md" title="Success" />
          <div className="w-12 h-12 bg-vibe-warning rounded-lg shadow-md" title="Warning" />
          <div className="w-12 h-12 bg-vibe-error rounded-lg shadow-md" title="Error" />
          <div className="w-12 h-12 bg-vibe-info rounded-lg shadow-md" title="Info" />
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2 text-vibe-secondary">Typography Hierarchy</h4>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-vibe-primary">Vibe Heading XL</p>
          <p className="text-2xl font-bold text-vibe-secondary">Vibe Heading Large</p>
          <p className="text-xl font-semibold text-vibe-accent">Vibe Heading Medium</p>
          <p className="text-lg font-medium text-foreground">Vibe Body Large</p>
          <p className="text-base text-foreground">Vibe Body Regular</p>
          <p className="text-sm text-vibe-muted">Vibe Body Small</p>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2 text-vibe-secondary">Dynamic Elements</h4>
        <div className="flex space-x-4 items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-vibe-primary to-vibe-energy rounded-full animate-pulse" />
          <div className="w-8 h-8 bg-gradient-to-r from-vibe-secondary to-vibe-flow rounded-full animate-bounce" />
          <div className="w-8 h-8 bg-gradient-to-r from-vibe-accent to-vibe-primary rounded-full animate-ping" />
        </div>
      </div>
    </div>
  </div>
);
