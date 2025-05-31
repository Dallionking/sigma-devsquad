
import { TabsContent } from "@/components/ui/tabs";
import { GeneralSettings } from "./GeneralSettings";
import { ConfigurationSettings } from "./ConfigurationSettings";
import { APIKeySettings } from "./APIKeySettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { PerformanceSettings } from "./PerformanceSettings";
import { SecuritySettings } from "./SecuritySettings";
import { NotificationSettings } from "./NotificationSettings";
import { BackupSettings } from "./BackupSettings";
import { cn } from "@/lib/utils";

interface SettingsContentProps {
  searchQuery: string;
  notifications: boolean;
  setNotifications: (value: boolean) => void;
  autoBackup: boolean;
  setAutoBackup: (value: boolean) => void;
  performanceMode: string;
  setPerformanceMode: (value: string) => void;
}

export const SettingsContent = ({
  searchQuery,
  notifications,
  setNotifications,
  autoBackup,
  setAutoBackup,
  performanceMode,
  setPerformanceMode,
}: SettingsContentProps) => {
  const tabContentClasses = cn(
    "space-y-6 mt-6 focus:outline-none",
    "animate-in fade-in-0 duration-200"
  );

  return (
    <>
      <TabsContent 
        value="general" 
        className={tabContentClasses}
        tabIndex={-1}
        role="tabpanel"
        aria-labelledby="general-tab"
      >
        <GeneralSettings searchQuery={searchQuery} />
      </TabsContent>

      <TabsContent 
        value="configuration" 
        className={tabContentClasses}
        tabIndex={-1}
        role="tabpanel"
        aria-labelledby="configuration-tab"
      >
        <ConfigurationSettings searchQuery={searchQuery} />
      </TabsContent>

      <TabsContent 
        value="api-keys" 
        className={tabContentClasses}
        tabIndex={-1}
        role="tabpanel"
        aria-labelledby="api-keys-tab"
      >
        <APIKeySettings searchQuery={searchQuery} />
      </TabsContent>

      <TabsContent 
        value="appearance" 
        className={tabContentClasses}
        tabIndex={-1}
        role="tabpanel"
        aria-labelledby="appearance-tab"
      >
        <AppearanceSettings searchQuery={searchQuery} />
      </TabsContent>

      <TabsContent 
        value="performance" 
        className={tabContentClasses}
        tabIndex={-1}
        role="tabpanel"
        aria-labelledby="performance-tab"
      >
        <PerformanceSettings 
          performanceMode={performanceMode} 
          setPerformanceMode={setPerformanceMode}
          searchQuery={searchQuery}
        />
      </TabsContent>

      <TabsContent 
        value="security" 
        className={tabContentClasses}
        tabIndex={-1}
        role="tabpanel"
        aria-labelledby="security-tab"
      >
        <SecuritySettings searchQuery={searchQuery} />
      </TabsContent>

      <TabsContent 
        value="notifications" 
        className={tabContentClasses}
        tabIndex={-1}
        role="tabpanel"
        aria-labelledby="notifications-tab"
      >
        <NotificationSettings 
          notifications={notifications} 
          setNotifications={setNotifications}
          searchQuery={searchQuery}
        />
      </TabsContent>

      <TabsContent 
        value="backup" 
        className={tabContentClasses}
        tabIndex={-1}
        role="tabpanel"
        aria-labelledby="backup-tab"
      >
        <BackupSettings 
          autoBackup={autoBackup} 
          setAutoBackup={setAutoBackup}
          searchQuery={searchQuery}
        />
      </TabsContent>
    </>
  );
};
