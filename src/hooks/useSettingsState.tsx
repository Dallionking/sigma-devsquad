
import { useState } from "react";

export const useSettingsState = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [performanceMode, setPerformanceMode] = useState("balanced");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState({});
  const [activeTab, setActiveTab] = useState("general");

  return {
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
  };
};
