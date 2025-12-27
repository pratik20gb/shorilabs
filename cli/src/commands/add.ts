import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as path from 'path';
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

const defaultFiles: Record<string, string> = {
  pattern: 'patterns.css',
  patterns: 'patterns.css',
  button: 'buttons.css',
  buttons: 'buttons.css',
  card: 'cards.css',
  cards: 'cards.css',
  input: 'inputs.css',
  inputs: 'inputs.css',
  badge: 'badges.css',
  badges: 'badges.css',
  loader: 'loaders.css',
  loaders: 'loaders.css',
  avatar: 'avatars.css',
  avatars: 'avatars.css',
  toggle: 'toggles.css',
  toggles: 'toggles.css',
  divider: 'dividers.css',
  dividers: 'dividers.css',
};

const componentPrefixes: Record<string, string> = {
  pattern: '',
  patterns: '',
  button: 'btn-',
  buttons: 'btn-',
  card: 'card-',
  cards: 'card-',
  input: 'input-',
  inputs: 'input-',
  badge: 'badge-',
  badges: 'badge-',
  loader: 'loader-',
  loaders: 'loader-',
  avatar: 'avatar-',
  avatars: 'avatar-',
  toggle: 'toggle-',
  toggles: 'toggle-',
  divider: 'divider-',
  dividers: 'divider-',
};

export async function addPattern(
  componentId: string,
  options: { file?: string; tailwind?: boolean; append?: boolean; type?: string }
) {
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

  const outputFile = options.file || defaultFiles[typeKey] || `${componentType}s.css`;
  const filePath = path.resolve(process.cwd(), outputFile);
  const prefix = componentPrefixes[typeKey] || componentPrefixes[componentType] || '';
  const className = prefix + component.id;
  
  const content = options.tailwind 
    ? `/* ${component.name} */\n.${className} {\n  @apply ${component.tailwind};\n}\n`
    : `/* ${component.name} */\n.${className} {\n${component.css}\n}\n`;

  try {
    if (options.append && await fs.pathExists(filePath)) {
      await fs.appendFile(filePath, `\n${content}`);
      console.log(chalk.green(`✅ ${componentType.charAt(0).toUpperCase() + componentType.slice(1)} "${component.name}" appended to ${outputFile}`));
    } else {
      await fs.writeFile(filePath, content);
      console.log(chalk.green(`✅ ${componentType.charAt(0).toUpperCase() + componentType.slice(1)} "${component.name}" added to ${outputFile}`));
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
  await addPattern(buttonId, { ...options, type: 'button' });
}
