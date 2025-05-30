
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

export const ChatInput = ({ onSendMessage, isTyping }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Voice input functionality would be implemented here
    console.log("Voice input toggled:", !isRecording);
  };

  return (
    <div className="border-t border-border p-4 bg-muted/30">
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your project requirements, ask for analysis, or request feature breakdowns..."
            className="min-h-[48px] max-h-[120px] resize-none pr-20 text-sm"
            disabled={isTyping}
            rows={1}
          />
          <div className="absolute right-2 bottom-2 flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleVoiceInput}
              disabled={isTyping}
            >
              <Mic className={`w-4 h-4 ${isRecording ? 'text-red-500' : 'text-muted-foreground'}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={isTyping}
            >
              <Paperclip className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <Button 
          onClick={handleSendMessage} 
          disabled={!inputValue.trim() || isTyping}
          size="sm"
          className="h-12 px-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <Send className="w-4 h-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span>{inputValue.length}/2000</span>
      </div>
    </div>
  );
};
