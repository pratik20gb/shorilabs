import { createContext, useContext, useState, ReactNode } from "react";
import { Pattern } from "@/data/patterns";

interface BackgroundPatternContextType {
  pattern: Pattern | null;
  setPattern: (pattern: Pattern | null) => void;
  getPatternStyle: () => React.CSSProperties;
}

const BackgroundPatternContext = createContext<BackgroundPatternContextType | undefined>(undefined);

export const BackgroundPatternProvider = ({ children }: { children: ReactNode }) => {
  const [pattern, setPattern] = useState<Pattern | null>(null);

  const getPatternStyle = (): React.CSSProperties => {
    if (!pattern) return {};
    
    const css = pattern.css.trim();
    const style: React.CSSProperties = {};

    // Handle multi-line CSS (like background-image with multiple values)
    // Split by semicolon first, then process each property
    const properties = css.split(';').filter(p => p.trim());
    
    properties.forEach((prop) => {
      const trimmed = prop.trim();
      if (!trimmed || trimmed.includes('@keyframes')) return;
      
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex === -1) return;
      
      const propName = trimmed.substring(0, colonIndex).trim();
      let propValue = trimmed.substring(colonIndex + 1).trim();
      
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
      } else {
        (style as Record<string, string>)[camelProp] = propValue;
      }
    });

    return style;
  };

  return (
    <BackgroundPatternContext.Provider value={{ pattern, setPattern, getPatternStyle }}>
      {children}
    </BackgroundPatternContext.Provider>
  );
};

export const useBackgroundPattern = () => {
  const context = useContext(BackgroundPatternContext);
  if (context === undefined) {
    throw new Error("useBackgroundPattern must be used within a BackgroundPatternProvider");
  }
  return context;
};

