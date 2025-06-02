
import React, { ReactNode } from 'react';
import { HierarchicalBreadcrumb } from './HierarchicalBreadcrumb';
import { SecondaryNavigation } from './SecondaryNavigation';
import { TertiaryNavigation } from './TertiaryNavigation';
import { NavigationHierarchyProvider } from '@/contexts/NavigationHierarchyContext';

interface SecondaryNavItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType<any>;
  badge?: string | number;
}

interface TertiaryNavItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType<any>;
  isActive?: boolean;
}

interface NavigationLayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
  secondaryNav?: {
    items: SecondaryNavItem[];
    title?: string;
    description?: string;
    showBackButton?: boolean;
  };
  tertiaryNav?: {
    items: TertiaryNavItem[];
    title?: string;
    showBackButton?: boolean;
    compact?: boolean;
  };
}

export const NavigationLayout = ({
  children,
  showBreadcrumbs = true,
  secondaryNav,
  tertiaryNav
}: NavigationLayoutProps) => {
  return (
    <NavigationHierarchyProvider>
      <div className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        {showBreadcrumbs && <HierarchicalBreadcrumb />}
        
        {/* Secondary Navigation */}
        {secondaryNav && (
          <SecondaryNavigation
            items={secondaryNav.items}
            title={secondaryNav.title}
            description={secondaryNav.description}
            showBackButton={secondaryNav.showBackButton}
          />
        )}
        
        {/* Tertiary Navigation */}
        {tertiaryNav && (
          <TertiaryNavigation
            items={tertiaryNav.items}
            title={tertiaryNav.title}
            showBackButton={tertiaryNav.showBackButton}
            compact={tertiaryNav.compact}
          />
        )}
        
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </NavigationHierarchyProvider>
  );
};
