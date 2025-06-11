#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const { IDEDetector } = require('../lib/ide-detector');
const { ExtensionInstaller } = require('../lib/extension-installer');
const { getLatestVSIX } = require('../lib/vsix-manager');

program
  .name('vibe-install')
  .description('Install Vibe DevSquad extension in your IDE')
  .option('-i, --ide <type>', 'specify IDE: vscode, cursor, or windsurf')
  .option('-f, --force', 'force installation even if already installed')
  .option('-v, --version <version>', 'install specific version')
  .option('-l, --local <path>', 'install from local .vsix file')
  .option('--auto', 'automatic installation (used by npm postinstall)')
  .parse(process.argv);

const options = program.opts();

async function main() {
  console.log(chalk.blue.bold('\n🚀 Vibe DevSquad Extension Installer\n'));

  const spinner = ora('Detecting installed IDEs...').start();
  
  try {
    const detector = new IDEDetector();
    const detectedIDEs = await detector.detectInstalledIDEs();
    
    spinner.succeed(`Found ${detectedIDEs.length} compatible IDE(s)`);
    
    if (detectedIDEs.length === 0) {
      console.log(chalk.yellow('\n⚠️  No compatible IDEs found!'));
      console.log(chalk.gray('Please install VS Code, Cursor, or Windsurf and try again.'));
      process.exit(1);
    }

    // Show detected IDEs
    console.log(chalk.cyan('\nDetected IDEs:'));
    detectedIDEs.forEach(ide => {
      console.log(chalk.gray(`  • ${ide.name} (${ide.command})`));
    });

    // Determine which IDEs to install to
    let targetIDEs = detectedIDEs;
    
    if (options.ide) {
      const specified = detectedIDEs.find(ide => 
        ide.type.toLowerCase() === options.ide.toLowerCase()
      );
      
      if (!specified) {
        console.log(chalk.red(`\n❌ IDE '${options.ide}' not found on your system.`));
        process.exit(1);
      }
      
      targetIDEs = [specified];
    }

    // Get VSIX file path
    let vsixPath;
    if (options.local) {
      vsixPath = options.local;
      console.log(chalk.cyan(`\nUsing local VSIX: ${vsixPath}`));
    } else {
      spinner.start('Getting extension package...');
      vsixPath = await getLatestVSIX(options.version);
      spinner.succeed('Extension package ready');
    }

    // Install to each target IDE
    const installer = new ExtensionInstaller();
    const results = [];

    for (const ide of targetIDEs) {
      console.log(chalk.cyan(`\nInstalling to ${ide.name}...`));
      
      try {
        const result = await installer.install(ide, vsixPath, options.force);
        results.push({ ide: ide.name, success: true, message: result });
        console.log(chalk.green(`✅ ${result}`));
      } catch (error) {
        results.push({ ide: ide.name, success: false, message: error.message });
        console.log(chalk.red(`❌ Failed: ${error.message}`));
      }
    }

    // Summary
    console.log(chalk.blue.bold('\n📊 Installation Summary:'));
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    if (successful > 0) {
      console.log(chalk.green(`  ✅ Successful: ${successful}`));
    }
    if (failed > 0) {
      console.log(chalk.red(`  ❌ Failed: ${failed}`));
    }

    // Instructions
    if (successful > 0) {
      console.log(chalk.cyan('\n🎉 Installation complete!'));
      console.log(chalk.gray('\nTo use the extension:'));
      console.log(chalk.gray('  1. Open or restart your IDE'));
      console.log(chalk.gray('  2. Look for the Vibe DevSquad icon in the toolbar'));
      console.log(chalk.gray('  3. Click to open the chat interface'));
      console.log(chalk.gray('\nFor configuration, search "vibeDevSquad" in settings.'));
    }

    // Exit with appropriate code
    process.exit(failed > 0 && successful === 0 ? 1 : 0);

  } catch (error) {
    spinner.fail('Installation failed');
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    if (options.auto) {
      // Don't fail npm install if extension install fails
      console.log(chalk.yellow('\n⚠️  Extension installation failed, but npm package installed successfully.'));
      console.log(chalk.gray('You can manually install the extension later with: npx vibe-install'));
      process.exit(0);
    }
    process.exit(1);
  }
}

// Run if not in auto mode or if explicitly called
if (!options.auto || process.argv.includes('--auto')) {
  main();
}
