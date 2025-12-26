import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { patterns } from "@/data/patterns";
import { buttons } from "@/data/buttons";
import { PatternCard } from "./PatternCard";
import { PatternPreviewModal } from "./PatternPreviewModal";
import { PatternSkeleton } from "./PatternSkeleton";
import { Pattern } from "@/data/patterns";
import { Button } from "@/data/buttons";
import { cn } from "@/lib/utils";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";
import { Copy, Check, Heart, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface HeroSectionProps {
  onNavigate: (view: "patterns" | "buttons") => void;
}

// Minimal ButtonCard for hero section with adaptive styling
const HeroButtonCard = ({ 
  button, 
  isFavorite, 
  onToggleFavorite,
  isPreviewActive,
  brightness
}: { 
  button: Button; 
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isPreviewActive: boolean;
  brightness: "dark" | "light" | "auto";
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(button.css);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getButtonStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};
    const lines = button.css.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('@') || trimmed.startsWith('}')) return;
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex === -1) return;
      const prop = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim().replace(/;$/, '');
      const camelProp = prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      (style as Record<string, string>)[camelProp] = value;
    });
    return style;
  };

  return (
    <div className="group relative cursor-pointer">
      <div className={cn(
        "aspect-square rounded-lg overflow-hidden border flex items-center justify-center transition-all duration-200 hover:shadow-md p-4",
        isPreviewActive
          ? brightness === "dark"
            ? "border-white/20 bg-white/5"
            : "border-black/10 bg-black/5"
          : "border-border bg-muted/30"
      )}>
        <button style={getButtonStyle()} className="pointer-events-none scale-90">
          {button.label || "Button"}
        </button>

        {button.isNew && (
          <div className={cn(
            "absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-medium",
            isPreviewActive
              ? brightness === "dark"
                ? "bg-white text-black"
                : "bg-gray-900 text-white"
              : "bg-foreground text-background"
          )}>
            New
          </div>
        )}

        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col justify-between p-3",
          isPreviewActive
            ? brightness === "dark"
              ? "bg-black/90"
              : "bg-white/95"
            : "bg-background/95"
        )}>
          <div>
            <p className={cn(
              "text-sm font-medium",
              isPreviewActive
                ? brightness === "dark" ? "text-white" : "text-gray-900"
                : "text-foreground"
            )}>{button.name}</p>
            <p className={cn(
              "text-xs capitalize",
              isPreviewActive
                ? brightness === "dark" ? "text-white/60" : "text-gray-500"
                : "text-muted-foreground"
            )}>{button.category}</p>
          </div>
          
          <div className="flex gap-1 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(button.id);
              }}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                isPreviewActive
                  ? brightness === "dark"
                    ? "bg-white/10 hover:bg-white/20"
                    : "bg-black/5 hover:bg-black/10"
                  : "bg-muted hover:bg-muted/80",
                isFavorite ? "text-red-500" : isPreviewActive
                  ? brightness === "dark" ? "text-white/60" : "text-gray-500"
                  : "text-muted-foreground"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5", isFavorite && "fill-current")} />
            </button>
            <button
              onClick={copyToClipboard}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                isPreviewActive
                  ? brightness === "dark"
                    ? "bg-white/10 hover:bg-white/20 text-white/60"
                    : "bg-black/5 hover:bg-black/10 text-gray-500"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              )}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Get a mixed selection of patterns from all categories
const getMixedPatterns = () => {
  const categories = ["gradients", "geometric", "decorative", "effects"];
  const mixed: Pattern[] = [];
  
  // Get patterns from each category in rotation
  const maxPerCategory = Math.ceil(16 / categories.length);
  categories.forEach(cat => {
    const categoryPatterns = patterns.filter(p => p.category === cat);
    mixed.push(...categoryPatterns.slice(0, maxPerCategory));
  });
  
  // Shuffle the mixed array
  for (let i = mixed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixed[i], mixed[j]] = [mixed[j], mixed[i]];
  }
  
  return mixed.slice(0, 16);
};

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [patternFavorites, setPatternFavorites] = useState<string[]>([]);
  const [buttonFavorites, setButtonFavorites] = useState<string[]>([]);
  const [mixedPatterns, setMixedPatterns] = useState<Pattern[]>([]);
  const { isPreviewActive, textClass, mutedClass, brightness } = useBackgroundPattern();

  useEffect(() => {
    const savedPatterns = localStorage.getItem("shorilabs-favorites");
    const savedButtons = localStorage.getItem("shorilabs-button-favorites");
    if (savedPatterns) setPatternFavorites(JSON.parse(savedPatterns));
    if (savedButtons) setButtonFavorites(JSON.parse(savedButtons));
    setMixedPatterns(getMixedPatterns());
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  const togglePatternFavorite = (id: string) => {
    setPatternFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem("shorilabs-favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleButtonFavorite = (id: string) => {
    setButtonFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem("shorilabs-button-favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <section className="relative z-10">
      {/* Hero */}
      <div className="container mx-auto px-4 md:px-6 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight",
            isPreviewActive ? textClass : "text-foreground"
          )}>
            Stop building from scratch.
          </h1>
          <p className={cn(
            "mt-6 text-lg md:text-xl",
            isPreviewActive ? mutedClass : "text-muted-foreground"
          )}>
            Beautify your website within minutes.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate("patterns")}
              className={cn(
                "w-full sm:w-auto px-8 py-3 rounded-md text-sm font-medium transition-all",
                isPreviewActive
                  ? brightness === "dark"
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-foreground text-background hover:bg-foreground/90"
              )}
            >
              Browse Patterns
            </button>
            <button
              onClick={() => onNavigate("buttons")}
              className={cn(
                "w-full sm:w-auto px-8 py-3 rounded-md text-sm font-medium transition-all border",
                isPreviewActive
                  ? brightness === "dark"
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-gray-400 text-gray-900 hover:bg-gray-100"
                  : "border-border text-foreground hover:bg-accent"
              )}
            >
              Browse Buttons
            </button>
          </div>
        </motion.div>
      </div>

      {/* Patterns Section */}
      <div className={cn(
        "py-12 border-t",
        isPreviewActive
          ? brightness === "dark" ? "border-white/10" : "border-black/10"
          : "border-border"
      )}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={cn(
                "text-xl font-semibold",
                isPreviewActive ? textClass : "text-foreground"
              )}>
                Patterns
              </h2>
              <p className={cn(
                "text-sm mt-1",
                isPreviewActive ? mutedClass : "text-muted-foreground"
              )}>
                Beautiful background patterns for your designs
              </p>
            </div>
            <button
              onClick={() => onNavigate("patterns")}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors",
                isPreviewActive 
                  ? brightness === "dark" ? "text-white/70 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {isLoading ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex-shrink-0 w-48 md:w-56">
                  <PatternSkeleton index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden -mx-4 md:-mx-6">
              <div className="flex gap-4 animate-infinite-scroll hover:pause-animation px-4 md:px-6">
                {mixedPatterns.map((pattern) => (
                  <div
                    key={`pattern-1-${pattern.id}`}
                    className="flex-shrink-0 w-48 md:w-56"
                  >
                    <PatternCard
                      pattern={pattern}
                      onPreview={setSelectedPattern}
                      isFavorite={patternFavorites.includes(pattern.id)}
                      onToggleFavorite={togglePatternFavorite}
                    />
                  </div>
                ))}
                {mixedPatterns.map((pattern) => (
                  <div
                    key={`pattern-2-${pattern.id}`}
                    className="flex-shrink-0 w-48 md:w-56"
                  >
                    <PatternCard
                      pattern={pattern}
                      onPreview={setSelectedPattern}
                      isFavorite={patternFavorites.includes(pattern.id)}
                      onToggleFavorite={togglePatternFavorite}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Buttons Section */}
      <div className={cn(
        "py-12 border-t",
        isPreviewActive
          ? brightness === "dark" ? "border-white/10" : "border-black/10"
          : "border-border"
      )}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={cn(
                "text-xl font-semibold",
                isPreviewActive ? textClass : "text-foreground"
              )}>
                Buttons
              </h2>
              <p className={cn(
                "text-sm mt-1",
                isPreviewActive ? mutedClass : "text-muted-foreground"
              )}>
                Ready-to-use button styles and effects
              </p>
            </div>
            <button
              onClick={() => onNavigate("buttons")}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors",
                isPreviewActive 
                  ? brightness === "dark" ? "text-white/70 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {isLoading ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`btn-skeleton-${index}`} className="flex-shrink-0 w-48 md:w-56">
                  <PatternSkeleton index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden -mx-4 md:-mx-6">
              <div className="flex gap-4 animate-infinite-scroll-reverse hover:pause-animation px-4 md:px-6">
                {buttons.map((button) => (
                  <div
                    key={`button-1-${button.id}`}
                    className="flex-shrink-0 w-48 md:w-56"
                  >
                    <HeroButtonCard
                      button={button}
                      isFavorite={buttonFavorites.includes(button.id)}
                      onToggleFavorite={toggleButtonFavorite}
                      isPreviewActive={isPreviewActive}
                      brightness={brightness}
                    />
                  </div>
                ))}
                {buttons.map((button) => (
                  <div
                    key={`button-2-${button.id}`}
                    className="flex-shrink-0 w-48 md:w-56"
                  >
                    <HeroButtonCard
                      button={button}
                      isFavorite={buttonFavorites.includes(button.id)}
                      onToggleFavorite={toggleButtonFavorite}
                      isPreviewActive={isPreviewActive}
                      brightness={brightness}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pattern Preview Modal */}
      <PatternPreviewModal
        pattern={selectedPattern}
        onClose={() => setSelectedPattern(null)}
      />
    </section>
  );
};
