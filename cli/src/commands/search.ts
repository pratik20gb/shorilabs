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

export async function searchPatterns(query: string, options: { json?: boolean; type?: string }) {
  const componentType = (options.type?.toLowerCase() || 'all').replace(/s$/, '');
  const searchQuery = query.toLowerCase();
  
  const results: Record<string, Component[]> = {};
  const typesToSearch = componentType === 'all' 
    ? ['pattern', 'button', 'card', 'input', 'badge', 'loader', 'avatar', 'toggle', 'divider']
    : [componentType];
  
  for (const type of typesToSearch) {
    const typeKey = type + (type === 'pattern' ? 's' : 's');
    const loader = componentLoaders[typeKey] || componentLoaders[type];
    
    if (loader) {
      const components = await loader();
      const filtered = components.filter(c => 
        c.name.toLowerCase().includes(searchQuery) ||
        c.id.toLowerCase().includes(searchQuery) ||
        c.category.toLowerCase().includes(searchQuery)
      );
      
      if (filtered.length > 0) {
        results[typeKey] = filtered;
      }
    }
  }

  const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

  if (totalResults === 0) {
    console.log(chalk.yellow(`\n🔍 No components found matching "${query}"\n`));
    return;
  }

  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  console.log(chalk.bold.cyan(`\n🔍 Search Results for "${query}" (${totalResults} found)\n`));

  // Display results by type
  Object.entries(results).forEach(([typeKey, components]) => {
    const type = typeKey.replace(/s$/, '');
    const emoji = componentEmojis[typeKey] || componentEmojis[type] || '✨';
    const colorFn = componentColors[typeKey] || componentColors[type] || chalk.cyan;
    const typeName = type === 'pattern' ? 'Patterns' : type.charAt(0).toUpperCase() + type.slice(1) + 's';
    const emojis = categoryEmojis[type] || {};
    
    console.log(chalk.bold(colorFn(`${emoji} ${typeName} (${components.length})`)));
    console.log();
    
    components.forEach(component => {
      const newBadge = component.isNew ? chalk.yellow(' [NEW]') : '';
      const categoryEmoji = emojis[component.category] || '✨';
      const idColor = colorFn(component.id);
      console.log(
        `  ${categoryEmoji} ${idColor} - ${chalk.bold(component.name)}${newBadge}`
      );
      console.log(chalk.gray(`     Category: ${component.category}`));
    });
    console.log();
  });
}
