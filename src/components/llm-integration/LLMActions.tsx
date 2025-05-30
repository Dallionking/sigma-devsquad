
import { Button } from "@/components/ui/button";

export const LLMActions = () => {
  return (
    <div className="flex justify-end space-x-4">
      <Button variant="outline">Export Configuration</Button>
      <Button>Save Changes</Button>
    </div>
  );
};
