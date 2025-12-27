import chalk from 'chalk';
import { loadPatterns, loadButtons, loadCards, loadInputs, loadBadges, loadLoaders, loadAvatars, loadToggles, loadDividers } from '../utils/patterns';
import { Component } from '../types';

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

const categoryEmojis: Record<string, Record<string, string>> = {
  pattern: {
    gradients: '🌈',
    geometric: '⬛',
    decorative: '💫',
    effects: '🎨',
  },
  button: {
    primary: '🔵',
    secondary: '⚪',
    outline: '⭕',
    ghost: '👻',
    animated: '🎬',
    '3d': '📦',
    neon: '💡',
  },
  card: {
    minimal: '📄',
    elevated: '📊',
    glass: '🔮',
    gradient: '🌈',
    bordered: '📋',
    interactive: '🎯',
  },
  input: {
    default: '📝',
    outlined: '📄',
    filled: '📋',
    floating: '🎈',
    underlined: '➖',
    search: '🔍',
  },
  badge: {
    solid: '🔵',
    outline: '⭕',
    soft: '💙',
    pill: '💊',
    dot: '⚫',
    status: '🟢',
  },
  loader: {
    spinner: '🌀',
    dots: '⚫',
    bars: '📊',
    pulse: '💓',
    skeleton: '💀',
    progress: '📈',
  },
  avatar: {
    circle: '⭕',
    rounded: '▢',
    ring: '💍',
    status: '🟢',
    group: '👥',
    bordered: '📦',
  },
  toggle: {
    default: '🔀',
    ios: '🍎',
    material: '📱',
    pill: '💊',
    icon: '🎯',
    labeled: '🏷️',
  },
  divider: {
    solid: '─',
    dashed: '┄',
    gradient: '🌈',
    decorated: '✨',
    text: '📝',
    fade: '💫',
  },
};

const componentColors: Record<string, (text: string) => string> = {
  pattern: chalk.cyan,
  patterns: chalk.cyan,
  button: chalk.magenta,
  buttons: chalk.magenta,
  card: chalk.blue,
  cards: chalk.blue,
  input: chalk.green,
  inputs: chalk.green,
  badge: chalk.yellow,
  badges: chalk.yellow,
  loader: chalk.cyan,
  loaders: chalk.cyan,
  avatar: chalk.blue,
  avatars: chalk.blue,
  toggle: chalk.magenta,
  toggles: chalk.magenta,
  divider: chalk.gray,
  dividers: chalk.gray,
};

export async function listPatterns(options: { category?: string; json?: boolean; type?: string }) {
  const componentType = (options.type?.toLowerCase() || 'pattern').replace(/s$/, '');
  const typeKey = componentType + (componentType === 'pattern' ? 's' : 's');
  
  const loader = componentLoaders[typeKey] || componentLoaders[componentType];
  
  if (!loader) {
    console.error(chalk.red(`❌ Unknown component type: ${componentType}`));
    console.log(chalk.gray(`\nAvailable types: pattern, button, card, input, badge, loader, avatar, toggle, divider`));
    process.exit(1);
  }
  
  const components = await loader();
  let filtered = components;

  if (options.category) {
    const category = options.category.toLowerCase();
    filtered = components.filter(c => c.category === category);
  }

  if (options.json) {
    console.log(JSON.stringify(filtered, null, 2));
    return;
  }

  // Group by category
  const byCategory = filtered.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, Component[]>);

  const emoji = componentEmojis[typeKey] || componentEmojis[componentType] || '✨';
  const colorFn = componentColors[typeKey] || componentColors[componentType] || chalk.cyan;
  const typeName = componentType === 'pattern' ? 'Patterns' : componentType.charAt(0).toUpperCase() + componentType.slice(1) + 's';
  
  console.log(chalk.bold(colorFn(`\n${emoji} Available ${typeName}\n`)));

  const emojis = categoryEmojis[componentType] || {};

  Object.entries(byCategory).forEach(([category, categoryComponents]) => {
    const categoryEmoji = emojis[category] || '✨';
    console.log(chalk.bold(`${categoryEmoji} ${category.toUpperCase()} (${categoryComponents.length})`));
    categoryComponents.forEach(component => {
      const newBadge = component.isNew ? chalk.yellow(' [NEW]') : '';
      const idColor = colorFn(component.id);
      console.log(`  • ${idColor} - ${component.name}${newBadge}`);
    });
    console.log();
  });

  console.log(chalk.gray(`Total: ${filtered.length} ${typeName.toLowerCase()}`));
  console.log(chalk.gray(`\nTip: Use --type <type> to list other component types`));
}

export async function listButtons(options: { category?: string; json?: boolean }) {
  await listPatterns({ ...options, type: 'buttons' });
}
