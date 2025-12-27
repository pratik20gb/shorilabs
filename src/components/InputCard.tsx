import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { InputStyle } from "@/data/inputs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface InputCardProps {
  input: InputStyle;
  onPreview: (input: InputStyle) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const InputCard = ({
  input,
  onPreview,
  isFavorite,
  onToggleFavorite,
}: InputCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(input.css);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse CSS for input preview
  const getInputStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};
    const lines = input.css.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('@') || trimmed.startsWith('}') || trimmed.startsWith('&')) return;
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
    e.dataTransfer.setData("input", JSON.stringify(input));
    e.dataTransfer.effectAllowed = "copy";
    (e.target as HTMLElement).style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = "1";
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => onPreview(input)}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Input Preview Container */}
      <div className="aspect-square rounded-lg overflow-hidden border border-border/40 bg-gradient-to-br from-gray-50/80 to-white/80 hover:border-border flex items-center justify-center transition-all duration-300 hover:shadow-lg p-4">
        {/* Live Input Preview */}
        <input 
          type="text"
          readOnly
          placeholder={input.placeholder || "Type here..."}
          style={getInputStyle()} 
          className="pointer-events-none transform scale-90 w-full max-w-[140px]"
        />

        {/* New Badge */}
        {input.isNew && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-medium uppercase bg-foreground/90 text-background">
            New
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3 bg-background/[0.97]">
          {/* Input Info */}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {input.name}
            </p>
            <p className="text-xs capitalize mt-0.5 text-muted-foreground">
              {input.category}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(input.id);
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

