import chalk from 'chalk';
import { loadPatterns } from '../utils/patterns';

export async function getPattern(patternId: string, options: { format?: string }) {
  const patterns = await loadPatterns();
  const pattern = patterns.find(p => p.id === patternId);

  if (!pattern) {
    console.error(chalk.red(`❌ Pattern "${patternId}" not found`));
    console.log(chalk.gray(`\nUse "shorilabs list" to see all available patterns`));
    process.exit(1);
  }

  console.log(chalk.bold.cyan(`\n✨ ${pattern.name}\n`));
  console.log(chalk.gray(`Category: ${pattern.category}`));
  if (pattern.isNew) {
    console.log(chalk.yellow('Status: NEW'));
  }
  console.log();

  const format = options.format?.toLowerCase() || 'both';

  if (format === 'css' || format === 'both') {
    console.log(chalk.bold('CSS:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(pattern.css);
    console.log();
  }

  if (format === 'tailwind' || format === 'both') {
    console.log(chalk.bold('Tailwind:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(pattern.tailwind);
    console.log();
  }
}

