
import { Button } from "@/components/ui/button";
import { UnifiedCommunicationHub } from "@/components/communication/UnifiedCommunicationHub";
import { MessageSquare, X } from "lucide-react";

interface MobileAgentChatModalProps {
  onClose: () => void;
}

export const MobileAgentChatModal = ({ onClose }: MobileAgentChatModalProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-x-4 top-16 bottom-4 z-50 bg-background border border-border/30 rounded-lg shadow-xl">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Agent Communication
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 min-h-0 p-4">
            <UnifiedCommunicationHub showPresence={true} />
          </div>
        </div>
      </div>
    </>
  );
};
