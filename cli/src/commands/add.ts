import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as path from 'path';
import { loadPatterns, loadButtons } from '../utils/patterns';

export async function addPattern(
  componentId: string,
  options: { file?: string; tailwind?: boolean; append?: boolean; type?: string }
) {
  const componentType = options.type?.toLowerCase() || 'pattern';
  
  if (componentType === 'button' || componentType === 'buttons') {
    await addButton(componentId, options);
    return;
  }
  
  const patterns = await loadPatterns();
  const pattern = patterns.find(p => p.id === componentId);

  if (!pattern) {
    console.error(chalk.red(`❌ Pattern "${componentId}" not found`));
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

export async function addButton(
  buttonId: string,
  options: { file?: string; tailwind?: boolean; append?: boolean }
) {
  const buttons = await loadButtons();
  const button = buttons.find(b => b.id === buttonId);

  if (!button) {
    console.error(chalk.red(`❌ Button "${buttonId}" not found`));
    console.log(chalk.gray(`\nUse "shorilabs list --type buttons" to see all available buttons`));
    process.exit(1);
  }

  const outputFile = options.file || 'buttons.css';
  const filePath = path.resolve(process.cwd(), outputFile);
  const content = options.tailwind 
    ? `/* ${button.name} */\n.btn-${button.id} {\n  @apply ${button.tailwind};\n}\n`
    : `/* ${button.name} */\n.btn-${button.id} {\n${button.css}\n}\n`;

  try {
    if (options.append && await fs.pathExists(filePath)) {
      await fs.appendFile(filePath, `\n${content}`);
      console.log(chalk.green(`✅ Button "${button.name}" appended to ${outputFile}`));
    } else {
      await fs.writeFile(filePath, content);
      console.log(chalk.green(`✅ Button "${button.name}" added to ${outputFile}`));
    }

    console.log(chalk.gray(`\nFile: ${filePath}`));
    console.log(chalk.gray(`Format: ${options.tailwind ? 'Tailwind' : 'CSS'}`));
  } catch (error) {
    console.error(chalk.red(`❌ Error writing file: ${error}`));
    process.exit(1);
  }
}
