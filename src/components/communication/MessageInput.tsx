
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send } from "lucide-react";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
}

export const MessageInput = ({
  message,
  setMessage,
  onSendMessage
}: MessageInputProps) => {
  return (
    <div className="p-3 sm:p-4 border-t bg-background shrink-0 mobile-safe-area">
      <div className="flex gap-2">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
          className="min-h-[60px] resize-none text-responsive-sm flex-1 no-zoom touch-manipulation"
          rows={2}
        />
        
        <div className="flex flex-col gap-2 shrink-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="px-2 btn-mobile min-h-[44px] min-w-[44px] touch-manipulation active:scale-95"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={onSendMessage}
            disabled={!message.trim()}
            className="px-2 btn-mobile min-h-[44px] min-w-[44px] touch-manipulation active:scale-95 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
