import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as path from 'path';
import { loadPatterns } from '../utils/patterns';

export async function addPattern(
  patternId: string,
  options: { file?: string; tailwind?: boolean; append?: boolean }
) {
  const patterns = await loadPatterns();
  const pattern = patterns.find(p => p.id === patternId);

  if (!pattern) {
    console.error(chalk.red(`❌ Pattern "${patternId}" not found`));
    console.log(chalk.gray(`\nUse "shorilabs list" to see all available patterns`));
    process.exit(1);
  }

  const outputFile = options.file || 'patterns.css';
  const filePath = path.resolve(process.cwd(), outputFile);
  const content = options.tailwind 
    ? `/* ${pattern.name} */\n.${pattern.id} {\n  ${pattern.tailwind}\n}\n`
    : `/* ${pattern.name} */\n.${pattern.id} {\n${pattern.css}\n}\n`;

  try {
    if (options.append && await fs.pathExists(filePath)) {
      await fs.appendFile(filePath, `\n${content}`);
      console.log(chalk.green(`✅ Pattern "${pattern.name}" appended to ${outputFile}`));
    } else {
      await fs.writeFile(filePath, content);
      console.log(chalk.green(`✅ Pattern "${pattern.name}" added to ${outputFile}`));
    }

    console.log(chalk.gray(`\nFile: ${filePath}`));
    console.log(chalk.gray(`Format: ${options.tailwind ? 'Tailwind' : 'CSS'}`));
  } catch (error) {
    console.error(chalk.red(`❌ Error writing file: ${error}`));
    process.exit(1);
  }
}

