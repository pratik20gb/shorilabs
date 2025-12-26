import chalk from 'chalk';
import { loadPatterns, loadButtons } from '../utils/patterns';

export async function searchPatterns(query: string, options: { json?: boolean; type?: string }) {
  const componentType = options.type?.toLowerCase() || 'all';
  const searchQuery = query.toLowerCase();
  
  const results: { patterns: any[]; buttons: any[] } = { patterns: [], buttons: [] };
  
  // Search patterns
  if (componentType === 'all' || componentType === 'pattern' || componentType === 'patterns') {
    const patterns = await loadPatterns();
    results.patterns = patterns.filter(p => 
      p.name.toLowerCase().includes(searchQuery) ||
      p.id.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    );
  }
  
  // Search buttons
  if (componentType === 'all' || componentType === 'button' || componentType === 'buttons') {
    const buttons = await loadButtons();
    results.buttons = buttons.filter(b => 
      b.name.toLowerCase().includes(searchQuery) ||
      b.id.toLowerCase().includes(searchQuery) ||
      b.category.toLowerCase().includes(searchQuery)
    );
  }

  const totalResults = results.patterns.length + results.buttons.length;

  if (totalResults === 0) {
    console.log(chalk.yellow(`\n🔍 No components found matching "${query}"\n`));
    return;
  }

  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  console.log(chalk.bold.cyan(`\n🔍 Search Results for "${query}" (${totalResults} found)\n`));

  // Display patterns
  if (results.patterns.length > 0) {
    console.log(chalk.bold.cyan(`📦 Patterns (${results.patterns.length})`));
    console.log();
    
    const categoryEmojis: Record<string, string> = {
      gradients: '🌈',
      geometric: '⬛',
      decorative: '💫',
      effects: '🎨',
    };
    
    results.patterns.forEach(pattern => {
      const newBadge = pattern.isNew ? chalk.yellow(' [NEW]') : '';
      const categoryEmoji = categoryEmojis[pattern.category] || '✨';
      console.log(
        `  ${categoryEmoji} ${chalk.cyan(pattern.id)} - ${chalk.bold(pattern.name)}${newBadge}`
      );
      console.log(chalk.gray(`     Category: ${pattern.category}`));
    });
    console.log();
  }
  
  // Display buttons
  if (results.buttons.length > 0) {
    console.log(chalk.bold.magenta(`🔘 Buttons (${results.buttons.length})`));
    console.log();
    
    const categoryEmojis: Record<string, string> = {
      primary: '🔵',
      secondary: '⚪',
      outline: '⭕',
      ghost: '👻',
      animated: '🎬',
      '3d': '📦',
      neon: '💡',
    };
    
    results.buttons.forEach(button => {
      const newBadge = button.isNew ? chalk.yellow(' [NEW]') : '';
      const categoryEmoji = categoryEmojis[button.category] || '✨';
      console.log(
        `  ${categoryEmoji} ${chalk.magenta(button.id)} - ${chalk.bold(button.name)}${newBadge}`
      );
      console.log(chalk.gray(`     Category: ${button.category}`));
    });
    console.log();
  }
}
