import { motion, AnimatePresence } from "framer-motion";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Pattern } from "@/data/patterns";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { CLISection } from "./CLISection";
import { Footer } from "./Footer";

interface WebsitePreviewWindowProps {
  pattern: Pattern | null;
  onClose: () => void;
  onPatternChange?: (pattern: Pattern) => void;
}

export const WebsitePreviewWindow = ({
  pattern: initialPattern,
  onClose,
  onPatternChange,
}: WebsitePreviewWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [pattern, setPattern] = useState<Pattern | null>(initialPattern);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    setPattern(initialPattern);
  }, [initialPattern]);

  if (!pattern && !initialPattern) return null;
  
  const currentPattern = pattern || initialPattern;
  if (!currentPattern) return null;

  const getPatternStyle = (): React.CSSProperties => {
    if (!currentPattern) return {};
    
    const cssLines = currentPattern.css.split("\n");
    const style: React.CSSProperties = {};

    cssLines.forEach((line) => {
      const match = line.match(/^([^:@]+):\s*(.+);?\s*$/);
      if (match && !line.includes("@keyframes")) {
        const [, prop, value] = match;
        const camelProp = prop
          .trim()
          .replace(/-([a-z])/g, (_, l) => l.toUpperCase());
        (style as Record<string, string>)[camelProp] = value.trim().replace(
          /;$/,
          ""
        );
      }
    });

    return style;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ 
            scale: isMinimized ? 0.7 : 1, 
            opacity: 1, 
            y: isMinimized ? 20 : 0,
            height: isMinimized ? "auto" : "90vh"
          }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className={cn(
            "relative w-full max-w-7xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden flex flex-col",
            isMinimized && "max-h-[400px]"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Window Controls */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Preview: {currentPattern.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Drag patterns here to preview on website
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview Content */}
          {!isMinimized && (
            <div
              className={cn(
                "flex-1 overflow-auto transition-all duration-300",
                isDraggingOver && "ring-4 ring-primary ring-offset-2"
              )}
              style={getPatternStyle()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDraggingOver(true);
                e.dataTransfer.dropEffect = "copy";
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDraggingOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDraggingOver(false);
                
                try {
                  const patternData = e.dataTransfer.getData("pattern");
                  if (patternData) {
                    const newPattern = JSON.parse(patternData) as Pattern;
                    setPattern(newPattern);
                    onPatternChange?.(newPattern);
                  }
                } catch (error) {
                  console.error("Error parsing pattern data:", error);
                }
              }}
            >
              <div className="min-h-full">
                <Header onSearch={() => {}} />
                <main className="pt-16">
                  {/* Preview Content - Simplified version of the website */}
                  <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4 md:px-6">
                      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 tracking-tight">
                        Patterns
                      </h1>
                      <div className="text-center text-muted-foreground mb-12">
                        <p className="text-lg">This is how the pattern looks on the website</p>
                        <p className="text-sm mt-2">Drag another pattern here to preview it</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className="aspect-square rounded-xl border border-border/40 bg-card/50"
                          />
                        ))}
                      </div>
                    </div>
                  </section>
                  <CLISection />
                  <Footer />
                </main>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

