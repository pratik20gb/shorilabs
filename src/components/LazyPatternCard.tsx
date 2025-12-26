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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
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

