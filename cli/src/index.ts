#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { listPatterns, listButtons } from './commands/list';
import { getPattern, getButton } from './commands/get';
import { addPattern, addButton } from './commands/add';
import { searchPatterns } from './commands/search';

const version = '2.0.0';

const program = new Command();

program
  .name('shorilabs')
  .description('CLI tool to browse and install shorilabs patterns and buttons')
  .version(version);

// List command
program
  .command('list')
  .description('List all available components')
  .option('-t, --type <type>', 'Component type (patterns, buttons)', 'patterns')
  .option('-c, --category <category>', 'Filter by category')
  .option('-j, --json', 'Output as JSON')
  .action(listPatterns);

// Shortcut: list patterns
program
  .command('patterns')
  .description('List all patterns (shortcut for list --type patterns)')
  .option('-c, --category <category>', 'Filter by category (gradients, geometric, decorative, effects)')
  .option('-j, --json', 'Output as JSON')
  .action((options) => listPatterns({ ...options, type: 'patterns' }));

// Shortcut: list buttons
program
  .command('buttons')
  .description('List all buttons (shortcut for list --type buttons)')
  .option('-c, --category <category>', 'Filter by category (primary, secondary, outline, ghost, animated, 3d, neon)')
  .option('-j, --json', 'Output as JSON')
  .action((options) => listButtons(options));

// Get command
program
  .command('get')
  .description('Get a specific component by ID')
  .argument('<component-id>', 'Component ID (e.g., aurora-glow, neon-blue)')
  .option('-t, --type <type>', 'Component type (pattern, button)', 'pattern')
  .option('-f, --format <format>', 'Output format (css, tailwind, both)', 'both')
  .action(getPattern);

// Add command
program
  .command('add')
  .description('Add a component to your project')
  .argument('<component-id>', 'Component ID to add')
  .option('-t, --type <type>', 'Component type (pattern, button)', 'pattern')
  .option('-f, --file <file>', 'Output file path')
  .option('--tailwind', 'Output Tailwind classes instead of CSS')
  .option('--append', 'Append to file instead of overwriting')
  .action(addPattern);

// Search command
program
  .command('search')
  .description('Search components by name or category')
  .argument('<query>', 'Search query')
  .option('-t, --type <type>', 'Component type to search (all, patterns, buttons)', 'all')
  .option('-j, --json', 'Output as JSON')
  .action(searchPatterns);

// Info command
program
  .command('info')
  .description('Show CLI information and available categories')
  .action(() => {
    console.log(chalk.bold.cyan('\n🎨 shorilabs CLI v' + version + '\n'));
    
    console.log(chalk.bold('Pattern Categories:'));
    console.log('  🌈 gradients   - Gradient backgrounds');
    console.log('  ⬛ geometric   - Geometric patterns');
    console.log('  💫 decorative  - Decorative patterns');
    console.log('  🎨 effects     - Special effects');
    console.log();
    
    console.log(chalk.bold('Button Categories:'));
    console.log('  🔵 primary     - Primary buttons');
    console.log('  ⚪ secondary   - Secondary buttons');
    console.log('  ⭕ outline     - Outline buttons');
    console.log('  👻 ghost       - Ghost buttons');
    console.log('  🎬 animated    - Animated buttons');
    console.log('  📦 3d          - 3D buttons');
    console.log('  💡 neon        - Neon buttons');
    console.log();
    
    console.log(chalk.bold('Quick Examples:'));
    console.log(chalk.gray('  shorilabs patterns              # List all patterns'));
    console.log(chalk.gray('  shorilabs buttons               # List all buttons'));
    console.log(chalk.gray('  shorilabs get aurora-glow       # Get pattern CSS'));
    console.log(chalk.gray('  shorilabs get neon-blue -t button  # Get button CSS'));
    console.log(chalk.gray('  shorilabs search gradient       # Search all components'));
    console.log(chalk.gray('  shorilabs add aurora-glow       # Add pattern to project'));
    console.log();
    
    console.log(chalk.gray('Website: https://shorilabs.xyz'));
    console.log(chalk.gray('GitHub: https://github.com/pratik20gb/shorilabs'));
    console.log();
  });

program.parse(process.argv);
