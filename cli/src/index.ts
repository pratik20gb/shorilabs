#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { listPatterns, listButtons } from './commands/list';
import { getPattern, getButton } from './commands/get';
import { addPattern, addButton } from './commands/add';
import { searchPatterns } from './commands/search';

const version = '2.1.0';

const program = new Command();

program
  .name('shorilabs')
  .description('CLI tool to browse and install shorilabs components (patterns, buttons, cards, inputs, badges, loaders, avatars, toggles, dividers)')
  .version(version);

// List command
program
  .command('list')
  .description('List all available components')
  .option('-t, --type <type>', 'Component type (patterns, buttons, cards, inputs, badges, loaders, avatars, toggles, dividers)', 'patterns')
  .option('-c, --category <category>', 'Filter by category')
  .option('-j, --json', 'Output as JSON')
  .action(listPatterns);

// Shortcut commands for each component type
const shortcuts = [
  { name: 'patterns', desc: 'List all patterns', category: 'gradients, geometric, decorative, effects' },
  { name: 'buttons', desc: 'List all buttons', category: 'primary, secondary, outline, ghost, animated, 3d, neon' },
  { name: 'cards', desc: 'List all cards', category: 'minimal, elevated, glass, gradient, bordered, interactive' },
  { name: 'inputs', desc: 'List all inputs', category: 'default, outlined, filled, floating, underlined, search' },
  { name: 'badges', desc: 'List all badges', category: 'solid, outline, soft, pill, dot, status' },
  { name: 'loaders', desc: 'List all loaders', category: 'spinner, dots, bars, pulse, skeleton, progress' },
  { name: 'avatars', desc: 'List all avatars', category: 'circle, rounded, ring, status, group, bordered' },
  { name: 'toggles', desc: 'List all toggles', category: 'default, ios, material, pill, icon, labeled' },
  { name: 'dividers', desc: 'List all dividers', category: 'solid, dashed, gradient, decorated, text, fade' },
];

shortcuts.forEach(({ name, desc, category }) => {
  program
    .command(name)
    .description(desc + ` (shortcut for list --type ${name})`)
    .option('-c, --category <category>', `Filter by category (${category})`)
    .option('-j, --json', 'Output as JSON')
    .action((options) => listPatterns({ ...options, type: name }));
});

// Get command
program
  .command('get')
  .description('Get a specific component by ID')
  .argument('<component-id>', 'Component ID (e.g., aurora-glow, neon-blue)')
  .option('-t, --type <type>', 'Component type (pattern, button, card, input, badge, loader, avatar, toggle, divider)', 'pattern')
  .option('-f, --format <format>', 'Output format (css, tailwind, both)', 'both')
  .action(getPattern);

// Add command
program
  .command('add')
  .description('Add a component to your project')
  .argument('<component-id>', 'Component ID to add')
  .option('-t, --type <type>', 'Component type (pattern, button, card, input, badge, loader, avatar, toggle, divider)', 'pattern')
  .option('-f, --file <file>', 'Output file path')
  .option('--tailwind', 'Output Tailwind classes instead of CSS')
  .option('--append', 'Append to file instead of overwriting')
  .action(addPattern);

// Search command
program
  .command('search')
  .description('Search components by name or category')
  .argument('<query>', 'Search query')
  .option('-t, --type <type>', 'Component type to search (all, patterns, buttons, cards, inputs, badges, loaders, avatars, toggles, dividers)', 'all')
  .option('-j, --json', 'Output as JSON')
  .action(searchPatterns);

// Info command
program
  .command('info')
  .description('Show CLI information and available categories')
  .action(() => {
    console.log(chalk.bold.cyan('\n🎨 shorilabs CLI v' + version + '\n'));
    
    console.log(chalk.bold('Available Component Types:'));
    console.log('  ✨ patterns   - Background patterns');
    console.log('  🔘 buttons    - Button components');
    console.log('  🃏 cards      - Card components');
    console.log('  📝 inputs     - Input field styles');
    console.log('  🏷️ badges     - Badge and label components');
    console.log('  ⏳ loaders    - Loading indicators');
    console.log('  👤 avatars    - User avatar styles');
    console.log('  🔀 toggles    - Toggle switch components');
    console.log('  ➖ dividers   - Section dividers');
    console.log();
    
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
    console.log(chalk.gray('  shorilabs cards                 # List all cards'));
    console.log(chalk.gray('  shorilabs get aurora-glow       # Get pattern CSS'));
    console.log(chalk.gray('  shorilabs get neon-blue -t button  # Get button CSS'));
    console.log(chalk.gray('  shorilabs get minimal-clean -t card  # Get card CSS'));
    console.log(chalk.gray('  shorilabs search gradient       # Search all components'));
    console.log(chalk.gray('  shorilabs add aurora-glow       # Add pattern to project'));
    console.log();
    
    console.log(chalk.gray('Website: https://shorilabs.xyz'));
    console.log(chalk.gray('GitHub: https://github.com/pratik20gb/shorilabs'));
    console.log();
  });

program.parse(process.argv);
