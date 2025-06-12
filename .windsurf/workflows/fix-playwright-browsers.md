---
description: Fix Playwright browser installation issues for web-eval-agent MCP in Windsurf
---

# Fix Playwright Browser Installation for web-eval-agent MCP

This workflow fixes the common issue where the web-eval-agent MCP fails due to missing or incompatible Playwright browsers in the Windsurf environment.

## When to Use This Workflow
- When web-eval-agent MCP fails with "Executable doesn't exist" errors
- When Playwright browser version mismatches occur
- After Windsurf or Playwright updates that break browser compatibility

## Symptoms
- Error: `BrowserType.launch: Executable doesn't exist at /Users/.../ws-browser/chromium_headless_shell-XXXX/`
- MCP web evaluation tools fail to initialize
- Browser automation tests don't run

## Solution Steps

### 1. Check Current Browser Status
```bash
ls -la /Users/dallionking/.codeium/windsurf/ws-browser/
```

### 2. Check What Versions Are Needed
```bash
playwright install --dry-run
```

### 3. Install Browsers to Windsurf Path
// turbo
```bash
PLAYWRIGHT_BROWSERS_PATH=/Users/dallionking/.codeium/windsurf/ws-browser playwright install chromium
```

### 4. Create Version Compatibility Links (if needed)
Check the error message for the exact version numbers, then create symbolic links:
```bash
ln -sf chromium_headless_shell-[NEW_VERSION] /Users/dallionking/.codeium/windsurf/ws-browser/chromium_headless_shell-[OLD_VERSION]
```

Example:
```bash
ln -sf chromium_headless_shell-1178 /Users/dallionking/.codeium/windsurf/ws-browser/chromium_headless_shell-1169
```

### 5. Verify Installation
```bash
ls -la /Users/dallionking/.codeium/windsurf/ws-browser/
```

### 6. Test the Fix
Test the web-eval-agent MCP with a simple task:
```
Use mcp7_web_eval_agent tool with a basic navigation test
```

## Important Paths
- **System Browsers**: `/Users/dallionking/Library/Caches/ms-playwright/`
- **Windsurf Browsers**: `/Users/dallionking/.codeium/windsurf/ws-browser/`
- **MCP Config**: `/Users/dallionking/.codeium/windsurf/mcp_config.json`

## Prevention
- Keep Playwright updated across all environments
- Monitor Windsurf updates that might affect browser paths
- Document any custom browser installations for the team

## Troubleshooting
If the fix doesn't work:
1. Clear the entire ws-browser directory and reinstall
2. Check MCP server configuration for custom browser paths
3. Verify Playwright CLI version matches MCP server expectations
4. Check system permissions on browser cache directories

## Success Criteria
- web-eval-agent MCP runs without browser errors
- Automated UI tests execute with screenshot capture
- Error detection and reporting functions work correctly
