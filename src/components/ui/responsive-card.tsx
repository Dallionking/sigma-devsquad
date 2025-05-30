
import { ReactNode, forwardRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, MoreVertical } from 'lucide-react';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { cn } from '@/lib/utils';

interface ResponsiveCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  category?: string;
  status?: 'active' | 'inactive' | 'warning' | 'error';
  isExpandable?: boolean;
  onExpand?: () => void;
  onClick?: () => void;
  className?: string;
  headerActions?: ReactNode;
  footer?: ReactNode;
}

export const ResponsiveCard = forwardRef<HTMLDivElement, ResponsiveCardProps>(({
  title,
  description,
  children,
  category,
  status,
  isExpandable = false,
  onExpand,
  onClick,
  className,
  headerActions,
  footer,
  ...props
}, ref) => {
  const { isMobile, getResponsiveClasses } = useResponsiveLayout();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const cardClasses = getResponsiveClasses(
    cn(
      "transition-all duration-200 border-l-4",
      status === "active" && "border-l-green-500",
      status === "warning" && "border-l-yellow-500",
      status === "error" && "border-l-red-500",
      status === "inactive" && "border-l-gray-400",
      !status && "border-l-blue-500",
      isMobile && "shadow-sm hover:shadow-md active:scale-[0.98]",
      onClick && "cursor-pointer hover:bg-muted/50",
      className
    )
  );

  return (
    <Card 
      ref={ref}
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      <CardHeader className={cn(
        "space-y-3",
        isMobile && "pb-4"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className={cn(
                "font-semibold truncate",
                isMobile ? "text-base" : "text-lg"
              )}>
                {title}
              </CardTitle>
              {category && (
                <Badge variant="outline" className="text-xs shrink-0">
                  {category}
                </Badge>
              )}
            </div>
            {description && (
              <CardDescription className={cn(
                "text-muted-foreground leading-relaxed",
                isMobile ? "text-sm" : "text-sm"
              )}>
                {description}
              </CardDescription>
            )}
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            {status && (
              <Badge className={cn("text-xs border", getStatusColor(status))}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            )}
            
            {headerActions}
            
            {isMobile && isExpandable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onExpand?.();
                }}
                className="touch-target p-2"
                aria-label="Expand"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
            
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                className="touch-target p-2"
                aria-label="More options"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      {children && (
        <CardContent className={cn(
          "space-y-4",
          isMobile && "px-4 pb-6"
        )}>
          {children}
        </CardContent>
      )}

      {footer}
    </Card>
  );
});

ResponsiveCard.displayName = 'ResponsiveCard';
