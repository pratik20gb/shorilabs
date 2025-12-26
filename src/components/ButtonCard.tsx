import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { Button } from "@/data/buttons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";

interface ButtonCardProps {
  button: Button;
  onPreview: (button: Button) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ButtonCard = ({
  button,
  onPreview,
  isFavorite,
  onToggleFavorite,
}: ButtonCardProps) => {
  const [copied, setCopied] = useState(false);
  const { isPreviewActive, brightness } = useBackgroundPattern();

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(button.css);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse CSS for button preview
  const getButtonStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};
    const lines = button.css.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('@') || trimmed.startsWith('}')) return;
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex === -1) return;
      const prop = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim().replace(/;$/, '');
      const camelProp = prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      (style as Record<string, string>)[camelProp] = value;
    });
    return style;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("button", JSON.stringify(button));
    e.dataTransfer.effectAllowed = "copy";
    (e.target as HTMLElement).style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = "1";
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => onPreview(button)}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Button Preview Container */}
      <div className={cn(
        "aspect-square rounded-lg overflow-hidden border flex items-center justify-center transition-all duration-300 hover:shadow-lg p-4",
        isPreviewActive
          ? brightness === "dark"
            ? "border-white/20 bg-white/5 hover:border-white/40"
            : "border-black/10 bg-black/5 hover:border-black/20"
          : "border-border/40 bg-gradient-to-br from-gray-900/80 to-gray-800/80 hover:border-border"
      )}>
        {/* Live Button Preview */}
        <button 
          style={getButtonStyle()} 
          className="pointer-events-none transform scale-90 whitespace-nowrap"
        >
          {button.label || "Button"}
        </button>

        {/* New Badge */}
        {button.isNew && (
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
          {/* Button Info */}
          <div>
            <p className={cn(
              "text-sm font-semibold",
              isPreviewActive
                ? brightness === "dark" ? "text-white" : "text-gray-900"
                : "text-foreground"
            )}>
              {button.name}
            </p>
            <p className={cn(
              "text-xs capitalize mt-0.5",
              isPreviewActive
                ? brightness === "dark" ? "text-white/60" : "text-gray-500"
                : "text-muted-foreground"
            )}>
              {button.category}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(button.id);
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
