
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { DataPersistenceProvider } from "./contexts/DataPersistenceContext";
import { FilterProvider } from "./contexts/FilterContext";
import { AgentProvider } from "./contexts/AgentContext";
import { TaskProvider } from "./contexts/TaskContext";
import { MessageProvider } from "./contexts/MessageContext";
import { TeamProvider } from "./contexts/TeamContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import { ProjectTemplateProvider } from "./contexts/ProjectTemplateContext";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import { ContextualNavigationProvider } from "./components/navigation/ContextualNavigationProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import Projects from "./pages/Projects";
import PlanningAgent from "./pages/PlanningAgent";
import AgentCreation from "./pages/AgentCreation";
import AgentConfiguration from "./pages/AgentConfiguration";
import IDEIntegration from "./pages/IDEIntegration";
import LLMIntegration from "./pages/LLMIntegration";
import MCPManagement from "./pages/MCPManagement";
import TeamSettings from "./pages/TeamSettings";
import NotFound from "./pages/NotFound";
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

function AppContent() {
  const { user } = useAuth();
  
  return (
    <CurrentUserProvider>
      <DataPersistenceProvider>
        <WebSocketProvider 
          userId={user?.id || 'anonymous'} 
          userName={user?.user_metadata?.full_name || user?.email || 'Anonymous User'}
        >
          <FilterProvider>
            <ProjectProvider>
              <ProjectTemplateProvider>
                <AgentProvider>
                  <TaskProvider>
                    <MessageProvider>
                      <TeamProvider>
                        <OnboardingProvider>
                          <ContextualNavigationProvider>
                            <BrowserRouter>
                              <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/auth" element={<AuthPage />} />
                                <Route path="/index" element={
                                  <ProtectedRoute>
                                    <Index />
                                  </ProtectedRoute>
                                } />
                                <Route path="/dashboard" element={
                                  <ProtectedRoute>
                                    <Dashboard />
                                  </ProtectedRoute>
                                } />
                                <Route path="/projects" element={
                                  <ProtectedRoute>
                                    <Projects />
                                  </ProtectedRoute>
                                } />
                                <Route path="/settings" element={
                                  <ProtectedRoute>
                                    <Settings />
                                  </ProtectedRoute>
                                } />
                                <Route path="/profile" element={
                                  <ProtectedRoute>
                                    <Profile />
                                  </ProtectedRoute>
                                } />
                                <Route path="/account" element={
                                  <ProtectedRoute>
                                    <Account />
                                  </ProtectedRoute>
                                } />
                                <Route path="/planning-agent" element={
                                  <ProtectedRoute>
                                    <PlanningAgent />
                                  </ProtectedRoute>
                                } />
                                <Route path="/agent-creation" element={
                                  <ProtectedRoute>
                                    <AgentCreation />
                                  </ProtectedRoute>
                                } />
                                <Route path="/agent-configuration" element={
                                  <ProtectedRoute>
                                    <AgentConfiguration />
                                  </ProtectedRoute>
                                } />
                                <Route path="/ide-integration" element={
                                  <ProtectedRoute>
                                    <IDEIntegration />
                                  </ProtectedRoute>
                                } />
                                <Route path="/llm-integration" element={
                                  <ProtectedRoute>
                                    <LLMIntegration />
                                  </ProtectedRoute>
                                } />
                                <Route path="/mcp-management" element={
                                  <ProtectedRoute>
                                    <MCPManagement />
                                  </ProtectedRoute>
                                } />
                                <Route path="/team-settings" element={
                                  <ProtectedRoute>
                                    <TeamSettings />
                                  </ProtectedRoute>
                                } />
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                              <Toaster />
                              <Sonner />
                            </BrowserRouter>
                          </ContextualNavigationProvider>
                        </OnboardingProvider>
                      </TeamProvider>
                    </MessageProvider>
                  </TaskProvider>
                </AgentProvider>
              </ProjectTemplateProvider>
            </ProjectProvider>
          </FilterProvider>
        </WebSocketProvider>
      </DataPersistenceProvider>
    </CurrentUserProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
