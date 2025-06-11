const { execSync } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class ExtensionInstaller {
  constructor() {
    this.extensionId = 'vibedevsquad.vibe-devsquad-vscode-extension';
  }

  async install(ide, vsixPath, force = false) {
    // Check if VSIX file exists
    if (!fs.existsSync(vsixPath)) {
      throw new Error(`VSIX file not found: ${vsixPath}`);
    }

    // Check if already installed (unless force flag is set)
    if (!force) {
      const isInstalled = await this.isInstalled(ide);
      if (isInstalled) {
        return `Extension already installed in ${ide.name}. Use --force to reinstall.`;
      }
    }

    // Install the extension
    try {
      const installCmd = `${ide.command} --install-extension "${vsixPath}"`;
      
      console.log(chalk.gray(`  Running: ${installCmd}`));
      
      const output = execSync(installCmd, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      // Check if installation was successful
      if (output.includes('successfully installed') || output.includes('was successfully installed')) {
        return `Successfully installed in ${ide.name}`;
      } else if (output.includes('already installed')) {
        return `Extension was already installed in ${ide.name}`;
      } else {
        // Some IDEs don't provide clear success messages, verify by checking if installed
        const nowInstalled = await this.isInstalled(ide);
        if (nowInstalled) {
          return `Successfully installed in ${ide.name}`;
        } else {
          throw new Error(`Installation may have failed. Output: ${output}`);
        }
      }
    } catch (error) {
      // Handle specific error cases
      if (error.message.includes('command not found')) {
        throw new Error(`${ide.name} command not accessible. You may need to add it to PATH.`);
      } else if (error.message.includes('EACCES') || error.message.includes('permission denied')) {
        throw new Error(`Permission denied. Try running with sudo or as administrator.`);
      } else {
        throw new Error(`Installation failed: ${error.message}`);
      }
    }
  }

  async isInstalled(ide) {
    try {
      const output = execSync(`${ide.command} --list-extensions`, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      return output.toLowerCase().includes(this.extensionId.toLowerCase());
    } catch (e) {
      // If we can't check, assume not installed
      return false;
    }
  }

  async uninstall(ide) {
    // Check if installed
    const isInstalled = await this.isInstalled(ide);
    if (!isInstalled) {
      return `Extension not installed in ${ide.name}`;
    }

    // Uninstall the extension
    try {
      const uninstallCmd = `${ide.command} --uninstall-extension ${this.extensionId}`;
      
      console.log(chalk.gray(`  Running: ${uninstallCmd}`));
      
      const output = execSync(uninstallCmd, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      // Verify uninstallation
      const stillInstalled = await this.isInstalled(ide);
      if (!stillInstalled) {
        return `Successfully uninstalled from ${ide.name}`;
      } else {
        throw new Error(`Uninstallation may have failed`);
      }
    } catch (error) {
      throw new Error(`Uninstallation failed: ${error.message}`);
    }
  }

  // Get installed version
  async getInstalledVersion(ide) {
    try {
      const output = execSync(`${ide.command} --list-extensions --show-versions`, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      const lines = output.split('\n');
      const extensionLine = lines.find(line => 
        line.toLowerCase().includes(this.extensionId.toLowerCase())
      );
      
      if (extensionLine) {
        // Extract version from format: extensionId@version
        const match = extensionLine.match(/@(\d+\.\d+\.\d+)/);
        return match ? match[1] : 'unknown';
      }
      
      return null;
    } catch (e) {
      return null;
    }
  }
}

module.exports = { ExtensionInstaller };
