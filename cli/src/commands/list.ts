import chalk from 'chalk';
import { loadPatterns, loadButtons } from '../utils/patterns';
import { PatternCategory, ButtonCategory } from '../types';

export async function listPatterns(options: { category?: string; json?: boolean; type?: string }) {
  const componentType = options.type?.toLowerCase() || 'pattern';
  
  if (componentType === 'button' || componentType === 'buttons') {
    await listButtons(options);
    return;
  }
  
  const patterns = await loadPatterns();

  let filtered = patterns;

  if (options.category) {
    const category = options.category.toLowerCase() as PatternCategory;
    filtered = patterns.filter(p => p.category === category);
  }

  if (options.json) {
    console.log(JSON.stringify(filtered, null, 2));
    return;
  }

  // Group by category
  const byCategory = filtered.reduce((acc, pattern) => {
    if (!acc[pattern.category]) {
      acc[pattern.category] = [];
    }
    acc[pattern.category].push(pattern);
    return acc;
  }, {} as Record<string, typeof patterns>);

  console.log(chalk.bold.cyan('\n📦 Available Patterns\n'));

  const categoryEmojis: Record<string, string> = {
    gradients: '🌈',
    geometric: '⬛',
    decorative: '💫',
    effects: '🎨',
  };

  Object.entries(byCategory).forEach(([category, categoryPatterns]) => {
    const emoji = categoryEmojis[category] || '✨';
    console.log(chalk.bold(`${emoji} ${category.toUpperCase()} (${categoryPatterns.length})`));
    categoryPatterns.forEach(pattern => {
      const newBadge = pattern.isNew ? chalk.yellow(' [NEW]') : '';
      console.log(`  • ${chalk.cyan(pattern.id)} - ${pattern.name}${newBadge}`);
    });
    console.log();
  });

  console.log(chalk.gray(`Total: ${filtered.length} patterns`));
  console.log(chalk.gray(`\nTip: Use --type buttons to list buttons`));
}

export async function listButtons(options: { category?: string; json?: boolean }) {
  const buttons = await loadButtons();

  let filtered = buttons;

  if (options.category) {
    const category = options.category.toLowerCase() as ButtonCategory;
    filtered = buttons.filter(b => b.category === category);
  }

  if (options.json) {
    console.log(JSON.stringify(filtered, null, 2));
    return;
  }

  // Group by category
  const byCategory = filtered.reduce((acc, button) => {
    if (!acc[button.category]) {
      acc[button.category] = [];
    }
    acc[button.category].push(button);
    return acc;
  }, {} as Record<string, typeof buttons>);

  console.log(chalk.bold.magenta('\n🔘 Available Buttons\n'));

  const categoryEmojis: Record<string, string> = {
    primary: '🔵',
    secondary: '⚪',
    outline: '⭕',
    ghost: '👻',
    animated: '🎬',
    '3d': '📦',
    neon: '💡',
  };

  Object.entries(byCategory).forEach(([category, categoryButtons]) => {
    const emoji = categoryEmojis[category] || '✨';
    console.log(chalk.bold(`${emoji} ${category.toUpperCase()} (${categoryButtons.length})`));
    categoryButtons.forEach(button => {
      const newBadge = button.isNew ? chalk.yellow(' [NEW]') : '';
      console.log(`  • ${chalk.magenta(button.id)} - ${button.name}${newBadge}`);
    });
    console.log();
  });

  console.log(chalk.gray(`Total: ${filtered.length} buttons`));
}
