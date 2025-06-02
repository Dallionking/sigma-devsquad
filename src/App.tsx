import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import './App.css';

// Page imports
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';
import Presentations from '@/pages/Presentations';
import PitchDeck from '@/pages/PitchDeck';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/presentations" element={<Presentations />} />
              <Route path="/pitch-deck" element={<PitchDeck />} />
            </Routes>
          </div>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
