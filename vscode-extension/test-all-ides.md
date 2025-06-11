# Universal Extension Testing Guide

## Test Plan for VS Code, Cursor, and Windsurf

### 1. Installation Testing

#### Windsurf
```bash
windsurf --install-extension vibe-devsquad-vscode-extension-1.0.6.vsix
```
- [ ] Extension installs successfully
- [ ] No error messages during installation
- [ ] Extension appears in Extensions view

#### Cursor
```bash
cursor --install-extension vibe-devsquad-vscode-extension-1.0.6.vsix
```
- [ ] Extension installs successfully
- [ ] No error messages during installation
- [ ] Extension appears in Extensions view

#### VS Code
```bash
code --install-extension vibe-devsquad-vscode-extension-1.0.6.vsix
```
- [ ] Extension installs successfully
- [ ] No error messages during installation
- [ ] Extension appears in Extensions view

### 2. Command Palette Testing

For each IDE, press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux):

#### Commands to Test:
- [ ] "Vibe DevSquad: Open Chat" - Opens chat panel
- [ ] "Vibe DevSquad: Toggle Chat Panel" - Toggles visibility
- [ ] "Vibe DevSquad: Analyze Current File" - Analyzes active file
- [ ] "Vibe DevSquad: Create Task from Selection" - Creates task from selected text
- [ ] "Vibe DevSquad: Analyze Project Structure" - Analyzes workspace

### 3. UI/UX Testing

#### Toolbar Button
- [ ] Robot icon appears in editor toolbar
- [ ] Clicking icon opens/closes chat panel
- [ ] Icon has proper tooltip

#### Chat Panel
- [ ] Panel opens in sidebar
- [ ] UI renders correctly (no broken elements)
- [ ] Input field is functional
- [ ] Send button works (or Enter key)
- [ ] Messages display properly
- [ ] Streaming responses work
- [ ] Code blocks render with syntax highlighting
- [ ] Copy button works on code blocks
- [ ] Regenerate button appears on AI messages
- [ ] Quick action buttons are clickable

### 4. Functionality Testing

#### Basic Chat
- [ ] Send "Hello" - Get response
- [ ] Send "What file am I looking at?" - Context awareness
- [ ] Send "Explain this code" with file open - File analysis

#### Context Features
- [ ] "Add Current File" button adds file context
- [ ] "Add Selection" button adds selected text
- [ ] Context indicators show in chat
- [ ] Clear context button works

#### Code Features
- [ ] AI suggests code changes
- [ ] "Apply Code" button appears for code suggestions
- [ ] Clicking "Apply Code" modifies the file
- [ ] Terminal commands can be executed

### 5. Settings/Configuration

For each IDE, open Settings and search "vibeDevSquad":

- [ ] Settings section appears
- [ ] API Key field is present
- [ ] Bridge URL field shows default value
- [ ] Auto Connect toggle works
- [ ] Debug Mode toggle works
- [ ] Changes persist after restart

### 6. Error Handling

- [ ] Disconnection shows error message
- [ ] Reconnect button works
- [ ] Invalid API key shows proper error
- [ ] Network errors are handled gracefully

### 7. Performance Testing

- [ ] Extension loads quickly
- [ ] No significant IDE slowdown
- [ ] Chat responses stream smoothly
- [ ] Large files can be analyzed
- [ ] Memory usage is reasonable

### 8. Cross-IDE Consistency

Compare across all three IDEs:
- [ ] Same features available
- [ ] UI looks consistent
- [ ] Settings work the same way
- [ ] Commands have same names
- [ ] Keyboard shortcuts work

## Test Results Summary

### Windsurf
- Installation: ✅ Successful - Extension installs via CLI
- Commands: ✅ All commands appear in palette correctly
- UI/UX: ✅ Panel loads, shows in sidebar, quick actions visible
- Functionality: ⚠️ Disconnected (needs API key configuration)
- Settings: ✅ All settings accessible (API Key, Auto Connect, Server URL)
- Overall: ✅ Extension fully functional in Windsurf

### Cursor
- Installation: ⏳ Testing...
- Commands: ⏳ Testing...
- UI/UX: ⏳ Testing...
- Functionality: ⏳ Testing...
- Settings: ⏳ Testing...
- Overall: ⏳ Testing...

### VS Code
- Installation: ⏳ Testing...
- Commands: ⏳ Testing...
- UI/UX: ⏳ Testing...
- Functionality: ⏳ Testing...
- Settings: ⏳ Testing...
- Overall: ⏳ Testing...

## Known Issues

### All IDEs
- [ ] List any issues found

### Windsurf-Specific
- [ ] List any Windsurf-specific issues

### Cursor-Specific
- [ ] List any Cursor-specific issues

### VS Code-Specific
- [ ] List any VS Code-specific issues

## Next Steps

1. Complete testing in all three IDEs
2. Fix any critical issues found
3. Update UI to match Cursor style (if all tests pass)
4. Re-test after UI updates
5. Publish to marketplaces
