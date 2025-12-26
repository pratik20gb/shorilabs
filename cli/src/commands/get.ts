import chalk from 'chalk';
import { loadPatterns, loadButtons } from '../utils/patterns';

export async function getPattern(componentId: string, options: { format?: string; type?: string }) {
  const componentType = options.type?.toLowerCase() || 'pattern';
  
  if (componentType === 'button' || componentType === 'buttons') {
    await getButton(componentId, options);
    return;
  }
  
  const patterns = await loadPatterns();
  const pattern = patterns.find(p => p.id === componentId);

  if (!pattern) {
    console.error(chalk.red(`❌ Pattern "${componentId}" not found`));
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

export async function getButton(buttonId: string, options: { format?: string }) {
  const buttons = await loadButtons();
  const button = buttons.find(b => b.id === buttonId);

  if (!button) {
    console.error(chalk.red(`❌ Button "${buttonId}" not found`));
    console.log(chalk.gray(`\nUse "shorilabs list --type buttons" to see all available buttons`));
    process.exit(1);
  }

  console.log(chalk.bold.magenta(`\n🔘 ${button.name}\n`));
  console.log(chalk.gray(`Category: ${button.category}`));
  if (button.label) {
    console.log(chalk.gray(`Label: "${button.label}"`));
  }
  if (button.isNew) {
    console.log(chalk.yellow('Status: NEW'));
  }
  console.log();

  const format = options.format?.toLowerCase() || 'both';

  if (format === 'css' || format === 'both') {
    console.log(chalk.bold('CSS:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(button.css);
    console.log();
  }

  if (format === 'tailwind' || format === 'both') {
    console.log(chalk.bold('Tailwind:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(button.tailwind);
    console.log();
  }
}
