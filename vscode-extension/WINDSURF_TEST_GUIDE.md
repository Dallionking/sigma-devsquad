# Windsurf Extension Testing Guide

## Quick Test Steps

### 1. Open the Test File
Open `test-extension.js` in Windsurf to have some code to work with.

### 2. Test Command Palette
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Vibe" and look for these commands:
   - **Vibe DevSquad: Open Chat**
   - **Vibe DevSquad: Toggle Chat Panel**
   - **Vibe DevSquad: Analyze Current File**
   - **Vibe DevSquad: Create Task from Selection**
   - **Vibe DevSquad: Analyze Project Structure**

### 3. Test Chat Panel
1. Run "Vibe DevSquad: Open Chat" from command palette
2. The chat panel should open in the sidebar
3. Try these test messages:
   - "Hello" - Should get a greeting response
   - "What file am I looking at?" - Should identify test-extension.js
   - "Explain this code" - Should analyze the test file
   - "Find bugs in this code" - Should identify the BUG comment
   - "How can I optimize this?" - Should find the OPTIMIZE comment

### 4. Test Context Features
1. Select some code in test-extension.js (e.g., the `testFunction`)
2. In the chat panel, click "Add Selection" button
3. Ask "What does this selected code do?"
4. Click "Add Current File" to add full file context
5. Ask "What are all the TODOs in this file?"

### 5. Test Code Suggestions
1. Ask "How can I improve the TestClass?"
2. AI should provide code suggestions
3. Look for "Apply Code" button on code blocks
4. Test if clicking it applies changes

### 6. Test Settings
1. Open Settings (`Cmd+,` or from menu)
2. Search for "vibeDevSquad"
3. Check these settings exist:
   - `vibeDevSquad.apiKey`
   - `vibeDevSquad.bridgeUrl`
   - `vibeDevSquad.autoConnect`
   - `vibeDevSquad.debugMode`

### 7. Test Toolbar Button
1. Look for a robot icon (🤖) in the editor toolbar
2. Click it to toggle the chat panel

## Expected Results

✅ **Working Correctly:**
- Commands appear in palette
- Chat panel opens and accepts input
- AI responds to messages
- Context features work
- Settings are accessible

❌ **Known Issues to Check:**
- Connection errors (check API key)
- UI rendering issues
- Commands not appearing
- Chat not responding

## Troubleshooting

### If Chat Doesn't Connect:
1. Check Output panel: View → Output → Select "Vibe DevSquad"
2. Look for connection errors
3. Verify API key is set in settings
4. Try "Refresh Connection" button

### If Commands Don't Appear:
1. Reload Windsurf: `Cmd+R` or `Ctrl+R`
2. Check extension is enabled in Extensions view
3. Look for errors in: Help → Toggle Developer Tools → Console

### If UI Looks Broken:
1. Take a screenshot
2. Note which theme you're using
3. Try switching between light/dark theme

## Quick Test Checklist

- [ ] Extension installed and enabled
- [ ] Commands appear in palette
- [ ] Chat panel opens
- [ ] Can send messages
- [ ] AI responds
- [ ] Context buttons work
- [ ] Settings accessible
- [ ] Toolbar button visible
- [ ] No console errors

## Report Results

After testing, update the test results in `test-all-ides.md` with:
- ✅ for working features
- ❌ for broken features
- ⚠️ for partially working features
- Notes on any specific issues
