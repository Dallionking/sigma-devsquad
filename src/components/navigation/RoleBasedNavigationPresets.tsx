
import React from 'react';
import { Button } from '@/components/ui/button';
import { useContextualNavigation } from './ContextualNavigationProvider';
import { cn } from '@/lib/utils';

export const RoleBasedNavigationPresets = () => {
  const { currentPreset, availablePresets, setCurrentPreset } = useContextualNavigation();

  return (
    <div className="p-3 border-t border-sidebar-border/50">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Role Presets
      </h3>
      <div className="space-y-1">
        {availablePresets.map((preset) => (
          <Button
            key={preset.id}
            variant={currentPreset?.id === preset.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentPreset(preset)}
            className={cn(
              "w-full justify-start text-xs",
              currentPreset?.id === preset.id && "bg-primary text-primary-foreground"
            )}
          >
            {preset.name}
          </Button>
        ))}
        {currentPreset && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPreset(null)}
            className="w-full justify-start text-xs text-muted-foreground"
          >
            Clear Preset
          </Button>
        )}
      </div>
    </div>
  );
};
