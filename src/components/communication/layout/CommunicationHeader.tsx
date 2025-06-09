
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare } from "lucide-react";

interface CommunicationHeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const CommunicationHeader = ({ searchQuery, onSearch }: CommunicationHeaderProps) => {
  return (
    <div className="p-4 border-b bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Communication Hub</h1>
          <Badge variant="secondary" className="ml-2">
            Active
          </Badge>
        </div>
      </div>
      
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search conversations, users, or messages..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};
