
import { SettingsLayout } from "./SettingsLayout";
import { SettingsTabsProvider } from "./SettingsTabsProvider";
import { SettingsContent } from "./SettingsContent";
import { SettingsActions } from "./SettingsActions";
import { useSettingsState } from "@/hooks/useSettingsState";
import { useSettingsActions } from "@/hooks/useSettingsActions";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

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

  // Get keyboard navigation functions first
  const { focusNext, focusPrevious } = useKeyboardNavigation({
    onEscape: () => {
      // Clear search when pressing Escape
      if (searchQuery) {
        setSearchQuery("");
      }
    },
    enableArrowNavigation: true,
  });

  // Set up keyboard navigation with the functions now available
  useKeyboardNavigation({
    onEscape: () => {
      if (searchQuery) {
        setSearchQuery("");
      }
    },
    enableArrowNavigation: true,
    onArrowDown: focusNext,
    onArrowUp: focusPrevious,
  });

  return (
    <SettingsLayout
      searchQuery={searchQuery}
      onSearch={setSearchQuery}
      onFilterChange={setSearchFilters}
    >
      <SettingsTabsProvider
        activeTab={activeTab}
        onTabChange={setActiveTab}
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

      <div className="fade-in" style={{ animationDelay: "300ms" }}>
        <SettingsActions 
          onSaveAll={handleSaveAll}
          onResetAll={handleResetAll}
        />
      </div>
    </SettingsLayout>
  );
};
