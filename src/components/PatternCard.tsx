import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { Pattern } from "@/data/patterns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
    toast.success("CSS copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getPatternStyle = (): React.CSSProperties => {
    const cssLines = pattern.css.split("\n");
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
    <div
      className="group relative cursor-pointer"
      onClick={() => onPreview(pattern)}
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