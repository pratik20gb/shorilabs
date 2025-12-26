import * as fs from 'fs-extra';
import * as path from 'path';
import { Pattern, Button } from '../types';

let patternsCache: Pattern[] | null = null;
let buttonsCache: Button[] | null = null;

export async function loadPatterns(): Promise<Pattern[]> {
  if (patternsCache) {
    return patternsCache;
  }

  try {
    // Try to load from patterns.json in CLI package
    const patternsPath = path.join(__dirname, '../../patterns.json');
    
    if (await fs.pathExists(patternsPath)) {
      const data = await fs.readJson(patternsPath);
      patternsCache = data;
      return data;
    }

    // Fallback: try to load from parent project's exported JSON
    const parentPatternsPath = path.join(__dirname, '../../../cli/patterns.json');
    if (await fs.pathExists(parentPatternsPath)) {
      const data = await fs.readJson(parentPatternsPath);
      patternsCache = data;
      return data;
    }

    throw new Error('Patterns file not found. Please run "npm run export-patterns" first.');
  } catch (error) {
    console.error('Error loading patterns:', error);
    return [];
  }
}

export async function loadButtons(): Promise<Button[]> {
  if (buttonsCache) {
    return buttonsCache;
  }

  try {
    // Try to load from buttons.json in CLI package
    const buttonsPath = path.join(__dirname, '../../buttons.json');
    
    if (await fs.pathExists(buttonsPath)) {
      const data = await fs.readJson(buttonsPath);
      buttonsCache = data;
      return data;
    }

    // Fallback: try to load from parent project's exported JSON
    const parentButtonsPath = path.join(__dirname, '../../../cli/buttons.json');
    if (await fs.pathExists(parentButtonsPath)) {
      const data = await fs.readJson(parentButtonsPath);
      buttonsCache = data;
      return data;
    }

    throw new Error('Buttons file not found. Please run "npm run export-patterns" first.');
  } catch (error) {
    console.error('Error loading buttons:', error);
    return [];
  }
}
