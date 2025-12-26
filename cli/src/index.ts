#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { listPatterns } from './commands/list';
import { getPattern } from './commands/get';
import { addPattern } from './commands/add';
import { searchPatterns } from './commands/search';
// Version will be injected during build or use a constant
const version = '1.0.0';

const program = new Command();

program
  .name('shorilabs')
  .description('CLI tool to browse and install shorilabs background patterns')
  .version(version);

program
  .command('list')
  .description('List all available patterns')
  .option('-c, --category <category>', 'Filter by category (gradients, geometric, decorative, effects)')
  .option('-j, --json', 'Output as JSON')
  .action(listPatterns);

program
  .command('get')
  .description('Get a specific pattern by ID')
  .argument('<pattern-id>', 'Pattern ID (e.g., aurora-glow)')
  .option('-f, --format <format>', 'Output format (css, tailwind, both)', 'both')
  .action(getPattern);

program
  .command('add')
  .description('Add a pattern to your project')
  .argument('<pattern-id>', 'Pattern ID to add')
  .option('-f, --file <file>', 'Output file path', 'patterns.css')
  .option('--tailwind', 'Output Tailwind classes instead of CSS')
  .option('--append', 'Append to file instead of overwriting')
  .action(addPattern);

program
  .command('search')
  .description('Search patterns by name or category')
  .argument('<query>', 'Search query')
  .option('-j, --json', 'Output as JSON')
  .action(searchPatterns);

program.parse(process.argv);

