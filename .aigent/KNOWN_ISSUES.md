# Known Issues & Troubleshooting Guide

**Project**: Vibe DevSquad
**Last Updated**: 2025-06-12
**Current Phase**: Phase 10 - WebContainer Integration

## 🚨 Critical Issues

### 1. WebContainer Memory Leaks
**Severity**: High
**Status**: Under Investigation
**Description**: WebContainer instances may leak memory if not properly disposed
**Symptoms**:
- Browser memory usage increases over time
- Performance degradation after extended use
- Browser tab crashes after ~2 hours

**Workaround**:
```typescript
// Ensure proper cleanup in useWebContainer hook
useEffect(() => {
  return () => {
    if (webcontainerInstance) {
      webcontainerInstance.teardown();
    }
  };
}, []);
```

**Permanent Fix**: Pending WebContainer API update

---

## ⚠️ Known Bugs

### 2. Project Loading Falls Back to Mock Data
**Severity**: Medium
**Status**: Identified
**Location**: `/src/hooks/useProjectContext.ts`
**Description**: Sometimes real project data fails to load and falls back to mock
**Reproduction Steps**:
1. Navigate to workspace without projectId
2. Or navigate with invalid projectId
3. Mock data loads instead of error

**Temporary Fix**:
```typescript
// Add validation before loading
if (!projectId || !isValidUUID(projectId)) {
  throw new Error('Invalid project ID');
}
```

### 3. Terminal Resize Flicker
**Severity**: Low
**Status**: Workaround Applied
**Location**: `/src/components/workspace/WebContainerTerminal.tsx`
**Description**: Terminal flickers when panel is resized
**Cause**: Xterm.js re-renders on every resize event

**Current Workaround**:
```typescript
const debouncedResize = useMemo(
  () => debounce(() => terminal.fit(), 100),
  [terminal]
);
```

### 4. AI Chat History Not Persisted
**Severity**: Medium
**Status**: Enhancement Needed
**Location**: `/src/components/workspace/AIInteractionPanel.tsx`
**Description**: Chat history lost on page refresh
**Impact**: Users lose context when refreshing

**Proposed Solution**:
- Store in localStorage for session persistence
- Store in database for permanent persistence
- Add chat history API endpoints

### 5. File Tree Performance with Large Projects
**Severity**: Medium
**Status**: Optimization Needed
**Description**: File explorer slows with >1000 files
**Symptoms**:
- Lag when expanding folders
- Slow search performance
- High CPU usage

**Mitigation**:
- Implement virtual scrolling
- Lazy load deep directories
- Add file count limits

---

## 🔧 Common Development Issues

### 6. IDE Extension Not Installing
**Problem**: Installer fails to detect IDE
**Solution**:
```bash
# Manual installation
cd vscode-extension
npm run package
# Then install .vsix file manually
```

### 7. MCP Server Connection Drops
**Problem**: MCP servers disconnect randomly
**Symptoms**:
- "Server disconnected" errors
- Tools stop working
- Need to restart IDE

**Debug Steps**:
1. Check MCP logs: `~/.mcp/logs/`
2. Verify API keys are set
3. Check network connectivity
4. Restart MCP server

### 8. Supabase RLS Policy Errors
**Problem**: "Permission denied" errors
**Common Causes**:
- Missing RLS policies
- Incorrect user context
- Service role key not used

**Debug Query**:
```sql
-- Check active RLS policies
SELECT * FROM pg_policies 
WHERE tablename = 'your_table';

-- Test policy
SET LOCAL role TO 'authenticated';
SET LOCAL request.jwt.claims.sub TO 'user-uuid';
SELECT * FROM your_table;
```

### 9. WebContainer Build Failures
**Problem**: npm install fails in WebContainer
**Error**: "Cannot find module" or "ENOENT"
**Causes**:
- Incompatible packages
- Binary dependencies
- Large package size

**Solutions**:
- Use browser-compatible packages
- Avoid native modules
- Use CDN for large libraries

---

## 🎨 UI/UX Issues

### 10. Dark Mode Inconsistencies
**Status**: Mostly Fixed
**Remaining Issues**:
- Some third-party components
- Monaco editor themes
- Terminal colors

**Quick Fix**:
```css
/* Force dark mode for stubborn components */
.dark .problematic-component {
  filter: invert(1) hue-rotate(180deg);
}
```

### 11. Mobile Responsive Issues
**Affected Areas**:
- Workspace layout
- Planning canvas
- Complex forms

**Current State**:
- Desktop: Fully supported
- Tablet: Mostly supported
- Mobile: Limited support

**Recommendation**: Show mobile warning

---

## 🚀 Performance Issues

### 12. Initial Load Time
**Current**: ~4-5 seconds
**Target**: <3 seconds
**Bottlenecks**:
- Large JavaScript bundles
- WebContainer initialization
- Multiple API calls

**Optimizations Applied**:
- Code splitting
- Dynamic imports
- Parallel loading

**Further Improvements**:
- Implement service worker
- Optimize images
- Reduce initial API calls

### 13. Real-time Collaboration Lag
**Problem**: Noticeable delay in collaborative editing
**Cause**: Supabase real-time latency
**Current Latency**: 200-500ms

**Potential Solutions**:
- Implement operational transforms
- Add optimistic updates
- Use WebRTC for direct peer connection

---

## 🔐 Security Concerns

### 14. API Key Exposure Risk
**Issue**: Users might accidentally commit keys
**Mitigation**:
- Git pre-commit hooks
- Environment variable validation
- Key rotation reminders

### 15. WebContainer Sandbox Escape
**Status**: Theoretical risk
**Mitigation**: Run in iframe with strict CSP
**Monitor**: WebContainer security updates

---

## 📱 Browser Compatibility

### 16. Safari WebContainer Issues
**Problem**: Some features don't work in Safari
**Affected Features**:
- File system API
- Clipboard access
- Performance

**Detection**:
```typescript
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
  showWarning('Limited support in Safari');
}
```

### 17. Firefox Performance
**Issue**: Slower than Chrome
**Cause**: WASM performance differences
**Impact**: 20-30% slower operations

---

## 🛠️ Development Environment Issues

### 18. Hot Reload Breaks State
**Problem**: Fast refresh loses WebContainer state
**Workaround**: Full page refresh required
**Fix**: Store critical state in sessionStorage

### 19. TypeScript Memory Usage
**Problem**: TS server uses >2GB RAM
**Cause**: Large project with strict mode
**Solutions**:
- Increase Node memory limit
- Use project references
- Exclude node_modules

### 20. Test Flakiness
**Affected Tests**:
- WebContainer integration tests
- Real-time collaboration tests
- File operation tests

**Causes**:
- Timing issues
- Network dependencies
- State pollution

**Best Practices**:
```typescript
// Add proper waits
await waitFor(() => {
  expect(element).toBeInTheDocument();
}, { timeout: 5000 });

// Clean up between tests
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
```

---

## 📋 Troubleshooting Checklist

### When Things Don't Work:

1. **Check Browser Console**
   - Look for error messages
   - Check network tab for failed requests
   - Verify WebSocket connections

2. **Verify Environment**
   ```bash
   # Check Node version
   node --version  # Should be 18+
   
   # Check environment variables
   npm run check-env
   
   # Clear caches
   rm -rf .next node_modules
   npm install
   ```

3. **Database Issues**
   ```sql
   -- Check migrations
   SELECT * FROM schema_migrations;
   
   -- Verify RLS
   SELECT * FROM pg_policies;
   
   -- Check connections
   SELECT count(*) FROM pg_stat_activity;
   ```

4. **WebContainer Issues**
   - Clear browser cache
   - Try incognito mode
   - Check browser compatibility
   - Verify API key

5. **IDE Extension Issues**
   - Check extension logs
   - Verify MCP server running
   - Restart IDE
   - Reinstall extension

---

## 🔮 Future Improvements

### Planned Fixes
1. Implement proper chat persistence
2. Add WebContainer connection pooling
3. Optimize file tree for large projects
4. Improve error messages
5. Add telemetry for debugging

### Long-term Solutions
1. Native mobile apps
2. Offline support
3. Enhanced security sandbox
4. Performance monitoring dashboard
5. Automated error reporting

---

## 📞 Getting Help

### Resources
- Check this document first
- Review DEVELOPER_HANDOFF.md
- Search closed GitHub issues
- Check MCP server logs

### Debugging Tools
```bash
# Enable debug logging
DEBUG=* npm run dev

# Check WebContainer logs
localStorage.setItem('DEBUG', 'webcontainer:*');

# Monitor performance
window.performance.measure('operation-name');
```

### Common Solutions
- **"It worked yesterday"**: Clear all caches
- **"Works on my machine"**: Check environment variables
- **"Suddenly stopped working"**: Check API quotas
- **"Only fails in production"**: Check build output

---

Remember: Most issues have been seen before. Check this guide, search issues, and don't hesitate to add new discoveries!
