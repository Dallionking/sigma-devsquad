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
import { FilterProvider } from "@/contexts/FilterContext";
import { CurrentUserProvider } from "@/contexts/CurrentUserContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { DataPersistenceProvider } from "@/contexts/DataPersistenceContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import LLMIntegration from "./pages/LLMIntegration";
import AgentConfiguration from "./pages/AgentConfiguration";
import AgentCreation from "./pages/AgentCreation";
import MCPManagement from "./pages/MCPManagement";
import IDEIntegration from "./pages/IDEIntegration";
import PlanningAgent from "./pages/PlanningAgent";
import NotFound from "./pages/NotFound";
import TeamSettings from "./pages/TeamSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <AppStateProvider>
          <AgentProvider>
            <TaskProvider>
              <MessageProvider>
                <TeamProvider>
                  <FilterProvider>
                    <CurrentUserProvider>
                      <DataPersistenceProvider>
                        {/* Wrap with WebSocket for real-time collaboration */}
                        <WebSocketProvider userId="current-user" userName="Current User">
                          <TooltipProvider>
                            <Toaster />
                            <Sonner />
                            <BrowserRouter>
                              <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/auth" element={<AuthPage />} />
                                <Route path="/dashboard" element={
                                  <ProtectedRoute>
                                    <Dashboard />
                                  </ProtectedRoute>
                                } />
                                <Route path="/profile" element={
                                  <ProtectedRoute>
                                    <Profile />
                                  </ProtectedRoute>
                                } />
                                <Route path="/settings" element={
                                  <ProtectedRoute>
                                    <Settings />
                                  </ProtectedRoute>
                                } />
                                <Route path="/team-settings/:teamId" element={
                                  <ProtectedRoute>
                                    <TeamSettings />
                                  </ProtectedRoute>
                                } />
                                <Route path="/llm-integration" element={
                                  <ProtectedRoute>
                                    <LLMIntegration />
                                  </ProtectedRoute>
                                } />
                                <Route path="/agent-configuration" element={
                                  <ProtectedRoute>
                                    <AgentConfiguration />
                                  </ProtectedRoute>
                                } />
                                <Route path="/agent-creation" element={
                                  <ProtectedRoute>
                                    <AgentCreation />
                                  </ProtectedRoute>
                                } />
                                <Route path="/mcp-management" element={
                                  <ProtectedRoute>
                                    <MCPManagement />
                                  </ProtectedRoute>
                                } />
                                <Route path="/ide-integration" element={
                                  <ProtectedRoute>
                                    <IDEIntegration />
                                  </ProtectedRoute>
                                } />
                                <Route path="/planning-agent" element={
                                  <ProtectedRoute>
                                    <PlanningAgent />
                                  </ProtectedRoute>
                                } />
                                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                            </BrowserRouter>
                          </TooltipProvider>
                        </WebSocketProvider>
                      </DataPersistenceProvider>
                    </CurrentUserProvider>
                  </FilterProvider>
                </TeamProvider>
              </MessageProvider>
            </TaskProvider>
          </AgentProvider>
        </AppStateProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
