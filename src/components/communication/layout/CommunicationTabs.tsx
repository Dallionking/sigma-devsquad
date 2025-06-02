
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  Pin, 
  MessageCircle, 
  ExternalLink 
} from "lucide-react";

interface CommunicationTabsProps {
  activeTab: string;
}

export const CommunicationTabs = ({ activeTab }: CommunicationTabsProps) => {
  const tabs = [
    {
      value: "direct",
      label: "Direct Messages",
      icon: MessageSquare,
      count: 5
    },
    {
      value: "groups",
      label: "Group Chats",
      icon: Users,
      count: 3
    },
    {
      value: "pinned",
      label: "Pinned",
      icon: Pin,
      count: 2
    },
    {
      value: "threads",
      label: "Threads",
      icon: MessageCircle,
      count: 8
    },
    {
      value: "integrations",
      label: "Integrations",
      icon: ExternalLink,
      count: 0
    }
  ];

  return (
    <div className="border-b bg-muted/20">
      <TabsList className="h-auto p-1 bg-transparent justify-start w-full rounded-none">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2 px-4 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 text-xs">
                  {tab.count}
                </Badge>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
};
