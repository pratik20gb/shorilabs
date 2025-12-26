import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Pattern } from "@/data/patterns";
import { 
  parsePatternCSS, 
  getPatternBrightness, 
  PatternBrightness,
  getAdaptiveTextClass,
  getAdaptiveMutedClass,
  getAdaptiveBgClass,
  getAdaptiveCardClass
} from "@/lib/patternUtils";

interface BackgroundPatternContextType {
  pattern: Pattern | null;
  setPattern: (pattern: Pattern | null) => void;
  getPatternStyle: () => React.CSSProperties;
  brightness: PatternBrightness;
  isPreviewActive: boolean;
  // Adaptive class helpers
  textClass: string;
  mutedClass: string;
  bgClass: string;
  cardClass: string;
}

const BackgroundPatternContext = createContext<BackgroundPatternContextType | undefined>(undefined);

export const BackgroundPatternProvider = ({ children }: { children: ReactNode }) => {
  const [pattern, setPattern] = useState<Pattern | null>(null);

  const getPatternStyle = (): React.CSSProperties => {
    if (!pattern) return {};
    return parsePatternCSS(pattern.css);
  };

  // Memoize brightness calculation
  const brightness = useMemo<PatternBrightness>(() => {
    if (!pattern) return "auto";
    return getPatternBrightness(pattern.css);
  }, [pattern]);

  // Memoize adaptive classes
  const adaptiveClasses = useMemo(() => ({
    textClass: getAdaptiveTextClass(brightness),
    mutedClass: getAdaptiveMutedClass(brightness),
    bgClass: getAdaptiveBgClass(brightness),
    cardClass: getAdaptiveCardClass(brightness),
  }), [brightness]);

  const isPreviewActive = pattern !== null;

  return (
    <BackgroundPatternContext.Provider 
      value={{ 
        pattern, 
        setPattern, 
        getPatternStyle, 
        brightness,
        isPreviewActive,
        ...adaptiveClasses
      }}
    >
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
