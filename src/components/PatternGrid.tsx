import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { PatternCard } from "./PatternCard";
import { PatternPreviewModal } from "./PatternPreviewModal";
import { patterns, categories, Pattern, PatternCategory } from "@/data/patterns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PatternGridProps {
  searchQuery?: string;
}

export const PatternGrid = ({ searchQuery = "" }: PatternGridProps) => {
  const [activeCategory, setActiveCategory] = useState<PatternCategory | "favorites">("all");
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("shorilabs-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    // Simulate initial load
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  useEffect(() => {
    // Show hint when switching to "all" category
    if (activeCategory === "all" && !searchQuery) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    localStorage.setItem("shorilabs-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const downloadAllPatterns = () => {
    const dataStr = JSON.stringify(patterns, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shorilabs-patterns.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('All patterns downloaded!');
  };

  const filteredPatterns = useMemo(() => {
    let result = patterns;

    if (activeCategory === "favorites") {
      result = result.filter((p) => favorites.includes(p.id));
    } else if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery, favorites]);

  const allCategories = [
    ...categories,
    { id: "favorites" as const, label: "Favourites", emoji: "❤️" },
  ];

  return (
    <section id="patterns" className="py-12 md:py-16 pattern-grid-section">
      <div className="container mx-auto px-4 md:px-6">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 tracking-tight">
          Patterns
        </h1>
        
        {/* Category Pills with Emojis */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              data-category={cat.id}
              onClick={() => setActiveCategory(cat.id as PatternCategory | "favorites")}
              className={cn(
                "pill-button flex items-center gap-2",
                activeCategory === cat.id ? "pill-button-active" : "pill-button-inactive"
              )}
            >
              {cat.id === "favorites" ? (
                <Heart className={cn(
                  "w-3.5 h-3.5",
                  activeCategory === "favorites" && "fill-current"
                )} />
              ) : (
                <span className="text-base">{cat.emoji}</span>
              )}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Pattern Grid */}
        {activeCategory === "all" && !searchQuery ? (
          // Infinite Horizontal Scroll for "All" category
          <div key="infinite-scroll-layout" className="space-y-6 relative">
            {/* Hover hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                >
                  <p className="text-xs md:text-sm text-muted-foreground bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-lg">
                    Hover to pause • Click to view
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Row 1 - Scroll Left to Right */}
            <div className="relative overflow-hidden -mx-4 md:-mx-6">
              <div className="flex gap-4 md:gap-6 animate-infinite-scroll hover:pause-animation pl-4 md:pl-6" style={{ willChange: 'transform' }}>
                {/* First set */}
                {patterns.slice(0, Math.ceil(patterns.length / 3)).map((pattern) => (
                  <div
                    key={`row1-first-${pattern.id}`}
                    className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64"
                    style={{ minWidth: '160px', maxWidth: '256px' }}
                  >
                    <PatternCard
                      pattern={pattern}
                      onPreview={setSelectedPattern}
                      isFavorite={favorites.includes(pattern.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {patterns.slice(0, Math.ceil(patterns.length / 3)).map((pattern) => (
                  <div
                    key={`row1-second-${pattern.id}`}
                    className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64"
                    style={{ minWidth: '160px', maxWidth: '256px' }}
                  >
                    <PatternCard
                      pattern={pattern}
                      onPreview={setSelectedPattern}
                      isFavorite={favorites.includes(pattern.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Scroll Right to Left (Reverse) */}
            <div className="relative overflow-hidden -mx-4 md:-mx-6">
              <div className="flex gap-4 md:gap-6 animate-infinite-scroll-reverse hover:pause-animation pl-4 md:pl-6" style={{ willChange: 'transform' }}>
                {/* First set */}
                {patterns.slice(Math.ceil(patterns.length / 3), Math.ceil(patterns.length * 2 / 3)).map((pattern) => (
                  <div
                    key={`row2-first-${pattern.id}`}
                    className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64"
                    style={{ minWidth: '160px', maxWidth: '256px' }}
                  >
                    <PatternCard
                      pattern={pattern}
                      onPreview={setSelectedPattern}
                      isFavorite={favorites.includes(pattern.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
                {/* Duplicate set */}
                {patterns.slice(Math.ceil(patterns.length / 3), Math.ceil(patterns.length * 2 / 3)).map((pattern) => (
                  <div
                    key={`row2-second-${pattern.id}`}
                    className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64"
                    style={{ minWidth: '160px', maxWidth: '256px' }}
                  >
                    <PatternCard
                      pattern={pattern}
                      onPreview={setSelectedPattern}
                      isFavorite={favorites.includes(pattern.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3 - Scroll Left to Right (Slower) */}
            <div className="relative overflow-hidden -mx-4 md:-mx-6">
              <div className="flex gap-4 md:gap-6 animate-infinite-scroll-slow hover:pause-animation pl-4 md:pl-6" style={{ willChange: 'transform' }}>
                {/* First set */}
                {patterns.slice(Math.ceil(patterns.length * 2 / 3)).map((pattern) => (
                  <div
                    key={`row3-first-${pattern.id}`}
                    className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64"
                    style={{ minWidth: '160px', maxWidth: '256px' }}
                  >
                    <PatternCard
                      pattern={pattern}
                      onPreview={setSelectedPattern}
                      isFavorite={favorites.includes(pattern.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
                {/* Duplicate set */}
                {patterns.slice(Math.ceil(patterns.length * 2 / 3)).map((pattern) => (
                  <div
                    key={`row3-second-${pattern.id}`}
                    className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64"
                    style={{ minWidth: '160px', maxWidth: '256px' }}
                  >
                    <PatternCard
                      pattern={pattern}
                      onPreview={setSelectedPattern}
                      isFavorite={favorites.includes(pattern.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Regular Grid for filtered categories
          <div key="grid-layout" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="aspect-square rounded-2xl bg-secondary/50 animate-pulse"
                />
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredPatterns.map((pattern, index) => (
                  <motion.div
                    key={pattern.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <PatternCard
                      pattern={pattern}
                      onPreview={setSelectedPattern}
                      isFavorite={favorites.includes(pattern.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        )}

        {/* Empty State */}
        {filteredPatterns.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-20"
          >
            <div className="text-5xl mb-3">
              {activeCategory === "favorites" ? "❤️" : "✨"}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              No patterns found
            </h3>
            <p className="text-sm text-muted-foreground">
              {activeCategory === "favorites"
                ? "You haven't saved any favourites yet."
                : "Try adjusting your search or filter."}
            </p>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      <PatternPreviewModal
        pattern={selectedPattern}
        onClose={() => setSelectedPattern(null)}
      />
    </section>
  );
};