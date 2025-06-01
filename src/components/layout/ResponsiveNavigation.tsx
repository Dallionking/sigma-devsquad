
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
}

interface ResponsiveNavigationProps {
  items: NavigationItem[];
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const ResponsiveNavigation = ({
  items,
  logo,
  actions,
  className
}: ResponsiveNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { screenSize } = useResponsiveDesign();

  const isMobile = screenSize === 'mobile';

  const NavigationItems = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={cn(
      mobile ? 'flex flex-col space-y-4' : 'hidden md:flex md:items-center md:space-x-8'
    )}>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-vibe-primary',
            item.active ? 'text-vibe-primary' : 'text-muted-foreground',
            mobile && 'text-lg py-2'
          )}
          onClick={() => mobile && setIsOpen(false)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {logo}
          </div>

          {!isMobile && <NavigationItems />}

          <div className="flex items-center space-x-4">
            {!isMobile && actions}
            
            {isMobile && (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-6 mt-6">
                    <NavigationItems mobile />
                    {actions && (
                      <div className="pt-6 border-t">
                        {actions}
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
