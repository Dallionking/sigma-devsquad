
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Bot, Sparkles, Copy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AgentCreationButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const creationMethods = [
    {
      id: "new",
      title: "Create New Agent",
      description: "Build from scratch with custom configuration",
      icon: Bot,
      color: "bg-blue-100 text-blue-600",
      action: () => {
        setOpen(false);
        navigate("/agent-creation");
      }
    },
    {
      id: "template",
      title: "Use Template",
      description: "Start with pre-configured agent templates",
      icon: Sparkles,
      color: "bg-purple-100 text-purple-600",
      action: () => {
        setOpen(false);
        navigate("/agent-creation?template=true");
      }
    },
    {
      id: "clone",
      title: "Clone Existing",
      description: "Duplicate and modify an existing agent",
      icon: Copy,
      color: "bg-green-100 text-green-600",
      action: () => {
        setOpen(false);
        navigate("/agent-creation?method=clone");
      }
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
          size="lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Agent</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 mt-4">
          {creationMethods.map((method) => {
            const Icon = method.icon;
            
            return (
              <Card 
                key={method.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50"
                onClick={method.action}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${method.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{method.title}</h3>
                      <p className="text-muted-foreground">{method.description}</p>
                    </div>
                    
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Bot className="w-4 h-4" />
            <span>Need help choosing? Templates are great for common roles, while custom creation gives you full control.</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
