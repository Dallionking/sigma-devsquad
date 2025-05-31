
import { Button } from "@/components/ui/button";
import { UnifiedCommunicationHub } from "@/components/communication/UnifiedCommunicationHub";
import { MessageSquare, X } from "lucide-react";

interface AgentChatPanelProps {
  onClose: () => void;
}

export const AgentChatPanel = ({ onClose }: AgentChatPanelProps) => {
  return (
    <div className="min-w-0 min-h-0 flex flex-col">
      <div className="h-full border border-border/30 bg-background/95 backdrop-blur-sm rounded-lg">
        <div className="h-full flex flex-col">
          <div className="border-b border-border/20 p-3 bg-gradient-to-r from-[#0A0E1A]/80 to-background/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
                <h3 className="text-sm font-semibold">Agent Chat</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-7 w-7 p-0 hover:bg-red-500/10 hover:text-red-500"
                title="Close Agent Chat"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="flex-1 min-h-0 p-3">
            <UnifiedCommunicationHub showPresence={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
