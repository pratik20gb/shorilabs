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

// Minimal ButtonCard for hero section
const HeroButtonCard = ({ 
  button, 
  isFavorite, 
  onToggleFavorite 
}: { 
  button: Button; 
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
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
      let value = trimmed.substring(colonIndex + 1).trim().replace(/;$/, '');
      const camelProp = prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      (style as Record<string, string>)[camelProp] = value;
    });
    return style;
  };

  return (
    <div className="group relative cursor-pointer">
      <div className="aspect-square rounded-lg overflow-hidden border border-border bg-muted/30 flex items-center justify-center transition-all duration-200 hover:border-border/80 hover:shadow-md p-4">
        <button style={getButtonStyle()} className="pointer-events-none scale-90">
          {button.label || "Button"}
        </button>

        {button.isNew && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-foreground text-background text-[10px] font-medium">
            New
          </div>
        )}

        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/95 transition-all duration-200 flex flex-col justify-between p-3">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <p className="text-sm font-medium text-foreground">{button.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{button.category}</p>
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(button.id);
              }}
              className={cn(
                "p-1.5 rounded-md bg-muted hover:bg-muted/80 transition-colors",
                isFavorite ? "text-red-500" : "text-muted-foreground"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5", isFavorite && "fill-current")} />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-1.5 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [patternFavorites, setPatternFavorites] = useState<string[]>([]);
  const [buttonFavorites, setButtonFavorites] = useState<string[]>([]);
  const { isPreviewActive, textClass, mutedClass, brightness } = useBackgroundPattern();

  useEffect(() => {
    const savedPatterns = localStorage.getItem("shorilabs-favorites");
    const savedButtons = localStorage.getItem("shorilabs-button-favorites");
    if (savedPatterns) setPatternFavorites(JSON.parse(savedPatterns));
    if (savedButtons) setButtonFavorites(JSON.parse(savedButtons));
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
            Reusable UI.{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Instantly usable.
            </span>
          </h1>
          
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
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-gray-300 text-gray-900 hover:bg-gray-100"
                  : "border-border text-foreground hover:bg-accent"
              )}
            >
              Browse Buttons
            </button>
          </div>
        </motion.div>
      </div>

      {/* Patterns Section */}
      <div className="py-12 border-t border-border">
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
                {patterns.slice(0, 12).map((pattern) => (
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
                {patterns.slice(0, 12).map((pattern) => (
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
      <div className="py-12 border-t border-border">
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
