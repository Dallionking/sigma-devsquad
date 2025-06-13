# Technical Decisions Log

**Project**: Vibe DevSquad
**Last Updated**: 2025-06-12

This document captures key technical decisions made throughout the project development, including the rationale, alternatives considered, and implications.

## Architecture Decisions

### 1. Universal VS Code Extension Architecture
**Decision**: Single extension codebase for VS Code, Cursor, and Windsurf
**Date**: Phase 7
**Rationale**: 
- All three IDEs share the VS Code extension API
- Reduces maintenance overhead
- Ensures feature parity across IDEs
**Alternatives Considered**:
- Separate extensions for each IDE
- Web-only solution
**Implications**:
- Must test on all three IDEs
- Need compatibility layer for IDE-specific features

### 2. MCP (Model Context Protocol) Integration
**Decision**: Full MCP compliance with adapter pattern
**Date**: Phase 5
**Rationale**:
- Industry standard for AI tool integration
- Enables easy addition of new AI services
- Provides consistent interface
**Implementation**:
- Zod validation for tool schemas
- Streaming support for real-time responses
- Adapter pattern for service integration

### 3. WebContainer for In-Browser Development
**Decision**: Use StackBlitz WebContainer API
**Date**: Phase 10
**Rationale**:
- Full Node.js environment in browser
- No server infrastructure needed
- Instant development environments
**Trade-offs**:
- Limited to Node.js runtime
- Requires modern browser
- Some npm packages incompatible

### 4. AI Agent Marketplace Architecture
**Decision**: Supabase + Next.js API Routes + @dnd-kit for drag-and-drop
**Date**: Phase 12
**Rationale**:
- Supabase provides robust database with RLS policies
- Next.js API routes offer serverless scalability
- @dnd-kit is React 19 compatible and accessible
**Implementation Details**:
- PostgreSQL schema with agents, reviews, installations tables
- RESTful API endpoints for CRUD operations
- React Query for caching and optimistic updates
- Framer Motion for smooth animations
**Trade-offs**:
- Supabase vendor lock-in vs self-hosted database
- Client-side state management complexity
- Performance optimization needed for large agent catalogs

## UI/UX Decisions

### 5. Infinite Render Loop Prevention
**Decision**: useMemo for filteredAgents and simplified hook patterns
**Date**: 2025-06-12 (Phase 12)
**Problem**: useAgentOrganization hook caused infinite re-renders
**Root Cause**: filteredAgents array recreated on every render
**Solution**:
```typescript
// Before - caused infinite loops
const filteredAgents = agents.filter(/* ... */);
const { agents: organizedAgents } = useAgentOrganization(filteredAgents);

// After - stable references
const filteredAgents = useMemo(() => 
  agents.filter(/* ... */), 
  [agents, searchQuery, selectedCategory]
);
const { agents: organizedAgents } = useAgentOrganization(filteredAgents);
```
**Benefits**:
- Eliminated infinite render loops
- Improved performance
- Stable component behavior

### 6. Flex Layout for Workspace (Recent Fix)
**Decision**: Replace absolute positioning with flexbox
**Date**: 2025-06-12
**Problem**: Headers were getting cut off due to nested height calculations
**Solution**:
```css
/* Old approach - caused issues */
.workspace {
  position: absolute;
  top: 0;
  padding-top: 48px;
  height: 100%;
}

/* New approach - clean flex */
.workspace {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header {
  height: 48px;
  flex-shrink: 0;
}
.content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
```
**Benefits**:
- No height calculation conflicts
- Proper overflow handling
- Cleaner, more maintainable

### 7. Grid Layout for Responsive Cards
**Decision**: CSS Grid with auto-rows-fr
**Date**: Phase 6
**Rationale**:
- Consistent card heights
- Better than flexbox for 2D layouts
- Simpler than virtualization
**Implementation**:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 1fr;
}
```

### 8. Monaco Editor vs CodeMirror
**Decision**: Monaco Editor for code editing
**Date**: Phase 10
**Rationale**:
- VS Code's editor (familiar to users)
- Better IntelliSense support
- More features out of the box
**Trade-offs**:
- Larger bundle size
- More complex setup
- Requires web workers

## State Management Decisions

### 9. React Query for Server State
**Decision**: TanStack Query (React Query) over Redux
**Date**: Phase 4
**Rationale**:
- Built-in caching
- Optimistic updates
- Background refetching
- Simpler than Redux for server state
**Pattern**:
```typescript
const { data, mutate } = useMutation({
  mutationFn: updateTask,
  onMutate: optimisticUpdate,
  onError: rollback,
});
```

### 10. Zustand for Client State
**Decision**: Zustand over Context API
**Date**: Phase 3
**Rationale**:
- Simpler than Redux
- Better performance than Context
- TypeScript friendly
- No provider hell

## Database Decisions

### 11. Supabase as Backend
**Decision**: Supabase over custom backend
**Date**: Phase 1
**Rationale**:
- Built-in auth
- Real-time subscriptions
- Row Level Security
- Reduces backend complexity
**Features Used**:
- PostgreSQL database
- Auth with JWT
- Storage for files
- Edge Functions
- Real-time for collaboration

### 12. Row Level Security (RLS)
**Decision**: Database-level security
**Date**: Phase 2
**Rationale**:
- Security at data layer
- Cannot be bypassed
- Reduces API complexity
**Implementation**:
- User-based policies
- Organization-based access
- Public read for some tables

## Performance Decisions

### 13. Turbopack for Development
**Decision**: Use Next.js with Turbopack
**Date**: Phase 1
**Rationale**:
- Faster HMR than Webpack
- Better for large projects
- Native to Next.js 15
**Results**:
- 10x faster cold starts
- Near-instant HMR

### 14. Operation Timeouts in WebContainer
**Decision**: Add timeouts to all WebContainer operations
**Date**: 2025-06-12
**Rationale**:
- Prevent hanging operations
- Better error recovery
- Improved user experience
**Implementation**:
```typescript
const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeoutMs)
    ),
  ]);
};
```

## Testing Decisions

### 15. web-eval-agent for UI Testing
**Decision**: Use MCP-based UI testing
**Date**: Phase 8
**Rationale**:
- AI-powered visual testing
- Screenshots for validation
- Natural language test cases
**Benefits**:
- Catches visual regressions
- Tests user flows
- Reduces manual QA

### 16. Jest + React Testing Library
**Decision**: Standard React testing stack
**Date**: Phase 2
**Rationale**:
- Industry standard
- Good documentation
- Works with Next.js
**Pattern**:
- Unit tests for hooks
- Integration tests for components
- E2E for critical paths

## Security Decisions

### 17. API Key Encryption
**Decision**: Encrypt keys in database
**Date**: Phase 3
**Rationale**:
- Protect user credentials
- Compliance requirement
- Defense in depth
**Implementation**:
- AES-256 encryption
- Keys in environment vars
- Audit logging

### 18. WebContainer Isolation
**Decision**: Run WebContainer in iframe
**Date**: Phase 10
**Rationale**:
- Security isolation
- Prevent XSS
- Resource limits
**Trade-offs**:
- Communication overhead
- Some API limitations

## Deployment Decisions

### 19. Vercel for Hosting
**Decision**: Deploy on Vercel
**Date**: Phase 1
**Rationale**:
- Native Next.js support
- Edge functions
- Global CDN
- Easy rollbacks
**Features**:
- Preview deployments
- Analytics
- Web Vitals monitoring

### 20. npm Registry for Extensions
**Decision**: Publish to npm
**Date**: Phase 7
**Rationale**:
- Standard package registry
- Easy installation
- Version management
**Published Packages**:
- vibe-devsquad-installer
- @vibe-devsquad/cursor-mcp
- @vibe-devsquad/windsurf-mcp

## Code Organization Decisions

### 21. Monorepo Structure
**Decision**: Keep all packages in one repo
**Date**: Phase 1
**Rationale**:
- Easier development
- Shared dependencies
- Atomic commits
**Structure**:
- Main app in root
- Extensions in subdirectories
- Shared types package

### 22. TypeScript Strict Mode
**Decision**: Enable all strict checks
**Date**: Phase 1
**Rationale**:
- Catch more errors
- Better IntelliSense
- Self-documenting code
**Configuration**:
```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noUnusedLocals": true
}
```

## Future Considerations

### Pending Decisions

1. **Mobile App Architecture**
   - React Native vs PWA
   - Shared codebase considerations

2. **Scaling WebContainers**
   - Multiple container management
   - Resource allocation

3. **Enterprise Features**
   - SSO integration approach
   - Audit log storage

4. **AI Model Selection**
   - Multiple model support
   - Cost optimization

### Lessons Learned

1. **Start with Accessibility**: Easier than retrofitting
2. **Plan for Real-time Early**: Architecture impacts
3. **Test IDE Compatibility**: Each has quirks
4. **Monitor Performance**: Catch issues early
5. **Document Decisions**: Future developers need context

---

This document will be updated as new technical decisions are made. Each decision should include rationale, alternatives considered, and implementation details.
