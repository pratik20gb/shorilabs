import chalk from 'chalk';
import { loadPatterns, loadButtons, loadCards, loadInputs, loadBadges, loadLoaders, loadAvatars, loadToggles, loadDividers } from '../utils/patterns';
import { Component, Button, InputStyle, Badge } from '../types';

const componentLoaders: Record<string, () => Promise<Component[]>> = {
  pattern: loadPatterns,
  patterns: loadPatterns,
  button: loadButtons,
  buttons: loadButtons,
  card: loadCards,
  cards: loadCards,
  input: loadInputs,
  inputs: loadInputs,
  badge: loadBadges,
  badges: loadBadges,
  loader: loadLoaders,
  loaders: loadLoaders,
  avatar: loadAvatars,
  avatars: loadAvatars,
  toggle: loadToggles,
  toggles: loadToggles,
  divider: loadDividers,
  dividers: loadDividers,
};

const componentEmojis: Record<string, string> = {
  pattern: '✨',
  patterns: '✨',
  button: '🔘',
  buttons: '🔘',
  card: '🃏',
  cards: '🃏',
  input: '📝',
  inputs: '📝',
  badge: '🏷️',
  badges: '🏷️',
  loader: '⏳',
  loaders: '⏳',
  avatar: '👤',
  avatars: '👤',
  toggle: '🔀',
  toggles: '🔀',
  divider: '➖',
  dividers: '➖',
};

export async function getPattern(componentId: string, options: { format?: string; type?: string }) {
  const componentType = (options.type?.toLowerCase() || 'pattern').replace(/s$/, '');
  const typeKey = componentType + (componentType === 'pattern' ? 's' : 's');
  
  const loader = componentLoaders[typeKey] || componentLoaders[componentType];
  
  if (!loader) {
    console.error(chalk.red(`❌ Unknown component type: ${componentType}`));
    console.log(chalk.gray(`\nAvailable types: pattern, button, card, input, badge, loader, avatar, toggle, divider`));
    process.exit(1);
  }
  
  const components = await loader();
  const component = components.find(c => c.id === componentId);

  if (!component) {
    const typeName = componentType === 'pattern' ? 'patterns' : componentType + 's';
    console.error(chalk.red(`❌ ${componentType.charAt(0).toUpperCase() + componentType.slice(1)} "${componentId}" not found`));
    console.log(chalk.gray(`\nUse "shorilabs list --type ${typeName}" to see all available ${typeName}`));
    process.exit(1);
  }

  const emoji = componentEmojis[typeKey] || componentEmojis[componentType] || '✨';
  console.log(chalk.bold.cyan(`\n${emoji} ${component.name}\n`));
  console.log(chalk.gray(`Category: ${component.category}`));
  
  if ('label' in component && component.label) {
    console.log(chalk.gray(`Label: "${component.label}"`));
  }
  
  if ('placeholder' in component && component.placeholder) {
    console.log(chalk.gray(`Placeholder: "${component.placeholder}"`));
  }
  
  if (component.isNew) {
    console.log(chalk.yellow('Status: NEW'));
  }
  console.log();

  const format = options.format?.toLowerCase() || 'both';

  if (format === 'css' || format === 'both') {
    console.log(chalk.bold('CSS:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(component.css);
    console.log();
  }

  if (format === 'tailwind' || format === 'both') {
    console.log(chalk.bold('Tailwind:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(component.tailwind);
    console.log();
  }
}

export async function getButton(buttonId: string, options: { format?: string }) {
  await getPattern(buttonId, { ...options, type: 'button' });
}
