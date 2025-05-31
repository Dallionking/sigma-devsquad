
import { LandingPage } from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import Index from '@/pages/Index';
import { Settings } from '@/pages/Settings';
import PlanningAgent from '@/pages/PlanningAgent';
import AgentCreation from '@/pages/AgentCreation';
import AgentConfiguration from '@/pages/AgentConfiguration';
import IDEIntegration from '@/pages/IDEIntegration';
import LLMIntegration from '@/pages/LLMIntegration';
import MCPManagement from '@/pages/MCPManagement';
import NotFound from '@/pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AgentProvider } from '@/contexts/AgentContext';
import { TaskProvider } from '@/contexts/TaskContext';
import { MessageProvider } from '@/contexts/MessageContext';
import { TeamProvider } from '@/contexts/TeamContext';
import { CurrentUserProvider } from '@/contexts/CurrentUserContext';
import { FilterProvider } from '@/contexts/FilterContext';
import { WebSocketProvider } from '@/contexts/WebSocketProvider';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CurrentUserProvider>
          <AgentProvider>
            <TaskProvider>
              <MessageProvider>
                <TeamProvider>
                  <FilterProvider>
                    <WebSocketProvider>
                      <div className="min-h-screen bg-background font-vibe-body">
                        <Routes>
                          <Route path="/" element={<LandingPage />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/app" element={<Index />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/planning" element={<PlanningAgent />} />
                          <Route path="/agents/create" element={<AgentCreation />} />
                          <Route path="/agents/config" element={<AgentConfiguration />} />
                          <Route path="/ide" element={<IDEIntegration />} />
                          <Route path="/llm" element={<LLMIntegration />} />
                          <Route path="/mcp" element={<MCPManagement />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Toaster />
                      </div>
                    </WebSocketProvider>
                  </FilterProvider>
                </TeamProvider>
              </MessageProvider>
            </TaskProvider>
          </AgentProvider>
        </CurrentUserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
