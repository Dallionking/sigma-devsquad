#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const { IDEDetector } = require('../lib/ide-detector');
const { ExtensionInstaller } = require('../lib/extension-installer');

program
  .name('vibe-uninstall')
  .description('Uninstall Vibe DevSquad extension from your IDE')
  .option('-i, --ide <type>', 'specify IDE: vscode, cursor, or windsurf')
  .option('-a, --all', 'uninstall from all detected IDEs')
  .parse(process.argv);

const options = program.opts();

async function main() {
  console.log(chalk.blue.bold('\n🗑️  Vibe DevSquad Extension Uninstaller\n'));

  const spinner = ora('Detecting installed IDEs...').start();
  
  try {
    const detector = new IDEDetector();
    const detectedIDEs = await detector.detectInstalledIDEs();
    
    spinner.succeed(`Found ${detectedIDEs.length} compatible IDE(s)`);
    
    if (detectedIDEs.length === 0) {
      console.log(chalk.yellow('\n⚠️  No compatible IDEs found!'));
      process.exit(1);
    }

    // Show detected IDEs
    console.log(chalk.cyan('\nDetected IDEs:'));
    detectedIDEs.forEach(ide => {
      console.log(chalk.gray(`  • ${ide.name} (${ide.command})`));
    });

    // Determine which IDEs to uninstall from
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
    } else if (!options.all) {
      // If no specific IDE and not --all, ask user to specify
      console.log(chalk.yellow('\n⚠️  Please specify an IDE with --ide or use --all'));
      console.log(chalk.gray('Example: vibe-uninstall --ide vscode'));
      console.log(chalk.gray('         vibe-uninstall --all'));
      process.exit(1);
    }

    // Uninstall from each target IDE
    const installer = new ExtensionInstaller();
    const results = [];

    for (const ide of targetIDEs) {
      console.log(chalk.cyan(`\nUninstalling from ${ide.name}...`));
      
      try {
        const result = await installer.uninstall(ide);
        results.push({ ide: ide.name, success: true, message: result });
        console.log(chalk.green(`✅ ${result}`));
      } catch (error) {
        results.push({ ide: ide.name, success: false, message: error.message });
        console.log(chalk.red(`❌ Failed: ${error.message}`));
      }
    }

    // Summary
    console.log(chalk.blue.bold('\n📊 Uninstall Summary:'));
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    if (successful > 0) {
      console.log(chalk.green(`  ✅ Successful: ${successful}`));
    }
    if (failed > 0) {
      console.log(chalk.red(`  ❌ Failed: ${failed}`));
    }

    // Exit with appropriate code
    process.exit(failed > 0 && successful === 0 ? 1 : 0);

  } catch (error) {
    spinner.fail('Uninstall failed');
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    process.exit(1);
  }
}

main();
