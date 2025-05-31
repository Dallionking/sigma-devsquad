
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft,
  Users,
  History,
  Send
} from "lucide-react";
import { UnifiedCommunicationInterface } from "../communication/UnifiedCommunicationInterface";

interface CommunicationPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const CommunicationPanel = ({ isOpen, onToggle }: CommunicationPanelProps) => {
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <>
      {/* Communication Toggle Button */}
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-30">
        <Button
          onClick={onToggle}
          variant="default"
          size="sm"
          className="rounded-l-lg rounded-r-none shadow-lg"
        >
          {isOpen ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {unreadCount > 0 && (
                <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
          )}
        </Button>
      </div>

      {/* Communication Panel */}
      {isOpen && (
        <>
          {/* Desktop Panel */}
          <div className="hidden lg:block fixed top-16 right-0 h-[calc(100vh-4rem)] w-1/2 z-20 bg-background border-l shadow-lg">
            <UnifiedCommunicationInterface />
          </div>

          {/* Mobile Panel */}
          <div className="lg:hidden fixed inset-0 z-50 bg-background">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Agent Communication
                </h2>
                <Button variant="outline" size="sm" onClick={onToggle}>
                  <ChevronLeft className="w-4 h-4" />
                  Close
                </Button>
              </div>
              <div className="flex-1">
                <UnifiedCommunicationInterface />
              </div>
            </div>
          </div>

          {/* Mobile Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={onToggle}
          />
        </>
      )}
    </>
  );
};
