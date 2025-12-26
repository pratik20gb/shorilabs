import type { CSSProperties } from "react";

export type PatternBrightness = "dark" | "light" | "auto";

/**
 * Extracts hex colors from CSS string
 */
const extractHexColors = (css: string): string[] => {
  const hexRegex = /#([0-9a-fA-F]{3,8})\b/g;
  const matches = css.match(hexRegex) || [];
  return matches;
};

/**
 * Converts hex color to RGB values
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove the hash
  let h = hex.replace("#", "");
  
  // Handle short hex (e.g., #fff)
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  
  // Handle hex with alpha (e.g., #ffffff80)
  if (h.length === 8) {
    h = h.slice(0, 6);
  }
  
  if (h.length !== 6) return null;
  
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  
  return { r, g, b };
};

/**
 * Calculates relative luminance of a color (0-1)
 * Using WCAG formula for perceived brightness
 */
const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Analyzes pattern CSS and determines if it's predominantly dark or light
 */
export const getPatternBrightness = (css: string): PatternBrightness => {
  if (!css) return "auto";
  
  const colors = extractHexColors(css);
  if (colors.length === 0) return "auto";
  
  let totalLuminance = 0;
  let validColors = 0;
  
  // Weight the first colors more heavily (usually background-color)
  colors.forEach((hex, index) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      const weight = index === 0 ? 3 : 1; // First color weighs 3x
      totalLuminance += getLuminance(rgb.r, rgb.g, rgb.b) * weight;
      validColors += weight;
    }
  });
  
  if (validColors === 0) return "auto";
  
  const avgLuminance = totalLuminance / validColors;
  
  // Threshold: below 0.4 is dark, above is light
  // Using 0.4 because many dark themes have some light accents
  return avgLuminance < 0.4 ? "dark" : "light";
};

/**
 * Gets adaptive text color class based on pattern brightness
 */
export const getAdaptiveTextClass = (brightness: PatternBrightness): string => {
  switch (brightness) {
    case "dark":
      return "text-white";
    case "light":
      return "text-gray-900";
    default:
      return "text-foreground";
  }
};

/**
 * Gets adaptive muted text color class based on pattern brightness
 */
export const getAdaptiveMutedClass = (brightness: PatternBrightness): string => {
  switch (brightness) {
    case "dark":
      return "text-white/70";
    case "light":
      return "text-gray-600";
    default:
      return "text-muted-foreground";
  }
};

/**
 * Gets adaptive background class for UI elements based on pattern brightness
 */
export const getAdaptiveBgClass = (brightness: PatternBrightness): string => {
  switch (brightness) {
    case "dark":
      return "bg-white/10 hover:bg-white/20 border-white/20";
    case "light":
      return "bg-black/5 hover:bg-black/10 border-black/10";
    default:
      return "bg-secondary/50 hover:bg-secondary border-border/50";
  }
};

/**
 * Gets adaptive card background class based on pattern brightness
 */
export const getAdaptiveCardClass = (brightness: PatternBrightness): string => {
  switch (brightness) {
    case "dark":
      return "bg-black/40 backdrop-blur-lg border-white/10";
    case "light":
      return "bg-white/80 backdrop-blur-lg border-black/10";
    default:
      return "bg-background/95 backdrop-blur-lg border-border/50";
  }
};

/**
 * Parses CSS string into React CSSProperties object
 * Handles multi-line CSS properties like background-image
 */
export const parsePatternCSS = (css: string): CSSProperties => {
  if (!css) return {};
  
  const trimmed = css.trim();
  const style: CSSProperties = {};

  // Handle multi-line CSS (like background-image with multiple values)
  // Split by semicolon first, then process each property
  const properties = trimmed.split(';').filter(p => p.trim());
  
  properties.forEach((prop) => {
    const trimmedProp = prop.trim();
    if (!trimmedProp || trimmedProp.includes('@keyframes')) return;
    
    const colonIndex = trimmedProp.indexOf(':');
    if (colonIndex === -1) return;
    
    const propName = trimmedProp.substring(0, colonIndex).trim();
    let propValue = trimmedProp.substring(colonIndex + 1).trim();
    
    // Remove trailing semicolon if present
    propValue = propValue.replace(/;$/, '').trim();
    
    // Handle multi-line values (like background-image)
    if (propValue.includes('\n')) {
      propValue = propValue.split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .join(' ');
    }
    
    const camelProp = propName.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
    
    // Special handling for background properties
    if (propName === 'background') {
      style.background = propValue;
    } else if (propName === 'background-color') {
      style.backgroundColor = propValue;
    } else if (propName === 'background-image') {
      style.backgroundImage = propValue;
    } else if (propName === 'background-size') {
      style.backgroundSize = propValue;
    } else if (propName === 'background-position') {
      style.backgroundPosition = propValue;
    } else if (propName === 'background-repeat') {
      style.backgroundRepeat = propValue;
    } else {
      (style as Record<string, string>)[camelProp] = propValue;
    }
  });

  return style;
};

