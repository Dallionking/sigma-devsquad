
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface ObjectivesInputProps {
  objectives: string[];
  onChange: (objectives: string[]) => void;
}

export const ObjectivesInput = ({ objectives, onChange }: ObjectivesInputProps) => {
  const [newObjective, setNewObjective] = useState("");

  const handleAddObjective = () => {
    if (newObjective.trim() && !objectives.includes(newObjective.trim())) {
      onChange([...objectives, newObjective.trim()]);
      setNewObjective("");
    }
  };

  const handleRemoveObjective = (index: number) => {
    onChange(objectives.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label>Team Objectives</Label>
      <div className="flex gap-2">
        <Input
          value={newObjective}
          onChange={(e) => setNewObjective(e.target.value)}
          placeholder="Add an objective"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddObjective();
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddObjective}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      {objectives.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {objectives.map((objective, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {objective}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 w-4 h-4"
                onClick={() => handleRemoveObjective(index)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
