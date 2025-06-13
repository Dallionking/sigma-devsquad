# Developer Handoff Documentation

**Last Updated**: 2025-06-12
**Project**: Vibe DevSquad
**Current Phase**: Phase 12 - AI Agent Marketplace (100% Complete)

## 🎯 Executive Summary

Vibe DevSquad is a production-ready AI-powered development platform with universal IDE support (VS Code, Cursor, Windsurf), in-browser development environments via WebContainer, comprehensive MCP orchestration, and a fully functional AI Agent Marketplace. The platform has successfully completed Phase 12 with a complete marketplace ecosystem for AI agent discovery, installation, and management.

## 🚀 Quick Start for New Developers

### Prerequisites
- Node.js 18+ and npm 9+
- VS Code, Cursor, or Windsurf IDE
- Git and basic command line knowledge

### Initial Setup
```bash
# Clone the repository
git clone [repository-url]
cd vibe-devsquad

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Install IDE extensions globally
npm install -g vibe-devsquad-installer
vibe-devsquad-installer

# Start development server
npm run dev
```

### Required Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# WebContainer Configuration
NEXT_PUBLIC_WEBCONTAINER_API_KEY=your_webcontainer_key

# AI Agent Marketplace (Phase 12)
NEXT_PUBLIC_MARKETPLACE_API_URL=your_marketplace_api_url
MARKETPLACE_ADMIN_KEY=your_admin_key

# MCP Server Keys (Optional but recommended)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
PERPLEXITY_API_KEY=your_perplexity_key
```

## 📁 Project Architecture

### Core Directories
```
vibe-devsquad/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   │   ├── ui/             # Base UI components
│   │   ├── workspace/      # WebContainer components
│   │   └── planning/       # Planning canvas
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and clients
│   ├── mcp/                # MCP servers and adapters
│   └── services/           # API service layer
├── vscode-extension/       # Universal IDE extension
├── cursor-mcp-server/      # Cursor MCP server
├── windsurf-mcp-server/    # Windsurf MCP server
└── installer/              # Auto-installer package
```

### Key Files to Understand
1. `/src/app/dashboard/workspace/page.tsx` - WebContainer workspace entry
2. `/src/components/ui/WebContainerWorkspace.tsx` - Main workspace component
3. `/src/hooks/useWebContainer.ts` - WebContainer lifecycle management
4. `/src/lib/mcp/registry.ts` - MCP registry system
5. `/src/app/api/planning-agent/route.ts` - AI planning agent API

## 🤖 AI Agent Marketplace (Phase 12 - Complete)

### Architecture Overview
The AI Agent Marketplace is a comprehensive ecosystem for discovering, installing, and managing AI agents. Built with Supabase backend, Next.js API routes, and React 19 frontend.

### Database Schema
```sql
-- Core marketplace tables
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  author TEXT NOT NULL,
  version TEXT NOT NULL,
  categories TEXT[] NOT NULL,
  capabilities TEXT[] NOT NULL,
  icon TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE agent_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE agent_installations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  installed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(agent_id, user_id)
);
```

### Key Components

#### 1. AgentCard Component
**Location**: `/src/components/marketplace/AgentCard.tsx`
**Features**:
- Responsive card design with agent information
- Install button with loading states and feedback
- Click handlers for detailed agent information
- Support for both grid and list view modes
- Optimized Next.js Image component with placeholders

#### 2. DraggableAgentGrid Component
**Location**: `/src/components/marketplace/DraggableAgentGrid.tsx`
**Features**:
- Drag-and-drop agent organization using @dnd-kit
- Memoized filtering to prevent infinite renders
- Support for keyboard navigation and accessibility
- Real-time reordering with visual feedback

#### 3. Marketplace API Routes
**Location**: `/src/app/api/marketplace/`
**Endpoints**:
- `GET /api/marketplace/agents` - List and search agents
- `POST /api/marketplace/agents` - Publish new agent
- `GET /api/marketplace/reviews` - Get agent reviews
- `POST /api/marketplace/reviews` - Submit review
- `POST /api/marketplace/install` - Install agent

### Critical Implementation Details

#### Infinite Render Loop Prevention
```typescript
// Problem: filteredAgents recreated on every render
const filteredAgents = agents.filter(/* ... */);

// Solution: Memoized with stable dependencies
const filteredAgents = useMemo(() => 
  agents.filter(agent => {
    const matchesSearch = searchQuery === '' || 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      agent.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  }), 
  [agents, searchQuery, selectedCategory]
);
```

#### Hook Execution Order
```typescript
// Critical: useAgentOrganization must come after filteredAgents
const filteredAgents = useMemo(/* ... */);
const { agents: organizedAgents, handleReorder } = useAgentOrganization(filteredAgents);
```

### Security Measures
- **Input Validation**: Zod schemas for all API inputs
- **Content Moderation**: Agent code sandboxing
- **Rate Limiting**: API endpoint protection
- **RLS Policies**: Database-level access control

### Performance Optimizations
- **Lazy Loading**: Agent cards load on scroll
- **Image Optimization**: Next.js Image with blur placeholders
- **Memoization**: Prevent unnecessary re-renders
- **Caching**: React Query for server state

### Testing Strategy
- **Unit Tests**: Component behavior and hooks
- **Integration Tests**: API endpoints and database
- **E2E Tests**: User workflows with web-eval-agent
- **Performance Tests**: Load testing for large catalogs

## 🔧 Current Implementation Status

### ✅ Completed Features
1. **Universal IDE Extension** - Single extension for all VS Code variants
2. **MCP Registry System** - Complete protocol management
3. **Task Management API** - Full CRUD with dependencies
4. **Planning Canvas** - Real-time collaborative editing
5. **WebContainer UI** - Monaco editor, terminal, file explorer
6. **Authentication** - Supabase auth with RLS policies
7. **LLM Key Management** - Secure storage and rotation
8. **AI Agent Marketplace** - Complete marketplace ecosystem

### 🔄 In Progress
1. **Performance Optimization** - Additional caching layers

### ❌ Not Started
1. **Analytics Dashboard** (Phase 13)
2. **Enterprise Features** (Phase 14+)

## 🐛 Known Issues & Workarounds

### 1. WebContainer Mock Data
**Issue**: Project loading sometimes falls back to mock data
**Workaround**: Ensure projectId is passed in URL params
**Fix Location**: `/src/hooks/useProjectContext.ts`

### 2. Terminal Resize Flicker
**Issue**: Terminal flickers when resizing panels
**Workaround**: Debounce resize events
**Fix Location**: `/src/components/workspace/WebContainerTerminal.tsx`

### 3. AI Panel State Persistence
**Issue**: AI chat history not persisted between sessions
**Workaround**: Use localStorage for temporary persistence
**Fix Location**: `/src/components/workspace/AIInteractionPanel.tsx`

## 🏗️ Development Patterns

### Component Structure
```typescript
// Standard component pattern
export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks first
  const [state, setState] = useState();
  const { data } = useQuery();
  
  // Effects
  useEffect(() => {}, []);
  
  // Handlers
  const handleAction = () => {};
  
  // Render
  return <div>...</div>;
};
```

### API Route Pattern
```typescript
// Standard API route pattern
export async function POST(request: Request) {
  try {
    // Validate auth
    const { user } = await validateAuth(request);
    
    // Parse and validate body
    const body = await request.json();
    const validated = schema.parse(body);
    
    // Business logic
    const result = await service.process(validated);
    
    // Return response
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
```

### Error Handling
```typescript
// Use custom error classes
class WebContainerError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: any
  ) {
    super(message);
  }
}

// Handle with error boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

## 🧪 Testing Guidelines

### Unit Tests
```bash
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### E2E Tests
```bash
npm run test:e2e       # Playwright tests
npm run test:visual    # Visual regression
```

### Key Test Files
- `/src/hooks/__tests__/useWebContainer.test.ts`
- `/src/components/workspace/__tests__/`
- `/e2e/workspace.spec.ts`

## 📊 Performance Considerations

### Critical Metrics
- **Initial Load**: Target < 3s
- **WebContainer Boot**: Target < 5s
- **File Operations**: Target < 100ms
- **AI Response**: Target < 2s first token

### Optimization Points
1. **Code Splitting**: Dynamic imports for workspace
2. **React Query**: Aggressive caching with stale-while-revalidate
3. **Virtualization**: File explorer uses virtual scrolling
4. **Debouncing**: Editor saves and terminal resizes

## 🔐 Security Considerations

### Authentication Flow
1. Supabase handles auth with JWT tokens
2. RLS policies enforce data access
3. API routes validate session tokens
4. WebContainer runs in isolated iframe

### Sensitive Data
- API keys encrypted in database
- Environment variables for secrets
- No credentials in client code
- Audit logs for key operations

## 🚦 Deployment Process

### Local Development
```bash
npm run dev            # Start with Turbopack
npm run build          # Production build
npm run start          # Production server
```

### Staging Deployment
```bash
npm run deploy:staging # Deploy to staging
npm run test:staging   # Run staging tests
```

### Production Deployment
```bash
npm run deploy:prod    # Deploy to production
npm run monitor        # Start monitoring
```

## 📝 Next Steps for Development

### Immediate Priorities (Phase 13)
1. **Analytics Dashboard** - Implement analytics dashboard
2. **Performance Testing** - Load test WebContainer operations
3. **Error Recovery** - Enhance error recovery mechanisms

### Short-term Goals (1-2 weeks)
1. Complete Phase 13 (Analytics Dashboard)
2. Begin Phase 14 (Enterprise Features) planning
3. Expand test coverage to 90%+
4. Document all API endpoints

### Long-term Vision (1-3 months)
1. Launch enterprise features
2. Advanced analytics dashboard
3. Mobile app development

## 🤝 Team Contacts

### Key Repositories
- Main Platform: [vibe-devsquad]
- VS Code Extension: [vscode-extension]
- Documentation: [.aigent directory]

### Communication Channels
- Development updates: Check CHANGELOG.md
- Task tracking: TaskMaster CLI
- Code reviews: GitHub PRs

## 📚 Additional Resources

### Documentation
- `/Features.md` - Complete feature list
- `/.aigent/CHANGELOG.md` - Detailed change history
- `/.aigent/project_bio.md` - Project overview
- `/.windsurf/rules/` - Development rules

### External Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [WebContainer API](https://webcontainers.io/api)
- [MCP Specification](https://modelcontextprotocol.io)
- [Supabase Docs](https://supabase.com/docs)

## ⚡ Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run linter
npm run format           # Format code

# Testing
npm test                 # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:coverage    # Generate coverage

# Deployment
npm run deploy:staging   # Deploy to staging
npm run deploy:prod      # Deploy to production

# Tools
npx taskmaster list      # List all tasks
npx taskmaster next      # Get next task
npx taskmaster update    # Update task status
```

---

**Welcome to the Vibe DevSquad team! 🚀**

This document should give you everything needed to start contributing effectively. Remember to check the CHANGELOG.md for the latest updates and always follow the established patterns. Happy coding!
