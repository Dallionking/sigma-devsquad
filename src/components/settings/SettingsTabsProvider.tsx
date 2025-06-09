
import { ReactNode } from "react";
import { Tabs } from "@/components/ui/tabs";
import { SettingsTabsList } from "./SettingsTabsList";

interface SettingsTabsProviderProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SettingsTabsProvider = ({
  children,
  activeTab,
  onTabChange,
}: SettingsTabsProviderProps) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={onTabChange}
      className="space-y-6 fade-in" 
      style={{ animationDelay: "200ms" }}
    >
      <div className="overflow-x-auto" role="tablist">
        <SettingsTabsList />
      </div>

      <div className="min-h-[500px]">
        {children}
      </div>
    </Tabs>
  );
};
