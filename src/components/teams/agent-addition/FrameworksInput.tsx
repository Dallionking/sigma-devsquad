
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface FrameworksInputProps {
  frameworks: string[];
  onChange: (frameworks: string[]) => void;
}

export const FrameworksInput = ({ frameworks, onChange }: FrameworksInputProps) => {
  const [newFramework, setNewFramework] = useState("");

  const handleAddFramework = () => {
    if (newFramework.trim() && !frameworks.includes(newFramework.trim())) {
      onChange([...frameworks, newFramework.trim()]);
      setNewFramework("");
    }
  };

  const handleRemoveFramework = (index: number) => {
    onChange(frameworks.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label>Frameworks & Technologies</Label>
      <div className="flex gap-2">
        <Input
          value={newFramework}
          onChange={(e) => setNewFramework(e.target.value)}
          placeholder="Add a framework"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddFramework();
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddFramework}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      {frameworks.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {frameworks.map((framework, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {framework}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 w-4 h-4"
                onClick={() => handleRemoveFramework(index)}
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
