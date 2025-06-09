import React, { useState, useRef, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface DynamicTextProps {
  children: React.ReactNode;
  variant?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | 'caption' | 'label' | 'body';
  truncate?: boolean | 'multiline-2' | 'multiline-3';
  expandOnHover?: boolean;
  showTooltip?: boolean;
  maxWidth?: string;
  className?: string;
  highContrast?: boolean;
  accessible?: boolean;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  id?: string;
}

export const DynamicText = ({
  children,
  variant = 'base',
  truncate = false,
  expandOnHover = false,
  showTooltip = true,
  maxWidth,
  className,
  highContrast = false,
  accessible = true,
  as: Component = 'span',
  id
}: DynamicTextProps) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef<HTMLElement>(null);

  // Check if text is actually truncated
  useEffect(() => {
    const element = textRef.current;
    if (element && truncate) {
      const isOverflowing = element.scrollWidth > element.clientWidth || 
                           element.scrollHeight > element.clientHeight;
      setIsTruncated(isOverflowing);
    }
  }, [children, truncate]);

  const getVariantClasses = () => {
    const variants = {
      xs: 'text-dynamic-xs',
      sm: 'text-dynamic-sm',
      base: 'text-dynamic-base',
      lg: 'text-dynamic-lg',
      xl: 'text-dynamic-xl',
      '2xl': 'text-dynamic-2xl',
      '3xl': 'text-dynamic-3xl',
      caption: 'text-caption-dynamic',
      label: 'text-label-dynamic',
      body: 'text-body-dynamic'
    };
    return variants[variant];
  };

  const getTruncateClasses = () => {
    if (!truncate) return '';
    
    if (truncate === true) {
      return expandOnHover ? 'truncate-dynamic truncate-expandable' : 'truncate-dynamic';
    }
    if (truncate === 'multiline-2') {
      return 'truncate-multiline-2';
    }
    if (truncate === 'multiline-3') {
      return 'truncate-multiline-3';
    }
    return '';
  };

  const textClasses = cn(
    getVariantClasses(),
    getTruncateClasses(),
    highContrast && 'text-high-contrast',
    accessible && 'text-accessible-min',
    className
  );

  const textElement = (
    <Component
      ref={textRef as any}
      id={id}
      className={textClasses}
      style={{ maxWidth }}
      onMouseEnter={() => expandOnHover && setIsExpanded(true)}
      onMouseLeave={() => expandOnHover && setIsExpanded(false)}
      aria-label={typeof children === 'string' && isTruncated ? children : undefined}
    >
      {children}
    </Component>
  );

  // Show tooltip only if text is truncated and tooltip is enabled
  if (truncate && showTooltip && isTruncated && typeof children === 'string') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {textElement}
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            className="max-w-xs break-words z-50 text-dynamic-sm"
            sideOffset={4}
          >
            <p className="whitespace-normal">{children}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return textElement;
};

// Specialized components for common use cases
export const DynamicHeading = ({ 
  level = 1, 
  children, 
  className,
  id,
  ...props 
}: {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
} & Omit<DynamicTextProps, 'as' | 'variant'>) => {
  const variants = {
    1: '3xl',
    2: '2xl', 
    3: 'xl',
    4: 'lg',
    5: 'base',
    6: 'sm'
  } as const;

  const components = {
    1: 'h1',
    2: 'h2',
    3: 'h3', 
    4: 'h4',
    5: 'h5',
    6: 'h6'
  } as const;

  return (
    <DynamicText
      as={components[level]}
      variant={variants[level]}
      className={cn('font-semibold', className)}
      highContrast
      id={id}
      {...props}
    >
      {children}
    </DynamicText>
  );
};

export const DynamicCaption = ({ children, className, ...props }: {
  children: React.ReactNode;
  className?: string;
} & Omit<DynamicTextProps, 'variant'>) => (
  <DynamicText
    variant="caption"
    className={cn('text-muted-foreground', className)}
    {...props}
  >
    {children}
  </DynamicText>
);

export const DynamicLabel = ({ children, className, ...props }: {
  children: React.ReactNode;
  className?: string;
} & Omit<DynamicTextProps, 'variant'>) => (
  <DynamicText
    variant="label"
    className={cn('font-medium', className)}
    {...props}
  >
    {children}
  </DynamicText>
);

export const TruncatedText = ({ 
  children, 
  lines = 1,
  className,
  ...props 
}: {
  children: React.ReactNode;
  lines?: 1 | 2 | 3;
  className?: string;
} & Omit<DynamicTextProps, 'truncate'>) => {
  const truncateType = lines === 1 ? true : lines === 2 ? 'multiline-2' : 'multiline-3';
  
  return (
    <DynamicText
      truncate={truncateType}
      expandOnHover={lines === 1}
      showTooltip={true}
      className={className}
      {...props}
    >
      {children}
    </DynamicText>
  );
};
