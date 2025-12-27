import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { ToggleCard } from "./ToggleCard";
import { TogglePreviewModal } from "./TogglePreviewModal";
import { PatternSkeleton } from "./PatternSkeleton";
import { toggles, toggleCategories, Toggle, ToggleCategory } from "@/data/toggles";
import { cn } from "@/lib/utils";
interface ToggleGridProps {
  searchQuery?: string;
}

export const ToggleGrid = ({ searchQuery = "" }: ToggleGridProps) => {
  const [activeCategory, setActiveCategory] = useState<ToggleCategory | "favorites">("all");
  const [selectedToggle, setSelectedToggle] = useState<Toggle | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePreview = (toggle: Toggle) => {
    if (selectedToggle?.id === toggle.id) {
      setSelectedToggle(null);
    } else {
      setSelectedToggle(toggle);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("shorilabs-toggle-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  useEffect(() => {
    localStorage.setItem("shorilabs-toggle-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredToggles = useMemo(() => {
    let result = toggles;

    if (activeCategory === "favorites") {
      result = result.filter((t) => favorites.includes(t.id));
    } else if (activeCategory !== "all") {
      result = result.filter((t) => t.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery, favorites]);

  const allCategories = [
    ...toggleCategories,
    { id: "favorites" as const, label: "Favorites", emoji: "❤️" },
  ];

  return (
    <section id="toggles" className="relative z-10">
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Toggles
          </h1>
          <p className="text-base mt-2 text-muted-foreground max-w-2xl">
            Toggle switches in iOS, Material, and custom styles. Copy the CSS or Tailwind classes.
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
              onClick={() => setActiveCategory(cat.id as ToggleCategory | "favorites")}
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
                    ? toggles.length 
                    : toggles.filter(t => t.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Toggle Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <PatternSkeleton key={`skeleton-${index}`} index={index} />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredToggles.map((toggle, index) => (
                <motion.div
                  key={toggle.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <ToggleCard
                    toggle={toggle}
                    onPreview={handlePreview}
                    isFavorite={favorites.includes(toggle.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Empty State */}
        {filteredToggles.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-lg font-medium mb-1 text-foreground">
              No toggles found
            </p>
            <p className="text-sm text-muted-foreground">
              {activeCategory === "favorites"
                ? "Save some toggles to your favorites."
                : "Try a different search term or category."}
            </p>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      <TogglePreviewModal
        toggle={selectedToggle}
        onClose={() => setSelectedToggle(null)}
      />
    </section>
  );
};

