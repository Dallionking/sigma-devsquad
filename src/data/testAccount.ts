
// Test account credentials for demo purposes
// NOTE: These are demo credentials only - never use hardcoded credentials in production

export const TEST_ACCOUNT = {
  email: "demo@aiworkforce.app",
  // In production, this should be handled through secure authentication
  profile: {
    full_name: "Demo User",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facepad&facepad=2&w=256&h=256&q=80",
    role: "Team Lead",
    company: "AI Workforce Demo",
  },
  teams: [
    {
      id: "frontend-team",
      name: "Frontend Team",
      type: "frontend"
    },
    {
      id: "backend-team", 
      name: "Backend Team",
      type: "backend"
    }
  ]
};

// Helper function to get test credentials (demo only)
export const getTestCredentials = () => ({
  email: TEST_ACCOUNT.email,
  // Password should be handled through secure authentication in production
  note: "Demo account - use proper authentication in production"
});

// Helper function to check if current user is demo user
export const isDemoUser = (userEmail?: string) => {
  return userEmail === TEST_ACCOUNT.email;
};

// Security note for developers
export const SECURITY_NOTE = `
⚠️  SECURITY NOTICE ⚠️
This file contains demo credentials for development purposes only.
In production:
1. Remove all hardcoded credentials
2. Use environment variables for sensitive data
3. Implement proper authentication with Supabase
4. Never commit real API keys or passwords to version control
`;

console.warn(SECURITY_NOTE);
