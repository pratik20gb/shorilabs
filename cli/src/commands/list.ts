import chalk from 'chalk';
import { loadPatterns } from '../utils/patterns';
import { PatternCategory } from '../types';

export async function listPatterns(options: { category?: string; json?: boolean }) {
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
}

