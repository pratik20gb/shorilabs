import chalk from 'chalk';
import { loadPatterns } from '../utils/patterns';

export async function searchPatterns(query: string, options: { json?: boolean }) {
  const patterns = await loadPatterns();
  const searchQuery = query.toLowerCase();
  
  const results = patterns.filter(p => 
    p.name.toLowerCase().includes(searchQuery) ||
    p.id.toLowerCase().includes(searchQuery) ||
    p.category.toLowerCase().includes(searchQuery)
  );

  if (results.length === 0) {
    console.log(chalk.yellow(`\n🔍 No patterns found matching "${query}"\n`));
    return;
  }

  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  console.log(chalk.bold.cyan(`\n🔍 Search Results for "${query}" (${results.length} found)\n`));

  results.forEach(pattern => {
    const newBadge = pattern.isNew ? chalk.yellow(' [NEW]') : '';
    const categoryEmojis: Record<string, string> = {
      gradients: '🌈',
      geometric: '⬛',
      decorative: '💫',
      effects: '🎨',
    };
    const categoryEmoji = categoryEmojis[pattern.category] || '✨';

    console.log(
      `${categoryEmoji} ${chalk.cyan(pattern.id)} - ${chalk.bold(pattern.name)}${newBadge}`
    );
    console.log(chalk.gray(`   Category: ${pattern.category}`));
    console.log();
  });
}

