
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AgentForm } from "./agent-addition/AgentForm";
import { useAgentForm } from "./agent-addition/useAgentForm";

interface AgentAdditionDialogProps {
  teamId: string;
  children: React.ReactNode;
}

export const AgentAdditionDialog = ({ teamId, children }: AgentAdditionDialogProps) => {
  const [open, setOpen] = useState(false);
  
  const { formData, updateField, handleSubmit, resetForm } = useAgentForm(teamId, () => {
    setOpen(false);
  });

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        
        <AgentForm
          data={formData}
          onChange={updateField}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};
