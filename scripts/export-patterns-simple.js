// Simple script to export patterns - reads from built patterns if available
// This is a fallback that manually extracts patterns
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read patterns.ts file
const patternsPath = path.join(__dirname, '../src/data/patterns.ts');
const content = fs.readFileSync(patternsPath, 'utf-8');

// Extract patterns using a more robust approach
const patterns = [];
const patternBlocks = content.matchAll(/\{\s*id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",([\s\S]*?)\}/g);

for (const match of patternBlocks) {
  const fullMatch = match[0];
  const id = match[1];
  const name = match[2];
  const category = match[3];
  const rest = match[4];
  
  // Extract CSS
  const cssMatch = rest.match(/css:\s*`([^`]+)`/);
  const css = cssMatch ? cssMatch[1].trim() : '';
  
  // Extract Tailwind
  const tailwindMatch = rest.match(/tailwind:\s*`([^`]+)`/);
  const tailwind = tailwindMatch ? tailwindMatch[1].trim() : '';
  
  // Check for isNew
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

// Write to JSON
const outputPath = path.join(__dirname, '../cli/patterns.json');
fs.writeFileSync(outputPath, JSON.stringify(patterns, null, 2), 'utf-8');

console.log(`✅ Exported ${patterns.length} patterns to cli/patterns.json`);

