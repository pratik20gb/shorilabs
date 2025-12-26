import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { Button } from "@/data/buttons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(button.css);
    setCopied(true);
    toast.success("CSS copied!");
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
      let value = trimmed.substring(colonIndex + 1).trim().replace(/;$/, '');
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
      <div className="aspect-square rounded-xl overflow-hidden border border-border/40 bg-gradient-to-br from-gray-900/80 to-gray-800/80 flex items-center justify-center transition-all duration-300 hover:border-border hover:shadow-lg p-4">
        {/* Live Button Preview */}
        <button 
          style={getButtonStyle()} 
          className="pointer-events-none transform scale-90 whitespace-nowrap"
        >
          {button.label || "Button"}
        </button>

        {/* New Badge */}
        {button.isNew && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-foreground/90 text-background text-[9px] font-medium tracking-wider uppercase">
            New
          </div>
        )}

        {/* Hover Overlay with Button Name */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/[0.97] transition-all duration-300 flex flex-col justify-between p-3">
          {/* Button Info */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            <p className="text-sm font-semibold text-foreground">
              {button.name}
            </p>
            <p className="text-xs text-muted-foreground capitalize mt-0.5">
              {button.category}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(button.id);
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

