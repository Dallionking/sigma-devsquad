#!/usr/bin/env node

/**
 * Combined installer for Vibe DevSquad
 * Installs both MCP servers and VS Code extension
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

class CombinedInstaller {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
  }

  async install() {
    console.log(chalk.blue.bold('\n🚀 Vibe DevSquad Complete Installation\n'));
    
    let mcpSuccess = false;
    let extensionSuccess = false;

    // Step 1: Install MCP Servers
    console.log(chalk.cyan('📦 Step 1: Installing MCP Servers...\n'));
    mcpSuccess = await this.installMCPServers();
    
    // Step 2: Install VS Code Extension
    console.log(chalk.cyan('\n🎨 Step 2: Installing VS Code Extension...\n'));
    extensionSuccess = await this.installExtension();
    
    // Summary
    console.log(chalk.blue.bold('\n📊 Installation Summary:\n'));
    
    if (mcpSuccess && extensionSuccess) {
      console.log(chalk.green('✅ All components installed successfully!'));
      this.showNextSteps();
    } else {
      if (!mcpSuccess) {
        console.log(chalk.red('❌ MCP Servers installation failed'));
      }
      if (!extensionSuccess) {
        console.log(chalk.red('❌ VS Code Extension installation failed'));
      }
      console.log(chalk.yellow('\n⚠️  Some components failed to install.'));
      console.log(chalk.gray('You can try installing them separately:'));
      console.log(chalk.gray('  - MCP: npm run install:mcp'));
      console.log(chalk.gray('  - Extension: npm run install:extension'));
    }
  }

  async installMCPServers() {
    const spinner = ora('Installing MCP servers...').start();
    
    try {
      // Check if MCP installer exists
      const mcpInstallerPath = path.join(this.projectRoot, 'scripts', 'install-mcp.js');
      
      if (!fs.existsSync(mcpInstallerPath)) {
        spinner.warn('MCP installer not found, skipping...');
        return false;
      }
      
      // Run MCP installer
      execSync(`node "${mcpInstallerPath}"`, {
        cwd: this.projectRoot,
        stdio: 'inherit'
      });
      
      spinner.succeed('MCP servers installed successfully');
      return true;
    } catch (error) {
      spinner.fail('MCP installation failed');
      console.error(chalk.red(`Error: ${error.message}`));
      return false;
    }
  }

  async installExtension() {
    try {
      // Use the extension installer we just created
      const installerPath = path.join(__dirname, 'bin', 'install.js');
      
      execSync(`node "${installerPath}" --auto`, {
        stdio: 'inherit'
      });
      
      return true;
    } catch (error) {
      console.error(chalk.red(`Extension installation error: ${error.message}`));
      return false;
    }
  }

  showNextSteps() {
    console.log(chalk.cyan('\n🎉 Installation Complete!\n'));
    console.log(chalk.white('Next steps:'));
    console.log(chalk.gray('1. Open or restart your IDE (VS Code, Cursor, or Windsurf)'));
    console.log(chalk.gray('2. Look for the Vibe DevSquad icon in the toolbar'));
    console.log(chalk.gray('3. Click to open the AI assistant chat'));
    console.log(chalk.gray('4. Configure your API keys in settings (search "vibeDevSquad")'));
    console.log(chalk.gray('\nFor MCP servers:'));
    console.log(chalk.gray('- Cursor: Should be automatically configured'));
    console.log(chalk.gray('- Windsurf: Check MCP settings if needed'));
  }
}

// Run installer
if (require.main === module) {
  const installer = new CombinedInstaller();
  installer.install().catch(error => {
    console.error(chalk.red('Installation failed:', error));
    process.exit(1);
  });
}

module.exports = CombinedInstaller;
