
// Test account credentials for demo purposes
export const TEST_ACCOUNT = {
  email: "demo@aiworkforce.app",
  password: "DemoUser123!",
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

// Helper function to get test credentials
export const getTestCredentials = () => ({
  email: TEST_ACCOUNT.email,
  password: TEST_ACCOUNT.password
});

// Helper function to check if current user is demo user
export const isDemoUser = (userEmail?: string) => {
  return userEmail === TEST_ACCOUNT.email;
};
