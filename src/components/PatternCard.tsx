import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { Pattern } from "@/data/patterns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";
import { parsePatternCSS } from "@/lib/patternUtils";

interface PatternCardProps {
  pattern: Pattern;
  onPreview: (pattern: Pattern) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PatternCard = ({
  pattern,
  onPreview,
  isFavorite,
  onToggleFavorite,
}: PatternCardProps) => {
  const [copied, setCopied] = useState(false);
  const { setPattern: setBackgroundPattern, pattern: currentBackgroundPattern } = useBackgroundPattern();

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBackgroundPattern(pattern);
    toast.success(`Previewing "${pattern.name}" on website`);
  };

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(pattern.css);
    setCopied(true);
    toast.success("CSS copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getPatternStyle = (): React.CSSProperties => {
    return parsePatternCSS(pattern.css);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("pattern", JSON.stringify(pattern));
    e.dataTransfer.effectAllowed = "copy";
    // Add visual feedback
    (e.target as HTMLElement).style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = "1";
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => onPreview(pattern)}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Pattern Preview */}
      <div
        className="aspect-square rounded-xl overflow-hidden border border-border/40 transition-all duration-300 hover:border-border hover:shadow-lg"
        style={getPatternStyle()}
      >
        {/* New Badge */}
        {pattern.isNew && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-foreground/90 text-background text-[9px] font-medium tracking-wider uppercase">
            New
          </div>
        )}

        {/* Hover Overlay with Pattern Name */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/[0.97] transition-all duration-300 flex flex-col justify-between p-3">
          {/* Pattern Info */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            <p className="text-sm font-semibold text-foreground">
              {pattern.name}
            </p>
            <p className="text-xs text-muted-foreground capitalize mt-0.5">
              {pattern.category}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 justify-end">
            <button
              onClick={handlePreview}
              className={cn(
                "px-3 py-1.5 rounded-md bg-secondary/80 hover:bg-secondary transition-colors backdrop-blur-sm text-xs font-medium",
                currentBackgroundPattern?.id === pattern.id ? "text-primary ring-2 ring-primary" : "text-foreground"
              )}
              title="Preview on website"
            >
              Preview
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(pattern.id);
              }}
              className={cn(
                "p-2 rounded-md bg-secondary/80 hover:bg-secondary transition-colors backdrop-blur-sm",
                isFavorite ? "text-destructive" : "text-foreground"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5", isFavorite && "fill-current")} />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-md bg-secondary/80 hover:bg-secondary text-foreground transition-colors backdrop-blur-sm"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-success" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};