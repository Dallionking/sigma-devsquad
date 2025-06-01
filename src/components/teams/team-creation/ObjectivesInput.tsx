
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface ObjectivesInputProps {
  objectives: string[];
  onChange: (objectives: string[]) => void;
}

export const ObjectivesInput = ({ objectives, onChange }: ObjectivesInputProps) => {
  const [currentObjective, setCurrentObjective] = useState("");

  const addObjective = () => {
    if (currentObjective.trim() && !objectives.includes(currentObjective.trim())) {
      onChange([...objectives, currentObjective.trim()]);
      setCurrentObjective("");
    }
  };

  const removeObjective = (index: number) => {
    onChange(objectives.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addObjective();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="objectives">Team Objectives</Label>
      
      <div className="flex gap-2">
        <Input
          id="objectives"
          value={currentObjective}
          onChange={(e) => setCurrentObjective(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a team objective..."
        />
        <Button type="button" size="sm" onClick={addObjective}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {objectives.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {objectives.map((objective, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {objective}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => removeObjective(index)}
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
