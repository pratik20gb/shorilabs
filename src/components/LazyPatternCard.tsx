import { useState, useEffect, useRef } from "react";
import { PatternCard } from "./PatternCard";
import { Pattern } from "@/data/patterns";

interface LazyPatternCardProps {
  pattern: Pattern;
  onPreview: (pattern: Pattern) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const LazyPatternCard = ({
  pattern,
  onPreview,
  isFavorite,
  onToggleFavorite,
}: LazyPatternCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = cardRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Load after a small delay for smoother experience
            setTimeout(() => setHasLoaded(true), 50);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={cardRef} className="w-full">
      {isVisible && hasLoaded ? (
        <PatternCard
          pattern={pattern}
          onPreview={onPreview}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        // Placeholder to maintain layout
        <div className="aspect-square rounded-xl bg-secondary/30 animate-pulse" />
      )}
    </div>
  );
};

