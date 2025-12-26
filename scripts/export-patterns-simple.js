// Script to export patterns and buttons for CLI
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export Patterns
const patternsPath = path.join(__dirname, '../src/data/patterns.ts');
const patternsContent = fs.readFileSync(patternsPath, 'utf-8');

const patterns = [];
const patternBlocks = patternsContent.matchAll(/\{\s*id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",([\s\S]*?)\}/g);

for (const match of patternBlocks) {
  const fullMatch = match[0];
  const id = match[1];
  const name = match[2];
  const category = match[3];
  const rest = match[4];
  
  const cssMatch = rest.match(/css:\s*`([^`]+)`/);
  const css = cssMatch ? cssMatch[1].trim() : '';
  
  const tailwindMatch = rest.match(/tailwind:\s*`([^`]+)`/);
  const tailwind = tailwindMatch ? tailwindMatch[1].trim() : '';
  
  const isNew = fullMatch.includes('isNew: true');
  
  if (id && name && category && css && tailwind) {
    patterns.push({
      id,
      name,
      category,
      css,
      tailwind,
      ...(isNew && { isNew: true })
    });
  }
}

const patternsOutputPath = path.join(__dirname, '../cli/patterns.json');
fs.writeFileSync(patternsOutputPath, JSON.stringify(patterns, null, 2), 'utf-8');
console.log(`✅ Exported ${patterns.length} patterns to cli/patterns.json`);

// Export Buttons
const buttonsPath = path.join(__dirname, '../src/data/buttons.ts');
const buttonsContent = fs.readFileSync(buttonsPath, 'utf-8');

const buttons = [];
const buttonBlocks = buttonsContent.matchAll(/\{\s*id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",([\s\S]*?)\n  \}/g);

for (const match of buttonBlocks) {
  const fullMatch = match[0];
  const id = match[1];
  const name = match[2];
  const category = match[3];
  const rest = match[4];
  
  // Extract label
  const labelMatch = rest.match(/label:\s*"([^"]+)"/);
  const label = labelMatch ? labelMatch[1] : undefined;
  
  // Extract CSS (multi-line)
  const cssMatch = rest.match(/css:\s*`([\s\S]*?)`/);
  const css = cssMatch ? cssMatch[1].trim() : '';
  
  // Extract Tailwind
  const tailwindMatch = rest.match(/tailwind:\s*`([^`]+)`/);
  const tailwind = tailwindMatch ? tailwindMatch[1].trim() : '';
  
  const isNew = fullMatch.includes('isNew: true');
  
  if (id && name && category && css && tailwind) {
    buttons.push({
      id,
      name,
      category,
      css,
      tailwind,
      ...(label && { label }),
      ...(isNew && { isNew: true })
    });
  }
}

const buttonsOutputPath = path.join(__dirname, '../cli/buttons.json');
fs.writeFileSync(buttonsOutputPath, JSON.stringify(buttons, null, 2), 'utf-8');
console.log(`✅ Exported ${buttons.length} buttons to cli/buttons.json`);
