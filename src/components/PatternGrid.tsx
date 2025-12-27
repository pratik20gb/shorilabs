import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { PatternCard } from "./PatternCard";
import { LazyPatternCard } from "./LazyPatternCard";
import { PatternPreviewModal } from "./PatternPreviewModal";
import { PatternSkeleton } from "./PatternSkeleton";
import { patterns, categories, Pattern, PatternCategory } from "@/data/patterns";
import { cn } from "@/lib/utils";

interface PatternGridProps {
  searchQuery?: string;
}

export const PatternGrid = ({ searchQuery = "" }: PatternGridProps) => {
  const [activeCategory, setActiveCategory] = useState<PatternCategory | "favorites">("all");
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePreview = (pattern: Pattern) => {
    if (selectedPattern?.id === pattern.id) {
      setSelectedPattern(null);
    } else {
      setSelectedPattern(pattern);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("shorilabs-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  useEffect(() => {
    localStorage.setItem("shorilabs-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
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
    { id: "favorites" as const, label: "Favorites", emoji: "❤️" },
  ];

  return (
    <section id="patterns" className="relative z-10">
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Patterns
          </h1>
          <p className="text-base mt-2 text-muted-foreground max-w-2xl">
            Beautiful background patterns for your projects. Click to preview, copy CSS or Tailwind classes.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              data-category={cat.id}
              onClick={() => setActiveCategory(cat.id as PatternCategory | "favorites")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeCategory === cat.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {cat.id === "favorites" ? (
                <Heart className={cn("w-3.5 h-3.5", activeCategory === "favorites" && "fill-current")} />
              ) : null}
              <span>{cat.label}</span>
              {cat.id !== "favorites" && (
                <span className={cn(
                  "text-xs",
                  activeCategory === cat.id
                    ? "opacity-70"
                    : "opacity-50"
                )}>
                  {cat.id === "all" 
                    ? patterns.length 
                    : patterns.filter(p => p.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Pattern Grid */}
        {activeCategory === "all" && !searchQuery ? (
          // Infinite Scroll for "All" category
          <div className="space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <PatternSkeleton key={`skeleton-${index}`} index={index} />
                ))}
              </div>
            ) : (
              <>
                {/* Row 1 */}
                <div className="relative overflow-hidden -mx-4 md:-mx-6">
                  <div className="flex gap-4 animate-infinite-scroll hover:pause-animation px-4 md:px-6">
                    {patterns.slice(0, Math.ceil(patterns.length / 3)).map((pattern) => (
                      <div
                        key={`row1-1-${pattern.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <PatternCard
                          pattern={pattern}
                          onPreview={handlePreview}
                          isFavorite={favorites.includes(pattern.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                    {patterns.slice(0, Math.ceil(patterns.length / 3)).map((pattern) => (
                      <div
                        key={`row1-2-${pattern.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <PatternCard
                          pattern={pattern}
                          onPreview={handlePreview}
                          isFavorite={favorites.includes(pattern.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 - Reverse */}
                <div className="relative overflow-hidden -mx-4 md:-mx-6">
                  <div className="flex gap-4 animate-infinite-scroll-reverse hover:pause-animation px-4 md:px-6">
                    {patterns.slice(Math.ceil(patterns.length / 3), Math.ceil(patterns.length * 2 / 3)).map((pattern) => (
                      <div
                        key={`row2-1-${pattern.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <PatternCard
                          pattern={pattern}
                          onPreview={handlePreview}
                          isFavorite={favorites.includes(pattern.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                    {patterns.slice(Math.ceil(patterns.length / 3), Math.ceil(patterns.length * 2 / 3)).map((pattern) => (
                      <div
                        key={`row2-2-${pattern.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <PatternCard
                          pattern={pattern}
                          onPreview={handlePreview}
                          isFavorite={favorites.includes(pattern.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 3 - Slow */}
                <div className="relative overflow-hidden -mx-4 md:-mx-6">
                  <div className="flex gap-4 animate-infinite-scroll-slow hover:pause-animation px-4 md:px-6">
                    {patterns.slice(Math.ceil(patterns.length * 2 / 3)).map((pattern) => (
                      <div
                        key={`row3-1-${pattern.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <PatternCard
                          pattern={pattern}
                          onPreview={handlePreview}
                          isFavorite={favorites.includes(pattern.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                    {patterns.slice(Math.ceil(patterns.length * 2 / 3)).map((pattern) => (
                      <div
                        key={`row3-2-${pattern.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <PatternCard
                          pattern={pattern}
                          onPreview={handlePreview}
                          isFavorite={favorites.includes(pattern.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          // Grid for filtered categories
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <PatternSkeleton key={`skeleton-${index}`} index={index} />
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredPatterns.map((pattern, index) => (
                  <motion.div
                    key={pattern.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <LazyPatternCard
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
            className="text-center py-16"
          >
            <p className="text-lg font-medium mb-1 text-foreground">
              No patterns found
            </p>
            <p className="text-sm text-muted-foreground">
              {activeCategory === "favorites"
                ? "Save some patterns to your favorites."
                : "Try a different search term or category."}
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
