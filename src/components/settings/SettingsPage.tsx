
import { OptimizedSettingsLayout } from "./OptimizedSettingsLayout";
import { PerformanceOptimizedTabs } from "./PerformanceOptimizedTabs";
import { SettingsActions } from "./SettingsActions";
import { MobileSettingsLayout } from "./MobileSettingsLayout";
import { SettingsLayoutContainer } from "./layout/SettingsLayoutContainer";
import { settingsTabDefinitions } from "./tabs/SettingsTabDefinitions";
import { useSettingsState } from "@/hooks/useSettingsState";
import { useSettingsActions } from "@/hooks/useSettingsActions";
import { useEnhancedKeyboardNavigation } from "@/hooks/useEnhancedKeyboardNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const isMobile = useIsMobile();

  // Enhanced keyboard navigation functions
  const { focusNext, focusPrevious, saveFocus, restoreFocus } = useEnhancedKeyboardNavigation({
    containerRef: { current: null },
  });

  const settingsProps = {
    searchQuery,
    notifications,
    setNotifications,
    autoBackup,
    setAutoBackup,
    performanceMode,
    setPerformanceMode,
  };

  const tabsContent = (
    <PerformanceOptimizedTabs
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        saveFocus(); // Save focus when switching tabs
      }}
      searchQuery={searchQuery}
      tabs={settingsTabDefinitions}
      settingsProps={settingsProps}
    />
  );

  const layoutContent = (
    <OptimizedSettingsLayout
      searchQuery={searchQuery}
      onSearch={setSearchQuery}
      onFilterChange={setSearchFilters}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {isMobile ? (
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
      ) : (
        <>
          {tabsContent}
          <div className="fade-in" style={{ animationDelay: "300ms" }}>
            <SettingsActions 
              onSaveAll={handleSaveAll}
              onResetAll={handleResetAll}
            />
          </div>
        </>
      )}
    </OptimizedSettingsLayout>
  );

  return (
    <SettingsLayoutContainer
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onFocusNext={focusNext}
      onFocusPrevious={focusPrevious}
      onSaveFocus={saveFocus}
      onRestoreFocus={restoreFocus}
    >
      {layoutContent}
    </SettingsLayoutContainer>
  );
};
