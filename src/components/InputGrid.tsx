import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { InputCard } from "./InputCard";
import { InputPreviewModal } from "./InputPreviewModal";
import { PatternSkeleton } from "./PatternSkeleton";
import { inputs, inputCategories, InputStyle, InputCategory } from "@/data/inputs";
import { cn } from "@/lib/utils";

interface InputGridProps {
  searchQuery?: string;
}

export const InputGrid = ({ searchQuery = "" }: InputGridProps) => {
  const [activeCategory, setActiveCategory] = useState<InputCategory | "favorites">("all");
  const [selectedInput, setSelectedInput] = useState<InputStyle | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePreview = (input: InputStyle) => {
    if (selectedInput?.id === input.id) {
      setSelectedInput(null);
    } else {
      setSelectedInput(input);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("shorilabs-input-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  useEffect(() => {
    localStorage.setItem("shorilabs-input-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredInputs = useMemo(() => {
    let result = inputs;

    if (activeCategory === "favorites") {
      result = result.filter((i) => favorites.includes(i.id));
    } else if (activeCategory !== "all") {
      result = result.filter((i) => i.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(query) ||
          i.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery, favorites]);

  const allCategories = [
    ...inputCategories,
    { id: "favorites" as const, label: "Favorites", emoji: "❤️" },
  ];

  return (
    <section id="inputs" className="relative z-10">
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Inputs
          </h1>
          <p className="text-base mt-2 text-muted-foreground max-w-2xl">
            Form input styles for text fields, search bars, and more. Copy the CSS or Tailwind classes.
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
              onClick={() => setActiveCategory(cat.id as InputCategory | "favorites")}
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
                    ? inputs.length 
                    : inputs.filter(i => i.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <PatternSkeleton key={`skeleton-${index}`} index={index} />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredInputs.map((input, index) => (
                <motion.div
                  key={input.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <InputCard
                    input={input}
                    onPreview={handlePreview}
                    isFavorite={favorites.includes(input.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Empty State */}
        {filteredInputs.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-lg font-medium mb-1 text-foreground">
              No inputs found
            </p>
            <p className="text-sm text-muted-foreground">
              {activeCategory === "favorites"
                ? "Save some inputs to your favorites."
                : "Try a different search term or category."}
            </p>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      <InputPreviewModal
        input={selectedInput}
        onClose={() => setSelectedInput(null)}
      />
    </section>
  );
};

