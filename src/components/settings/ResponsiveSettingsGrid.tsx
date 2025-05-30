
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ResponsiveSettingsGridProps {
  children: ReactNode;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export const ResponsiveSettingsGrid = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "md",
  className
}: ResponsiveSettingsGridProps) => {
  const isMobile = useIsMobile();

  const gapClasses = {
    sm: "gap-3",
    md: "gap-4 md:gap-6",
    lg: "gap-6 md:gap-8"
  };

  const getGridCols = () => {
    return cn(
      `grid-cols-${columns.mobile}`,
      `md:grid-cols-${columns.tablet}`,
      `lg:grid-cols-${columns.desktop}`
    );
  };

  return (
    <div className={cn(
      "grid",
      getGridCols(),
      gapClasses[gap],
      isMobile && "mobile-card-spacing",
      className
    )}>
      {children}
    </div>
  );
};

// Specialized grid for settings cards
export const SettingsCardGrid = ({ children, className }: { children: ReactNode; className?: string }) => (
  <ResponsiveSettingsGrid
    columns={{ mobile: 1, tablet: 1, desktop: 2 }}
    gap="lg"
    className={className}
  >
    {children}
  </ResponsiveSettingsGrid>
);

// Specialized grid for setting items within cards
export const SettingItemsGrid = ({ children, className }: { children: ReactNode; className?: string }) => (
  <ResponsiveSettingsGrid
    columns={{ mobile: 1, tablet: 2, desktop: 2 }}
    gap="md"
    className={className}
  >
    {children}
  </ResponsiveSettingsGrid>
);
