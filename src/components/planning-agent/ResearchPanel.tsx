
import { useState } from "react";
import { QuickSearch } from "./research/QuickSearch";
import { RecentFindings } from "./research/RecentFindings";
import { ResearchActions } from "./research/ResearchActions";

export const ResearchPanel = () => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    console.log("Quick search for:", query);
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      console.log("Search completed for:", query);
    }, 1500);
  };

  return (
    <div className="h-full overflow-y-auto space-y-4 p-4">
      <QuickSearch onSearch={handleSearch} isSearching={isSearching} />
      <RecentFindings />
      <ResearchActions />
    </div>
  );
};
