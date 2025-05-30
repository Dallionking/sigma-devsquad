
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppStateProvider } from "@/contexts/AppStateContext";
import { AgentProvider } from "@/contexts/AgentContext";
import { TaskProvider } from "@/contexts/TaskContext";
import { MessageProvider } from "@/contexts/MessageContext";
import { TeamProvider } from "@/contexts/TeamContext";
import { CurrentUserProvider } from "@/contexts/CurrentUserContext";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import LLMIntegration from "./pages/LLMIntegration";
import AgentConfiguration from "./pages/AgentConfiguration";
import AgentCreation from "./pages/AgentCreation";
import MCPManagement from "./pages/MCPManagement";
import IDEIntegration from "./pages/IDEIntegration";
import PlanningAgent from "./pages/PlanningAgent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AppStateProvider>
        <AgentProvider>
          <TaskProvider>
            <MessageProvider>
              <TeamProvider>
                <CurrentUserProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/llm-integration" element={<LLMIntegration />} />
                        <Route path="/agent-configuration" element={<AgentConfiguration />} />
                        <Route path="/agent-creation" element={<AgentCreation />} />
                        <Route path="/mcp-management" element={<MCPManagement />} />
                        <Route path="/ide-integration" element={<IDEIntegration />} />
                        <Route path="/planning-agent" element={<PlanningAgent />} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </TooltipProvider>
                </CurrentUserProvider>
              </TeamProvider>
            </MessageProvider>
          </TaskProvider>
        </AgentProvider>
      </AppStateProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
