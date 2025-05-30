
import { ReactNode, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface AccessibilityEnhancedSettingsProps {
  children: ReactNode;
  title: string;
  description?: string;
  className?: string;
  announceChanges?: boolean;
}

export const AccessibilityEnhancedSettings = ({
  children,
  title,
  description,
  className,
  announceChanges = true
}: AccessibilityEnhancedSettingsProps) => {
  const isMobile = useIsMobile();
  const announcementRef = useRef<HTMLDivElement>(null);

  // Function to announce changes to screen readers
  const announceToScreenReader = (message: string) => {
    if (!announceChanges || !announcementRef.current) return;
    
    announcementRef.current.textContent = message;
    
    // Clear the message after a short delay
    setTimeout(() => {
      if (announcementRef.current) {
        announcementRef.current.textContent = '';
      }
    }, 1000);
  };

  useEffect(() => {
    // Announce when the settings section is loaded
    announceToScreenReader(`${title} settings loaded`);
  }, [title]);

  return (
    <section 
      className={cn(
        "space-y-6",
        "focus-within:outline-none",
        isMobile && "mobile-safe-area",
        className
      )}
      aria-labelledby="settings-title"
      role="region"
    >
      {/* Screen reader announcements */}
      <div 
        ref={announcementRef}
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      />

      {/* Skip link for keyboard users */}
      <a 
        href="#settings-content"
        className="sr-only-focusable"
      >
        Skip to settings content
      </a>

      <header>
        <h2 
          id="settings-title"
          className={cn(
            "text-2xl font-bold tracking-tight",
            isMobile ? "text-xl" : "text-2xl"
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </header>

      <main 
        id="settings-content"
        className="space-y-6"
        role="main"
      >
        {children}
      </main>
    </section>
  );
};
