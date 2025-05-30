
import { SettingsLayout } from "./SettingsLayout";
import { SettingsTabsProvider } from "./SettingsTabsProvider";
import { SettingsContent } from "./SettingsContent";
import { SettingsActions } from "./SettingsActions";
import { MobileSettingsLayout } from "./MobileSettingsLayout";
import { useSettingsState } from "@/hooks/useSettingsState";
import { useSettingsActions } from "@/hooks/useSettingsActions";
import { useEnhancedKeyboardNavigation } from "@/hooks/useEnhancedKeyboardNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef } from "react";

export const SettingsPage = () => {
  const {
    notifications,
    setNotifications,
    autoBackup,
    setAutoBackup,
    performanceMode,
    setPerformanceMode,
    searchQuery,
    setSearchQuery,
    searchFilters,
    setSearchFilters,
    activeTab,
    setActiveTab,
  } = useSettingsState();

  const { handleSaveAll, handleResetAll } = useSettingsActions({
    setNotifications,
    setAutoBackup,
    setPerformanceMode,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Enhanced keyboard navigation with better focus management
  const { focusNext, focusPrevious, saveFocus, restoreFocus } = useEnhancedKeyboardNavigation({
    containerRef,
    onEscape: () => {
      // Clear search when pressing Escape
      if (searchQuery) {
        setSearchQuery("");
      } else {
        // If no search query, restore focus to last saved position
        restoreFocus();
      }
    },
    enableArrowNavigation: !isMobile, // Disable arrow navigation on mobile
    enableHomeEnd: !isMobile,
    enableTabNavigation: true,
    onArrowDown: () => focusNext(),
    onArrowUp: () => focusPrevious(),
    onTab: (direction) => {
      // Save focus when tabbing to help with navigation
      saveFocus();
    }
  });

  const tabsContent = (
    <SettingsTabsProvider
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        saveFocus(); // Save focus when switching tabs
      }}
    >
      <SettingsContent
        searchQuery={searchQuery}
        notifications={notifications}
        setNotifications={setNotifications}
        autoBackup={autoBackup}
        setAutoBackup={setAutoBackup}
        performanceMode={performanceMode}
        setPerformanceMode={setPerformanceMode}
      />
    </SettingsTabsProvider>
  );

  if (isMobile) {
    return (
      <div ref={containerRef} className="focus-within:outline-none">
        <SettingsLayout
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onFilterChange={setSearchFilters}
        >
          <MobileSettingsLayout
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabsContent={tabsContent}
          >
            <div className="fade-in" style={{ animationDelay: "300ms" }}>
              <SettingsActions 
                onSaveAll={handleSaveAll}
                onResetAll={handleResetAll}
              />
            </div>
          </MobileSettingsLayout>
        </SettingsLayout>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="focus-within:outline-none">
      <SettingsLayout
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onFilterChange={setSearchFilters}
      >
        {tabsContent}

        <div className="fade-in" style={{ animationDelay: "300ms" }}>
          <SettingsActions 
            onSaveAll={handleSaveAll}
            onResetAll={handleResetAll}
          />
        </div>
      </SettingsLayout>
    </div>
  );
};
