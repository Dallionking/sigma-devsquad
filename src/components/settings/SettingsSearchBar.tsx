
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SettingsSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SettingsSearchBar = ({ onSearch, placeholder = "Search settings..." }: SettingsSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value.toLowerCase());
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 bg-background border-border"
      />
    </div>
  );
};
