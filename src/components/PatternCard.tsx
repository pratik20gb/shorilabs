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
  const { 
    setPattern: setBackgroundPattern, 
    pattern: currentBackgroundPattern,
    isPreviewActive,
    brightness
  } = useBackgroundPattern();

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBackgroundPattern(pattern);
    toast.success(`Previewing "${pattern.name}"`);
  };

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

  const isActive = currentBackgroundPattern?.id === pattern.id;

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
          isPreviewActive
            ? brightness === "dark"
              ? "border-white/20 hover:border-white/40"
              : "border-black/10 hover:border-black/20"
            : "border-border/40 hover:border-border",
          isActive && "ring-2 ring-emerald-500"
        )}
        style={getPatternStyle()}
      >
        {/* New Badge */}
        {pattern.isNew && (
          <div className={cn(
            "absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-medium uppercase",
            isPreviewActive
              ? brightness === "dark"
                ? "bg-white text-black"
                : "bg-gray-900 text-white"
              : "bg-foreground/90 text-background"
          )}>
            New
          </div>
        )}

        {/* Hover Overlay */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3",
          isPreviewActive
            ? brightness === "dark"
              ? "bg-black/90"
              : "bg-white/95"
            : "bg-background/[0.97]"
        )}>
          {/* Pattern Info */}
          <div>
            <p className={cn(
              "text-sm font-semibold",
              isPreviewActive
                ? brightness === "dark" ? "text-white" : "text-gray-900"
                : "text-foreground"
            )}>
              {pattern.name}
            </p>
            <p className={cn(
              "text-xs capitalize mt-0.5",
              isPreviewActive
                ? brightness === "dark" ? "text-white/60" : "text-gray-500"
                : "text-muted-foreground"
            )}>
              {pattern.category}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-1.5 justify-end">
            <button
              onClick={handlePreview}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                isActive
                  ? "bg-emerald-500 text-white"
                  : isPreviewActive
                    ? brightness === "dark"
                      ? "bg-white/10 hover:bg-white/20 text-white"
                      : "bg-black/5 hover:bg-black/10 text-gray-900"
                    : "bg-secondary/80 hover:bg-secondary text-foreground"
              )}
              title="Preview on website"
            >
              {isActive ? "Active" : "Preview"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(pattern.id);
              }}
              className={cn(
                "p-2 rounded-md transition-colors",
                isPreviewActive
                  ? brightness === "dark"
                    ? "bg-white/10 hover:bg-white/20"
                    : "bg-black/5 hover:bg-black/10"
                  : "bg-secondary/80 hover:bg-secondary",
                isFavorite ? "text-red-500" : isPreviewActive
                  ? brightness === "dark" ? "text-white/60" : "text-gray-500"
                  : "text-foreground"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5", isFavorite && "fill-current")} />
            </button>
            <button
              onClick={copyToClipboard}
              className={cn(
                "p-2 rounded-md transition-colors",
                isPreviewActive
                  ? brightness === "dark"
                    ? "bg-white/10 hover:bg-white/20 text-white/60"
                    : "bg-black/5 hover:bg-black/10 text-gray-500"
                  : "bg-secondary/80 hover:bg-secondary text-foreground"
              )}
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
