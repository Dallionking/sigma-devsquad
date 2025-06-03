
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TeamProvider } from '@/contexts/TeamContext';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';

// Pages
import { Dashboard } from '@/pages/Dashboard';
import { PlanningAgent } from '@/pages/PlanningAgent';
import { Projects } from '@/pages/Projects';
import { Presentations } from '@/pages/Presentations';
import { AgentConfiguration } from '@/pages/AgentConfiguration';
import { MCPManagement } from '@/pages/MCPManagement';
import { LLMIntegration } from '@/pages/LLMIntegration';
import { IDEIntegration } from '@/pages/IDEIntegration';
import { Profile } from '@/pages/Profile';
import { Account } from '@/pages/Account';
import { Teams } from '@/pages/Teams';
import { Settings } from '@/pages/Settings';

function App() {
  return (
    <TooltipProvider>
      <TeamProvider>
        <ProjectProvider>
          <OnboardingProvider>
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  {/* Main Routes with Unified Layout */}
                  <Route path="/dashboard" element={
                    <UnifiedLayout>
                      <Dashboard />
                    </UnifiedLayout>
                  } />
                  
                  <Route path="/planning-agent" element={
                    <UnifiedLayout>
                      <PlanningAgent />
                    </UnifiedLayout>
                  } />
                  
                  <Route path="/projects" element={
                    <UnifiedLayout>
                      <Projects />
                    </UnifiedLayout>
                  } />
                  
                  <Route path="/presentations" element={
                    <UnifiedLayout>
                      <Presentations />
                    </UnifiedLayout>
                  } />
                  
                  <Route path="/agent-configuration" element={
                    <UnifiedLayout>
                      <AgentConfiguration />
                    </UnifiedLayout>
                  } />
                  
                  <Route path="/mcp-management" element={
                    <UnifiedLayout>
                      <MCPManagement />
                    </UnifiedLayout>
                  } />
                  
                  <Route path="/llm-integration" element={
                    <UnifiedLayout>
                      <LLMIntegration />
                    </UnifiedLayout>
                  } />
                  
                  <Route path="/ide-integration" element={
                    <UnifiedLayout>
                      <IDEIntegration />
                    </UnifiedLayout>
                  } />
                  
                  <Route path="/profile" element={
                    <UnifiedLayout>
                      <Profile />
                    </UnifiedLayout>
                  } />
                  
                  <Route path="/account" element={
                    <UnifiedLayout>
                      <Account />
                    </UnifiedLayout>
                  } />
                  
                  <Route path="/teams" element={
                    <UnifiedLayout>
                      <Teams />
                    </UnifiedLayout>
                  } />
                  
                  <Route path="/settings" element={
                    <UnifiedLayout>
                      <Settings />
                    </UnifiedLayout>
                  } />

                  {/* Default redirect */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
                
                <Toaster />
              </div>
            </Router>
          </OnboardingProvider>
        </ProjectProvider>
      </TeamProvider>
    </TooltipProvider>
  );
}

export default App;
