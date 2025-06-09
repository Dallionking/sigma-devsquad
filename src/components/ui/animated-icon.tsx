
import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  animation?: 'bounce' | 'pulse' | 'spin' | 'float' | 'glow' | 'none';
  hoverAnimation?: 'scale' | 'rotate' | 'bounce' | 'glow' | 'none';
  color?: string;
  delay?: number;
}

export const AnimatedIcon = ({
  icon: Icon,
  size = 24,
  className,
  animation = 'none',
  hoverAnimation = 'scale',
  color = 'currentColor',
  delay = 0
}: AnimatedIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const animationClasses = {
    'bounce': 'animate-bounce-gentle',
    'pulse': 'animate-pulse',
    'spin': 'animate-spin',
    'float': 'animate-float',
    'glow': 'animate-pulse-glow',
    'none': ''
  };

  const hoverAnimationClasses = {
    'scale': 'group-hover:scale-110 transition-transform duration-300',
    'rotate': 'group-hover:rotate-12 transition-transform duration-300',
    'bounce': 'group-hover:animate-bounce-gentle',
    'glow': 'group-hover:drop-shadow-lg transition-all duration-300',
    'none': ''
  };

  return (
    <div 
      className={cn('inline-flex items-center justify-center group', className)}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        size={size}
        className={cn(
          'feature-icon transition-all duration-300',
          animation !== 'none' && animationClasses[animation],
          hoverAnimation !== 'none' && hoverAnimationClasses[hoverAnimation]
        )}
        style={{ color }}
      />
    </div>
  );
};
