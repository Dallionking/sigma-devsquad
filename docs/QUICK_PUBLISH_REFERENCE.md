# 🚀 Vibe DevSquad Quick Publishing Reference

## 📦 Extension Publishing (Works for VS Code, Cursor, Windsurf)

### From vscode-extension directory:
```bash
# Patch release (bug fixes)
npm run release:patch

# Minor release (new features)
npm run release:minor

# Major release (breaking changes)
npm run release:major
```

### From root directory:
```bash
# Publish extension only
./scripts/publish-all.sh extension patch

# Publish everything
./scripts/publish-all.sh all patch
```

## 🔧 MCP Server Publishing

### From cursor-mcp-server directory:
```bash
npm run release:patch
npm run release:minor
npm run release:major
```

## ⌨️ IDE Shortcuts

### VS Code/Cursor/Windsurf
- **Run Task**: `Cmd+Shift+P` → "Tasks: Run Task"
- **Available Tasks**:
  - Publish VS Code Extension (All IDEs)
  - Publish MCP Server
  - Publish Everything (Patch/Minor/Major)
  - Test All Components

## ✅ Pre-Publish Checklist

1. [ ] Update CHANGELOG.md
2. [ ] Run tests: `npm test`
3. [ ] Check lint: `npm run lint`
4. [ ] Build locally: `npm run compile`
5. [ ] Test in VS Code, Cursor, and Windsurf
6. [ ] Commit all changes

## 🔍 Quick Checks

```bash
# Check current versions
cd vscode-extension && npm version
cd cursor-mcp-server && npm version

# Check marketplace status
vsce show vibe-devsquad.vibe-devsquad-vscode-extension

# Check npm package
npm view cursor-mcp-server
```

## 🚨 Troubleshooting

### vsce not logged in
```bash
vsce login vibe-devsquad
# Enter PAT from Azure DevOps
```

### npm not logged in
```bash
npm login
# Use npm credentials
```

### Build failures
```bash
# Clean and rebuild
rm -rf node_modules dist out
npm install
npm run compile
```

## 📊 Version Strategy

- **Patch** (1.0.x): Bug fixes, typos, small improvements
- **Minor** (1.x.0): New features, backwards compatible
- **Major** (x.0.0): Breaking changes, major refactors

## 🎯 Quick Commands

```bash
# Test everything
./scripts/test-all.sh

# Publish extension with auto git tag
cd vscode-extension && ./scripts/publish.sh patch

# Publish without git operations
cd vscode-extension && ./scripts/publish.sh patch no

# View extension in marketplace
open "https://marketplace.visualstudio.com/items?itemName=vibe-devsquad.vibe-devsquad-vscode-extension"
```

## 🎉 After Publishing

1. **Verify Installation**
   ```bash
   # Extension
   code --install-extension vibe-devsquad.vibe-devsquad-vscode-extension
   
   # MCP
   npm install -g @vibe-devsquad/cursor-mcp-server
   ```

2. **Check Marketplace**
   - https://marketplace.visualstudio.com/publishers/vibe-devsquad
   - https://www.npmjs.com/~vibe-devsquad

3. **Monitor Issues**
   - GitHub Issues
   - Marketplace Reviews
   - Error telemetry

---

**Remember**: Always test locally before publishing! 🧪✅
