
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TeamComposition, TeamType } from '@/types/teams';
import { Save, BookOpen, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterPreset {
  id: string;
  name: string;
  compositions: TeamComposition[];
  types: TeamType[];
  isDefault?: boolean;
}

interface FilterPresetsProps {
  currentCompositions: TeamComposition[];
  currentTypes: TeamType[];
  onApplyPreset: (compositions: TeamComposition[], types: TeamType[]) => void;
  className?: string;
}

const defaultPresets: FilterPreset[] = [
  {
    id: 'human-teams',
    name: 'Human Teams',
    compositions: ['human'],
    types: [],
    isDefault: true
  },
  {
    id: 'ai-teams',
    name: 'AI Teams',
    compositions: ['ai'],
    types: [],
    isDefault: true
  },
  {
    id: 'hybrid-teams',
    name: 'Mixed Teams',
    compositions: ['hybrid'],
    types: [],
    isDefault: true
  },
  {
    id: 'development-teams',
    name: 'Development Teams',
    compositions: [],
    types: ['frontend', 'backend', 'devops'],
    isDefault: true
  },
  {
    id: 'design-product',
    name: 'Design & Product',
    compositions: [],
    types: ['design', 'product'],
    isDefault: true
  }
];

export const FilterPresets = ({
  currentCompositions,
  currentTypes,
  onApplyPreset,
  className
}: FilterPresetsProps) => {
  const [presets, setPresets] = useState<FilterPreset[]>(defaultPresets);
  const [newPresetName, setNewPresetName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const hasCurrentFilters = currentCompositions.length > 0 || currentTypes.length > 0;

  const saveCurrentAsPreset = () => {
    if (!newPresetName.trim() || !hasCurrentFilters) return;

    const newPreset: FilterPreset = {
      id: `custom-${Date.now()}`,
      name: newPresetName.trim(),
      compositions: currentCompositions,
      types: currentTypes
    };

    setPresets(prev => [...prev, newPreset]);
    setNewPresetName('');
    setShowSaveDialog(false);
  };

  const deletePreset = (presetId: string) => {
    setPresets(prev => prev.filter(p => p.id !== presetId && !p.isDefault));
  };

  const applyPreset = (preset: FilterPreset) => {
    onApplyPreset(preset.compositions, preset.types);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Filter Presets</h4>
        {hasCurrentFilters && (
          <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Save className="w-3 h-3 mr-1" />
                Save
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Save Filter Preset</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Preset name"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveCurrentAsPreset()}
                />
                <div className="flex gap-2">
                  <Button onClick={saveCurrentAsPreset} disabled={!newPresetName.trim()}>
                    Save Preset
                  </Button>
                  <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-2">
        {presets.map((preset) => (
          <div
            key={preset.id}
            className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium truncate">{preset.name}</span>
                {preset.isDefault && (
                  <Badge variant="outline" className="text-xs">Default</Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {preset.compositions.length > 0 && (
                  <span>{preset.compositions.length} composition{preset.compositions.length !== 1 ? 's' : ''}</span>
                )}
                {preset.compositions.length > 0 && preset.types.length > 0 && <span>•</span>}
                {preset.types.length > 0 && (
                  <span>{preset.types.length} type{preset.types.length !== 1 ? 's' : ''}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => applyPreset(preset)}
                className="h-8 px-2"
              >
                <BookOpen className="w-3 h-3" />
              </Button>
              {!preset.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deletePreset(preset.id)}
                  className="h-8 px-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
