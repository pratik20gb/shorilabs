import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { BadgeCard } from "./BadgeCard";
import { BadgePreviewModal } from "./BadgePreviewModal";
import { PatternSkeleton } from "./PatternSkeleton";
import { badges, badgeCategories, Badge, BadgeCategory } from "@/data/badges";
import { cn } from "@/lib/utils";

interface BadgeGridProps {
  searchQuery?: string;
}

export const BadgeGrid = ({ searchQuery = "" }: BadgeGridProps) => {
  const [activeCategory, setActiveCategory] = useState<BadgeCategory | "favorites">("all");
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePreview = (badge: Badge) => {
    if (selectedBadge?.id === badge.id) {
      setSelectedBadge(null);
    } else {
      setSelectedBadge(badge);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("shorilabs-badge-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  useEffect(() => {
    localStorage.setItem("shorilabs-badge-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredBadges = useMemo(() => {
    let result = badges;

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
    ...badgeCategories,
    { id: "favorites" as const, label: "Favorites", emoji: "❤️" },
  ];

  return (
    <section id="badges" className="relative z-10">
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Badges
          </h1>
          <p className="text-base mt-2 text-muted-foreground max-w-2xl">
            Status indicators, labels, and tags for your UI. Copy the CSS or Tailwind classes.
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
              onClick={() => setActiveCategory(cat.id as BadgeCategory | "favorites")}
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
                    ? badges.length 
                    : badges.filter(b => b.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <PatternSkeleton key={`skeleton-${index}`} index={index} />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <BadgeCard
                    badge={badge}
                    onPreview={handlePreview}
                    isFavorite={favorites.includes(badge.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Empty State */}
        {filteredBadges.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-lg font-medium mb-1 text-foreground">
              No badges found
            </p>
            <p className="text-sm text-muted-foreground">
              {activeCategory === "favorites"
                ? "Save some badges to your favorites."
                : "Try a different search term or category."}
            </p>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      <BadgePreviewModal
        badge={selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />
    </section>
  );
};

