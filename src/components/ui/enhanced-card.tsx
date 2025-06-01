
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'tilt';
  glowColor?: string;
}

export const EnhancedCard = ({ 
  children, 
  className,
  hoverEffect = 'lift',
  glowColor = 'vibe-primary'
}: EnhancedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const hoverEffects = {
    lift: 'hover:translate-y-[-8px] hover:shadow-2xl',
    glow: `hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]`,
    scale: 'hover:scale-[1.02]',
    tilt: 'hover:rotate-1'
  };

  return (
    <Card
      className={cn(
        'transition-all duration-300 ease-out cursor-pointer border border-border/50',
        'backdrop-blur-sm bg-background/80',
        hoverEffects[hoverEffect],
        isHovered && hoverEffect === 'glow' && `shadow-[0_0_30px_hsl(var(--${glowColor})/0.3)]`,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={
        hoverEffect === 'tilt' && isHovered
          ? {
              transform: `perspective(1000px) rotateX(${(mousePosition.y - 100) / 10}deg) rotateY(${(mousePosition.x - 100) / 10}deg)`
            }
          : undefined
      }
    >
      <CardContent className="relative p-0">
        {children}
        
        {hoverEffect === 'glow' && isHovered && (
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--${glowColor})) 0%, transparent 50%)`
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};
