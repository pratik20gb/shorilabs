import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { Pattern } from "@/data/patterns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(pattern.css);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getPatternStyle = (): React.CSSProperties => {
    return parsePatternCSS(pattern.css);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("pattern", JSON.stringify(pattern));
    e.dataTransfer.effectAllowed = "copy";
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
        className={cn(
          "aspect-square rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-lg",
          "border-border/40 hover:border-border"
        )}
        style={getPatternStyle()}
      >
        {/* New Badge */}
        {pattern.isNew && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-medium uppercase bg-foreground/90 text-background">
            New
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3 bg-background/[0.97]">
          {/* Pattern Info */}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {pattern.name}
            </p>
            <p className="text-xs capitalize mt-0.5 text-muted-foreground">
              {pattern.category}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-1.5 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(pattern.id);
              }}
              className={cn(
                "p-2 rounded-md transition-colors bg-secondary/80 hover:bg-secondary",
                isFavorite ? "text-red-500" : "text-foreground"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5", isFavorite && "fill-current")} />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-md transition-colors bg-secondary/80 hover:bg-secondary text-foreground"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
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
