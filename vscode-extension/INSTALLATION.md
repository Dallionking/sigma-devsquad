# Vibe DevSquad VS Code Extension - Installation Guide

## Quick Installation

### Option 1: Install from VSIX (Recommended for Testing)

1. **Open VS Code**
2. **Open Command Palette** (Ctrl+Shift+P / Cmd+Shift+P)
3. **Run**: `Extensions: Install from VSIX...`
4. **Select**: `vibe-devsquad-vscode-extension-1.0.0.vsix`
5. **Reload** VS Code when prompted

### Option 2: Install from Source

1. **Clone and Build**:
   ```bash
   cd /Users/dallionking/CascadeProjects/Vibe\ Dev\ Squad/vscode-extension
   npm install
   npm run compile
   ```

2. **Package** (if needed):
   ```bash
   vsce package
   ```

3. **Install** using the generated VSIX file

## Configuration

After installation, configure the extension:

1. **Open VS Code Settings** (Ctrl+, / Cmd+,)
2. **Search**: "Vibe DevSquad"
3. **Configure**:
   - **Server URL**: `ws://localhost:8080/ws` (or your platform URL)
   - **Auto Connect**: Enable for automatic connection
   - **API Key**: Your platform authentication key
   - **Log Level**: Set to `info` for normal use, `debug` for troubleshooting

### Settings JSON Configuration

```json
{
  "vibeDevSquad.serverUrl": "ws://localhost:8080/ws",
  "vibeDevSquad.autoConnect": true,
  "vibeDevSquad.apiKey": "your-api-key-here",
  "vibeDevSquad.logLevel": "info"
}
```

## First Use

1. **Open Command Palette** (Ctrl+Shift+P / Cmd+Shift+P)
2. **Run**: `Vibe DevSquad: Open Planning Agent`
3. **Check Connection**: The status indicator should show "Connected" if your platform is running

## Testing Commands

### Basic Commands
- `Vibe DevSquad: Open Planning Agent` - Opens the sidebar panel
- `Vibe DevSquad: Show Connection Status` - Shows current connection state
- `Vibe DevSquad: Quick Create Task` - Creates a new task with input prompt

### Advanced Commands
- `Vibe DevSquad: Create Task from Selection` - Select code and create a task
- `Vibe DevSquad: Analyze Current File` - Analyze the currently open file
- `Vibe DevSquad: Analyze Project` - Analyze the entire workspace

## Verification

✅ **Extension Installed**: Check Extensions panel for "Vibe DevSquad"  
✅ **Commands Available**: Search for "Vibe DevSquad" in Command Palette  
✅ **Sidebar Panel**: Look for Vibe DevSquad icon in Activity Bar  
✅ **Settings**: Verify configuration options are available  

## Troubleshooting

### Extension Not Loading
- Check VS Code output panel for errors
- Ensure VS Code version is 1.74.0 or higher
- Try reloading VS Code window

### Connection Issues
- Verify platform is running on specified URL
- Check API key is correctly configured
- Ensure WebSocket endpoint is accessible
- Check VS Code output for connection logs

### Commands Not Working
- Verify extension is enabled in Extensions panel
- Check if platform connection is established
- Review error messages in output panel

## Uninstallation

1. **Extensions Panel**: Click gear icon next to "Vibe DevSquad"
2. **Select**: "Uninstall"
3. **Reload** VS Code when prompted

## Support

- **Issues**: Report problems in the GitHub repository
- **Logs**: Check "Vibe DevSquad" output channel for debugging
- **Documentation**: See README.md for detailed feature information

---

**Happy coding with Vibe DevSquad! 🚀**
