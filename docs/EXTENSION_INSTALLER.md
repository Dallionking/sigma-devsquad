# Vibe DevSquad Extension Installer Guide

This guide explains how to use the automated installer for the Vibe DevSquad VS Code extension.

## Overview

The Vibe DevSquad installer provides a streamlined way to install our VS Code extension across multiple IDEs:
- **VS Code** (including Insiders)
- **Cursor**
- **Windsurf**

The same `.vsix` extension package works on all three IDEs without modification.

## Installation Methods

### 1. Quick Install (Recommended)

From the project root:

```bash
# Install everything (MCP servers + extension)
npm run install:all

# Or install just the extension
npm run install:extension
```

### 2. Global NPM Package

```bash
# Install globally
npm install -g @vibedevsquad/extension-installer

# Then run
vibe-install
```

### 3. Manual Installation

```bash
cd installer
npm install
node bin/install.js
```

### 4. Install to Specific IDE

```bash
# Install to VS Code only
npx @vibedevsquad/extension-installer --ide vscode

# Install to Cursor only
npx @vibedevsquad/extension-installer --ide cursor

# Install to Windsurf only
npx @vibedevsquad/extension-installer --ide windsurf
```

## How It Works

1. **IDE Detection**: The installer automatically detects which IDEs are installed on your system
2. **Version Check**: Checks if the extension is already installed
3. **Installation**: Uses each IDE's CLI to install the extension
4. **Verification**: Confirms successful installation

### Detection Logic

The installer looks for IDEs in the following locations:

**macOS:**
- VS Code: `/Applications/Visual Studio Code.app` or `code` in PATH
- Cursor: `/Applications/Cursor.app` or `cursor` in PATH
- Windsurf: `/Applications/Windsurf.app` or `windsurf` in PATH

**Windows:**
- VS Code: `%LOCALAPPDATA%\Programs\Microsoft VS Code` or `code` in PATH
- Cursor: `%LOCALAPPDATA%\Programs\cursor` or `cursor` in PATH
- Windsurf: `%LOCALAPPDATA%\Programs\windsurf` or `windsurf` in PATH

**Linux:**
- All IDEs: Checks if `code`, `cursor`, or `windsurf` commands are in PATH

## Uninstalling

```bash
# Uninstall from all IDEs
npm run uninstall:extension

# Or manually
vibe-uninstall --all

# Uninstall from specific IDE
vibe-uninstall --ide vscode
```

## Advanced Options

### Force Reinstall

```bash
vibe-install --force
```

### Install Specific Version

```bash
vibe-install --version 1.0.5
```

### Install from Local File

```bash
vibe-install --local ./path/to/extension.vsix
```

## Troubleshooting

### IDE Not Detected

If your IDE isn't detected:

1. **Check CLI Access**: Make sure the IDE command works in terminal
   ```bash
   code --version
   cursor --version
   windsurf --version
   ```

2. **Add to PATH**: If commands don't work, add the IDE to your PATH
   - VS Code: Usually adds itself during installation
   - Cursor: May need manual PATH configuration
   - Windsurf: May need manual PATH configuration

### Permission Errors

On macOS/Linux:
```bash
sudo npm install -g @vibedevsquad/extension-installer
```

### Extension Already Installed

Use `--force` to reinstall:
```bash
vibe-install --force
```

## Integration with CI/CD

### Package.json Scripts

```json
{
  "scripts": {
    "postinstall": "npx @vibedevsquad/extension-installer --auto",
    "setup": "npm install && npm run install:extension"
  }
}
```

### GitHub Actions

```yaml
- name: Install Vibe DevSquad Extension
  run: |
    npm install -g @vibedevsquad/extension-installer
    vibe-install --ide vscode
```

## Combined Installation

The installer can be combined with MCP server installation:

```bash
# From project root
npm run install:all
```

This will:
1. Install MCP servers for Cursor and Windsurf
2. Install the VS Code extension in all detected IDEs
3. Show configuration instructions

## Publishing the Installer

To publish the installer to npm:

```bash
cd installer
npm publish --access public
```

## Development

To test the installer locally:

```bash
cd installer
npm link
vibe-install --local ../vscode-extension/vibe-devsquad-vscode-extension-*.vsix
```

## Architecture

The installer consists of:
- **IDE Detector**: Finds installed IDEs on the system
- **Extension Installer**: Handles installation/uninstallation
- **VSIX Manager**: Manages extension packages (bundled, GitHub, or local)
- **CLI Commands**: User-friendly command-line interface

## Future Enhancements

- [ ] Auto-update functionality
- [ ] Version management (upgrade/downgrade)
- [ ] Configuration migration
- [ ] IDE-specific settings application
- [ ] Integration with VS Code settings sync
