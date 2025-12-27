import * as fs from 'fs-extra';
import * as path from 'path';
import { Pattern, Button, Card, InputStyle, Badge, Loader, Avatar, Toggle, Divider } from '../types';

let patternsCache: Pattern[] | null = null;
let buttonsCache: Button[] | null = null;
let cardsCache: Card[] | null = null;
let inputsCache: InputStyle[] | null = null;
let badgesCache: Badge[] | null = null;
let loadersCache: Loader[] | null = null;
let avatarsCache: Avatar[] | null = null;
let togglesCache: Toggle[] | null = null;
let dividersCache: Divider[] | null = null;

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

export async function loadCards(): Promise<Card[]> {
  if (cardsCache) {
    return cardsCache;
  }

  try {
    const cardsPath = path.join(__dirname, '../../cards.json');
    if (await fs.pathExists(cardsPath)) {
      const data = await fs.readJson(cardsPath);
      cardsCache = data;
      return data;
    }

    const parentCardsPath = path.join(__dirname, '../../../cli/cards.json');
    if (await fs.pathExists(parentCardsPath)) {
      const data = await fs.readJson(parentCardsPath);
      cardsCache = data;
      return data;
    }

    throw new Error('Cards file not found. Please run "npm run export-patterns" first.');
  } catch (error) {
    console.error('Error loading cards:', error);
    return [];
  }
}

export async function loadInputs(): Promise<InputStyle[]> {
  if (inputsCache) {
    return inputsCache;
  }

  try {
    const inputsPath = path.join(__dirname, '../../inputs.json');
    if (await fs.pathExists(inputsPath)) {
      const data = await fs.readJson(inputsPath);
      inputsCache = data;
      return data;
    }

    const parentInputsPath = path.join(__dirname, '../../../cli/inputs.json');
    if (await fs.pathExists(parentInputsPath)) {
      const data = await fs.readJson(parentInputsPath);
      inputsCache = data;
      return data;
    }

    throw new Error('Inputs file not found. Please run "npm run export-patterns" first.');
  } catch (error) {
    console.error('Error loading inputs:', error);
    return [];
  }
}

export async function loadBadges(): Promise<Badge[]> {
  if (badgesCache) {
    return badgesCache;
  }

  try {
    const badgesPath = path.join(__dirname, '../../badges.json');
    if (await fs.pathExists(badgesPath)) {
      const data = await fs.readJson(badgesPath);
      badgesCache = data;
      return data;
    }

    const parentBadgesPath = path.join(__dirname, '../../../cli/badges.json');
    if (await fs.pathExists(parentBadgesPath)) {
      const data = await fs.readJson(parentBadgesPath);
      badgesCache = data;
      return data;
    }

    throw new Error('Badges file not found. Please run "npm run export-patterns" first.');
  } catch (error) {
    console.error('Error loading badges:', error);
    return [];
  }
}

export async function loadLoaders(): Promise<Loader[]> {
  if (loadersCache) {
    return loadersCache;
  }

  try {
    const loadersPath = path.join(__dirname, '../../loaders.json');
    if (await fs.pathExists(loadersPath)) {
      const data = await fs.readJson(loadersPath);
      loadersCache = data;
      return data;
    }

    const parentLoadersPath = path.join(__dirname, '../../../cli/loaders.json');
    if (await fs.pathExists(parentLoadersPath)) {
      const data = await fs.readJson(parentLoadersPath);
      loadersCache = data;
      return data;
    }

    throw new Error('Loaders file not found. Please run "npm run export-patterns" first.');
  } catch (error) {
    console.error('Error loading loaders:', error);
    return [];
  }
}

export async function loadAvatars(): Promise<Avatar[]> {
  if (avatarsCache) {
    return avatarsCache;
  }

  try {
    const avatarsPath = path.join(__dirname, '../../avatars.json');
    if (await fs.pathExists(avatarsPath)) {
      const data = await fs.readJson(avatarsPath);
      avatarsCache = data;
      return data;
    }

    const parentAvatarsPath = path.join(__dirname, '../../../cli/avatars.json');
    if (await fs.pathExists(parentAvatarsPath)) {
      const data = await fs.readJson(parentAvatarsPath);
      avatarsCache = data;
      return data;
    }

    throw new Error('Avatars file not found. Please run "npm run export-patterns" first.');
  } catch (error) {
    console.error('Error loading avatars:', error);
    return [];
  }
}

export async function loadToggles(): Promise<Toggle[]> {
  if (togglesCache) {
    return togglesCache;
  }

  try {
    const togglesPath = path.join(__dirname, '../../toggles.json');
    if (await fs.pathExists(togglesPath)) {
      const data = await fs.readJson(togglesPath);
      togglesCache = data;
      return data;
    }

    const parentTogglesPath = path.join(__dirname, '../../../cli/toggles.json');
    if (await fs.pathExists(parentTogglesPath)) {
      const data = await fs.readJson(parentTogglesPath);
      togglesCache = data;
      return data;
    }

    throw new Error('Toggles file not found. Please run "npm run export-patterns" first.');
  } catch (error) {
    console.error('Error loading toggles:', error);
    return [];
  }
}

export async function loadDividers(): Promise<Divider[]> {
  if (dividersCache) {
    return dividersCache;
  }

  try {
    const dividersPath = path.join(__dirname, '../../dividers.json');
    if (await fs.pathExists(dividersPath)) {
      const data = await fs.readJson(dividersPath);
      dividersCache = data;
      return data;
    }

    const parentDividersPath = path.join(__dirname, '../../../cli/dividers.json');
    if (await fs.pathExists(parentDividersPath)) {
      const data = await fs.readJson(parentDividersPath);
      dividersCache = data;
      return data;
    }

    throw new Error('Dividers file not found. Please run "npm run export-patterns" first.');
  } catch (error) {
    console.error('Error loading dividers:', error);
    return [];
  }
}
