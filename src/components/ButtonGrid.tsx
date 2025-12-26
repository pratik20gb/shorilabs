import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { ButtonCard } from "./ButtonCard";
import { ButtonPreviewModal } from "./ButtonPreviewModal";
import { PatternSkeleton } from "./PatternSkeleton";
import { buttons, buttonCategories, Button, ButtonCategory } from "@/data/buttons";
import { cn } from "@/lib/utils";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";

interface ButtonGridProps {
  searchQuery?: string;
}

export const ButtonGrid = ({ searchQuery = "" }: ButtonGridProps) => {
  const [activeCategory, setActiveCategory] = useState<ButtonCategory | "favorites">("all");
  const [selectedButton, setSelectedButton] = useState<Button | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isPreviewActive, textClass, mutedClass, brightness } = useBackgroundPattern();

  useEffect(() => {
    const saved = localStorage.getItem("shorilabs-button-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  useEffect(() => {
    localStorage.setItem("shorilabs-button-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredButtons = useMemo(() => {
    let result = buttons;

    if (activeCategory === "favorites") {
      result = result.filter((b) => favorites.includes(b.id));
    } else if (activeCategory !== "all") {
      result = result.filter((b) => b.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery, favorites]);

  const allCategories = [
    ...buttonCategories,
    { id: "favorites" as const, label: "Favorites", emoji: "❤️" },
  ];

  // Split buttons into 3 rows for infinite scroll
  const row1 = buttons.slice(0, Math.ceil(buttons.length / 3));
  const row2 = buttons.slice(Math.ceil(buttons.length / 3), Math.ceil(buttons.length * 2 / 3));
  const row3 = buttons.slice(Math.ceil(buttons.length * 2 / 3));

  return (
    <section id="buttons" className="relative z-10">
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className={cn(
            "text-3xl font-bold tracking-tight transition-colors",
            isPreviewActive ? textClass : "text-foreground"
          )}>
            Buttons
          </h1>
          <p className={cn(
            "text-base mt-2 transition-colors max-w-2xl",
            isPreviewActive ? mutedClass : "text-muted-foreground"
          )}>
            Ready-to-use button components with various styles and effects. Copy the CSS or Tailwind classes.
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
              onClick={() => setActiveCategory(cat.id as ButtonCategory | "favorites")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeCategory === cat.id
                  ? isPreviewActive
                    ? brightness === "dark" 
                      ? "bg-white/20 text-white"
                      : "bg-black/10 text-gray-900"
                    : "bg-foreground text-background"
                  : isPreviewActive
                    ? brightness === "dark"
                      ? "text-white/60 hover:text-white hover:bg-white/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
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
                    ? buttons.length 
                    : buttons.filter(b => b.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Button Grid */}
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
                    {row1.map((button) => (
                      <div
                        key={`row1-1-${button.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <ButtonCard
                          button={button}
                          onPreview={setSelectedButton}
                          isFavorite={favorites.includes(button.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                    {row1.map((button) => (
                      <div
                        key={`row1-2-${button.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <ButtonCard
                          button={button}
                          onPreview={setSelectedButton}
                          isFavorite={favorites.includes(button.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 - Reverse */}
                <div className="relative overflow-hidden -mx-4 md:-mx-6">
                  <div className="flex gap-4 animate-infinite-scroll-reverse hover:pause-animation px-4 md:px-6">
                    {row2.map((button) => (
                      <div
                        key={`row2-1-${button.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <ButtonCard
                          button={button}
                          onPreview={setSelectedButton}
                          isFavorite={favorites.includes(button.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                    {row2.map((button) => (
                      <div
                        key={`row2-2-${button.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <ButtonCard
                          button={button}
                          onPreview={setSelectedButton}
                          isFavorite={favorites.includes(button.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 3 - Slow */}
                <div className="relative overflow-hidden -mx-4 md:-mx-6">
                  <div className="flex gap-4 animate-infinite-scroll-slow hover:pause-animation px-4 md:px-6">
                    {row3.map((button) => (
                      <div
                        key={`row3-1-${button.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <ButtonCard
                          button={button}
                          onPreview={setSelectedButton}
                          isFavorite={favorites.includes(button.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      </div>
                    ))}
                    {row3.map((button) => (
                      <div
                        key={`row3-2-${button.id}`}
                        className="flex-shrink-0 w-44 md:w-52"
                      >
                        <ButtonCard
                          button={button}
                          onPreview={setSelectedButton}
                          isFavorite={favorites.includes(button.id)}
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
                {filteredButtons.map((button, index) => (
                  <motion.div
                    key={button.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <ButtonCard
                      button={button}
                      onPreview={setSelectedButton}
                      isFavorite={favorites.includes(button.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        )}

        {/* Empty State */}
        {filteredButtons.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className={cn(
              "text-lg font-medium mb-1",
              isPreviewActive ? textClass : "text-foreground"
            )}>
              No buttons found
            </p>
            <p className={cn(
              "text-sm",
              isPreviewActive ? mutedClass : "text-muted-foreground"
            )}>
              {activeCategory === "favorites"
                ? "Save some buttons to your favorites."
                : "Try a different search term or category."}
            </p>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      <ButtonPreviewModal
        button={selectedButton}
        onClose={() => setSelectedButton(null)}
      />
    </section>
  );
};
