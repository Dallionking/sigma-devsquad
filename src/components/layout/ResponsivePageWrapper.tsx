
import { ReactNode } from 'react';
import { Header } from '@/components/dashboard/Header';
import { TouchGestureProvider } from '@/components/settings/TouchGestureProvider';
import { AccessibilityEnhancedSettings } from '@/components/settings/AccessibilityEnhancedSettings';
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer';
import { MobileSettingsHeader } from '@/components/settings/MobileSettingsHeader';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { mockAgents } from '@/data/mockData';
import { ViewMode } from '@/types';
import { cn } from '@/lib/utils';

interface ResponsivePageWrapperProps {
  children: ReactNode;
  title: string;
  description?: string;
  showHeader?: boolean;
  showMobileHeader?: boolean;
  enableSwipeGestures?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const ResponsivePageWrapper = ({
  children,
  title,
  description,
  showHeader = true,
  showMobileHeader = true,
  enableSwipeGestures = true,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  viewMode = 'workflow',
  onViewModeChange = () => {},
  maxWidth = '2xl',
  padding = 'lg',
  className
}: ResponsivePageWrapperProps) => {
  const { 
    isMobile, 
    getResponsiveClasses, 
    mobileOptimizations 
  } = useResponsiveLayout();

  const wrapperClasses = getResponsiveClasses(
    cn(
      "min-h-screen bg-gradient-to-br from-background via-background to-muted/20",
      className
    )
  );

  return (
    <div className={wrapperClasses}>
      {/* Skip navigation for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only-focusable"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Desktop header */}
      {!isMobile && showHeader && (
        <Header 
          viewMode={viewMode} 
          onViewModeChange={onViewModeChange}
          agents={mockAgents}
        />
      )}

      {/* Mobile header */}
      {isMobile && showMobileHeader && (
        <MobileSettingsHeader
          title={title}
          showBackButton={true}
          onBack={() => window.history.back()}
        />
      )}

      {/* Main content with gestures and accessibility */}
      <TouchGestureProvider
        onSwipeLeft={enableSwipeGestures ? onSwipeLeft : undefined}
        onSwipeRight={enableSwipeGestures ? onSwipeRight : undefined}
        onSwipeUp={enableSwipeGestures ? onSwipeUp : undefined}
        onSwipeDown={enableSwipeGestures ? onSwipeDown : undefined}
      >
        <AccessibilityEnhancedSettings
          title={title}
          description={description}
        >
          <ResponsiveContainer 
            maxWidth={maxWidth} 
            padding={isMobile ? 'sm' : padding}
          >
            <main 
              id="main-content"
              className={cn(
                "space-y-6",
                isMobile && "mobile-safe-area"
              )}
              role="main"
            >
              {children}
            </main>
          </ResponsiveContainer>
        </AccessibilityEnhancedSettings>
      </TouchGestureProvider>
    </div>
  );
};
