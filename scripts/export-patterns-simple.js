// Script to export all components for CLI
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to extract components from a TypeScript file
function extractComponents(filePath, options = {}) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const components = [];
  
  // Match component blocks
  const regex = options.endPattern || /\{\s*id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",([\s\S]*?)\n  \}/g;
  const blocks = content.matchAll(regex);
  
  for (const match of blocks) {
    const fullMatch = match[0];
    const id = match[1];
    const name = match[2];
    const category = match[3];
    const rest = match[4];
    
    // Extract CSS (multi-line)
    const cssMatch = rest.match(/css:\s*`([\s\S]*?)`/);
    const css = cssMatch ? cssMatch[1].trim() : '';
    
    // Extract Tailwind
    const tailwindMatch = rest.match(/tailwind:\s*`([^`]+)`/);
    const tailwind = tailwindMatch ? tailwindMatch[1].trim() : '';
    
    const isNew = fullMatch.includes('isNew: true');
    
    // Extract optional fields
    const labelMatch = rest.match(/label:\s*"([^"]+)"/);
    const label = labelMatch ? labelMatch[1] : undefined;
    
    const placeholderMatch = rest.match(/placeholder:\s*"([^"]+)"/);
    const placeholder = placeholderMatch ? placeholderMatch[1] : undefined;
    
    if (id && name && category && css && tailwind) {
      const component = {
        id,
        name,
        category,
        css,
        tailwind,
        ...(label && { label }),
        ...(placeholder && { placeholder }),
        ...(isNew && { isNew: true })
      };
      components.push(component);
    }
  }
  
  return components;
}

// Export Patterns
const patternsPath = path.join(__dirname, '../src/data/patterns.ts');
const patterns = extractComponents(patternsPath);
const patternsOutputPath = path.join(__dirname, '../cli/patterns.json');
fs.writeFileSync(patternsOutputPath, JSON.stringify(patterns, null, 2), 'utf-8');
console.log(`✅ Exported ${patterns.length} patterns to cli/patterns.json`);

// Export Buttons
const buttonsPath = path.join(__dirname, '../src/data/buttons.ts');
const buttons = extractComponents(buttonsPath);
const buttonsOutputPath = path.join(__dirname, '../cli/buttons.json');
fs.writeFileSync(buttonsOutputPath, JSON.stringify(buttons, null, 2), 'utf-8');
console.log(`✅ Exported ${buttons.length} buttons to cli/buttons.json`);

// Export Cards
const cardsPath = path.join(__dirname, '../src/data/cards.ts');
const cards = extractComponents(cardsPath);
const cardsOutputPath = path.join(__dirname, '../cli/cards.json');
fs.writeFileSync(cardsOutputPath, JSON.stringify(cards, null, 2), 'utf-8');
console.log(`✅ Exported ${cards.length} cards to cli/cards.json`);

// Export Inputs
const inputsPath = path.join(__dirname, '../src/data/inputs.ts');
const inputs = extractComponents(inputsPath);
const inputsOutputPath = path.join(__dirname, '../cli/inputs.json');
fs.writeFileSync(inputsOutputPath, JSON.stringify(inputs, null, 2), 'utf-8');
console.log(`✅ Exported ${inputs.length} inputs to cli/inputs.json`);

// Export Badges
const badgesPath = path.join(__dirname, '../src/data/badges.ts');
const badges = extractComponents(badgesPath);
const badgesOutputPath = path.join(__dirname, '../cli/badges.json');
fs.writeFileSync(badgesOutputPath, JSON.stringify(badges, null, 2), 'utf-8');
console.log(`✅ Exported ${badges.length} badges to cli/badges.json`);

// Export Loaders
const loadersPath = path.join(__dirname, '../src/data/loaders.ts');
const loaders = extractComponents(loadersPath);
const loadersOutputPath = path.join(__dirname, '../cli/loaders.json');
fs.writeFileSync(loadersOutputPath, JSON.stringify(loaders, null, 2), 'utf-8');
console.log(`✅ Exported ${loaders.length} loaders to cli/loaders.json`);

// Export Avatars
const avatarsPath = path.join(__dirname, '../src/data/avatars.ts');
const avatars = extractComponents(avatarsPath);
const avatarsOutputPath = path.join(__dirname, '../cli/avatars.json');
fs.writeFileSync(avatarsOutputPath, JSON.stringify(avatars, null, 2), 'utf-8');
console.log(`✅ Exported ${avatars.length} avatars to cli/avatars.json`);

// Export Toggles
const togglesPath = path.join(__dirname, '../src/data/toggles.ts');
const toggles = extractComponents(togglesPath);
const togglesOutputPath = path.join(__dirname, '../cli/toggles.json');
fs.writeFileSync(togglesOutputPath, JSON.stringify(toggles, null, 2), 'utf-8');
console.log(`✅ Exported ${toggles.length} toggles to cli/toggles.json`);

// Export Dividers
const dividersPath = path.join(__dirname, '../src/data/dividers.ts');
const dividers = extractComponents(dividersPath);
const dividersOutputPath = path.join(__dirname, '../cli/dividers.json');
fs.writeFileSync(dividersOutputPath, JSON.stringify(dividers, null, 2), 'utf-8');
console.log(`✅ Exported ${dividers.length} dividers to cli/dividers.json`);

console.log('\n🎉 All components exported successfully!');
