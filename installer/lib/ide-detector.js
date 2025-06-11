const { execSync } = require('child_process');
const which = require('which');
const os = require('os');
const path = require('path');
const fs = require('fs');

class IDEDetector {
  constructor() {
    this.platform = os.platform();
    this.homeDir = os.homedir();
  }

  async detectInstalledIDEs() {
    const detectedIDEs = [];
    
    // Check for VS Code
    const vscode = await this.detectVSCode();
    if (vscode) detectedIDEs.push(vscode);
    
    // Check for Cursor
    const cursor = await this.detectCursor();
    if (cursor) detectedIDEs.push(cursor);
    
    // Check for Windsurf
    const windsurf = await this.detectWindsurf();
    if (windsurf) detectedIDEs.push(windsurf);
    
    return detectedIDEs;
  }

  async detectVSCode() {
    const commands = ['code', 'code-insiders'];
    
    for (const cmd of commands) {
      try {
        const cmdPath = await which(cmd);
        
        // Verify it's actually VS Code
        const version = execSync(`${cmd} --version`, { encoding: 'utf8' });
        if (version.includes('Visual Studio Code') || version.includes('Code')) {
          return {
            type: 'vscode',
            name: cmd === 'code-insiders' ? 'VS Code Insiders' : 'VS Code',
            command: cmd,
            path: cmdPath,
            version: version.split('\n')[0]
          };
        }
      } catch (e) {
        // Command not found, continue
      }
    }
    
    // Check common installation paths if command not in PATH
    if (this.platform === 'darwin') {
      const appPaths = [
        '/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code',
        '/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/bin/code-insiders'
      ];
      
      for (const appPath of appPaths) {
        if (fs.existsSync(appPath)) {
          const name = appPath.includes('Insiders') ? 'VS Code Insiders' : 'VS Code';
          return {
            type: 'vscode',
            name,
            command: appPath,
            path: appPath,
            version: 'detected'
          };
        }
      }
    }
    
    return null;
  }

  async detectCursor() {
    try {
      // Try command line first
      const cmdPath = await which('cursor');
      
      // Verify it's actually Cursor
      try {
        const version = execSync('cursor --version', { encoding: 'utf8' });
        return {
          type: 'cursor',
          name: 'Cursor',
          command: 'cursor',
          path: cmdPath,
          version: version.split('\n')[0]
        };
      } catch (e) {
        // Version check failed, but command exists
      }
    } catch (e) {
      // Command not found
    }
    
    // Check common installation paths
    if (this.platform === 'darwin') {
      const appPath = '/Applications/Cursor.app/Contents/Resources/app/bin/cursor';
      if (fs.existsSync(appPath)) {
        return {
          type: 'cursor',
          name: 'Cursor',
          command: appPath,
          path: appPath,
          version: 'detected'
        };
      }
    } else if (this.platform === 'win32') {
      const possiblePaths = [
        path.join(process.env.LOCALAPPDATA || '', 'Programs', 'cursor', 'Cursor.exe'),
        path.join(process.env.PROGRAMFILES || '', 'Cursor', 'Cursor.exe')
      ];
      
      for (const cursorPath of possiblePaths) {
        if (fs.existsSync(cursorPath)) {
          return {
            type: 'cursor',
            name: 'Cursor',
            command: cursorPath,
            path: cursorPath,
            version: 'detected'
          };
        }
      }
    }
    
    return null;
  }

  async detectWindsurf() {
    try {
      // Try command line first
      const cmdPath = await which('windsurf');
      
      // Verify it's actually Windsurf
      try {
        const version = execSync('windsurf --version', { encoding: 'utf8' });
        return {
          type: 'windsurf',
          name: 'Windsurf',
          command: 'windsurf',
          path: cmdPath,
          version: version.split('\n')[0]
        };
      } catch (e) {
        // Version check failed, but command exists
        return {
          type: 'windsurf',
          name: 'Windsurf',
          command: 'windsurf',
          path: cmdPath,
          version: 'detected'
        };
      }
    } catch (e) {
      // Command not found
    }
    
    // Check common installation paths
    if (this.platform === 'darwin') {
      const appPath = '/Applications/Windsurf.app/Contents/Resources/app/bin/windsurf';
      if (fs.existsSync(appPath)) {
        return {
          type: 'windsurf',
          name: 'Windsurf',
          command: appPath,
          path: appPath,
          version: 'detected'
        };
      }
    } else if (this.platform === 'win32') {
      const possiblePaths = [
        path.join(process.env.LOCALAPPDATA || '', 'Programs', 'windsurf', 'Windsurf.exe'),
        path.join(process.env.PROGRAMFILES || '', 'Windsurf', 'Windsurf.exe')
      ];
      
      for (const windsurfPath of possiblePaths) {
        if (fs.existsSync(windsurfPath)) {
          return {
            type: 'windsurf',
            name: 'Windsurf',
            command: windsurfPath,
            path: windsurfPath,
            version: 'detected'
          };
        }
      }
    }
    
    return null;
  }

  // Check if extension is already installed
  async isExtensionInstalled(ide, extensionId) {
    try {
      const output = execSync(`${ide.command} --list-extensions`, { encoding: 'utf8' });
      return output.toLowerCase().includes(extensionId.toLowerCase());
    } catch (e) {
      return false;
    }
  }
}

module.exports = { IDEDetector };
