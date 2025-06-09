
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { memo } from "react";

interface FilterPreset {
  id: string;
  name: string;
  isStarred: boolean;
  filterCount: number;
}

interface FilterPresetsProps {
  presets: FilterPreset[];
  onPresetClick: (presetId: string) => void;
}

export const FilterPresets = memo(({ presets, onPresetClick }: FilterPresetsProps) => {
  const starredPresets = presets.filter(preset => preset.isStarred);

  if (starredPresets.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {starredPresets.map((preset) => (
        <Button
          key={preset.id}
          variant="outline"
          size="sm"
          onClick={() => onPresetClick(preset.id)}
          className="text-xs h-7"
        >
          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
          {preset.name}
          {preset.filterCount > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {preset.filterCount}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
});

FilterPresets.displayName = 'FilterPresets';
