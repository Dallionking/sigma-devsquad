# Vibe DevSquad Extension Installer

Automatic installer for the Vibe DevSquad extension across VS Code, Cursor, and Windsurf IDEs.

## Installation

### Method 1: Global Installation (Recommended)

```bash
npm install -g @vibedevsquad/extension-installer
```

This will:
1. Install the npm package globally
2. Automatically detect your installed IDEs
3. Install the Vibe DevSquad extension to all detected IDEs

### Method 2: Manual Installation

If automatic installation fails or you want more control:

```bash
# Install specific IDE
npx @vibedevsquad/extension-installer --ide vscode
npx @vibedevsquad/extension-installer --ide cursor
npx @vibedevsquad/extension-installer --ide windsurf

# Install from local VSIX file
npx @vibedevsquad/extension-installer --local ./path/to/extension.vsix

# Force reinstall
npx @vibedevsquad/extension-installer --force
```

### Method 3: Include in Project

Add to your project's dependencies:

```bash
npm install --save-dev @vibedevsquad/extension-installer
```

The extension will be automatically installed when developers run `npm install`.

## Usage

### Install Command

```bash
vibe-install [options]

Options:
  -i, --ide <type>        Specify IDE: vscode, cursor, or windsurf
  -f, --force            Force installation even if already installed
  -v, --version <ver>    Install specific version
  -l, --local <path>     Install from local .vsix file
  -h, --help            Display help
```

### Uninstall Command

```bash
vibe-uninstall [options]

Options:
  -i, --ide <type>        Specify IDE: vscode, cursor, or windsurf
  -a, --all              Uninstall from all detected IDEs
  -h, --help            Display help
```

## Examples

```bash
# Install to all detected IDEs
vibe-install

# Install to VS Code only
vibe-install --ide vscode

# Install specific version
vibe-install --version 1.0.5

# Uninstall from all IDEs
vibe-uninstall --all

# Uninstall from Cursor only
vibe-uninstall --ide cursor
```

## How It Works

1. **IDE Detection**: Automatically detects VS Code, Cursor, and Windsurf installations
2. **Smart Installation**: Checks if extension is already installed before attempting
3. **Cross-Platform**: Works on Windows, macOS, and Linux
4. **Fallback Options**: Can build from source or download from GitHub if needed

## Troubleshooting

### IDE Not Detected

If your IDE isn't detected, make sure it's accessible from the command line:

- **VS Code**: Run `code --version`
- **Cursor**: Run `cursor --version`
- **Windsurf**: Run `windsurf --version`

If the command doesn't work, you may need to add the IDE to your PATH.

### Permission Errors

On macOS/Linux, you might need to run with elevated permissions:

```bash
sudo npm install -g @vibedevsquad/extension-installer
```

### Manual VSIX Installation

If all else fails, you can manually install the extension:

1. Download the `.vsix` file from [GitHub Releases](https://github.com/vibedevsquad/vibe-devsquad/releases)
2. Open your IDE
3. Go to Extensions view
4. Click "..." menu → "Install from VSIX..."
5. Select the downloaded file

## Integration with MCP Installers

This installer can be combined with MCP server installation for a complete setup:

```json
{
  "scripts": {
    "postinstall": "npm run install:mcp && npm run install:extension",
    "install:mcp": "node scripts/install-mcp.js",
    "install:extension": "vibe-install --auto"
  }
}
```

## License

MIT
