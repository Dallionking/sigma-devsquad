
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { TeamProvider } from './contexts/TeamContext'
import { NavigationHierarchyProvider } from './contexts/NavigationHierarchyContext'
import { Toaster } from './components/ui/toaster'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { PlanningAgentPage } from './pages/PlanningAgentPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { AgentConfigurationPage } from './pages/AgentConfigurationPage'
import { MCPManagementPage } from './pages/MCPManagementPage'
import { LLMIntegrationPage } from './pages/LLMIntegrationPage'
import { IDEIntegrationPage } from './pages/IDEIntegrationPage'
import { ProfilePage } from './pages/ProfilePage'
import { AccountPage } from './pages/AccountPage'
import { TeamsPage } from './pages/TeamsPage'
import { SettingsPage } from './pages/SettingsPage'
import { UnifiedMainLayout } from './components/dashboard/layout/UnifiedMainLayout'

function App() {
  return (
    <ThemeProvider>
      <TeamProvider>
        <NavigationHierarchyProvider>
          <Router>
            <Routes>
              {/* Landing page route */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Main application routes with unified layout */}
              <Route path="/dashboard" element={
                <UnifiedMainLayout>
                  <DashboardPage />
                </UnifiedMainLayout>
              } />
              
              <Route path="/planning-agent" element={
                <UnifiedMainLayout>
                  <PlanningAgentPage />
                </UnifiedMainLayout>
              } />
              
              <Route path="/projects" element={
                <UnifiedMainLayout>
                  <ProjectsPage />
                </UnifiedMainLayout>
              } />
              
              <Route path="/agent-configuration" element={
                <UnifiedMainLayout>
                  <AgentConfigurationPage />
                </UnifiedMainLayout>
              } />
              
              <Route path="/mcp-management" element={
                <UnifiedMainLayout>
                  <MCPManagementPage />
                </UnifiedMainLayout>
              } />
              
              <Route path="/llm-integration" element={
                <UnifiedMainLayout>
                  <LLMIntegrationPage />
                </UnifiedMainLayout>
              } />
              
              <Route path="/ide-integration" element={
                <UnifiedMainLayout>
                  <IDEIntegrationPage />
                </UnifiedMainLayout>
              } />
              
              <Route path="/profile" element={
                <UnifiedMainLayout>
                  <ProfilePage />
                </UnifiedMainLayout>
              } />
              
              <Route path="/account" element={
                <UnifiedMainLayout>
                  <AccountPage />
                </UnifiedMainLayout>
              } />
              
              <Route path="/teams" element={
                <UnifiedMainLayout>
                  <TeamsPage />
                </UnifiedMainLayout>
              } />
              
              <Route path="/settings" element={
                <UnifiedMainLayout>
                  <SettingsPage />
                </UnifiedMainLayout>
              } />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <Toaster />
          </Router>
        </NavigationHierarchyProvider>
      </TeamProvider>
    </ThemeProvider>
  )
}

export default App
