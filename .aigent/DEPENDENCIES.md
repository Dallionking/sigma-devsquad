# Project Dependencies Documentation

**Project**: Vibe DevSquad
**Last Updated**: 2025-06-12
**Package Manager**: npm 9+

## 🎯 Core Dependencies

### Framework & Runtime
```json
{
  "next": "15.3.3",          // App framework with App Router
  "react": "^18.2.0",        // UI library
  "react-dom": "^18.2.0",    // React DOM renderer
  "typescript": "^5.0.0"     // Type safety
}
```

### UI & Styling
```json
{
  "@radix-ui/*": "latest",              // Headless UI primitives
  "tailwindcss": "^3.4.17",             // Utility CSS framework
  "class-variance-authority": "^0.7.0",  // Dynamic class names
  "clsx": "^2.1.0",                     // Class name utility
  "tailwind-merge": "^2.2.0",           // Merge Tailwind classes
  "@tailwindcss/typography": "^0.5.0"    // Typography plugin
}
```

### State Management & Data Fetching
```json
{
  "@tanstack/react-query": "^5.0.0",     // Server state management
  "zustand": "^4.4.0",                   // Client state management
  "immer": "^10.0.0",                    // Immutable updates
  "swr": "^2.2.0"                        // Data fetching (legacy)
}
```

### WebContainer & Editor
```json
{
  "@webcontainer/api": "^1.1.0",         // In-browser Node.js
  "@monaco-editor/react": "^4.6.0",      // Code editor
  "monaco-editor": "^0.44.0",            // Editor core
  "xterm": "^5.3.0",                     // Terminal emulator
  "xterm-addon-fit": "^0.8.0",           // Terminal fit addon
  "xterm-addon-web-links": "^0.9.0"     // Terminal links
}
```

### Planning Canvas
```json
{
  "@xyflow/react": "^12.0.0",           // React Flow canvas
  "reactflow": "^11.10.0",              // Legacy (being migrated)
  "dagre": "^0.8.5",                    // Graph layout
  "elkjs": "^0.8.2"                     // Advanced layouts
}
```

### Forms & Validation
```json
{
  "react-hook-form": "^7.48.0",         // Form management
  "zod": "^3.22.0",                     // Schema validation
  "@hookform/resolvers": "^3.3.0"       // Form validation bridge
}
```

### Authentication & Backend
```json
{
  "@supabase/supabase-js": "^2.39.0",   // Backend client
  "@supabase/auth-helpers-nextjs": "^0.8.0", // Auth helpers
  "@supabase/realtime-js": "^2.9.0"     // Real-time subscriptions
}
```

### MCP (Model Context Protocol)
```json
{
  "@modelcontextprotocol/sdk": "^0.5.0", // MCP SDK
  "zod": "^3.22.0",                      // Schema validation
  "ws": "^8.16.0"                        // WebSocket client
}
```

### Utilities
```json
{
  "date-fns": "^3.0.0",                  // Date manipulation
  "lodash": "^4.17.21",                  // Utility functions
  "uuid": "^9.0.0",                      // UUID generation
  "nanoid": "^5.0.0",                    // ID generation
  "canvas-confetti": "^1.9.0"            // Celebrations
}
```

## 🔧 Development Dependencies

### Build Tools
```json
{
  "@types/node": "^20.0.0",              // Node.js types
  "@types/react": "^18.2.0",             // React types
  "@types/react-dom": "^18.2.0",         // React DOM types
  "turbo": "^1.11.0",                    // Monorepo build
  "concurrently": "^8.2.0"               // Parallel commands
}
```

### Testing
```json
{
  "jest": "^29.7.0",                     // Test runner
  "@testing-library/react": "^14.1.0",   // React testing
  "@testing-library/jest-dom": "^6.1.0", // DOM matchers
  "@playwright/test": "^1.40.0",         // E2E testing
  "msw": "^2.0.0"                        // API mocking
}
```

### Code Quality
```json
{
  "eslint": "^8.56.0",                   // Linter
  "eslint-config-next": "15.3.3",        // Next.js ESLint config
  "@typescript-eslint/parser": "^6.0.0", // TS parser
  "prettier": "^3.1.0",                  // Code formatter
  "husky": "^8.0.0",                     // Git hooks
  "lint-staged": "^15.0.0"               // Staged file linting
}
```

### IDE Extension Dependencies
```json
{
  "@vscode/vsce": "^2.22.0",             // VS Code extension tools
  "esbuild": "^0.19.0",                  // Fast bundler
  "@types/vscode": "^1.85.0"             // VS Code API types
}
```

## 📦 Extension Package Dependencies

### vscode-extension
- Core VS Code extension API
- WebView for UI
- Language client for MCP

### cursor-mcp-server
- MCP SDK for tool implementation
- Express for HTTP server
- WebSocket for real-time

### windsurf-mcp-server
- Similar to Cursor but with Windsurf-specific tools
- Additional debugging capabilities

### installer
- Node.js fs/path for file operations
- Command execution for installation
- Platform detection utilities

## 🔄 Version Management

### Pinned Versions
These packages are pinned due to breaking changes or compatibility:
- `next@15.3.3` - Specific features used
- `@webcontainer/api@^1.1.0` - API stability
- `monaco-editor@^0.44.0` - Theme compatibility

### Flexible Versions
These use caret (^) for minor updates:
- React ecosystem packages
- Utility libraries
- Development tools

## 🚨 Known Incompatibilities

### WebContainer Limitations
Cannot use in WebContainer:
- Native Node.js modules
- Binary dependencies
- Large packages (>50MB)
- Packages with postinstall scripts

### Browser Compatibility
Requires modern browsers for:
- WebContainer API (Chrome 89+)
- Monaco Editor (Chrome 80+)
- WebAssembly support
- ES2020 features

## 📈 Bundle Size Impact

### Large Dependencies
Monitor these for bundle size:
1. `monaco-editor` - ~30MB (lazy loaded)
2. `@xyflow/react` - ~500KB
3. `@supabase/supabase-js` - ~150KB
4. `lodash` - ~70KB (tree-shakeable)

### Optimization Strategies
- Dynamic imports for large packages
- Tree shaking for utilities
- Code splitting by route
- External CDN for Monaco

## 🔐 Security Considerations

### Regular Updates Needed
- `ws` - WebSocket security patches
- `@supabase/*` - Security updates
- `next` - Framework security

### Audit Commands
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Check outdated packages
npm outdated
```

## 🔄 Upgrade Guide

### Before Upgrading
1. Check CHANGELOG for breaking changes
2. Run tests on current version
3. Backup package-lock.json

### Upgrade Process
```bash
# Update specific package
npm update package-name

# Update all packages
npm update

# Major version upgrade
npm install package-name@latest
```

### After Upgrading
1. Run full test suite
2. Check browser console for errors
3. Verify WebContainer functionality
4. Test IDE extensions

## 📊 Dependency Graph

### Critical Path
```
next.js
├── react
├── react-dom
└── typescript

@webcontainer/api
├── (standalone - few deps)
└── requires modern browser

@supabase/supabase-js
├── @supabase/realtime-js
├── @supabase/auth-js
└── cross-fetch
```

### Development Flow
```
Source Code
├── TypeScript Compilation
├── Next.js Build
├── Tailwind Processing
└── Bundle Optimization
```

## 🆘 Troubleshooting Dependencies

### Common Issues

1. **Module Resolution Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Peer Dependency Warnings**
   ```bash
   # Install peer deps explicitly
   npm install peer-dep-name
   ```

3. **Version Conflicts**
   ```bash
   # Force resolution
   npm install --force
   # Or use legacy peer deps
   npm install --legacy-peer-deps
   ```

4. **Build Failures**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   # Clear npm cache
   npm cache clean --force
   ```

## 📝 Adding New Dependencies

### Checklist
- [ ] Check bundle size impact
- [ ] Verify WebContainer compatibility
- [ ] Check license compatibility
- [ ] Test in all target browsers
- [ ] Update this documentation
- [ ] Add to security monitoring

### Best Practices
1. Prefer packages with TypeScript support
2. Check weekly downloads (popularity)
3. Verify active maintenance
4. Minimize dependency depth
5. Use exact versions for critical packages

---

This document should be updated whenever dependencies change significantly. Regular audits help maintain security and performance.
