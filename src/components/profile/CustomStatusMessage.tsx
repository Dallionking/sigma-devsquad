
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Smile, X } from "lucide-react";

interface CustomStatusMessageProps {
  message: string;
  emoji: string;
  clearAfter: number;
  onMessageChange: (message: string) => void;
  onEmojiChange: (emoji: string) => void;
  onClearAfterChange: (minutes: number) => void;
  disabled?: boolean;
}

export const CustomStatusMessage = ({
  message,
  emoji,
  clearAfter,
  onMessageChange,
  onEmojiChange,
  onClearAfterChange,
  disabled
}: CustomStatusMessageProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const commonEmojis = [
    '💼', '🏠', '☕', '🍕', '🚀', '💻', '📝', '🎯', '⚡', '🔥',
    '👋', '😊', '🤔', '😴', '🎉', '📚', '🎵', '☀️', '🌙', '⭐'
  ];

  const clearAfterOptions = [
    { value: 0, label: 'Never' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 240, label: '4 hours' },
    { value: 480, label: '8 hours' },
    { value: 1440, label: '24 hours' }
  ];

  const handleClearMessage = () => {
    onMessageChange('');
    onEmojiChange('💼');
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Custom Status Message</Label>
        <p className="text-sm text-muted-foreground">
          Add a personal message to let others know what you're up to
        </p>
      </div>

      <div className="space-y-4">
        {/* Emoji Selector */}
        <div className="space-y-2">
          <Label htmlFor="emoji">Emoji</Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              disabled={disabled}
              className="w-12 h-10 p-0 text-lg"
            >
              {emoji}
            </Button>
            <Badge variant="secondary" className="text-xs">
              <Smile className="w-3 h-3 mr-1" />
              Click to change
            </Badge>
          </div>
          
          {showEmojiPicker && !disabled && (
            <div className="grid grid-cols-10 gap-1 p-3 border rounded-lg bg-background">
              {commonEmojis.map((emojiOption) => (
                <Button
                  key={emojiOption}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onEmojiChange(emojiOption);
                    setShowEmojiPicker(false);
                  }}
                  className="w-8 h-8 p-0 text-lg hover:bg-accent"
                >
                  {emojiOption}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Status Message Input */}
        <div className="space-y-2">
          <Label htmlFor="statusMessage">Status Message</Label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">
                {emoji}
              </div>
              <Input
                id="statusMessage"
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
                disabled={disabled}
                placeholder="What's happening?"
                maxLength={100}
                className="pl-12"
              />
            </div>
            {message && !disabled && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClearMessage}
                className="px-3"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Keep it brief and professional</span>
            <span>{message.length}/100</span>
          </div>
        </div>

        {/* Auto-clear Settings */}
        <div className="space-y-2">
          <Label htmlFor="clearAfter">Auto-clear Message</Label>
          <Select
            value={clearAfter.toString()}
            onValueChange={(value) => onClearAfterChange(parseInt(value))}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose when to clear" />
            </SelectTrigger>
            <SelectContent>
              {clearAfterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Automatically clear your status message after the selected time
          </p>
        </div>

        {/* Preview */}
        {message && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Preview</Label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">{emoji}</span>
              <span className="text-sm">{message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
