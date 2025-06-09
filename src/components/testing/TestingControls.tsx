
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface TestingControlsProps {
  containerWidth: number[];
  setContainerWidth: (value: number[]) => void;
  currentBreakpoint: { name: string; width: number };
  setCurrentBreakpoint: (breakpoint: { name: string; width: number }) => void;
  testLanguage: string;
  setTestLanguage: (language: string) => void;
  showGridlines: boolean;
  setShowGridlines: (show: boolean) => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
  breakpoints: Array<{ name: string; width: number; class: string }>;
}

export const TestingControls = ({
  containerWidth,
  setContainerWidth,
  currentBreakpoint,
  setCurrentBreakpoint,
  testLanguage,
  setTestLanguage,
  showGridlines,
  setShowGridlines,
  highContrast,
  setHighContrast,
  breakpoints
}: TestingControlsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Viewport Width</label>
        <Slider
          value={containerWidth}
          onValueChange={setContainerWidth}
          min={320}
          max={1920}
          step={1}
          className="w-full"
        />
        <span className="text-xs text-muted-foreground">{containerWidth[0]}px</span>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Breakpoint Preset</label>
        <Select value={currentBreakpoint.name} onValueChange={(value) => {
          const bp = breakpoints.find(b => b.name === value)!;
          setCurrentBreakpoint(bp);
          setContainerWidth([bp.width]);
        }}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {breakpoints.map(bp => (
              <SelectItem key={bp.name} value={bp.name}>
                {bp.name} ({bp.width}px)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Test Language</label>
        <Select value={testLanguage} onValueChange={setTestLanguage}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
            <SelectItem value="ar">العربية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="gridlines"
            checked={showGridlines}
            onCheckedChange={setShowGridlines}
          />
          <label htmlFor="gridlines" className="text-sm font-medium">
            Show Gridlines
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="high-contrast"
            checked={highContrast}
            onCheckedChange={setHighContrast}
          />
          <label htmlFor="high-contrast" className="text-sm font-medium">
            High Contrast
          </label>
        </div>
      </div>
    </div>
  );
};
