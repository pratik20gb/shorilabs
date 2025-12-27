import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { patterns } from "@/data/patterns";
import { buttons } from "@/data/buttons";
import { cards } from "@/data/cards";
import { inputs } from "@/data/inputs";
import { badges } from "@/data/badges";
import { loaders } from "@/data/loaders";
import { avatars } from "@/data/avatars";
import { toggles } from "@/data/toggles";
import { dividers } from "@/data/dividers";
import { PatternCard } from "./PatternCard";
import { PatternPreviewModal } from "./PatternPreviewModal";
import { PatternSkeleton } from "./PatternSkeleton";
import { Pattern } from "@/data/patterns";
import { Button } from "@/data/buttons";
import { Card } from "@/data/cards";
import { InputStyle } from "@/data/inputs";
import { Badge } from "@/data/badges";
import { Loader } from "@/data/loaders";
import { Avatar } from "@/data/avatars";
import { Toggle } from "@/data/toggles";
import { Divider } from "@/data/dividers";
import { cn } from "@/lib/utils";
import { Copy, Check, Heart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { ViewType } from "@/pages/Index";

interface HeroSectionProps {
  onNavigate: (view: ViewType) => void;
}

// Helper to parse CSS to style object
const parseCSS = (css: string): React.CSSProperties => {
  const style: React.CSSProperties = {};
  const lines = css.split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('@') || trimmed.startsWith('}') || trimmed.startsWith('&')) return;
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) return;
    const prop = trimmed.substring(0, colonIndex).trim();
    const value = trimmed.substring(colonIndex + 1).trim().replace(/;$/, '');
    const camelProp = prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
    (style as Record<string, string>)[camelProp] = value;
  });
  return style;
};

// Hero Card Component Template
const HeroCard = <T extends { id: string; name: string; category: string; css: string; isNew?: boolean }>({
  item,
  isFavorite,
  onToggleFavorite,
  renderPreview,
  label
}: {
  item: T;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  renderPreview: (style: React.CSSProperties, item: T) => React.ReactNode;
  label?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(item.css);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const itemStyle = parseCSS(item.css);

  return (
    <div className="group relative cursor-pointer">
      <div className="aspect-square rounded-lg overflow-hidden border border-border bg-muted/30 flex items-center justify-center transition-all duration-200 hover:shadow-md p-4">
        <div className="pointer-events-none scale-90">
          {renderPreview(itemStyle, item)}
        </div>

        {item.isNew && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-foreground text-background">
            New
          </div>
        )}

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col justify-between p-3 bg-background/95">
          <div>
            <p className="text-sm font-medium text-foreground">{item.name}</p>
            <p className="text-xs capitalize text-muted-foreground">{item.category}</p>
          </div>
          
          <div className="flex gap-1 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(item.id);
              }}
              className={cn(
                "p-1.5 rounded-md transition-colors bg-muted hover:bg-muted/80",
                isFavorite ? "text-red-500" : "text-muted-foreground"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5", isFavorite && "fill-current")} />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-1.5 rounded-md transition-colors bg-muted hover:bg-muted/80 text-muted-foreground"
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
  
  const maxPerCategory = Math.ceil(16 / categories.length);
  categories.forEach(cat => {
    const categoryPatterns = patterns.filter(p => p.category === cat);
    mixed.push(...categoryPatterns.slice(0, maxPerCategory));
  });
  
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
  const [cardFavorites, setCardFavorites] = useState<string[]>([]);
  const [inputFavorites, setInputFavorites] = useState<string[]>([]);
  const [badgeFavorites, setBadgeFavorites] = useState<string[]>([]);
  const [loaderFavorites, setLoaderFavorites] = useState<string[]>([]);
  const [avatarFavorites, setAvatarFavorites] = useState<string[]>([]);
  const [toggleFavorites, setToggleFavorites] = useState<string[]>([]);
  const [dividerFavorites, setDividerFavorites] = useState<string[]>([]);
  const [mixedPatterns, setMixedPatterns] = useState<Pattern[]>([]);

  useEffect(() => {
    const savedPatterns = localStorage.getItem("shorilabs-favorites");
    const savedButtons = localStorage.getItem("shorilabs-button-favorites");
    const savedCards = localStorage.getItem("shorilabs-card-favorites");
    const savedInputs = localStorage.getItem("shorilabs-input-favorites");
    const savedBadges = localStorage.getItem("shorilabs-badge-favorites");
    const savedLoaders = localStorage.getItem("shorilabs-loader-favorites");
    const savedAvatars = localStorage.getItem("shorilabs-avatar-favorites");
    const savedToggles = localStorage.getItem("shorilabs-toggle-favorites");
    const savedDividers = localStorage.getItem("shorilabs-divider-favorites");
    
    if (savedPatterns) setPatternFavorites(JSON.parse(savedPatterns));
    if (savedButtons) setButtonFavorites(JSON.parse(savedButtons));
    if (savedCards) setCardFavorites(JSON.parse(savedCards));
    if (savedInputs) setInputFavorites(JSON.parse(savedInputs));
    if (savedBadges) setBadgeFavorites(JSON.parse(savedBadges));
    if (savedLoaders) setLoaderFavorites(JSON.parse(savedLoaders));
    if (savedAvatars) setAvatarFavorites(JSON.parse(savedAvatars));
    if (savedToggles) setToggleFavorites(JSON.parse(savedToggles));
    if (savedDividers) setDividerFavorites(JSON.parse(savedDividers));
    
    setMixedPatterns(getMixedPatterns());
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  const toggleFavorite = (type: string, id: string) => {
    const setters: Record<string, (prev: string[]) => string[]> = {
      pattern: (prev) => {
        const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
        localStorage.setItem("shorilabs-favorites", JSON.stringify(updated));
        return updated;
      },
      button: (prev) => {
        const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
        localStorage.setItem("shorilabs-button-favorites", JSON.stringify(updated));
        return updated;
      },
      card: (prev) => {
        const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
        localStorage.setItem("shorilabs-card-favorites", JSON.stringify(updated));
        return updated;
      },
      input: (prev) => {
        const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
        localStorage.setItem("shorilabs-input-favorites", JSON.stringify(updated));
        return updated;
      },
      badge: (prev) => {
        const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
        localStorage.setItem("shorilabs-badge-favorites", JSON.stringify(updated));
        return updated;
      },
      loader: (prev) => {
        const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
        localStorage.setItem("shorilabs-loader-favorites", JSON.stringify(updated));
        return updated;
      },
      avatar: (prev) => {
        const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
        localStorage.setItem("shorilabs-avatar-favorites", JSON.stringify(updated));
        return updated;
      },
      toggle: (prev) => {
        const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
        localStorage.setItem("shorilabs-toggle-favorites", JSON.stringify(updated));
        return updated;
      },
      divider: (prev) => {
        const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
        localStorage.setItem("shorilabs-divider-favorites", JSON.stringify(updated));
        return updated;
      },
    };

    const setter = setters[type];
    if (setter) {
      switch (type) {
        case "pattern": setPatternFavorites(setter); break;
        case "button": setButtonFavorites(setter); break;
        case "card": setCardFavorites(setter); break;
        case "input": setInputFavorites(setter); break;
        case "badge": setBadgeFavorites(setter); break;
        case "loader": setLoaderFavorites(setter); break;
        case "avatar": setAvatarFavorites(setter); break;
        case "toggle": setToggleFavorites(setter); break;
        case "divider": setDividerFavorites(setter); break;
      }
    }
  };

  const ComponentSection = <T extends { id: string; name: string; category: string; css: string; isNew?: boolean }>({
    title,
    description,
    items,
    viewType,
    type,
    favorites,
    renderPreview,
    animationClass = "animate-infinite-scroll"
  }: {
    title: string;
    description: string;
    items: T[];
    viewType: ViewType;
    type: string;
    favorites: string[];
    renderPreview: (style: React.CSSProperties, item: T) => React.ReactNode;
    animationClass?: string;
  }) => (
    <div className="py-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-sm mt-1 text-muted-foreground">{description}</p>
          </div>
          <button
            onClick={() => onNavigate(viewType)}
            className="flex items-center gap-1 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`skeleton-${type}-${index}`} className="flex-shrink-0 w-48 md:w-56">
                <PatternSkeleton index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden -mx-4 md:-mx-6">
            <div className={cn("flex gap-4 hover:pause-animation px-4 md:px-6", animationClass)}>
              {items.map((item) => (
                <div
                  key={`${type}-1-${item.id}`}
                  className="flex-shrink-0 w-48 md:w-56"
                >
                  <HeroCard
                    item={item}
                    isFavorite={favorites.includes(item.id)}
                    onToggleFavorite={(id) => toggleFavorite(type, id)}
                    renderPreview={renderPreview}
                  />
                </div>
              ))}
              {items.map((item) => (
                <div
                  key={`${type}-2-${item.id}`}
                  className="flex-shrink-0 w-48 md:w-56"
                >
                  <HeroCard
                    item={item}
                    isFavorite={favorites.includes(item.id)}
                    onToggleFavorite={(id) => toggleFavorite(type, id)}
                    renderPreview={renderPreview}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="relative z-10">
      {/* Hero */}
      <div className="container mx-auto px-4 md:px-6 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground">
            Stop building from scratch.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            Beautify your website within minutes.
          </p>
        </motion.div>
      </div>

      {/* Patterns Section */}
      <div className="py-12 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Patterns</h2>
              <p className="text-sm mt-1 text-muted-foreground">Beautiful background patterns for your designs</p>
            </div>
            <button
              onClick={() => onNavigate("patterns")}
              className="flex items-center gap-1 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {isLoading ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`skeleton-pattern-${index}`} className="flex-shrink-0 w-48 md:w-56">
                  <PatternSkeleton index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden -mx-4 md:-mx-6">
              <div className="flex gap-4 animate-infinite-scroll hover:pause-animation px-4 md:px-6">
                {mixedPatterns.map((pattern) => (
                  <div key={`pattern-1-${pattern.id}`} className="flex-shrink-0 w-48 md:w-56">
                    <PatternCard
                      pattern={pattern}
                      onPreview={setSelectedPattern}
                      isFavorite={patternFavorites.includes(pattern.id)}
                      onToggleFavorite={(id) => toggleFavorite("pattern", id)}
                    />
                  </div>
                ))}
                {mixedPatterns.map((pattern) => (
                  <div key={`pattern-2-${pattern.id}`} className="flex-shrink-0 w-48 md:w-56">
                    <PatternCard
                      pattern={pattern}
                      onPreview={setSelectedPattern}
                      isFavorite={patternFavorites.includes(pattern.id)}
                      onToggleFavorite={(id) => toggleFavorite("pattern", id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Buttons Section */}
      <ComponentSection
        title="Buttons"
        description="Ready-to-use button styles and effects"
        items={buttons}
        viewType="buttons"
        type="button"
        favorites={buttonFavorites}
        renderPreview={(style, item) => (
          <button style={style} className="pointer-events-none">
            {(item as Button).label || "Button"}
          </button>
        )}
        animationClass="animate-infinite-scroll-reverse"
      />

      {/* Cards Section */}
      <ComponentSection
        title="Cards"
        description="Beautiful card components for your layouts"
        items={cards}
        viewType="cards"
        type="card"
        favorites={cardFavorites}
        renderPreview={(style) => (
          <div style={style} className="pointer-events-none transform scale-75 w-24 h-16 flex items-center justify-center">
            <div className="w-full space-y-1.5">
              <div className="h-2 bg-current opacity-20 rounded w-3/4"></div>
              <div className="h-2 bg-current opacity-10 rounded w-full"></div>
              <div className="h-2 bg-current opacity-10 rounded w-1/2"></div>
            </div>
          </div>
        )}
        animationClass="animate-infinite-scroll"
      />

      {/* Inputs Section */}
      <ComponentSection
        title="Inputs"
        description="Styled input fields for forms"
        items={inputs}
        viewType="inputs"
        type="input"
        favorites={inputFavorites}
        renderPreview={(style, item) => (
          <input
            style={style}
            className="pointer-events-none transform scale-90 w-full max-w-[140px] text-xs"
            placeholder={(item as InputStyle).placeholder || "Type here..."}
            readOnly
          />
        )}
        animationClass="animate-infinite-scroll-reverse"
      />

      {/* Badges Section */}
      <ComponentSection
        title="Badges"
        description="Label and badge components"
        items={badges}
        viewType="badges"
        type="badge"
        favorites={badgeFavorites}
        renderPreview={(style, item) => {
          const badge = item as Badge;
          const isDotBadge = badge.category === "dot" || badge.category === "status";
          return (
            <span style={style} className="pointer-events-none text-xs">
              {isDotBadge && (
                <span className="w-2 h-2 rounded-full bg-current opacity-70 mr-1.5 inline-block"></span>
              )}
              {badge.label || "Badge"}
            </span>
          );
        }}
        animationClass="animate-infinite-scroll"
      />

      {/* Loaders Section */}
      <ComponentSection
        title="Loaders"
        description="Loading indicators and spinners"
        items={loaders}
        viewType="loaders"
        type="loader"
        favorites={loaderFavorites}
        renderPreview={(style, item) => {
          const loader = item as Loader;
          const category = loader.category;
          
          if (category === "spinner") {
            return <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />;
          }
          if (category === "dots") {
            return (
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            );
          }
          if (category === "bars") {
            return (
              <div className="flex gap-0.5 items-end">
                <div className="w-1 h-4 bg-blue-500 rounded-sm animate-pulse" style={{ animationDelay: "0ms" }} />
                <div className="w-1 h-6 bg-blue-500 rounded-sm animate-pulse" style={{ animationDelay: "150ms" }} />
                <div className="w-1 h-5 bg-blue-500 rounded-sm animate-pulse" style={{ animationDelay: "300ms" }} />
                <div className="w-1 h-7 bg-blue-500 rounded-sm animate-pulse" style={{ animationDelay: "450ms" }} />
              </div>
            );
          }
          if (category === "pulse") {
            return <div className="w-5 h-5 bg-blue-500 rounded-full animate-ping" />;
          }
          if (category === "skeleton") {
            return <div className="w-20 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />;
          }
          if (category === "progress") {
            return (
              <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-blue-500 rounded-full animate-pulse" />
              </div>
            );
          }
          
          return <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />;
        }}
        animationClass="animate-infinite-scroll-reverse"
      />

      {/* Avatars Section */}
      <ComponentSection
        title="Avatars"
        description="User avatar components"
        items={avatars}
        viewType="avatars"
        type="avatar"
        favorites={avatarFavorites}
        renderPreview={(style, item) => {
          const avatar = item as Avatar;
          const category = avatar.category;
          const baseClasses = "bg-gradient-to-br from-blue-400 to-purple-500";
          
          if (category === "circle" || category === "bordered") {
            return <div className={cn("w-12 h-12 rounded-full", baseClasses)} />;
          }
          if (category === "rounded") {
            return <div className={cn("w-12 h-12 rounded-xl", baseClasses)} />;
          }
          if (category === "ring") {
            return (
              <div className="p-0.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <div className={cn("w-11 h-11 rounded-full ring-2 ring-white", baseClasses)} />
              </div>
            );
          }
          if (category === "status") {
            return (
              <div className="relative">
                <div className={cn("w-12 h-12 rounded-full", baseClasses)} />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
            );
          }
          if (category === "group") {
            return (
              <div className="flex -space-x-3">
                <div className={cn("w-10 h-10 rounded-full border-2 border-white", baseClasses)} />
                <div className={cn("w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-red-500")} />
                <div className={cn("w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-500")} />
              </div>
            );
          }
          
          return <div className={cn("w-12 h-12 rounded-full", baseClasses)} />;
        }}
        animationClass="animate-infinite-scroll"
      />

      {/* Toggles Section */}
      <ComponentSection
        title="Toggles"
        description="Toggle switch components"
        items={toggles}
        viewType="toggles"
        type="toggle"
        favorites={toggleFavorites}
        renderPreview={(style, item) => {
          const toggle = item as Toggle;
          const category = toggle.category;
          
          const baseTrack = "w-11 h-6 rounded-full relative transition-colors cursor-pointer";
          const baseThumb = "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform";
          
          if (category === "ios") {
            return (
              <div className={cn(baseTrack, "bg-[#34c759]")}>
                <div className={cn(baseThumb, "left-[22px]")} />
              </div>
            );
          }
          if (category === "material") {
            return (
              <div className="w-9 h-3.5 rounded-full relative transition-colors cursor-pointer bg-blue-200">
                <div className="absolute -top-[3px] w-5 h-5 rounded-full shadow-md transition-all left-4 bg-blue-500" />
              </div>
            );
          }
          
          return (
            <div className={cn(baseTrack, "bg-blue-500")}>
              <div className={cn(baseThumb, "left-[22px]")} />
            </div>
          );
        }}
        animationClass="animate-infinite-scroll-reverse"
      />

      {/* Dividers Section */}
      <ComponentSection
        title="Dividers"
        description="Section dividers and separators"
        items={dividers}
        viewType="dividers"
        type="divider"
        favorites={dividerFavorites}
        renderPreview={(style, item) => {
          const divider = item as Divider;
          const category = divider.category;
          
          if (category === "solid") {
            return <div className="w-32 h-0.5 bg-gray-400" />;
          }
          if (category === "dashed") {
            return <div className="w-32 border-t-2 border-dashed border-gray-400" />;
          }
          if (category === "gradient") {
            return <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded" />;
          }
          if (category === "decorated") {
            return (
              <div className="w-32 flex items-center gap-2">
                <div className="flex-1 h-0.5 bg-gray-400" />
                <div className="w-2 h-2 bg-gray-500 rotate-45" />
                <div className="flex-1 h-0.5 bg-gray-400" />
              </div>
            );
          }
          if (category === "text") {
            return (
              <div className="w-32 flex items-center gap-2">
                <div className="flex-1 h-0.5 bg-gray-300" />
                <span className="text-[10px] text-gray-500 font-medium">OR</span>
                <div className="flex-1 h-0.5 bg-gray-300" />
              </div>
            );
          }
          if (category === "fade") {
            return <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />;
          }
          
          return <div className="w-32 h-0.5 bg-gray-400" />;
        }}
        animationClass="animate-infinite-scroll"
      />

      {/* Pattern Preview Modal */}
      <PatternPreviewModal
        pattern={selectedPattern}
        onClose={() => setSelectedPattern(null)}
      />
    </section>
  );
};
