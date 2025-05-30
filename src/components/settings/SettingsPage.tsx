
import { OptimizedSettingsLayout } from "./OptimizedSettingsLayout";
import { PerformanceOptimizedTabs } from "./PerformanceOptimizedTabs";
import { SettingsActions } from "./SettingsActions";
import { MobileSettingsLayout } from "./MobileSettingsLayout";
import { GeneralSettings } from "./GeneralSettings";
import { APIKeySettings } from "./APIKeySettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { PerformanceSettings } from "./PerformanceSettings";
import { SecuritySettings } from "./SecuritySettings";
import { NotificationSettings } from "./NotificationSettings";
import { BackupSettings } from "./BackupSettings";
import { useSettingsState } from "@/hooks/useSettingsState";
import { useSettingsActions } from "@/hooks/useSettingsActions";
import { useEnhancedKeyboardNavigation } from "@/hooks/useEnhancedKeyboardNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Settings as SettingsIcon, Monitor, Shield, Bell, Database, Palette, Key } from "lucide-react";
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

  // Define tabs with their components for performance optimization
  const tabs = [
    { 
      id: "general", 
      label: "General", 
      icon: SettingsIcon, 
      component: GeneralSettings 
    },
    { 
      id: "api-keys", 
      label: "API Keys", 
      icon: Key, 
      component: APIKeySettings 
    },
    { 
      id: "appearance", 
      label: "Appearance", 
      icon: Palette, 
      component: AppearanceSettings 
    },
    { 
      id: "performance", 
      label: "Performance", 
      icon: Monitor, 
      component: PerformanceSettings 
    },
    { 
      id: "security", 
      label: "Security", 
      icon: Shield, 
      component: SecuritySettings 
    },
    { 
      id: "notifications", 
      label: "Notifications", 
      icon: Bell, 
      component: NotificationSettings 
    },
    { 
      id: "backup", 
      label: "Backup", 
      icon: Database, 
      component: BackupSettings 
    }
  ];

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
      tabs={tabs}
      settingsProps={settingsProps}
    />
  );

  if (isMobile) {
    return (
      <div ref={containerRef} className="focus-within:outline-none">
        <OptimizedSettingsLayout
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onFilterChange={setSearchFilters}
          activeTab={activeTab}
          onTabChange={setActiveTab}
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
        </OptimizedSettingsLayout>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="focus-within:outline-none">
      <OptimizedSettingsLayout
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onFilterChange={setSearchFilters}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {tabsContent}

        <div className="fade-in" style={{ animationDelay: "300ms" }}>
          <SettingsActions 
            onSaveAll={handleSaveAll}
            onResetAll={handleResetAll}
          />
        </div>
      </OptimizedSettingsLayout>
    </div>
  );
};
